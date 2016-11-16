import User from './Model';
import {Router} from 'express';

export default ()=>{
    let userModel = new User();
    let router = new Router();

    router.get('/api/user/members', (req, res)=>{
        userModel.getMembersList((result)=>{
            res.json(result);
        });
    });



    return router;
}