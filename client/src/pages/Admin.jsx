import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [db, setDb] = useState({});
  const [uploadStatus, setUploadStatus] = useState('');
  
  // Upload state
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [folder, setFolder] = useState('Demo');

  // Student Management State
  const [students, setStudents] = useState({});
  const [newStudentEmail, setNewStudentEmail] = useState('');
  const [newStudentPassword, setNewStudentPassword] = useState('');
  const [studentStatus, setStudentStatus] = useState('');

  const refreshStudents = (token = password) => {
    axios.get(`/list_students?adminToken=${token}`)
      .then(res => {
        if (res.data.success) {
          setStudents(res.data.data);
        }
      })
      .catch(err => console.error("Failed to load students", err));
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (!newStudentEmail || !newStudentPassword) {
      alert("Please fill in both email and password.");
      return;
    }
    setStudentStatus('Adding student...');
    try {
      const formData = new FormData();
      formData.append('adminToken', password);
      formData.append('email', newStudentEmail.trim());
      formData.append('password', newStudentPassword.trim());
      const res = await axios.post('/add_student', formData);
      if (res.data.success) {
        setStudentStatus('Student added successfully!');
        setNewStudentEmail('');
        setNewStudentPassword('');
        refreshStudents();
      }
    } catch (err) {
      setStudentStatus(`Error: ${err.response?.data?.error || 'Failed to add student'}`);
    }
  };

  const handleDeleteStudent = async (email) => {
    if (!window.confirm(`Are you sure you want to remove access for student: ${email}?`)) return;
    try {
      const formData = new FormData();
      formData.append('adminToken', password);
      formData.append('email', email);
      const res = await axios.post('/delete_student', formData);
      if (res.data.success) {
        alert(res.data.message);
        refreshStudents();
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete student');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios.get(`/list?adminToken=${password}`)
      .then(res => {
        if (res.data.success) {
          setIsAuthenticated(true);
          setDb(res.data.data);
          setLoginError('');
          localStorage.setItem('adminLoggedIn', 'true');
          localStorage.setItem('adminToken', password);
          refreshStudents(password);
        }
      })
      .catch(err => {
        setLoginError('Invalid password or server error');
        console.error(err);
      });
  };

  const refreshList = () => {
    axios.get(`/list?adminToken=${password}`)
      .then(res => setDb(res.data.data))
      .catch(err => console.error(err));
  };

  

  

  

  const handleDelete = async (folderName, filename, videoTitle) => {
    if (!window.confirm(`Delete '${videoTitle}' from '${folderName}'?`)) return;
    try {
      const formData = new FormData();
      formData.append('adminToken', password);
      formData.append('folder', folderName);
      formData.append('filename', filename);
      formData.append('title', videoTitle);
      const res = await axios.post('/delete', formData);
      if (res.data.success) {
        alert(res.data.message);
        refreshList();
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete');
    }
  };

  const CHUNK_SIZE = 5 * 1024 * 1024;

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title || !folder) {
      alert("Please fill all fields.");
      return;
    }
    setUploadStatus('Starting upload...');
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
      const start = chunkIndex * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, file.size);
      const chunk = file.slice(start, end);
      const formData = new FormData();
      formData.append('adminToken', password);
      formData.append('chunk', chunk);
      formData.append('filename', file.name);
      formData.append('chunkIndex', chunkIndex);
      formData.append('totalChunks', totalChunks);
      try {
        await axios.post('/upload_chunk', formData);
        const progress = Math.round(((chunkIndex + 1) / totalChunks) * 100);
        setUploadStatus(`Uploading: ${progress}%`);
      } catch (err) {
        setUploadStatus(`Error: ${err.response?.data?.error || 'Upload failed'}`);
        return;
      }
    }
    setUploadStatus('Finalizing...');
    const finalizeData = new FormData();
    finalizeData.append('adminToken', password);
    finalizeData.append('filename', file.name);
    finalizeData.append('folder', folder);
    finalizeData.append('title', title);
    try {
      const res = await axios.post('/finalize_upload', finalizeData);
      if (res.data.success) {
        setUploadStatus('Upload Complete!');
        setFile(null);
        setTitle('');
        refreshList();
      }
    } catch (err) {
      setUploadStatus('Finalize failed.');
    }
  };

  return (
    <div className="admin-page-container">
      {!isAuthenticated ? (
        <div className="admin-login-container">
          <form onSubmit={handleLogin} className="admin-form glass-panel">
            <h2>Admin Access</h2>
            <input 
              type="password" 
              placeholder="Enter Master Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {loginError && <p className="error">{loginError}</p>}
            <button type="submit" className="menu-btn admin-btn">Login</button>
            <Link to="/" className="back-btn" style={{marginTop: '1rem'}}>Back to Home</Link>
          </form>
        </div>
      ) : (
        <div className="admin-dashboard">
          <div className="admin-header glass-panel">
            <h2>Content Management</h2>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <button 
                className="delete-btn" 
                style={{ borderColor: 'var(--accent-orange)', color: 'var(--accent-orange)', background: 'transparent', padding: '0.5rem 1rem' }}
                onClick={() => {
                  localStorage.removeItem('adminLoggedIn');
                  localStorage.removeItem('adminToken');
                  setIsAuthenticated(false);
                  setPassword('');
                  window.location.reload();
                }}
              >
                🚪 Logout Admin
              </button>
              <Link to="/" className="back-btn" style={{ margin: 0, padding: '0.5rem 1.5rem', fontSize: '1rem', minWidth: 'auto' }}>Home</Link>
            </div>
          </div>
          <div className="admin-grid">
            <div className="upload-section glass-panel">
              <h3>Upload New Media</h3>
              <form onSubmit={handleUpload}>
                <div className="form-group">
                  <label>Select Folder:</label>
                  <select value={folder} onChange={(e) => setFolder(e.target.value)}>
                    <option value="Demo">Demo</option>
                    <option value="Batch-150-AWS">Batch-150-AWS</option>
                    <option value="Batch-150-DevOps">Batch-150-DevOps</option>
                    <option value="Batch-151-AWS">Batch-151-AWS</option>
                    <option value="Batch-151-DevOps">Batch-151-DevOps</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Media Title:</label>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Intro Class" />
                </div>
                <div className="form-group">
                  <label>File:</label>
                  <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                </div>
                <button type="submit" className="menu-btn" disabled={!file || uploadStatus.includes('Uploading')}>Upload</button>
                {uploadStatus && <p className="status-text">{uploadStatus}</p>}
              </form>
            </div>

            <div className="upload-section glass-panel" style={{ borderTop: '4px solid #00b4d8' }}>
              <h3>Manage Student Logins</h3>
              <form onSubmit={handleAddStudent} style={{ marginTop: '1.5rem' }}>
                <div className="form-group">
                  <label>Student Email:</label>
                  <input 
                    type="email" 
                    value={newStudentEmail} 
                    onChange={(e) => setNewStudentEmail(e.target.value)} 
                    placeholder="Enter student email" 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Student Password:</label>
                  <input 
                    type="text" 
                    value={newStudentPassword} 
                    onChange={(e) => setNewStudentPassword(e.target.value)} 
                    placeholder="Enter password" 
                    required 
                  />
                </div>
                <button type="submit" className="menu-btn student-btn" style={{ width: '100%' }}>Add Student</button>
                {studentStatus && <p className="status-text" style={{ color: '#00b4d8' }}>{studentStatus}</p>}
              </form>

              <h4 style={{ marginTop: '2.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem', color: '#00b4d8' }}>Registered Students</h4>
              <ul className="media-list-admin" style={{ marginTop: '1rem', maxHeight: '250px', overflowY: 'auto' }}>
                {Object.keys(students).length === 0 ? <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>No student logins registered.</p> : (
                  Object.keys(students).map(email => (
                    <li key={email} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.3)', padding: '0.8rem', borderRadius: '8px', marginBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', minWidth: '0', textAlign: 'left' }}>
                        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-light)', wordBreak: 'break-all' }}>🎓 {email}</span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>🔑 {students[email]}</span>
                      </div>
                      <button className="delete-btn" style={{ padding: '0.2rem 0.6rem', fontSize: '0.85rem' }} onClick={() => handleDeleteStudent(email)}>Remove</button>
                    </li>
                  ))
                )}
              </ul>
            </div>
            
            <div className="list-section glass-panel">
              <h3>Current Media</h3>
              {Object.keys(db).length === 0 ? <p>No data available.</p> : (
                <div className="accordion-container">
                  {Object.keys(db).map(folderName => (
                    <div key={folderName} className="folder-group">
                      <h4>{folderName}</h4>
                      <ul className="media-list-admin">
                        {db[folderName].map((item, idx) => (
                          <li key={idx}>
                            <div className="item-info">
                              <span className="icon">{item.filename.endsWith('.pdf') ? '📄' : '🎬'}</span>
                              <span className="title">{item.title}</span>
                            </div>
                            <button className="delete-btn" onClick={() => handleDelete(folderName, item.filename, item.title)}>Delete</button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
