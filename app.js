// CONFIG FILE
require('./config');

//CONFIG SERVER
const express = require('express');
const cors = require('cors');
const app = express();

// CONFIG API
const bodyParser = require('body-parser');
const api = require('./route/index');

// CONNECTION FRONT
app.use(cors());

// PARSE DATA CONFIG
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// USING API ROUTE
app.use('/api', api);

// SERVER UP
app.listen(process.env.PORT, () => {
    console.log(`Server listening in port: ${process.env.PORT}`);
});
