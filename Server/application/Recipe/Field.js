module.exports = {
    tableName: 'recipes',

    entity: {
        id: {
            name: 'id', type: 'INTEGER',
            primaryKey: true, autoIncrement: true
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
            name: 'preparation_time', type: 'STRING'
        },
        cookTime:{
            name: 'cook_time', type: 'STRING'
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
            name: 'difficulty_level', type: 'INTEGER'
        },
        photoName:{
            name: 'photo_name', type: 'STRING'
        },
        videoUrl:{
            name: 'video_url', type:'STRING'
        },
        createdAt: {
            name: 'created_at', type: 'DATE'
        },
        updatedAt: {
            name: 'updated_at', type: 'DATE'
        }
    }
};