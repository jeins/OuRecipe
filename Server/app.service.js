import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import fs from 'fs';

import config from './config/config';
import corsMiddleware from './middleware/cors';
import csrfMiddleware from './middleware/csrf';
import authMiddleware from './middleware/auth';
import UserController from './application/User/UserController';
import AuthController from './application/User/AuthController';
import RecipeController from './application/Recipe/RecipeController';
import FavoriteController from './application/Favorite/FavoriteController';
import ImageController from './application/Default/ImageController';

const conf = config.server[process.env.NODE_ENV] || config.server.development;
const app = express();

app.server = http.createServer(app);

// use morgan to log requests to the console
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware
app.use(corsMiddleware);
app.use(csrfMiddleware.setupSession());
app.use(csrfMiddleware.setupCsrf());
app.use(csrfMiddleware.sendCsrfToClient);
app.use(csrfMiddleware.errorHandler);
app.all('/api/auth/*', authMiddleware);

// API URI
app.use('/version', (req, res)=>{res.send({version: '1.0.0'});});
app.use('/', UserController());
app.use('/', AuthController());
app.use('/', RecipeController());
app.use('/', FavoriteController());
app.use('/', ImageController());

// Angular Client
app.use(express.static(__dirname + conf.client));
app.all('*', function(req, res) {
    res.writeHead(200, { 'Content-type': 'text/html'});
    res.end(fs.readFileSync(__dirname + conf.client + '/index.html'));
});

app.server.listen(conf.port, conf.host, ()=>{
    console.log("Server is running on: %s:%s", conf.host, conf.port);
});

export default app;