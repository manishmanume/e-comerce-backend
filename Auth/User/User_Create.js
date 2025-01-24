const bcrypt = require('bcrypt');
const connections  = require('../../DB/Mysql_conn');

const CreateUser = async (req, res) => {
    const { username, email, name,  password } = req.body;

    if (!name  || !username || !email|| !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = 'CALL SP_create_user (?, ?, ?, ?)';

        connections.query(query, [name, username, email, hashedPassword], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error registering user' });
            }

            const responseMessage = result[0]?.[0]?.ResponseMessage || 'User registered successfully';
            
            res.status(201).json({ message: responseMessage });
        });
    } catch (err) {
        res.status(500).json({ ResponseCode: 0, message: 'Error registering user' });
    }
};

module.exports = CreateUser;
