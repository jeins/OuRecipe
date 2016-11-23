import AbstractModel from '../Default/AbstractModel';
import RecipeField from './Field';

class Recipe extends AbstractModel{
    constructor(){
        super();

        this.db = this.getConnection();
        this.recipe = this.db.define(RecipeField.tableName, this.generateEntities(RecipeField.entity));
    }

    getModel(){
        return this.recipe;
    }

    getList(currPage, limit, callback){
        currPage = (currPage === 1) ? 0 : currPage;
        let offset = currPage * limit;
        let attributes = [
            RecipeField.entity.id.name,
            RecipeField.entity.title.name,
            RecipeField.entity.description.name,
            RecipeField.entity.photoName.name,
            RecipeField.entity.cookTime.name,
            RecipeField.entity.difficultyLevel.name,
            RecipeField.entity.serving.name
        ];

        this.recipe.findAll({attributes: attributes, offset: offset, limit: limit}).then((recipes)=>{
            callback(recipes);
        });
    }
}

module.exports = Recipe;