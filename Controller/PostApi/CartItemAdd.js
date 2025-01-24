const connections  = require('../../DB/Mysql_conn');

const addCartItem = (req, res) => {
    const { userId, productId, quantity, price } = req.body;

    if (!userId || !productId || !quantity || !price) {
        return res.status(400).send('Missing required fields');
    }

    const query = 'CALL SP_add_cart_item(?, ?, ?, ?)';

    connections.query(query, [userId, productId, quantity, price], (err, results) => {
        if (err) {
            return res.status(500).send('Error adding to cart: ' + err.message);
        }
        res.status(200).send('Product added to cart');
    });
};

module.exports = addCartItem;
