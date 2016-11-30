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
        let filter = req.body.filter;

        waterfall([
            (cb)=>{
                Paginator.getPagination(userModel.getModel(), filter, currPage, limitPage, (result)=>{
                    cb(null, result);
                });
            },
            (pagination, cb)=>{
                userModel.getList(filter, pagination.currPage, limitPage, (err, result)=>{
                    if(!err){
                        cb(null, {data: result, pagination: pagination});
                    }
                    else cb(err, null);
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