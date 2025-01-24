const connections = require('../../DB/Mysql_conn');

const totalWatchItem = async (req, res) => {
    const userId = req.query.userId;

    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }

    try {
        const query =  `CALL SP_get_total_watchlist_items(?)`;
        connections.query(query, [userId], (err, result) =>{
            if (err) {
                return res.status(500).json({ error: 'Error fetching cart quantity' });
            }
            
            const totalQuantity = result[0]?.[0]?.total_items || 0;
            res.status(200).json({ totalQuantity });
            
        })
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = totalWatchItem;