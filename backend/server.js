// npm run devStart
const express = require('express');
const app = express();
const PORT = 5000;
const cors = require("cors");
const bodyParser = require("body-parser");
const getAllRGBValues = require('./helpers/colors').getAllRGBValues;

const allowedOrigins = ["http://127.0.0.1:5500","http://localhost:5500"];

app.use(
    cors({
        origin: function(origin, callback) {
            console.log('ORIGIN: ' + origin);
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                var msg =
                    "The CORS policy for this site does not " +
                    "allow access from the specified Origin.";
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        }
    })
); 

app.use(bodyParser.json()); //application json

app.get('/', (req, res) => {
    res.send('Welcome to Palette Generator API');
})

app.get('/:keyword', async (req, res) => {
    const keyword = req.params.keyword;
    console.log('keyword', keyword);
    const response = getAllRGBValues(keyword);
    response.then((values) => {
        console.log('sent');
        console.log(values);
        res.status(200).json(values);
    }).catch((err) => {
        res.status(500).send(err);
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})