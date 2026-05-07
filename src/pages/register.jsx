import {useRegisterMutation} from '../apis/userApi';
import {useNavigate,useLocation, Link} from 'react-router-dom';
import {useAppSelector} from '../app/store';
import "./register.css";
function Register() {
  const [register, { isLoading, error }] = useRegisterMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const returnTo = location.state?.from || '/home';
  const { isAuthenticated } = useAppSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');
    try {
      await register({ username, email, password }).unwrap();
      navigate(returnTo);
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <div id="register-page">
      {isAuthenticated ? (
        <h1 id="already-logged-in">Already Logged In!</h1>
      ) : (
        <form id="register-form" onSubmit={handleSubmit}>
          <input id="register-username" type="text" name="username" placeholder="Username" required />
          <input id="register-email" type="email" name="email" placeholder="Email" required />
          <input id="register-password" type="password" name="password" placeholder="Password" required />
          <button id="register-submit" type="submit" disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register'}
          </button>
          <div id="links-container">
              <Link id="login-link" to="/users/login">Log in</Link>
              <Link id="home-link" to="/home">Home</Link>
          </div>
          {error && <p id="register-error">{error.data}</p>}
        </form>
      )}
    </div>
  );
}
export default Register;