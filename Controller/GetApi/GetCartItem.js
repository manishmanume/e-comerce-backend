const connections = require('../../DB/Mysql_conn');

const getCartItem = (req,res) =>{
    const userId = req.query.userId;

    if (!userId) {
        return res.status(400).send({ error: 'UserId is required' });
    }

    const query = `CALL SP_get_cartitem(?)`;

    connections.query(query, [userId], (err, results) => {
        if (err) {
            return res.status(500).send('Error fetching cart details');
        }

        const cartDetails = results[0] || [];

        res.status(200).send({ cartDetails });
    });
}

module.exports = getCartItem;