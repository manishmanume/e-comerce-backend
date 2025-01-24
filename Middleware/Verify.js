const jwt = require('jsonwebtoken');
require("dotenv").config();

const verify = async(req,res,next) =>{
    try {
        const authHeader = req.headers["authorizations"];
        let token;

        if (authHeader && authHeader.startsWith("baarer ")) 
            {
                token.authHeader.split(" ")[1];
            }
        
        if (!token && req.cookies && req.cookies.token)
            {
                token = req.cookies.token;
            }    

        if (!token) 
            {
                return res.status(404).json({message: "No token found"})
            }    

            try {
                const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

                if (decode)
                    {
                        req.user = user.username;
                        next()
                    }
                    else
                        {
                            return res.status(401).json({ message: "Unauthorized request" });
                        }

            } catch (error) {
                res.status(500).json({ message: error })
            }

    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
}

module.exports = verify;