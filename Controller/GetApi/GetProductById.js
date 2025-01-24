const connections  = require('../../DB/Mysql_conn');

const searchProductById = (req, res) => {
    const productId = req.params.id;
    const query = "CALL SP_get_productid(?)";

    connections.query(query, [productId], (err, result) => {
        if (err) {
            return res.status(500).send('Error fetching product');
        }
        
        const productData = result[0];

        if (productData.length === 0) {
            return res.status(404).send('Product not found');
        }

        const product = {
            id: productData[0].productId,
            name: productData[0].name,
            description: productData[0].description,
            price: productData[0].price,
            stock: productData[0].stock,
            mainImage: productData[0].mainImage,
            images: productData.filter(row => row.image !== null).map(row => row.image),
        };

        res.status(200).send(product);
    });
}

module.exports = searchProductById;
