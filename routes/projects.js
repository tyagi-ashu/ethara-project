import express from "express";
const router =express.Router()
import Project from "../models/project.js";
import Task from "../models/task.js";
import User from "../models/user.js";
import {isNotLoggedIn, isLoggedIn, isAdmin} from "../middleware.js";


router.get('/show', async(req, res) => {
    const data = await Project.find().populate({path:'task',populate: {path: 'member'}}).populate('creator');
    res.json(data);
});
router.get('/member', isLoggedIn, async(req, res) => {
    const data = await Project.find({member: req.user._id}).populate('task');
    res.json(data);
});
router.get('/:id', async(req, res) => {
    const {id} = req.params;
    const data = await Project.findById(id).populate('member');
    res.json(data);
});
router.post('/:id/addmember',isLoggedIn, isAdmin,async(req,res)=>{
    try{
        const {id}=req.params;
        const {member} = req.body;
        const project = await Project.findById(id).populate('member');
        if(!project){
            return res.status(404).json({message: 'Project not found'});
        }
        if(project.member.role === 'admin'){
            return res.status(400).json({message: 'Admin is already a member of the project!'});
        }
        for(let p of project.member){
            if(p.toString() === member){
                return res.status(400).json({message: 'User already a member of the project!'});
            }
        }
        project.member.push(member);
        await project.save();
        res.status(200).json({message: 'Member added to project!'});
    }catch(err){
        console.error(err);
        res.status(500).json({message: 'Something went wrong.'});
    }
});
router.post('/',isLoggedIn, isAdmin, async(req,res)=>{
    try {
        const {name, creator} = req.body;
        await Project.create({name, creator});
        res.status(201).json({message: 'Project added!'});
    }catch(err){
        console.error(err);
        res.status(500).json({message: 'Something went wrong.'});
    }
})
router.delete('/:id',isLoggedIn, isAdmin, async(req,res)=>{
    try{
        const {id}=req.params;
        //deleting food is happening in the schema by post hook
        await Project.findByIdAndDelete(id);
        res.status(200).json({message: 'Project Deleted!'});
    }catch(err){
        console.log(err)
        res.status(500).json({message: 'Something went wrong.'});
    }
})
export default router;