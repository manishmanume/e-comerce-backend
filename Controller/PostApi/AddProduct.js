const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const connections = require('../../DB/Mysql_conn');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'products', 
        allowed_formats: ['jpg', 'jpeg', 'png'], 
        transformation: [{ width: 500, height: 500, crop: 'limit' }] 
    }
});

const upload = multer({ storage: storage });

const AddProduct = (req, res) => {
    try {
        const { name, description, price, stock, categoryId } = req.body;

        const mainImage = req.files.mainImage ? req.files.mainImage[0].path : null;
        const images = req.files.images ? req.files.images.map(file => file.path) : [];

        console.log('Main Image:', mainImage);
        console.log('Additional Images:', images);

        if (!mainImage) {
            return res.status(400).send({ message: 'Main image is required' });
        }
        if (!categoryId) {
            return res.status(400).send({ message: 'Category ID is required' });
        }

        const imagesJSON = JSON.stringify(images);
        const query = 'CALL SP_add_product(?, ?, ?, ?, ?, ?, ?)';
        connections.query(query, [name, description, price, stock, mainImage, categoryId, imagesJSON], (err, results) => {
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
