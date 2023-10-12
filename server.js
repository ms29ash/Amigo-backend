const express = require('express');
const app = express();
const colors = require('colors');
const authRoutes = require('./routes/authRoutes');
const connectToDB = require('./config/db');
require('dotenv').config()
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');


connectToDB()


const port = process.env.PORT || 4000;

app.use(express.json())


app.use('/api/auth', authRoutes)


app.use(notFoundHandler)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`App is listening on http://localhost:${port}`.cyan);
})


