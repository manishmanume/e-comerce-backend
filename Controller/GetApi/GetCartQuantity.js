const connections  = require('../../DB/Mysql_conn');

const getCartQuantity = async (req, res) => {
    const userId = req.query.userId;

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        const query =  `CALL SP_cart_total_item(?)`;

        connections.query(query, [userId], (err, result) =>{
            if (err) {
                return res.status(500).json({ error: 'Error fetching wishList quantity' });
            }
            const totalQuantity = result[0]?.[0]?.totalQuantity || 0;
            res.status(200).json({ totalQuantity });
            
        })

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = getCartQuantity;
