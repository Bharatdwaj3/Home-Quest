require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser =require("cookie-parser");
const passport=require('passport');
const session=require('express-session');
const MongoStore=require('connect-mongo');
const errorMiddleware=require('./middleware/dbMiddleware');

const ownerRoutes =require("./routes/ownerRoutes");
const tenantRoutes =require("./routes/tenantRoutes");
const pgRoutes =require("./routes/pgRoutes");
const userRoutes=require("./routes/userRoutes");
const locationRoutes =require("./routes/locationRoutes");

const { PORT, SESSION_SECRECT, MONGO_URI } = require('./config/env.config');
const connectDB=require('./config/db.config');
const morganConfig = require('./config/morgan.config');

const app=express();

connectDB();
app.use(morganConfig);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin:'http://localhost:5173' ,
    credentials:true,
}));
app.use(cookieParser());
app.use(session({
    secret:SESSION_SECRECT,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
        mongoUrl: MONGO_URI,

    }),
    cookie: {maxAge :1000*60*60*24}
}));
app.use(passport.initialize());

app.get('/',(req,res)=>{ res.send('Server is ready'); });
app.use('/api/owner',ownerRoutes);
app.use('/api/tenant',tenantRoutes);
app.use('/api/pg',pgRoutes);
app.use('/api/auth/user',userRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => console.log('Server Started at port : ',PORT));
