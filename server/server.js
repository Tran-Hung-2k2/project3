import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import route from './src/routes/index.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();

dotenv.config();
const PORT = process.env.PORT || 8080;

// Swagger tài liệu cấu hình
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Project III',
            description: 'Project III',
            version: '1.0.0',
        },
    },
    // Đường dẫn chứa API định nghĩa và đường dẫn chứa tài liệu API
    apis: ['./src/routes/*.js'],
};

// Sử dụng middleware Swagger UI và tài liệu API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerOptions)));

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

route(app);

app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));
