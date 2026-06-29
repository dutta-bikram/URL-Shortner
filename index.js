require('dotenv').config();

const express = require('express');
const urlroute = require('./routes/url');
const { connectDB } = require('./connect');


const app = express();
const PORT = process.env.PORT || 8001;

connectDB(process.env.MONGO_URI).then(()=>console.log('DB connected'));

app.use((req, res, next)=>{
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});
app.use(express.urlencoded({extended: false}));
app.use('/', urlroute);

app.listen(PORT, ()=> console.log(`server started at PORT ${PORT}`));