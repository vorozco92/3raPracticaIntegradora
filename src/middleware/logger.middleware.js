import config from "../config/config.js"
import winston from "winston";

const levelOptions={
    levels:{
        debug:1,
        http:2,
        info:3,
        warning:4,
        error:5,
        fatal:6,        
    }
}

const loggingConfig ={
    development:[
        new winston.transports.Console({ level: 'debug'}),
        new winston.transports.File({ filename: './errors.log', level: 'debug'})
    ],
    production:[
        new winston.transports.Console({ level: 'info'}),
        new winston.transports.File({ filename: './errors.log', level: 'info'})
    ]
}

console.log(config.app.ENV)
const logger = winston.createLogger({
    levels: levelOptions.levels,
    transports: loggingConfig[config.app.ENV]
})

const addLogger = (req,res,next)=>{
    req.logger =logger
    next();
}

export default addLogger;