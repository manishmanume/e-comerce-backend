const connections = require('../../DB/Mysql_conn');

const getCategory = (req, res) =>{
    const query = 'CALL SP_get_category();';

    connections.query(query, (err, results) => {
        if (err) {
          return res.status(500).send('Error fetching categories: ' + err.message);
        }

        res.status(200).send(results[0]);
    });
}

module.exports = getCategory;