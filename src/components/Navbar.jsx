import {useAppSelector,useAppDispatch} from '../app/store';
import {useLogoutMutation} from '../apis/userApi';
import {Link} from 'react-router-dom';
import {useLocation, useNavigate} from 'react-router-dom';
import {userApi} from '../apis/userApi';
import './Navbar.css'

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);
    const { isAuthenticated } = useAppSelector((state) => state.user);
    const [logout] = useLogoutMutation();

    const handleClick = async (e) => {
        try {
            await logout().unwrap();
            dispatch(userApi.util.resetApiState());
            navigate("/home");
        } catch (err) {
            console.log('Logout Failed: ', err);
        }
    }

    return (
        <nav id="navbar">
            <p id="navbar-username">{user.user && user.user.username || 'No one'}</p>

            <div id="navbar-actions">
                {isAuthenticated ? (
                    <button id="logout-btn" onClick={handleClick}>Logout</button>
                ) : (
                    <>
                        <Link id="login-link" to="/users/login" state={{ from: location.pathname }}>Login</Link>
                        <Link id="register-link" to="/users/register" state={{ from: location.pathname }}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;