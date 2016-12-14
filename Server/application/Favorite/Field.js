module.exports = {
    tableName: 'favorites',

    entity: {
        id: {
            name: 'id', type: 'INTEGER',
            primaryKey: true, autoIncrement: true
        },
        userId: {
            name: 'userId', type: 'INTEGER',
            references: {model: 'users', key: 'id'}, onUpdate: 'cascade', onDelete: 'cascade'
        },
        recipeId: {
            name: 'recipeId', type: 'INTEGER',
            references: {model: 'recipes', key: 'id'}, onUpdate: 'cascade', onDelete: 'cascade'
        },
        createdAt: {
            name: 'createdAt', type: 'DATE'
        },
        updatedAt: {
            name: 'updatedAt', type: 'DATE'
        }
    }
};