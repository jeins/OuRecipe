import Recipe from './Model';
import Paginator from '../Default/Paginator';
import {Router} from 'express';
import waterfall from 'async/waterfall';

export default ()=>{
    let recipeModel = new Recipe();
    let router = new Router();
    let prefix = '/api/recipe/';

    router.post(prefix + 'list', (req, res)=>{
        let currPage = req.body.currPage;
        let limitPage = req.body.limit;
        let filter = req.body.filter;

        waterfall([
            (cb)=>{
                Paginator.getPagination(recipeModel.getModel(), filter, currPage, limitPage, (result)=>{
                    cb(null, result);
                });
            },
            (pagination, cb)=>{
                recipeModel.getList(filter, pagination.currPage, limitPage, (err, result)=>{
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

    return router;
}