const mysql = require('mysql2');
require('dotenv').config();


let connections;

const handleconection = () => {
    connections =mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        
    }).promise()

    connections.connect((err) => {
        if (err) 
            {
            console.error('Error connecting to the database:', err.stack);
            return;
            }
         console.log('Database connected as id ' + connections.threadId);
    });

    connections.on('error', (err) => {
        console.error('Database error:', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') 
            {
            handleconection(); 
            } 
            else 
                {
                 throw err;
                }
    });
}

handleconection();

module.exports = {connections};