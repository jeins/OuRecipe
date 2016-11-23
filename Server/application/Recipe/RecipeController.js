import Recipe from './Model';
import Paginator from '../Default/Paginator';
import {Router} from 'express';
import waterfall from 'async/waterfall';

export default ()=>{
    let recipeModel = new Recipe();
    let router = new Router();

    router.post('/api/recipe/list', (req, res)=>{
        let currPage = req.body.currPage;
        let limitPage = req.body.limit;

        waterfall([
            (cb)=>{
                Paginator.getPagination(recipeModel.getModel(), currPage, limitPage, (result)=>{console.log(result)
                    cb(null, result);
                });
            },
            (pagination, cb)=>{
                recipeModel.getList(pagination.currPage, limitPage, (result)=>{
                    cb(null, {data: result, pagination: pagination});
                });
            }
        ], (err, result)=>{
            if(!err) res.json(result);
        });
    });



    return router;
}