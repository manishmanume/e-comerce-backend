const  connections  = require('../../DB/Mysql_conn');

const getwatchlist = (req, res) => {
    const userId = req.query.userId;

    if (!userId) {
        return res.status(400).json({ message: 'userId is required' });
    }

    const query = `CALL SP_get_watchlist(?);`;

    connections.query(query, [userId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching watchlist' });
        }

        const rawData = result[0];
        const formattedData = rawData.reduce((acc, row) => {
            const productIndex = acc.findIndex(item => item.product_id === row.product_id);

            if (productIndex === -1) {
                acc.push({
                    product_id: row.product_id,
                    watch_id: row.watch_id,
                    name: row.name,
                    price: row.price,
                    main_image: row.main_image,
                    description: row.description,
                    additional_images: row.additional_image ? [row.additional_image] : [],
                   
                });
            } else {
                if (row.additional_image) {
                    acc[productIndex].additional_images.push(row.additional_image);
                }
            }

            return acc;
        }, []);

        res.status(200).json({ formattedData });
    });
};

module.exports = getwatchlist;
