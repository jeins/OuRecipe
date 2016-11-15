import AbstractModel from '../Default/AbstractModel';
import UserField from './Field';
import _ from 'lodash';

class User extends AbstractModel{
    constructor(){
        super();

        this.db = this.getConnection();
        this.user = this.db.define(UserField.tableName, this._generateEntities());
    }

    _generateEntities() {
        let entities = {};
        let me = this;

        _.forEach(UserField.entity, function(entity){
            if(entity.name != "id"){
                entities[entity.name] = {};
                entities[entity.name]['type'] = me.getDataType(entity.type);
                if(_.hasIn(entity, 'validate')) entities[entity.name]['validate'] = entity.validate;
            }
        });

        return entities;
    }

    getUser(){
        return this.user;
    }

    getMembersList(callback){
        let attributes = [
            UserField.entity.id.name,
            UserField.entity.firstName.name,
            UserField.entity.lastName.name,
            UserField.entity.photoName.name
        ];

        this.user.findAll({attributes: attributes}).then((user)=>{
            callback(user);
        });
    }
}

module.exports = User;