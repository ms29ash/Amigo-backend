const express = require('express');
const app = express();
const colors = require('colors');


const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.send('Amigo')
})

app.listen(port, () => {
    console.log(`App is listening on http://localhost:${port}`.cyan);
})