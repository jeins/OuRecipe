module.exports = {
    tableName: 'recipes',

    entity: {
        id: {
            name: 'id', type: 'INTEGER',
            primaryKey: true, autoIncrement: true
        },
        userId: {
            name: 'userId', type: 'INTEGER',
            references: {model: 'users', key: 'id'}, onUpdate: 'cascade', onDelete: 'cascade'
        },
        title: {
            name: 'title', type: 'STRING'
        },
        description:{
            name: 'description', type: 'STRING'
        },
        ingredients:{
            name: 'ingredients', type: 'TEXT'
        },
        steps:{
            name: 'steps', type: 'TEXT'
        },
        preparationTime:{
            name: 'preparationTime', type: 'STRING'
        },
        cookTime:{
            name: 'cookTime', type: 'STRING'
        },
        serving:{
            name: 'serving', type: 'INTEGER'
        },
        cuisine:{
            name: 'cuisine', type: 'STRING'
        },
        category:{
            name: 'category', type: 'STRING'
        },
        difficultyLevel:{
            name: 'difficultyLevel', type: 'INTEGER'
        },
        photoName:{
            name: 'photoName', type: 'STRING'
        },
        videoUrl:{
            name: 'videoUrl', type:'STRING'
        },
        createdAt: {
            name: 'createdAt', type: 'DATE'
        },
        updatedAt: {
            name: 'updatedAt', type: 'DATE'
        }
    }
};