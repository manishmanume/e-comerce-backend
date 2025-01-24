const  connections  = require('../../DB/Mysql_conn');

const womenItem = (req,res) => {
    const menquery = 'CALL SP_get_women_item();'

    connections.query(menquery, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch products' });
        }
        const products = results[0];
        res.json(products);
        
    })
}

module.exports = womenItem;