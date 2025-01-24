const connections = require('../../DB/Mysql_conn');

const getProduct = (req, res) =>{
    const Query = 'CALL SP_get_product()';
    connections.query(Query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch products' });
        }
        const products = results[0];
        res.json(products);
        
    })
}

module.exports = getProduct;