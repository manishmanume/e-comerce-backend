const express = require('express');
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const Router = require('./Router/Routes');
const cors = require("cors");
const path = require('path');

dotenv.config({ path: "./.env" });

const corsOrigins = ["http://localhost:5173", "http://localhost:3000", "https://onlinesshoping.netlify.app/"];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || corsOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.error(`Blocked by CORS: ${origin}`);
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
};

const app = express();

// Middleware
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Static File Serving
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', Router);

app.set('port', process.env.PORT || 3000);

// Test Route
app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'An error occurred!', error: err.message });
});

// Start Server
app.listen(app.get('port'), () => {
    console.info(`Server listening on port ${app.get('port')}`);
});
