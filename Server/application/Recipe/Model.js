import AbstractModel from '../Default/AbstractModel';
import RecipeField from './Field';
import User from '../User/Model';
import UserField from '../User/Field';
import FavoriteField from '../Favorite/Field';
import _ from 'lodash';
import config from '../../config/config';

class Recipe extends AbstractModel{
    constructor(){
        super();

        this.db = this.getConnection();
        this.recipe = this.db.define(RecipeField.tableName, this.generateEntities(RecipeField.entity));
        this.favorite = this.db.define(FavoriteField.tableName, this.generateEntities(FavoriteField.entity));

        //e-relation definitions
        this.user = new User().getModel();

        this.recipe.belongsTo(this.user);
        this.favorite.belongsTo(this.recipe);

        this.recipe.hasMany(this.favorite);
        this.user.hasMany(this.recipe);
    }

    getModel(){
        return this.recipe;
    }

    getList(filter, order, currPage, limit, cb){
        currPage = (currPage === 1) ? 0 : currPage;
        let me = this;
        let offset = currPage * limit;
        let recipeAttributes = [
            RecipeField.entity.id.name,
            RecipeField.entity.title.name,
            RecipeField.entity.description.name,
            RecipeField.entity.cookTime.name,
            RecipeField.entity.serving.name,
            RecipeField.entity.imageUrl.name
        ];
        let userAttributes = [
            UserField.entity.id.name,
            UserField.entity.firstName.name,
            UserField.entity.lastName.name
        ];

        this.recipe.findAll({
            where: filter,
            //attributes: recipeAttributes,
            order: order,
            include: [
                {model: this.user, attributes: userAttributes},
                {model: this.favorite}
            ],
            offset: offset,
            limit: limit
        })
            .then((recipes)=>{
                cb(null, me._setupImageAndVideo(JSON.stringify(recipes)));
            })
            .catch((err)=>{cb(err.message, null);})
        ;
    }

    getById(id, cb){
        let me = this;
        let userAttributes = [
            UserField.entity.id.name,
            UserField.entity.firstName.name,
            UserField.entity.lastName.name,
            UserField.entity.imageUrl.name
        ];
        let filter = {};
        filter[RecipeField.entity.id.name] = id;

        this.recipe.find({
            where: filter,
            include: [
                {model: this.user, attributes: userAttributes}
            ]
        })
            .then((recipe)=>{
                let decodeIngredientsAndSteps = me._jsonDecode(
                    [RecipeField.entity.ingredients.name, RecipeField.entity.steps.name],
                    JSON.stringify(recipe));
                let setupImageAndVideo = me._setupImageAndVideo(decodeIngredientsAndSteps);

                cb(null, setupImageAndVideo);
            })
            .catch((err)=>{cb(err.message, null);})
        ;
    }

    getBySuggestTitle(title, cb){
        let recipeAttributes = [
            RecipeField.entity.id.name,
            RecipeField.entity.title.name
        ];
        let filter = {};
        filter[RecipeField.entity.title.name] = {$like: '%' + title + '%'};

        this.recipe.findAll({
            attributes: recipeAttributes,
            where: filter
        })
            .then((recipe)=>{
                cb(null, recipe);
            })
            .catch((err)=>{cb(err.message, null);})
        ;
    }

    add(data, cb){
        let allowedFields = [
            RecipeField.entity.userId.name,
            RecipeField.entity.title.name,
            RecipeField.entity.description.name,
            RecipeField.entity.ingredients.name,
            RecipeField.entity.steps.name,
            RecipeField.entity.preparationTime.name,
            RecipeField.entity.cookTime.name,
            RecipeField.entity.serving.name,
            RecipeField.entity.cuisine.name,
            RecipeField.entity.category.name,
            RecipeField.entity.difficultyLevel.name,
            RecipeField.entity.imageUrl.name,
            RecipeField.entity.videoUrl.name
        ];
        let newRecipeData = this.validateBody(data, allowedFields);

        this.recipe.create(newRecipeData)
            .then((recipe)=>{cb(null, recipe.get())})
            .catch((err)=>{cb(err.message, null)})
        ;
    }

    update(id, data, cb){
        let allowedFields = [
            RecipeField.entity.title.name,
            RecipeField.entity.description.name,
            RecipeField.entity.ingredients.name,
            RecipeField.entity.steps.name,
            RecipeField.entity.preparationTime.name,
            RecipeField.entity.cookTime.name,
            RecipeField.entity.serving.name,
            RecipeField.entity.cuisine.name,
            RecipeField.entity.category.name,
            RecipeField.entity.difficultyLevel.name,
            RecipeField.entity.imageUrl.name,
            RecipeField.entity.videoUrl.name
        ];
        let newRecipeData = this.validateBody(data, allowedFields);
        let condition = {};
        condition[RecipeField.entity.id.name] = id;

        this.recipe.update(newRecipeData, {where: condition})
            .then((recipe)=>{cb(null, recipe);})
            .catch((err)=>{cb(err.message, null)})
        ;
    }

    delete(id, cb){
        let condition = {};
        condition[RecipeField.entity.id.name] = id;

        this.recipe.destroy({where: condition})
            .then((result)=>{cb(null, result);})
            .catch((err)=>{cb(err.message, null)})
        ;
    }

    _setupImageAndVideo(recipes){
        let jsonRecipes = (typeof recipes === 'object') ? recipes : JSON.parse(recipes);

        let setupImgAndVid = (recipe)=>{
            recipe.imageUrl = (recipe.imageUrl === "") ? config.url + config.no_image.recipe : config.url + recipe.imageUrl;

            if(recipe.videoUrl != ""){
                recipe.videoUrl = String("https://www.youtube.com/embed/"+recipe.videoUrl.split('v=')[1]+"?rel=0");
            }
        };

        if(_.isArray(jsonRecipes)){
            _.forEach(jsonRecipes, (recipe)=>{
                setupImgAndVid(recipe);
            });
        } else{
            setupImgAndVid(jsonRecipes);
        }

        return jsonRecipes;
    }

    _jsonDecode(keys, obj){
        obj = JSON.parse(obj);

        _.forEach(keys, (key)=>{
            obj[key] = (JSON).parse(obj[key]);
        });

        return obj;
    }
}

module.exports = Recipe;