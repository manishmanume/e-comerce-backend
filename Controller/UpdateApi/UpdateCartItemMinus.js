const connections = require('../../DB/Mysql_conn');

const updateCartminus = (req, res) => {
const { cartId } = req.body;

if ( !cartId ) {
        return res.status(400).json({
          ResponseCode: 0,
          ResponseMessage: 'Invalid input. Please provide cartId, productId, and increment.',
        });
      }

      const sql = 'CALL SP_update_cart_minus( ? )';
      connections.query(sql, [cartId], (err, results) => {
        if (err) {
          return res.status(500).json({
            ResponseCode: 0,
            ResponseMessage: 'An error occurred while processing the request.',
          });
        }
        const response = results[0]?.[0];
        if (response) {
          res.json(response);
        } else {
          res.status(500).json({
            ResponseCode: 0,
            ResponseMessage: 'No response from the database.',
          });
        }
      });

}

module.exports = updateCartminus;