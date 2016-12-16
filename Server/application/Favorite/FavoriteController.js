import Favorite from './Model';
import FavoriteField from './Field';
import RecipeField from '../Recipe/Field';
import Paginator from '../Default/Paginator';
import {Router} from 'express';
import waterfall from 'async/waterfall';
import _ from 'lodash';

export default ()=>{
    let favoriteModel = new Favorite();
    let router = new Router();
    let prefix = '/api/auth/favorite';

    /**
     * get favorite recipe list by userId
     * exp request: {"currPage": 1, "limit": 5, "filter": {"userId": 1}}
     */
    router.post(prefix + '/recipe', (req, res)=>{
        let currPage = req.body.currPage;
        let limitPage = req.body.limit;
        let query = _generateFilter(req.body.filter);

        console.log(JSON.stringify(query));

        waterfall([
            (cb)=>{
                Paginator.getPagination(favoriteModel.getModel(), query.filter.favorite, currPage, limitPage, (result)=>{
                    cb(null, result);
                });
            },
            (pagination, cb)=>{
                favoriteModel.getFavoriteRecipeList(query.filter, query.order, pagination.currPage, limitPage, (err, result)=>{
                    if(!err){
                        cb(null, {data: result, pagination: pagination});
                    }
                    else cb(err, null);
                });
            }
        ], (err, result)=>{_response(res, err, result)});
    });

    /**
     * added new recipe
     * exp request: {"data": {"userId": 1, "recipeId": 2}}
     */
    router.post(prefix, (req, res)=>{
        favoriteModel.add(
            req.body,
            (err, result)=>{_response(res, err, result)}
        );
    });

    /**
     *
     * @param filter
     * @returns {{filter: {}, order: string}}
     * @private
     */
    function _generateFilter(filter){
        let query = {
            filter: {favorite: {}, recipe: {}},
            order: 'createdAt DESC'
        };

        if(_.size(filter) === 0) return query;

        let tmpFilterField = {};
        if(_.has(filter, FavoriteField.entity.userId.name) && filter[FavoriteField.entity.userId.name] != ""){
            tmpFilterField[FavoriteField.entity.userId.name] = filter[FavoriteField.entity.userId.name];
        }

        let tmpKeyword = {};
        if(_.has(filter, 'keyword')){
            let keys = [RecipeField.entity.title.name, RecipeField.entity.description.name, RecipeField.entity.ingredients.name];
            let tmpArr = [];

            _.forEach(keys, (key)=>{
                let tmpObj = {};
                tmpObj[key] = {$like: '%' + filter.keyword + '%'};

                tmpArr.push(tmpObj);
            });

            tmpKeyword = {$or: tmpArr};
        }

        if(_.has(filter, 'sort')){
            let order = filter.sort.split('_');

            query.order = order[0] + ' ' + order[1].toUpperCase();
        }

        if(_.size(tmpFilterField) > 0) query.filter.favorite = tmpFilterField;
        if(_.size(tmpKeyword) > 0) query.filter.recipe = tmpKeyword;

        return query;
    }

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