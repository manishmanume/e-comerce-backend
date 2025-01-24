const connections = require('../../DB/Mysql_conn');

const productOrder = async (req, res) => {
    const {
        userId,
        customerName,
        email,
        address,
        city,
        zipCode,
        country,
        paymentMethod,
      } = req.body;
    
      if (!customerName || !email || !address || !city || !zipCode || !country || !paymentMethod) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
      }
    
      const query = `
        CALL SP_place_order(?, ?, ?, ?, ?, ?, ?, ?, @orderId, @errorCode);
        SELECT @orderId AS orderId, @errorCode AS errorCode;
      `;
    
      connections.query(
        query,
        [userId, customerName, email, address, city, zipCode, country, paymentMethod],
        (error, results) => {
          if (error) {
            console.error('Database Error:', error);
            return res.status(500).json({ success: false, message: 'Database error', error });
          }
    
          const output = results[1][0]; 
          const { orderId, errorCode } = output;
    
          if (errorCode === 1) {
            return res.status(400).json({ success: false, message: 'Cart is empty' });
          }
    
          res.status(200).json({
            success: true,
            message: 'Order placed successfully',
            orderId,
          });
        }
      );
};

module.exports = productOrder;
