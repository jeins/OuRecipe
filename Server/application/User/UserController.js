import User from './Model';
import Paginator from '../Default/Paginator';
import {Router} from 'express';
import waterfall from 'async/waterfall';

export default ()=>{
    let userModel = new User();
    let router = new Router();
    let prefix = '/api/user';

    router.post(prefix + '/list', (req, res)=>{
        let currPage = req.body.currPage;
        let limitPage = req.body.limit;

        waterfall([
            (cb)=>{
                Paginator.getPagination(userModel.getModel(), currPage, limitPage, (result)=>{
                    cb(null, result);
                });
            },
            (pagination, cb)=>{
                userModel.getList(pagination.currPage, limitPage, (result)=>{
                    cb(null, {data: result, pagination: pagination});
                });
            }
        ], (err, result)=>{
            if(!err) res.json(result);
        });
    });

    router.post(prefix + '/view', (req, res)=>{});
    router.post(prefix, (req, res)=>{});
    router.put(prefix, (req, res)=>{});

    return router;
}