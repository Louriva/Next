const express = require('express');
const bodyParser = require('body-parser');
const db = require('./src/config/db');
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

const app = express();

app.use('/api-docs', swaggerUi.serve,swaggerUi.setup (swaggerDocument))
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const port = 3000

var userRoute = require('./src/routers/userRoute',);
var comicRoute = require('./src/routers/comicRoute',);

app.use('/', userRoute,comicRoute);
app.listen(port, () => console.log(`Port 3000 on`))