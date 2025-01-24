const express = require('express');
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const Router = require('./Router/Routes');
const cors = require("cors");

dotenv.config({ path: "./.env" });

const corsOrigins = ["http://localhost:5173", "http://localhost:3000", "http://yourdomain.com"];

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

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/api', Router);
app.use('/uploads', express.static('uploads'));

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'An error occurred!', error: err.message });
});

app.listen(app.get('port'), () => {
    console.info(`Server listening on port ${app.get('port')}`);
});
