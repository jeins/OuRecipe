import Recipe from './Model';
import Paginator from '../Default/Paginator';
import {Router} from 'express';
import waterfall from 'async/waterfall';

export default ()=>{
    let recipeModel = new Recipe();
    let router = new Router();
    let prefix = '/api/recipe/';

    /**
     * get recipe list
     * exp request: {"currPage": 1, "limit": 5, "filter": {"userId": 1}}
     */
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
        ], (err, result)=>{_response(res, err, result)});
    });

    /**
     * view specific recipe profile by id
     * exp request: {"recipeId": 1}
     */
    router.post(prefix + 'view', (req, res)=>{
        let recipeId = req.body.recipeId;

        recipeModel.getById(
            recipeId,
            (err, result)=>{_response(res, err, result)}
        );
    });

    /**
     * added new recipe
     * exp request: {"data": {...}}
     */
    router.post(prefix, (req, res)=>{
        recipeModel.add(
            req.body.data,
            (err, result)=>{_response(res, err, result)}
        );
    });

    /**
     * update specific recipe by id
     * exp request: {"recipeId": 1, "data": ...}
     */
    router.put(prefix, (req, res)=>{
        let recipeId = req.body.recipeId;
        let data = req.body.data;

        recipeModel.update(
            recipeId, data,
            (err, result)=>{_response(res, err, result)}
        );
    });

    /**
     * dete specific recipe by id
     * exp request: {"recipeId": 1}
     */
    router.delete(prefix, (req, res)=>{
        let recipeId = req.body.recipeId;

        recipeModel.delete(
            recipeId,
            (err, result)=>{_response(res, err, result)}
        );
    });

    /**
     *
     * @param res
     * @param err
     * @param result
     * @private
     */
    function _response(res, err, result){
        if(!err){
            res.json(result);
        } else{
            res.status(500)
               .send(err);
        }
    }

    return router;
}