const connections  = require('../../DB/Mysql_conn');

const getuser = (req, res) =>{
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({
          ResponseCode: 0,
          ResponseMessage: 'Email is required.',
        });
      }

      const sql = 'CALL SP_get_user(?)';
      connections.query(sql, [email], (err, results) => {
        if (err) {
          return res.status(500).json({
            ResponseCode: 0,
            ResponseMessage: 'An error occurred while processing the request.',
          });
        }
        if (results[0].length === 0) { 
            return res.status(404).json({
                ResponseCode: 0,    
                ResponseMessage: 'User not found.',
            });
        }
        
        const user = results[0][0];
        res.status(200).json({
            ResponseCode: 1,
            ResponseMessage: 'User retrieved successfully.',
            User: user,
        });
    });
}

module.exports = getuser;