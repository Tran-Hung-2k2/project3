import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import route from './src/routes/index.js';
import { ValidationError } from 'express-validation';

const app = express();

dotenv.config();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

route(app);

app.use(function (err, req, res, next) {
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(err);
    }

    return res.status(500).json(err);
});

app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));
