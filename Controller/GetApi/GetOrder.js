const connections = require('../../DB/Mysql_conn');

const getOrderItem = (req, res) => {
    const userId = req.query.userId;

    if (!userId) {
        return res.status(400).json({ message: 'userId is required' });
    }

     const orderQuery = `CALL SP_get_order_item(?)`;

     connections.query(orderQuery, [userId],  (err, result) =>{
        
        if (err) {
            return res.status(500).json({ message: "Error fetching order item" });            
        }
        if(result.length == 0){
            return res.status(404).json({ message: "Order item not found" });
        }else{
            return res.status(200).json(result[0]);
        }
        
     })
     
} 

module.exports = getOrderItem;