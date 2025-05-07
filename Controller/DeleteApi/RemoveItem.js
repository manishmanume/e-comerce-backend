const connections = require('../../DB/Mysql_conn');

const removeCartItem = (req,res) =>{
    const { cartItemId } = req.body;

    if (!cartItemId) {
        return res.status(400).json({
          ResponseCode: 0,
          ResponseMessage: 'Error: cartItemId is required'
        });
      }

      const query = `CALL SP_remove_from_cart(?)`;

    connections.query(query, [cartItemId], (err, results) => {
    if (err) {
      return res.status(500).json({
        ResponseCode: 0,
        ResponseMessage: 'Error: Failed to remove item from cart'
      });
    }

    const response = results[0][0]; 

    return res.json({
      ResponseCode: response.ResponseCode,
      ResponseMessage: response.ResponseMessage
    });
  });
}

module.exports = removeCartItem;
