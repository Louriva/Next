const express = require('express');
const bodyParser = require('body-parser');
const db = require('./src/config/db');


const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const port = 3000

var userRoute = require('./src/routers/user');

app.use('/', userRoute);
app.listen(port, () => console.log(`Example app listening on port port!`))