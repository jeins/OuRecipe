import AbstractModel from '../Default/AbstractModel';
import UserField from './Field';

class User extends AbstractModel{
    constructor(){
        super();

        this.db = this.getConnection();
        this.user = this.db.define(UserField.tableName, this.generateEntities(UserField.entity));

        // this.recipe = new Recipe().getModel();
        // this.recipe.belongsTo(this.user);
    }

    getModel(){
        return this.user;
    }

    getList(filter, currPage, limit, callback){
        currPage = (currPage === 1) ? 0 : currPage;
        let offset = currPage * limit;
        let attributes = [
            UserField.entity.id.name,
            UserField.entity.firstName.name,
            UserField.entity.lastName.name,
            UserField.entity.photoName.name
        ];

        this.user.findAll({
            attributes: attributes,
            where: filter,
            offset: offset,
            limit: limit
        })
            .then((user)=>{
                callback(null, user);
            })
            .catch((err)=>{callback(err.message, null)})
        ;
    }

    getById(id, cb){
        let filter = {};
        let excludeAttributes = [UserField.entity.password.name, UserField.entity.updatedAt.name];
        filter[UserField.entity.id.name] = id;

        this.user.find({
            attributes: {exclude: excludeAttributes},
            where: filter
        })
            .then((user)=>{
                cb(null, user)
            })
            .catch((err)=>{cb(err.message, null);})
        ;
    }

    getUserWithMostRecipe(cb){
        this.db
            .query(
            "SELECT u.id, u.firstName, u.lastName, u.photoName " +
            "FROM recipes AS r " +
            "LEFT JOIN users AS u ON u.id=r.userId " +
            "GROUP BY r.userId ORDER BY count(r.userId) DESC")
            .spread((results, metadata)=>{
                cb(null, results);
            })
    }
}

module.exports = User;