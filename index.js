const express = require('express');
const cors = require('cors');
const port = process.env.port || 5000;
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('spices den server')
})
// listening //
app.listen(port, () => {
    console.log('hi i am listening');
})