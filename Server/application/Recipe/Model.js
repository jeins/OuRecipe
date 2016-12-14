import AbstractModel from '../Default/AbstractModel';
import RecipeField from './Field';
import User from '../User/Model';
import UserField from '../User/Field';

class Recipe extends AbstractModel{
    constructor(){
        super();

        this.db = this.getConnection();
        this.recipe = this.db.define(RecipeField.tableName, this.generateEntities(RecipeField.entity));

        //e-relation definitions
        this.user = new User().getModel();
        this.recipe.belongsTo(this.user);
        this.user.hasMany(this.recipe);
    }

    getModel(){
        return this.recipe;
    }

    getList(filter, order, currPage, limit, cb){
        currPage = (currPage === 1) ? 0 : currPage;
        let offset = currPage * limit;
        let recipeAttributes = [
            RecipeField.entity.id.name,
            RecipeField.entity.title.name,
            RecipeField.entity.description.name,
            RecipeField.entity.cookTime.name,
            RecipeField.entity.serving.name,
            RecipeField.entity.photoName
        ];
        let userAttributes = [
            UserField.entity.id.name,
            UserField.entity.firstName.name,
            UserField.entity.lastName.name
        ];

        this.recipe.findAll({
            // attributes: recipeAttributes,
            where: filter,
            order: order,
            include: [
                {model: this.user, attributes: userAttributes}
            ],
            offset: offset,
            limit: limit
        })
            .then((recipes)=>{
                cb(null, recipes);
            })
            .catch((err)=>{cb(err.message, null);})
        ;
    }

    getById(id, cb){
        let userAttributes = [
            UserField.entity.id.name,
            UserField.entity.firstName.name,
            UserField.entity.lastName.name,
            UserField.entity.photoName.name
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
                cb(null, recipe);
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
            RecipeField.entity.photoName.name,
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
            RecipeField.entity.photoName.name,
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
}

module.exports = Recipe;