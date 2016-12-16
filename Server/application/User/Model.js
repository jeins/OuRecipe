import AbstractModel from '../Default/AbstractModel';
import UserField from './Field';
import crypto from 'crypto';
import config from '../../config/config';
import _ from 'lodash';

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

    getList(filter, currPage, limit, cb){
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
            .then((user)=>{cb(null, user);})
            .catch((err)=>{cb(err.message, null);})
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
            .then((user)=>{cb(null, user);})
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

    isUserExistByEmail(email, cb){
        let filter = {};
        let attributes = [UserField.entity.id.name, UserField.entity.email.name];

        filter[UserField.entity.email.name] = email;


        this.user.findOne({
            attributes: attributes,
            where: filter
        })
            .then((user)=>{cb(null, user);})
            .catch((err)=>{cb(err.message, null);})
        ;
    }

    compareUserPassword(email, password, cb){
        let filter = {};
        let attributes = [
            UserField.entity.id.name, UserField.entity.email.name
        ];

        filter[UserField.entity.email.name] = email;
        filter[UserField.entity.password.name] = this._getHash(password);

        this.user.findOne({
            attributes: attributes,
            where: filter
        })
            .then((user)=>{cb(null, user);})
            .catch((err)=>{cb(err.message, null);})
        ;
    }

    add(data, cb){
        let allowedFields = [
            UserField.entity.firstName.name,
            UserField.entity.lastName.name,
            UserField.entity.email.name,
            UserField.entity.password.name,
        ];

        if(_.has(data, UserField.entity.password.name)){
            data[UserField.entity.password.name] = this._getHash(data[UserField.entity.password.name]);
        }

        let newUserData = this.validateBody(data, allowedFields);

        this.user.create(newUserData)
            .then((user)=>{cb(null, user.get());})
            .catch((err)=>{cb(err.message, null);})
        ;
    }

    update(userId, data, cb){
        let allowedFields = [
            UserField.entity.firstName.name,
            UserField.entity.lastName.name,
            UserField.entity.password.name,
            UserField.entity.country.name,
            UserField.entity.city.name,
            UserField.entity.aboutMe.name,
            UserField.entity.socialMedia.name,
            UserField.entity.photoName.name
        ];
        let filter = {};
        filter[UserField.entity.id.name] = userId;

        if(_.has(data, UserField.entity.password.name)){
            data[UserField.entity.password.name] = this._getHash(data[UserField.entity.password.name]);
        }

        let newUserData = this.validateBody(data, allowedFields);

        this.user.update(newUserData, {where: filter})
            .then((user)=>{cb(null, user);})
            .catch((err)=>{cb(err.message, null)})
        ;
    }

    _getHash (string){
        return crypto
            .createHmac('sha256', config.secret)
            .update(string)
            .digest('hex');
    };
}

module.exports = User;