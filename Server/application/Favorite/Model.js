import AbstractModel from '../Default/AbstractModel';
import FavoriteField from './Field';
import User from '../User/Model';
import UserField from '../User/Field';
import Recipe from '../Recipe/Model';
import RecipeField from '../Recipe/Field';

class Favorite extends AbstractModel {
    constructor() {
        super();

        this.db = this.getConnection();
        this.favorite = this.db.define(FavoriteField.tableName, this.generateEntities(FavoriteField.entity));

        //e-relation definitions
        this.user = new User().getModel();
        this.recipe = new Recipe().getModel();

        this.favorite.belongsTo(this.user);
        this.favorite.belongsTo(this.recipe);

        this.user.hasMany(this.favorite);
        this.recipe.hasMany(this.favorite);
    }

    getModel() {
        return this.favorite;
    }

    getFavoriteRecipeList(filter, order, currPage, limit, cb) {
        currPage = (currPage === 1) ? 0 : currPage;
        let offset = currPage * limit;
        let userAttributes = [
            UserField.entity.id.name,
            UserField.entity.firstName.name,
            UserField.entity.lastName.name
        ];
        let recipeAttributes = [
            RecipeField.entity.id.name,
            RecipeField.entity.userId.name,
            RecipeField.entity.title.name,
            RecipeField.entity.cookTime.name,
            RecipeField.entity.serving.name,
            RecipeField.entity.imageUrl.name
        ];

        this.favorite.findAll({
            where: filter.favorite,
            order: order,
            include: [
                {
                    model: this.user, attributes: userAttributes
                },
                {
                    model: this.recipe, attributes: recipeAttributes,
                    where: filter.recipe, order: order,
                    include: {model: this.user, attributes: userAttributes}
                }
            ],
            offset: offset,
            limit: limit
        })
            .then((favRecipes)=>{
                cb(null, favRecipes);
            })
            .catch((err)=>{cb(err.message, null);})
        ;
    }

    add(data, cb){
        let allowedFields = [
            FavoriteField.entity.userId.name,
            FavoriteField.entity.recipeId.name
        ];
        let newFavoriteRecipe = this.validateBody(data, allowedFields);

        this.favorite.create(newFavoriteRecipe)
            .then((favRecipe)=>{cb(null, favRecipe.get())})
            .catch((err)=>{cb(err.message, null)})
        ;
    }
}

module.exports = Favorite;