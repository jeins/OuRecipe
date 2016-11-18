module.exports = {
    tableName: 'users',

    entity: {
        id: {
            name: 'id', type: 'INTEGER',
            primaryKey: true, autoIncrement: true
        },
        firstName: {
            name: 'first_name', type: 'STRING'
        },
        lastName: {
            name: 'last_name', type: 'STRING'
        },
        email: {
            name: 'email', type: 'STRING',
            validate:{notNull: true}
        },
        password: {
            name: 'password', type: 'STRING',
            validate:{isEmail: true, notNull: true}
        },
        photoName: {
            name: 'photo_name', type: 'STRING'
        },
        country: {
            name: 'country', type: 'STRING'
        },
        city: {
            name: 'city', type: 'STRING'
        },
        aboutMe: {
            name: 'about_me', type: 'TEXT'
        },
        socialMedia: {
            name: 'social_media', type: 'TEXT'
        },
        createdAt: {
            name: 'created_at', type: 'DATE'
        },
        updatedAt: {
            name: 'updated_at', type: 'DATE'
        }
    }
};