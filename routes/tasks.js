import express from "express";
const router =express.Router()
import Task from "../models/task.js";
import Project from "../models/project.js";
import {isNotLoggedIn, isLoggedIn, isAdmin} from "../middleware.js";


router.post('/',isLoggedIn, isAdmin, async(req,res)=>{
    try {
        const {title, description, dueDate, priority, project, member} = req.body;
        const p = await Project.findById(project);
        if(!p){
            return res.status(404).json({message: 'Project not found'});
        }
        const task = new Task({title, description, dueDate, priority, project, member});
        await task.save();
        p.task.push(task._id);
        await p.save();
        res.status(201).json({message: 'Task added!'});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});
router.patch('/:id/status',isLoggedIn, async(req,res)=>{
    try {
        const {status} = req.body;
        const task = await Task.findByIdAndUpdate(req.params.id, {status}, {new: true});
        if(!task){
            return res.status(404).json({message: 'Task not found'});
        }
        res.status(200).json({message: 'Task status updated!'});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});
router.delete('/:id',isLoggedIn, isAdmin, async(req,res)=>{
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task){
            return res.status(404).json({message: 'Task not found'});
        }
        res.status(200).json({message: 'Task deleted!'});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});
export default router;