import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import colors from 'colors';

/ * Config */
import { connectDB } from './config/db.js'

/ * MiddleWare * /
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

/ *Routes */
import userRoutes from '../routes/userRoutes.js'

dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development')
    app.use(morgan('dev'))

app.use(express.json())

app.use('/api/users', userRoutes)

app.use(errorHandler)
app.use(notFound)

const PORT = process.env.PORT || 5000

app.listen(
    PORT,
    console.log(
        `Server is running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.yellow.bold
    )
)