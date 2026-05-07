import {useLoginMutation} from '../apis/userApi';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useAppSelector, useAppDispatch} from '../app/store';
import "./login.css";
function Login() {
  const [login, {isLoading, error}] = useLoginMutation();
  const location = useLocation();
  const returnTo = location.state?.from || '/home';
  const navigate = useNavigate();
  const {isAuthenticated} = useAppSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');
    try {
      await login({username, password}).unwrap();
      navigate(returnTo);
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div id="login-page">
      {isAuthenticated ? (
        <h1 id="already-logged-in">Already Logged In!</h1>
      ) : (
        <form id="login-form" onSubmit={handleSubmit}>
          <input id="login-username" type="text" name="username" placeholder="Username" required />
          <input id="login-password" type="password" name="password" placeholder="Password" required />
          <button id="login-submit" type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          <div id="link-container">
            <Link id="register-link" to="/users/register">Register</Link>
            <Link id="home-link" to="/home">Home</Link>
          </div>
          {error && <p id="login-error">{error.data}</p>}
        </form>
      )}
    </div>
  );
}
export default Login;