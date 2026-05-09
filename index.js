import 'dotenv/config' 

import express from "express";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import User from "./models/user.js";
import passport from "passport";
import session from "express-session";
import userRoutes from "./routes/users.js";
import taskRoutes from "./routes/tasks.js";
import projectRoutes from "./routes/projects.js";
import MongoStore from 'connect-mongo';

const app = express();
const dbUrl= process.env.DB_URL || 'mongodb://127.0.0.1:27017/ethara'
main();
async function main() {
    try{
        await mongoose.connect(dbUrl);
        console.log('mongo connection open')
    }
    catch(err){
        console.log(err);
    }
}
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
app.use(
    cors({origin: CLIENT_URL,
        credentials: true
    })
);
app.set('trust proxy', 1);
const secret = process.env.SECRET || 'thisisasecret'
app.use(session({
    name: 'ethara.sid',
    store: MongoStore.create({mongoUrl: dbUrl, dbName: 'ethara'}),
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none'
    }
}));

app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())
passport.use(User.createStrategy())

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use('/users',userRoutes);
app.use('/tasks',taskRoutes);
app.use('/projects',projectRoutes);

app.listen(process.env.PORT || 5000, () => console.log("Server on port 5000"));
