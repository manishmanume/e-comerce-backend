const connections  = require('../../DB/Mysql_conn');

const removeWishList = (req, res) => {
    const { watch_id } = req.body; 
    
    if (!watch_id) {
        return res.status(400).json({ 
            ResponseCode: 0, 
            ResponseMessage: 'ID is required' 
        });
    }

    const query = 'CALL SP_remove_from_watchlist(?)';

    connections.query(query, [watch_id], (error, results) => {
        if (error) {
            return res.status(500).json({ 
                ResponseCode: 0, 
                ResponseMessage: 'Internal Server Error' 
            });
        }
        
        const response = results[0][0];

        if (response && response.ResponseCode === 1) {
            res.status(200).json(response);
        } else {
            res.status(404).json({ 
                ResponseCode: 0, 
                ResponseMessage: response?.ResponseMessage || 'No watchlist items found' 
            });
        }
    });
};

module.exports = removeWishList;
