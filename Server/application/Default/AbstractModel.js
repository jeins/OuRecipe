import Sequelize from 'sequelize';
import dbConf from '../../config/database';

class AbstractModel{
    getConnection(){
        var config = process.env.NODE_ENV || dbConf.development;
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

    getDataType(reqType){
        return Sequelize[reqType.toUpperCase()];
    }
}

module.exports = AbstractModel;