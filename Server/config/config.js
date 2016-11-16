
module.exports = {
    sha256: {secret: 'thisShouldBeChange!!!!!'},
    token: {secret: 'thisShouldBeChangeAlso!!!!!'},
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