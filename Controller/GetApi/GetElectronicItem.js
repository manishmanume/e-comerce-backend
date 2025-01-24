const connections  = require('../../DB/Mysql_conn');

const electronicItem = (req,res) => {
    const menquery = 'CALL SP_get_electronic_item();'

    connections.query(menquery, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch products' });
        }
        const products = results[0];
        res.json(products);
        
    })
}

module.exports = electronicItem;