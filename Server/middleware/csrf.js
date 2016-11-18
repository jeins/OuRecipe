import session from 'express-session';
import config from '../config/config';
import csrf from 'csurf';

module.exports = {
    setupCsrf: ()=>{
        return csrf();
    },

    setupSession: ()=>{
        return session({
            secret: config.secret,
            resave: false,
            saveUninitialized: true
        });
    },

    sendCsrfToClient: (req, res, next)=>{
        res.cookie('csrf-token', req.csrfToken());console.log(req.csrfToken());
        next();
    },

    errorHandler: (err, req, res, next)=>{
        if (err.code !== 'EBADCSRFTOKEN') return next(err);

        // handle CSRF token errors here
        res.status(403);
        res.send('session is expired!');
    },
};