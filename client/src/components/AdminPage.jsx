import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Upload, Trash2, ArrowLeft, Loader2 } from 'lucide-react';

const AdminPage = ({ onBack }) => {
  const [token, setToken] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [videos, setVideos] = useState({});
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [status, setStatus] = useState('');

  const fetchVideos = async () => {
    try {
      const res = await axios.get(`/list?adminToken=${token}`);
      if (res.data.success) {
        setVideos(res.data.data);
        setAuthenticated(true);
      }
    } catch (err) {
      alert("Invalid Password or Server Error");
    }
  };

  const handleDelete = async (folder, video) => {
    if (!window.confirm(`Delete ${video.title}?`)) return;
    try {
      const formData = new FormData();
      formData.append('adminToken', token);
      formData.append('folder', folder);
      formData.append('filename', video.filename);
      formData.append('title', video.title);
      
      const res = await axios.post('/delete', formData);
      if (res.data.success) {
        alert(res.data.message);
        fetchVideos();
      }
    } catch (err) {
      alert("Delete failed");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const file = e.target.file.files[0];
    const folder = e.target.folder.value;
    const title = e.target.title.value;

    if (!file || !folder || !title) return;

    setLoading(true);
    setStatus('Uploading...');

    const CHUNK_SIZE = 10 * 1024 * 1024; // 10MB
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

    try {
      for (let i = 0; i < totalChunks; i++) {
        const chunk = file.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
        const formData = new FormData();
        formData.append('adminToken', token);
        formData.append('chunk', chunk);
        formData.append('filename', file.name);
        formData.append('chunkIndex', i);

        await axios.post('/upload_chunk', formData);
        setUploadProgress(Math.round(((i + 1) / totalChunks) * 100));
      }

      const finalizeData = new FormData();
      finalizeData.append('adminToken', token);
      finalizeData.append('filename', file.name);
      finalizeData.append('folder', folder);
      finalizeData.append('title', title);

      await axios.post('/finalize_upload', finalizeData);
      setStatus('Success!');
      fetchVideos();
      e.target.reset();
    } catch (err) {
      setStatus('Upload failed');
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  if (!authenticated) {
    return (
      <div className="animate-fade">
        <button className="back-btn" onClick={onBack} style={{ position: 'absolute', left: 20, top: 20, padding: '10px 20px', borderRadius: '8px' }}>
          <ArrowLeft size={18} /> Back
        </button>
        <div style={{ marginTop: '100px', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
          <h2>Admin Access</h2>
          <input 
            type="password" 
            placeholder="Enter Master Password" 
            value={token}
            onChange={(e) => setToken(e.target.value)}
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #333', background: '#1a1a1a', color: '#fff' }}
          />
          <button className="menu-btn" onClick={fetchVideos}>Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade" style={{ width: '100%', maxWidth: '800px', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <button className="back-btn" onClick={onBack} style={{ padding: '10px 20px', borderRadius: '8px' }}>
          <ArrowLeft size={18} /> Back
        </button>
        <h2>Admin Dashboard</h2>
      </div>

      <form onSubmit={handleUpload} style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '40px' }}>
        <h3>Upload New Content</h3>
        <input name="title" placeholder="Content Title" required style={{ padding: '12px', borderRadius: '8px', background: '#000', border: '1px solid #333', color: '#fff' }} />
        <select name="folder" required style={{ padding: '12px', borderRadius: '8px', background: '#000', border: '1px solid #333', color: '#fff' }}>
          <option value="Demo">Demo</option>
          <option value="Batch-150/AWS">Batch-150 / AWS</option>
          <option value="Batch-150/DevOps">Batch-150 / DevOps</option>
          <option value="Batch-151/AWS">Batch-151 / AWS</option>
          <option value="Batch-151/DevOps">Batch-151 / DevOps</option>
        </select>
        <input type="file" name="file" required style={{ color: '#888' }} />
        <button type="submit" className="menu-btn" disabled={loading} style={{ width: '100%' }}>
          {loading ? <Loader2 className="animate-spin" /> : <Upload size={18} />} Upload
        </button>
        {loading && (
          <div style={{ width: '100%', height: '10px', background: '#333', borderRadius: '5px', overflow: 'hidden' }}>
            <div style={{ width: `${uploadProgress}%`, height: '100%', background: 'var(--primary)', transition: 'width 0.3s' }} />
          </div>
        )}
        {status && <p style={{ color: status.includes('failed') ? 'red' : 'green' }}>{status}</p>}
      </form>

      <div style={{ textAlign: 'left' }}>
        <h3>Existing Content</h3>
        {Object.entries(videos).map(([folder, list]) => (
          <div key={folder} style={{ marginBottom: '20px' }}>
            <h4 style={{ color: 'var(--primary)', borderBottom: '1px solid #333', paddingBottom: '5px' }}>{folder}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
              {list.map((video, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '8px' }}>
                  <span>{video.title}</span>
                  <button onClick={() => handleDelete(folder, video)} style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer' }}>
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
