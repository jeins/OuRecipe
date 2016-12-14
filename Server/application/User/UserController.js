import User from './Model';
import Paginator from '../Default/Paginator';
import {Router} from 'express';
import waterfall from 'async/waterfall';

export default ()=>{
    let userModel = new User();
    let router = new Router();
    let prefix = '/api/user';

    /**
     * get users list
     * exp request: {"currPage": 1, "limit": 5}
     */
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
        ], (err, result)=>{_response(res, err, result)});
    });

    /**
     * view specific user profile by id
     * exp request: {"userId": 1}
     */
    router.post(prefix + '/view', (req, res)=>{
        let userId = req.body.userId;

        userModel.getById(
            userId,
            (err, result)=>{_response(res, err, result)}
        );
    });

    /**
     * view top user. User with most recipe
     * exp request: {}
     */
    router.post(prefix + '/top', (req, res)=>{
        userModel.getUserWithMostRecipe(
            (err, result)=>{_response(res, err, result)}
            );
    });
    router.put(prefix, (req, res)=>{});

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