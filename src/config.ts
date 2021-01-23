require('dotenv').config();

const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';

const Config = {
    prod: {
        mongo_uri: process.env.MONGO_URI,
    },
    dev: {
        mongo_uri: process.env.MONGO_URI,
    }
}[env]

export default Config