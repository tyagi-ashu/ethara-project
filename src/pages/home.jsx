import {Link} from 'react-router-dom';
import './home.css'
const Home = () => {
  return (
    <div id="home-container">
      <h1 id="home-title">Welcome ethara project</h1>
      <div id="home-links">
        <Link id="admin-link" to={'/projects/show'}>For Admin</Link>
        <Link id="dashboard-link" to={'/dashboard'}>Dashboard</Link>
      </div>
    </div>
  );
};

export default Home;