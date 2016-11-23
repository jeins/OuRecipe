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

    getList(filter, currPage, limit, cb){
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
                cb(null, recipe)
            })
            .catch((err)=>{cb(err.message, null);})
        ;
    }
}

module.exports = Recipe;