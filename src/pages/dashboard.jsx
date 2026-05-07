import Navbar from '../components/Navbar';
import {useAppSelector} from "../app/store"
import {useGetProjectByMemberQuery} from '../apis/projectApi';
import {useUpdateTaskStatusMutation} from '../apis/taskApi';
import {Link} from 'react-router-dom';
import "./dashboard.css";
import {useState} from 'react';
const Dashboards = () =>{
    const {data: projects=[]}= useGetProjectByMemberQuery();
    const user= useAppSelector((state)=>state.user.user);
    const isAuthenticated = useAppSelector((state)=>state.user.isAuthenticated);
    const [updateTaskStatus, {isLoading, error}] = useUpdateTaskStatusMutation();
    const [filter, setFilter] = useState('all'); // 'all' | 'todo' | 'in progress' | 'done' | 'overdue'
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const status = formData.get('status');
        const taskId = formData.get('taskId');
        try{
            await updateTaskStatus({taskId, status}).unwrap();
        } catch (err) {
            console.error('Failed to update task status:', err);
        }
    };
    const isOverdue = (task) =>
        task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'done';
    const applyFilter = (task) => {
        if (filter === 'overdue') return isOverdue(task);
        if (filter === 'all') return true;
        return task.status === filter;
    };
    const statusClass = (status) => {
        if (status === 'done') return 'status-done';
        if (status === 'in progress') return 'status-progress';
        return 'status-todo';
    };
    return(
        <>
        <Navbar />
        {isAuthenticated ? <>
        <div id="dashboard-page">
        <div className='dashboard-header'>
            <h4>Total Tasks - {projects.reduce((acc, project) => acc + project.task.length, 0)}</h4>
        </div>
        <div id="filter-bar">
            {['all', 'todo', 'in progress', 'done'].map((f) => (
                <button
                    key={f}
                    className={`filter-btn ${filter === f ? 'active' : ''}`}
                    onClick={() => setFilter(f)}
                >{f.charAt(0).toUpperCase() + f.slice(1)}</button>
            ))}
            <button
                className={`filter-btn overdue-btn ${filter === 'overdue' ? 'active' : ''}`}
                onClick={() => setFilter('overdue')}
            >Overdue</button>
        </div>
        <ul id="projects-list">
        {projects.map((project) => (
            <li key={project._id} className="project-item">
            <div>
                <h3 className="project-name">{project.name}</h3>
                <p className="project-creator">{project.creator.username}</p>
                <div>
                {project.task
                .filter(
                    (task) =>
                    !task.member || task.member === user._id
                )
                .filter(applyFilter)
                .map((task) => (
                    <div key={task._id} className={`task-item ${isOverdue(task) ? 'overdue' : ''}`}>
                        <p className="task-info">
                            {task.title}
                            <span className={`status-badge ${statusClass(task.status)}`}>{task.status}</span>
                        </p>
                        {isOverdue(task) && <p className="task-overdue-label"></p>}
                        <form className="task-form" onSubmit={handleSubmit}>
                            <select name="status" defaultValue={task.status} required>
                                <option value="todo">To Do</option>
                                <option value="in progress">In Progress</option>
                                <option value="done">Done</option>
                            </select>
                            <input type="hidden" name="taskId" value={task._id} />
                            <button className="btn-primary" type='submit'>{isLoading ? 'Updating...' : 'Update status'}</button>
                            {error && <p className="form-error">{error.data.message}</p>}
                        </form>
                    </div>
                    
                )
                )}
                </div>
            </div>
            </li>
        ))}
        </ul>
        </div></>: <p id="not-logged-in">Please log in to see projects.</p>}
        </>
    )
}

export default Dashboards;