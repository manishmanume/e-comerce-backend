const express = require('express');
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const Router = require('./Router/Routes');
const cors = require("cors");
const path = require('path');

dotenv.config({ path: "./.env" });

const corsOrigins = [
  "https://onlineshopiing.netlify.app",
   "http://localhost:5173",
  "https://6797979f711d8600086e1e37--onlineshopiing.netlify.app",
];

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
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};


const app = express();

app.use(cors(corsOptions));
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.options('*', cors(corsOptions));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', Router);

app.set('port', process.env.PORT || 3000);
app.options('*', cors(corsOptions));

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
