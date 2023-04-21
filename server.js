// API Documentation 
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from 'swagger-jsdoc';

// packages import 
import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import morgan from 'morgan';

// security package 
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';

// files import 
import connectDB from './config/db.js';
import testRoutes from './routes/testRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import jobsRoutes from './routes/jobsRoutes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

// rest object 
const app = express();

// dotenv config 
dotenv.config();

// mongodb connection 
connectDB();

// Swagger api config 
// Swagger api options
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'Job Portal Application',
            description: 'Node Express Job Portal Application'
        },
        servers: [
            {
//                 url: "http://localhost:8080"
                   url: "https://nodejs-job-portal-app-5nv2.onrender.com" 
            }
        ]
    },
    apis : ['./routes/*.js']
};

const spec = swaggerDoc(options);

// middlewares 
app.use(helmet(''));
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// routes 
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/jobs", jobsRoutes);

// homeroute root 
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(spec));

// validation middleware 
app.use(errorMiddleware);
// port 
const PORT = process.env.PORT || 8080;

// listen 
app.listen(PORT, () => {
    console.log(`Node server running in ${process.env.DEV_MODE} mode on PORT no ${PORT}`.bgCyan.bgWhite);
});
