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

        console.log(JSON.stringify(query));

        waterfall([
            (cb)=>{
                Paginator.getPagination(recipeModel.getModel(), query.filter, currPage, limitPage, (result)=>{
                    cb(null, result);
                });
            },
            (pagination, cb)=>{
                recipeModel.getList(query.filter, query.order, pagination.currPage, limitPage, (err, result)=>{
                    if(!err){console.log(pagination);
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
                _jsonDecode([RecipeField.entity.ingredients.name, RecipeField.entity.steps.name], result);
                _response(res, err, result)
            }
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
            res.status(500)
               .send(err);
        }
    }

    function _jsonDecode(keys, obj){
        _.forEach(keys, (key)=>{
            obj[key] = (JSON).parse(obj[key]);
        });
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

        let tmpCategoryCuisineIngredients = {};
        if(_.has(filter, RecipeField.entity.category.name) && filter[RecipeField.entity.category.name] != ""){
            tmpCategoryCuisineIngredients[RecipeField.entity.category.name] = filter[RecipeField.entity.category.name];
        }
        if(_.has(filter, RecipeField.entity.cuisine.name) && filter[RecipeField.entity.cuisine.name] != ""){
            tmpCategoryCuisineIngredients[RecipeField.entity.cuisine.name] = filter[RecipeField.entity.cuisine.name];
        }
        if(_.has(filter, RecipeField.entity.ingredients.name) && filter[RecipeField.entity.ingredients.name] != ""){
            let tmpArr = [];

            _.forEach(filter[RecipeField.entity.ingredients.name], (ingredient)=>{
                let tmpObj = {};
                tmpObj[RecipeField.entity.ingredients.name] = {$like: '%' + ingredient + '%'};

                tmpArr.push(tmpObj);
            });

            tmpCategoryCuisineIngredients['$and'] = tmpArr;
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

        if(_.size(tmpCategoryCuisineIngredients) > 0 && _.size(tmpKeyword) > 0){
            query.filter = {
                $and: [tmpCategoryCuisineIngredients, tmpKeyword]
            };
        } else{
            if(_.size(tmpCategoryCuisineIngredients) > 0) query.filter = tmpCategoryCuisineIngredients;
            if(_.size(tmpKeyword) > 0) query.filter = tmpKeyword;
        }

        return query;
    }

    function _checkFilter (){

    }

    return router;
}