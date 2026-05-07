import mongoose from "mongoose";
import Project from './project.js';
import User from './user.js';

const Schema=mongoose.Schema
const taskSchema=new Schema({
    title:{
        type:String,
        required:[true,'must have a title']
    },
    description:{
        type:String,
        required:true
    },
    dueDate:{
        type:Date,
        required:true   
    },
    priority:{
        type:String,
        enum:['low','medium','high'],
        default:'medium',
        required:true
    },
    status:{
        type:String,
        enum:['todo','in progress','done'],
        default:'todo',
        required:true
    },
    project:{
        type:Schema.Types.ObjectId,
        ref:'Project',
        required:true
    },
    member:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
})

const Task=mongoose.model('Task',taskSchema);
export default Task;