require('dotenv').config();

const express = require('express');
const staticRoute = require('./routes/static');
const urlroute = require('./routes/url');
const { connectDB } = require('./connect');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 8001;

connectDB(process.env.MONGO_URI).then(()=>console.log('DB connected'));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));


app.use((req, res, next)=>{
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});
app.use(express.urlencoded({extended: false}));

app.use('/', staticRoute);
app.use('/', urlroute);

app.listen(PORT, ()=> console.log(`server started at PORT ${PORT}`));