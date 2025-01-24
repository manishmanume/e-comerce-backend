const multer = require('multer');
const connections  = require('../../DB/Mysql_conn');

// Configure Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });

const AddProduct = (req, res) => {
    try {
        const { name, description, price, stock, categoryId } = req.body;

        const mainImage = req.files['mainImage'] ? `/uploads/${req.files['mainImage'][0].filename}` : null;
        const images = req.files['images'] ? req.files['images'].map((file) => `/uploads/${file.filename}`) : [];

        if (!mainImage) {
            return res.status(400).send('Main image is required');
        }
        if (!categoryId) {
            return res.status(400).send('Category ID is required');
        }

        const imagesJSON = JSON.stringify(images);
        const query = 'CALL SP_add_product(?, ?, ?, ?, ?, ?, ?)';
        connections.query(query, [name, description, price, stock, mainImage, categoryId, imagesJSON], (err, results) => {
            if (err) {
                return res.status(500).send('Error adding product');
            }

            const productId = results[0]?.[0]?.productId;
            res.status(200).send({ message: 'Product added successfully', productId });
        });
    } catch (err) {
        res.status(500).send('Unexpected error occurred');
    }
};

module.exports = { AddProduct, upload };
