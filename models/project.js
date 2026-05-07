import mongoose from "mongoose";
import Task from './task.js';
import User from './user.js';

const Schema=mongoose.Schema
const projectSchema=new Schema({
    name:{
        type:String,
        required:[true,'must have a name']
    },
    creator:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    member:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }],
    task:[{
        type:Schema.Types.ObjectId,
        ref:'Task'
    }]
})

projectSchema.post('findOneAndDelete', async(deletedProject)=>{
    console.log('hook fired:', deletedProject);
    if(deletedProject){
        const Task = mongoose.model('Task');
        await Task.deleteMany({projectId: deletedProject._id});
    }
});

const Project=mongoose.model('Project',projectSchema);
export default Project;