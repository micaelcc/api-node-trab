require('dotenv').config()

export default {
    expiresIn: '7d',
    secret: process.env.secret
};