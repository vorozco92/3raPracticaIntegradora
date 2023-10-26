import dotenv from "dotenv"

dotenv.config();

const CONFIG ={
    app:{
        ENV: process.env.MODE_ENV || 'production'
    },
    mailing:{
        SERVICE: process.env.MAILING_SERVICE || '',
        USER: process.env.MAILING_USER || '',
        PASSWORD: process.env.MAILING_PASSWORD || ''
    },
	MONGO_URI: process.env.MONGO_URI || '',
	PORT : process.env.PORT || 8080,
    SECRET_SESSION : process.env.SECRET_SESSION || 's3cr3tKey',
    CLIENT_ID: process.env.CLIENT_ID || '',
    CLIENT_SECRET: process.env.CLIENT_SECRET || '',
    CALLBACK_URL: process.env.CALLBACK_URL || '',
    EMAIL_ADMIN: process.env.EMAIL_ADMIN || '',
    PASSWORD_ADMIN: process.env.PASSWORD_ADMIN || '',
    PERSISTENCE: process.env.PERSISTENCE || 'MONGO'
}

export default  CONFIG;
