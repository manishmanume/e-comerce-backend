const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const fs = require('fs').promises;
const connections = require('../../DB/Mysql_conn');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ dest: 'uploads/' });

const uploadToCloudinary = async (filePath) => {
    return cloudinary.uploader.upload(filePath, { folder: 'products' });
};

const AddProduct = async (req, res) => {
    try {
        const { name, description, price, stock, categoryId } = req.body;

        if (!categoryId) {
            return res.status(400).send({ message: 'Category ID is required' });
        }
        if (!req.files || !req.files.mainImage) {
            return res.status(400).send({ message: 'Main image is required' });
        }

        const mainImageFile = req.files.mainImage[0];
        const additionalImages = req.files.images || [];

        const mainImageResult = await uploadToCloudinary(mainImageFile.path);
        const mainImageUrl = mainImageResult.secure_url;

        const imageUrls = [];
        for (const image of additionalImages) {
            const result = await uploadToCloudinary(image.path);
            imageUrls.push(result.secure_url);
        }

        await fs.unlink(mainImageFile.path);
        for (const image of additionalImages) {
            await fs.unlink(image.path);
        }

        const imagesJSON = JSON.stringify(imageUrls);
        const query = 'CALL SP_add_product(?, ?, ?, ?, ?, ?, ?)';
        connections.query(query, [name, description, price, stock, mainImageUrl, categoryId, imagesJSON], (err, results) => {
            if (err) {
                console.error('Database Error:', err);
                return res.status(500).send({ message: 'Error adding product', error: err.message });
            }

            const productId = results[0]?.[0]?.productId;
            res.status(200).send({ message: 'Product added successfully', productId });
        });
    } catch (err) {
        console.error('Unexpected Error:', err);
        res.status(500).send({ message: 'Unexpected error occurred', error: err.message });
    }
};

module.exports = { AddProduct, upload };
