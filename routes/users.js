import express from "express";
const router =express.Router()
import User from "../models/user.js";
import passport from "passport";
import {isNotLoggedIn, isLoggedIn, isAdmin} from "../middleware.js";
//messages are not being used anywhere in react

//FLOW===>

// /me is called -> app.jsx useGetMeQuery() is called -> setUser() is called in userApi then data stored in 'store' -> navbar calls the data from 'store' to view
// /me always works only on refresh or reload,etc
router.get('/me', async(req, res) => {
    if(req.isAuthenticated()){
        res.json({user:req.user});
    }else{
        res.status(401).json({user:null, message:'Not authenticated'});
    }
});
router.get('/show', isLoggedIn, isAdmin,async(req, res) => {
    try{
        const users = await User.find({});
        res.json(users);
    }catch(err){
        res.status(500).json({message:'Error fetching users'});
    }
});
router.post('/login',passport.authenticate('local'), (req,res)=>{
    //without sending this user data, we need to refresh once to get the user data for navbar
    res.json({user:req.user});
})

router.post('/logout', (req, res) => {
    req.logout(function (err) {
        if (err) {
            return res.status(500).json({message:'Logout failed'});
        }
        res.json({message: 'Logged out successfully'});
    });
});
router.post('/register',isNotLoggedIn, async (req, res, next) => {
    const {username, email, password} = req.body;
    try {
        const user = new User({username, email});
        await User.register(user, password);
        req.logIn(user, (err) => {
            if (err) return next(err);
            res.json({user:req.user});
        });
    } catch (err) {
        res.status(400).json({error: err.message});
    }
});

export default router;