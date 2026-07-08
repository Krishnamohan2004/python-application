import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const StudentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem('studentLoggedIn') === 'true') {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const formData = new FormData();
    formData.append('email', email.trim());
    formData.append('password', password);

    axios.post('/student_login', formData)
      .then(res => {
        if (res.data.success) {
          localStorage.setItem('studentLoggedIn', 'true');
          localStorage.setItem('studentEmail', email.trim());
          navigate('/');
        }
      })
      .catch(err => {
        setError(err.response?.data?.error || 'Invalid email or password. Please try again.');
        console.error("Student login failed:", err);
      });
  };

  return (
    <div className="admin-login-container">
      <form onSubmit={handleSubmit} className="admin-form glass-panel" style={{ borderTop: '4px solid #00b4d8' }}>
        <div className="login-icon" style={{ fontSize: '3rem', color: '#00b4d8', marginBottom: '0.5rem' }}>🎓</div>
        <h2>Student Access</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          Please sign in with your credentials to access the LMS resources.
        </p>

        <div className="form-group" style={{ textAlign: 'left' }}>
          <label htmlFor="email" style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ marginTop: '0.5rem' }}
          />
        </div>

        <div className="form-group" style={{ textAlign: 'left' }}>
          <label htmlFor="password" style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ marginTop: '0.5rem' }}
          />
        </div>

        {error && <p className="error" style={{ margin: '0.5rem 0' }}>⚠️ {error}</p>}

        <button 
          type="submit" 
          className="menu-btn student-btn" 
          style={{ width: '100%', marginTop: '1rem', padding: '0.8rem' }}
        >
          Sign In
        </button>

        <Link to="/" className="back-btn" style={{ marginTop: '1.5rem', width: '100%', padding: '0.8rem', fontSize: '1rem' }}>
          Back to Home
        </Link>
      </form>
    </div>
  );
};

export default StudentLogin;
