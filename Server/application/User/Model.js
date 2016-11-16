import AbstractModel from '../Default/AbstractModel';
import UserField from './Field';

class User extends AbstractModel{
    constructor(){
        super();

        this.db = this.getConnection();
        this.user = this.db.define(UserField.tableName, this.generateEntities(UserField.entity));
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