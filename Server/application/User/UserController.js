import User from './Model';
import {Router} from 'express';

export default ()=>{
    let userModel = new User();
    let router = new Router();

    router.post('/api/user/list', (req, res)=>{
        userModel.getMembersList(req.body.offset, req.body.limit, (result)=>{
            res.json(result);
        });
    });



    return router;
}