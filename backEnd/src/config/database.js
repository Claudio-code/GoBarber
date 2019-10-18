module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'DOCKER',
    database: 'goBarber',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    }
};