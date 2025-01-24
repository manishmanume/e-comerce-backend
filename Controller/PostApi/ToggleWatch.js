const connections = require('../../DB/Mysql_conn');


const toggleList = async (req, res) => {
    const { userId, productId, product_image_id } = req.body;

    if (!userId || !productId || !product_image_id) {
        return res.status(400).json({ error: "User ID and Product ID are required" });
    }

    try {
        
        connections.query("CALL SP_toggle_watchlist(?, ?, ?)", [userId, productId, product_image_id], (err, result) =>{
            if (err) {
                return res.status(500).json({ error: "Error toggling watchlist" });
                }

                const action = result[0][0]?.ACTION || "unknown";
        
                return res.status(200).json({ message: `Product ${action} in watchlist successfully.` });
        });
        
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while toggling the watchlist." });
    }
};

module.exports = toggleList;
