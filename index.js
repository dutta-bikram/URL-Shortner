const express = require('express');
const path = require('path');
require('dotenv').config();
const cookieParser = require('cookie-parser');

//routes
const staticRoute = require('./routes/static');
const urlroute = require('./routes/url');
const userRoute = require('./routes/user');
const redirectRoute = require('./routes/redirect');

//middlewares
const {restrictToLoggedinUserOnly, checkAuth} = require('./middlewares/auth');

//databases
const { connectDB } = require('./connect');
connectDB(process.env.MONGO_URI).then(()=>console.log('DB connected'));

const app = express();
const PORT = process.env.PORT || 8001;

//frontend
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));


app.use((req, res, next)=>{
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());


app.use('/user', userRoute);
app.use('/', checkAuth, staticRoute);
app.use('/', restrictToLoggedinUserOnly, urlroute);  //protected
app.use('/', redirectRoute);


const server = app.listen(PORT);

server.on("listening", () => {
    console.log(`Server started at PORT ${PORT}`);
    console.log(`PID: ${process.pid}`);
});

server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
        console.error(`Port ${PORT} is already in use.`);
        process.exit(1);
    }

    console.error(err);
    process.exit(1);
});