import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import config from './config/config';
import corsMiddleware from './middleware/cors';
import UserController from './application/User/UserController';
import RecipeController from './application/Recipe/RecipeController';

var conf = config.server[process.env.NODE_ENV] || config.server.development;

var app = express();
app.server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + conf.client));

// Middleware
app.use(corsMiddleware);
// use morgan to log requests to the console
app.use(morgan('dev'));

app.use('/', UserController());
app.use('/', RecipeController());

app.server.listen(conf.port, conf.host, ()=>{
    console.log("Server is running on: %s:%s", conf.host, conf.port);
});

export default app;