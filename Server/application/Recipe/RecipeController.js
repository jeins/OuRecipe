import Recipe from './Model';
import RecipeField from './Field';
import Paginator from '../Default/Paginator';
import {Router} from 'express';
import waterfall from 'async/waterfall';
import _ from 'lodash';

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
        let query = _generateFilter(req.body.filter);

        waterfall([
            (cb)=>{
                Paginator.getPagination(recipeModel.getModel(), query.filter, currPage, limitPage, (result)=>{
                    cb(null, result);
                });
            },
            (pagination, cb)=>{
                recipeModel.getList(query.filter, query.order, pagination.currPage, limitPage, (err, result)=>{
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
            (err, result)=>{
                _response(res, err, result)
            }
        );
    });

    /**
     * get recipe by search text
     * exp request: {"text": "chicken"}
     */
    router.post(prefix + 'search', (req, res)=>{
        let suggestTitle = req.body.text;

        recipeModel.getBySuggestTitle(
            suggestTitle,
            (err, result)=>{_response(res, err, result)}
        );
    });

    /**
     * added new recipe
     * exp request: {"data": {...}}
     */
    router.post(prefix, (req, res)=>{
        recipeModel.add(
            req.body,
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
            res.status(500).send({message: err});
        }
    }

    /**
     *
     * @param filter
     * @returns {{filter: {}, order: string}}
     * @private
     */
    function _generateFilter(filter){
        let query = {
            filter: {},
            order: 'createdAt DESC'
        };

        if(_.size(filter) === 0) return query;

        let tmpFilterField = {};
        if(_.has(filter, RecipeField.entity.category.name) && filter[RecipeField.entity.category.name] != ""){
            tmpFilterField[RecipeField.entity.category.name] = filter[RecipeField.entity.category.name];
        }
        if(_.has(filter, RecipeField.entity.cuisine.name) && filter[RecipeField.entity.cuisine.name] != ""){
            tmpFilterField[RecipeField.entity.cuisine.name] = filter[RecipeField.entity.cuisine.name];
        }
        if(_.has(filter, RecipeField.entity.userId.name) && filter[RecipeField.entity.userId.name] != ""){
            tmpFilterField[RecipeField.entity.userId.name] = filter[RecipeField.entity.userId.name];
        }
        if(_.has(filter, RecipeField.entity.ingredients.name) && filter[RecipeField.entity.ingredients.name] != ""){
            let tmpArr = [];

            _.forEach(filter[RecipeField.entity.ingredients.name], (ingredient)=>{
                let tmpObj = {};
                tmpObj[RecipeField.entity.ingredients.name] = {$like: '%' + ingredient + '%'};

                tmpArr.push(tmpObj);
            });

            tmpFilterField['$and'] = tmpArr;
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

        if(_.size(tmpFilterField) > 0 && _.size(tmpKeyword) > 0){
            query.filter = {
                $and: [tmpFilterField, tmpKeyword]
            };
        } else{
            if(_.size(tmpFilterField) > 0) query.filter = tmpFilterField;
            if(_.size(tmpKeyword) > 0) query.filter = tmpKeyword;
        }

        return query;
    }

    return router;
}