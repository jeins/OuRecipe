
module.exports = {
    secret: 'thisShouldBeChange!!!',
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
    }
};