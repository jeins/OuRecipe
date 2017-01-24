import Sequelize from 'sequelize';
import _ from 'lodash';
import dbConf from '../../config/database';

class AbstractModel{
    getConnection(){
        let config = process.env.NODE_ENV || dbConf.development;
        return new Sequelize(
            config.database,
            config.username,
            config.password,
            {
                host: config.host,
                dialect: config.dialect
            }
        );
    }

    generateEntities(fieldEntites){
        let entities = {};

        _.forEach(fieldEntites, function(entity){
            if(entity.name != "id"){
                entities[entity.name] = {};
                entities[entity.name]['type'] = Sequelize[entity.type];
                //if(_.hasIn(entity, 'validate')) entities[entity.name]['validate'] = entity.validate;
            }
        });

        return entities;
    }

    validateBody(body, fields){
        let obj = {};

        _.forEach(fields, (field)=>{
            if(_.isArray(body[field])){
                body[field] = JSON.stringify(body[field]);
            }

            obj[field] = _.hasIn(body, field) ? body[field] : '';
        });

        return obj;
    }
}

module.exports = AbstractModel;