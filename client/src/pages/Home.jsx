import { Link } from 'react-router-dom';
import Marquee from '../components/Marquee';

const Home = () => {
  const isStudent = localStorage.getItem('studentLoggedIn') === 'true';
  const isAdmin = localStorage.getItem('adminLoggedIn') === 'true';
  const studentEmail = localStorage.getItem('studentEmail') || '';
  const isLoggedIn = isStudent || isAdmin;

  const handleLogout = () => {
    localStorage.removeItem('studentLoggedIn');
    localStorage.removeItem('studentEmail');
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminToken');
    window.location.reload();
  };

  return (
    <div className="overlay">
      <img src="/logo.png" alt="VCUBE Logo" className="center-logo" />
      
      {isStudent && (
        <h1 style={{ background: 'linear-gradient(135deg, #00b4d8 0%, #fff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Welcome back, {studentEmail.split('@')[0].toUpperCase()}
        </h1>
      )}
      {isAdmin && (
        <h1 style={{ background: 'linear-gradient(135deg, var(--accent-orange) 0%, #fff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Welcome Back, ADMIN
        </h1>
      )}
      {!isLoggedIn && (
        <h1>WELCOME TO VCUBE AWS DEVSECOPS LMS PORTAL</h1>
      )}
      
      <div className="menu">
        {isLoggedIn ? (
          <>
            <Link to="/videos" className="menu-btn student-btn" style={{ boxShadow: '0 0 15px rgba(0, 180, 216, 0.2)' }}>
              🎬 Videos
            </Link>
            <Link to="/documents" className="menu-btn student-btn" style={{ boxShadow: '0 0 15px rgba(0, 180, 216, 0.2)' }}>
              📄 Documents
            </Link>
            <Link to="/videos?batch=Main&folder=Demo" className="menu-btn">
              ⚡ Demo
            </Link>
            <button onClick={handleLogout} className="menu-btn danger" style={{ minWidth: '160px' }}>
              🚪 Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/student-login" className="menu-btn student-btn" style={{ boxShadow: '0 0 15px rgba(0, 180, 216, 0.2)' }}>
              🎓 Student Login
            </Link>
            <Link to="/admin" className="menu-btn admin-btn">
              🛡️ AWS-Team
            </Link>
          </>
        )}
      </div>

      <Marquee />
    </div>
  );
};

export default Home;
