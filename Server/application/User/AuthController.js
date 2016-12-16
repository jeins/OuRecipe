import {Router} from 'express';
import User from './Model';
import AuthToken from '../Default/AuthToken';

export default ()=>{
    let router = new Router();
    let prefix = '/auth';
    let userModel = new User();

    router.post(prefix + '/signup', (req, res)=>{
        let data = req.body.data;

        userModel.isUserExistByEmail(data.email, (err, existingUser)=>{
            if(existingUser){
                return res.status(409).send({ message: 'Email is already taken' });
            }

            userModel.add(data, (err, result)=>{
                if (err) {
                    return res.status(500).send({ message: err });
                }

                res.json(AuthToken.createToken(result))
            });
        });
    });

    router.post(prefix + '/login', (req, res)=>{
        let email = req.body.email;
        let password = req.body.password;

        userModel.isUserExistByEmail(email, (err, existingUser)=>{
            if (err) {
                return res.status(500).send({ message: err });
            }
            if(!existingUser){
                return res.status(401).send({ message: 'Invalid email and/or password' });
            }

            userModel.compareUserPassword(email, password, (err, result)=>{
                if (err) {
                    return res.status(500).send({ message: err });
                }
                if(!result){
                    return res.status(401).send({ message: 'Invalid email and/or password' });
                }

                res.json(AuthToken.createToken(result))
            });
        });

    });

    router.post(prefix + '/google', (req, res)=>{

    });

    router.post(prefix + '/facebook', (req, res)=>{

    });

    return router;
}