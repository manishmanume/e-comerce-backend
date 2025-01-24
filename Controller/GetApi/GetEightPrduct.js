const connections = require('../../DB/Mysql_conn');


const getEightProduct = (req, res) => {
    const query = 'CALL SP_eight_product();';

    connections.query(query, (err, results) => {
        if (err) {
          return res.status(500).send('Error fetching categories: ' + err.message);
        }

        res.status(200).send(results[0]);
    });
}

module.exports = getEightProduct;