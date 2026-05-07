import Navbar from '../components/Navbar';
import {useAppSelector} from "../app/store"
import {useGetProjectsQuery, useDeleteProjectMutation, useAddProjectMutation, useAddMemberMutation} from '../apis/projectApi';
import {useDeleteTaskMutation} from '../apis/taskApi';
import {useGetUsersQuery} from '../apis/userApi';
import {Link} from 'react-router-dom';
import {useAppDispatch} from '../app/store';
import "./project.css";

const Projects = () =>{
    const {data: projects=[]}= useGetProjectsQuery();
    const {data: users=[]} = useGetUsersQuery();
    const user= useAppSelector((state)=>state.user.user);
    const [deleteProject]= useDeleteProjectMutation();
    const [deleteTask]= useDeleteTaskMutation();
    const [addProject, {isLoading, error}] = useAddProjectMutation();
    const [addMember] = useAddMemberMutation();
    const dispatch = useAppDispatch();
    const handleDelete = async (id)=>{
        try{
            await deleteProject(id);
        }catch(err){
            console.log("deleting failed: ",err);
        }
    }
    const handleDeleteTask = async (id)=>{
        try{
            await deleteTask(id);
        }catch(err){
            console.log("deleting task failed: ",err);
        }
    }
    const handleSubmit1 = async (e) => {
        e.preventDefault();
        const formData =new FormData(e.target);
        const name= formData.get('name');
        const creator= user._id;
        try{
            await addProject({name, creator}).unwrap()
        }catch(err){
            console.error('Adding failed:', err);
        }
    }
    const handleSubmit2 = async (e) => {
        e.preventDefault();
        const formData =new FormData(e.target);
        const member= formData.get('member');
        const projectId= formData.get('projectId');
        try{
            if(!member){
                throw new Error('Please select a member');
            }
            await addMember({member,projectId}).unwrap()
        }catch(err){
            console.error('Adding failed:', err);
        }
    }
    return(
        <>
        <Navbar />
        {user?.role==='admin' ? 
        <>
        <div id="projects-page">
        <form className="form-row" onSubmit ={handleSubmit1}>
            <input type='text' name='name' placeholder='Name' required/>
            <button className="btn-primary" type='submit'>{isLoading ? 'Adding...' : 'Add Project'}</button>
            {error && <p className="form-error">{error.data.message}</p>}
        </form>
        <ul id="projects-list">
        {projects.map((project) => (
            <li key={project._id} className="project-item">
            <div>
                <h3 className="project-name">{project.name}</h3>
                <p className="project-creator">Creator: {project.creator.username}</p>
                <div className="project-actions">
                <Link className="add-task-link" to={`/tasks/${project._id}`}>Add Task</Link>
                <button className="btn-danger" onClick={()=>handleDelete(project._id)}>Delete</button>
                </div>
                <div>
                <form className="form-row" onSubmit ={handleSubmit2}>
                    <select name="member">
                        <option value="">Select Member</option>
                        {users.filter((u) => u.role !== 'admin' && !project.member.includes(u._id)).map((u) => (
                            <option key={u._id} value={u._id}>
                                {u.username}
                            </option>
                        ))}
                    </select>
                    <input type="hidden" name="projectId" value={project._id}/>
                    <button className="btn-primary" type='submit'>Add Member</button>
                </form>
                {project.task.map((task)=>(
                    <div key={task._id} className="task-item">
                        <p className="task-info">{task.title} - {task.member.username}</p>
                        <button className="btn-danger" onClick={() => handleDeleteTask(task._id)}>Delete Task</button>
                    </div>)
                )}
                </div>
            </div>
            </li>
        ))}
        </ul>
        </div>
        </>:<p id="not-admin">you are not an admin</p>}
        </>
    )
}

export default Projects;