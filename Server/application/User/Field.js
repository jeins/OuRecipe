module.exports = {
    tableName: 'users',

    entity: {
        id: {
            name: 'id', type: 'INTEGER',
            primaryKey: true, autoIncrement: true
        },
        firstName: {
            name: 'firstName', type: 'STRING'
        },
        lastName: {
            name: 'lastName', type: 'STRING'
        },
        email: {
            name: 'email', type: 'STRING',
            validate:{notNull: true}
        },
        password: {
            name: 'password', type: 'STRING',
            validate:{isEmail: true, notNull: true}
        },
        imageUrl: {
            name: 'imageUrl', type: 'STRING'
        },
        country: {
            name: 'country', type: 'STRING'
        },
        city: {
            name: 'city', type: 'STRING'
        },
        aboutMe: {
            name: 'aboutMe', type: 'TEXT'
        },
        socialMedia: {
            name: 'socialMedia', type: 'TEXT'
        },
        createdAt: {
            name: 'createdAt', type: 'DATE'
        },
        updatedAt: {
            name: 'updatedAt', type: 'DATE'
        }
    }
};