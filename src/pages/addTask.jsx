import {useAddTaskMutation} from "../apis/taskApi";
import {useGetProjectByIdQuery} from "../apis/projectApi";
import Navbar from '../components/Navbar';
import {useAppSelector} from "../app/store"
import {Link} from 'react-router-dom';
import {useParams} from "react-router-dom";
import "./addTask.css";

const AddTask = () => {
    const [addTask, {isLoading, error}] = useAddTaskMutation();
    const {isAuthenticated} = useAppSelector((state) => state.user);
    const userRole = useAppSelector((state) => state.user?.user?.role);
    const {id} = useParams();
    const {data: project} = useGetProjectByIdQuery(id);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const title = formData.get('title');
        const description = formData.get('description');
        const dueDate = formData.get('dueDate');
        const priority = formData.get('priority');
        const member = formData.get('member');
        const project = id;
        try {
            await addTask({title, description, dueDate, priority, project, member}).unwrap();
            e.target.reset();
        } catch (err) {
            console.error('Adding failed:', err);
        }
    }

    return (
        <>
            <Navbar />
            <div id="addtask-page">
                {isAuthenticated && userRole === 'admin' ? (
                    <form id="addtask-form" onSubmit={handleSubmit}>
                        <input id="addtask-title" type='text' name='title' placeholder='Title' required />
                        <input id="addtask-description" type='text' name='description' placeholder='Description' required />
                        <input id="addtask-duedate" type='date' name='dueDate' required />
                        <select id="addtask-priority" name="priority" required>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                        <select id="addtask-member" name="member" required>
                            {project?.member?.map((m) => (
                                <option key={m._id} value={m._id}>
                                    {m.username}
                                </option>
                            ))}
                        </select>
                        <button id="addtask-submit" type='submit' disabled={isLoading}>
                            {isLoading ? 'Adding...' : 'Add'}
                        </button>
                        {error && <p id="addtask-error">{error.data?.message}</p>}
                    </form>
                ):(<h1 id="addtask-unauthorized">Who are you</h1>
                )}
                <Link id="addtask-projects-link" to='/projects/show'> Show Projects</Link>
            </div>
        </>
    );
}
export default AddTask;