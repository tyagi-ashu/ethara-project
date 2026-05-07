import mongoose from 'mongoose';
import Task from './models/task.js';
import Project from './models/project.js';
import User from './models/user.js';

async function main(){
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/ethara');
        console.log('mongo connection opened')
        await seedDb();
        await mongoose.connection.close();
    }
    catch(err){
        console.log(err);
    }
}
main();

const seedDb=async()=>{
    await Project.deleteMany();
    await Task.deleteMany();
    const user1 = await User.findOne({username:'user1'});
    const user2 =await User.findOne({username:'user2'});
    const user3 =await User.findOne({username:'user3'});
    const seedProjects=[
        {
        name:'Project 1',
        creator:user1,
        member:[user2, user3],
        tasks:[]
        },
        {
        name:'Project 2',
        creator:user1,
        member:[user2],
        tasks:[]
        },
        {
        name:'Project 3',
        creator:user1,
        member:[user2, user3],
        tasks:[]
        },
        {
        name:'Project 4',
        creator:user1,
        member:[user3],
        tasks:[]
        },
        {
        name:'Project 5',
        creator:user1,
        member:[user2, user3],
        tasks:[]
        }
    ];
    const project=await Project.insertMany(seedProjects);
    const seedTasks=[
        {
            title:'Task 1',
            description:'This is task 1',
            dueDate:new Date('2024-07-01'),
            priority:'high',
            status:'todo',
            project:await Project.findOne({name:'Project 1'}),
            member:user2
        },
        {
            title:'Task 2',
            description:'This is task 2',
            dueDate:new Date('2024-07-01'),
            priority:'medium',
            status:'todo',
            project:await Project.findOne({name:'Project 1'}),
            member:user3
        },
        {
            title:'Task 3',
            description:'This is task 3',
            dueDate:new Date('2024-07-03'),
            priority:'low',
            status:'todo',
            project:await Project.findOne({name:'Project 1'}),
            member:user2
        },
        {
            title:'Task 4',
            description:'This is task 4',
            dueDate:new Date('2024-07-03'),
            priority:'low',
            status:'todo',
            project:await Project.findOne({name:'Project 1'}),
            member:user3
        },
        {
            title:'Task 1',
            description:'This is task 4',
            dueDate:new Date('2024-07-04'),
            priority:'medium',
            status:'todo',
            project:await Project.findOne({name:'Project 2'}),
            member:user2
        },
        {
            title:'Task 1',
            description:'This is task 5',
            dueDate:new Date('2024-07-05'),
            priority:'high',
            status:'todo',
            project:await Project.findOne({name:'Project 3'}),
            member:user2
        },
        {
            title:'Task 2',
            description:'This is task 6',
            dueDate:new Date('2024-07-06'),
            priority:'low',
            status:'todo',
            project:await Project.findOne({name:'Project 3'}),
            member:user3
        },
        {
            title:'Task 3',
            description:'This is task 7',
            dueDate:new Date('2024-07-07'),
            priority:'medium',
            status:'todo',
            project:await Project.findOne({name:'Project 3'}),
            member:user2
        },
        {
            title:'Task 1',
            description:'This is task 8',
            dueDate:new Date('2024-07-08'),
            priority:'high',
            status:'todo',
            project:await Project.findOne({name:'Project 4'}),
            member:user3
        },
        {
            title:'Task 2',
            description:'This is task 9',
            dueDate:new Date('2024-07-09'),
            priority:'medium',
            status:'todo',
            project:await Project.findOne({name:'Project 4'}),
            member:user3
        },
        {
            title:'Task 1',
            description:'This is task 10',
            dueDate:new Date('2024-07-10'),
            priority:'low',
            status:'todo',
            project:await Project.findOne({name:'Project 5'}),
            member:user2
        },
        {
            title:'Task 2',
            description:'This is task 11',
            dueDate:new Date('2024-07-10'),
            priority:'low',
            status:'todo',
            project:await Project.findOne({name:'Project 5'}),
            member:user3
        }
    ];
    await Task.insertMany(seedTasks);
    for(let p of project){
        const tasks=await Task.find({project:p._id});
        await Project.findByIdAndUpdate(p._id,{task:tasks});
    }
    console.log('seeding done');
}