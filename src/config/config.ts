export default {
    jwtSecret: process.env.JWT_SECRET || 'somesecrettoken',
    DB: {
        URI: process.env.MONGO_URL || 'mongodb://db:27017/appqdb'
    }
}