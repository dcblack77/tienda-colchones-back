// CONFIG FILE
require('./config');

//CONFIG SERVER
const express = require('express');
const cors = require('cors');
const app = express();

// CONFIG API
const bodyParser = require('body-parser');

// CONECTION FRONT
app.use(cors());


// SERVER UP
app.listen(process.env.PORT, () => {
    console.log(`Server listening in port: ${process.env.PORT}`);
});
