
module.exports = {
    secret: 'thisShouldBeChange!!!',
    url: 'http://localhost:8888',
    server: {
        development: {
            host: 'localhost',
            port: 8888,
            client: '/../WebApp/dist'
        },
        production: {
            host: '',
            port: '',
            client: ''
        }
    },
    no_image: {
        recipe: '/assets/recipe_profile_no_photo.jpg',
        user: '/assets/no_photo_profile.png'
    }
};