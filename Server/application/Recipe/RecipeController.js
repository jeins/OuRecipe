import Recipe from './Model';
import {Router} from 'express';

export default ()=>{
    let recipeModel = new Recipe();
    let router = new Router();

    router.get('/api/recipe/list', (req, res)=>{
        recipeModel.getRecipeList((result)=>{
            res.json(result);
        });
    });



    return router;
}