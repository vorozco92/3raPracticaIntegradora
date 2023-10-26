import express from "express"
import session from "express-session"
import MongoStore from "connect-mongo"
import __dirname from "./utils/utils.js"

//import viewRouter from "./routes/views.router.js"
import handlebars from "express-handlebars" 
import {initializatedPassport ,initPassportGit} from "./config/passport.config.js"; 
import CONFIG from './config/config.js'
import passport  from "passport";
import mongoose from "mongoose"
import { Server } from 'socket.io'
import cookieParser from 'cookie-parser'
import addLogger from './middleware/logger.middleware.js'

//import coursesRouter from "../src/routes/courses.router.js"
import cartsRouter from "../src/routes/carts.router.js"
import productsRouter from "../src/routes/products.router.js"
//import messagesRouter from "../src/routes/messages.router.js"
import realTimeRouter from "../src/routes/realtime.route.js"
import viewRouter from "../src/routes/views.router.js"
import sessionRouter from "../src/routes/sessions.router.js"
import errorMiddle from './middleware/error/index.js'
import userRouter from "../src/routes/users.router.js"

const app = express();

console.log(`Persistencia: ${CONFIG.PERSISTENCE}`)
if (CONFIG.PERSISTENCE === 'MONGO'){

    mongoose.set('strictQuery',true)
    const connection  = mongoose.connect( CONFIG.MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology: true
    })

    app.use(session({
        store: MongoStore.create({
            mongoUrl: CONFIG.MONGO_URI,
            mongoOptions:{ useNewUrlParser:true, useUnifiedTopology:true},
            ttl:3600
        }),
        secret: CONFIG.SECRET_SESSION,
        resave: false,
        saveUninitialized: false
    }))
}

const server = app.listen(CONFIG.PORT, ()=>{console.log("Server arriba")})
const io = new Server(server)

app.io = io;

app.use(cookieParser());
app.use(errorMiddle)

initializatedPassport()
initPassportGit()
app.use(passport.initialize())
app.use(passport.session())

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/../views')
app.set('view engine', 'handlebars')

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(__dirname + '/../public'))
app.use(addLogger)
app.use('/api/products', productsRouter)
app.use('/api/carts',cartsRouter);
app.use('/realtimeproducts',realTimeRouter);
//app.use('/',messagesRouter);
app.use('/api/sessions', sessionRouter)
app.use('/api/users', userRouter)
app.use('/',viewRouter);


/*io.on('connection', socket => {
    console.log("Nuevo cliente conectado")

    io.emit('messagesLogs',messages);
    socket.on('message', data => {
        messages.push(data);
        io.emit('messagesLogs',messages);
        console.log(data)
    })

    socket.on('newUser', data => {
        socket.broadcast.emit('newUserFront',data);
        console.log(data)
    })
    
})*/