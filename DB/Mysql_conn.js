const mysql = require('mysql2');
require('dotenv').config();

let connection;

const handleConnection = () => {
    connection = mysql.createConnection({
        host: process.env.HOST,
        user: process.env.User,
        password: process.env.PASSWORD,
        database: process.env.DATABASE_NAME,
        multipleStatements: true,
    });

    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err.stack);
            setTimeout(handleConnection, 2000); 
        } else {
            console.log('Database connected as id ' + connection.threadId);
        }
    });

    
    connection.on('error', (err) => {
        console.error('Database error:', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleConnection(); 
        } else {
            throw err; 
        }
    });
};

handleConnection();

module.exports = connection;
