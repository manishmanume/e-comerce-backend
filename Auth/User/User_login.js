const connections = require('../../DB/Mysql_conn')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleUserLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || email.trim() === "") {
        return res.status(200).json({ ResponseCode: 0, message: "Email Is Required" });
    }

    if (!password || password.trim() === "") {
        return res.status(200).json({ ResponseCode: 0, message: "Password Is Required" });
    }

    const admin_login_query = "CALL SP_user_login(?)";

    try {
        connections.query(admin_login_query, [email], async (err, result) => {
            if (err) {
                return res.status(500).json({ ResponseCode: 0, message: "Internal Server Error" });
            }

            const user = result[0][0];

            if (!user) {
                return res.status(200).json({ ResponseCode: 0, message: "Invalid Email" });
            }

            if (!user.password) {
                return res.status(200).json({ ResponseCode: 0, message: "User not found" });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(200).json({ ResponseCode: 0, message: "Check your password" });
            }

            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "1d" }
            );      

            const domain = process.env.COOKIE_DOMAIN || 'your-default-domain.com'; 
            
            
            res.cookie('token', token, {
                path: '/',
                domain: domain,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 24 * 60 * 60 * 1000,
                sameSite: 'Strict', 
            });

            return res.status(200).json({
                ResponseCode: 1,
                message: "User logged in successfully",
                email: user.email,
                token: token
            });
        });
    } catch (error) {
        return res.status(500).json({ ResponseCode: 0, message: "Internal Server Error" });
    }
};

module.exports = handleUserLogin;
