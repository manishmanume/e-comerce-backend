const multer = require('multer');
const path = require('path');
const fs = require('fs');
const connections = require('../../DB/Mysql_conn');

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });

const AddProduct = (req, res) => {
    try {
        const { name, description, price, stock, categoryId } = req.body;

        const mainImage = req.files['mainImage'] 
            ? `/uploads/${req.files['mainImage'][0].filename}` 
            : null;
        const images = req.files['images'] 
            ? req.files['images'].map((file) => `/uploads/${file.filename}`) 
            : [];

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
                return res.status(500).send({ message: 'Error adding product' });
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
