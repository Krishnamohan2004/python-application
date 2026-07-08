import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MediaSection = ({ mode }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [videosDb, setVideosDb] = useState(null);
  
  const currentBatch = searchParams.get('batch');
  const currentFolder = searchParams.get('folder');

  useEffect(() => {
    const isStudent = localStorage.getItem('studentLoggedIn') === 'true';
    const isAdmin = localStorage.getItem('adminLoggedIn') === 'true';
    if (!isStudent && !isAdmin) {
      navigate('/');
      return;
    }

    // Fetch videos DB when component mounts
    axios.get(`/videos.json?t=${new Date().getTime()}`)
      .then(res => setVideosDb(res.data))
      .catch(err => console.error("Failed to load videos DB", err));
  }, [navigate]);

  const handleBatchSelect = (batch) => {
    setSearchParams({ batch });
  };

  const handleFolderSelect = (folder) => {
    setSearchParams({ batch: currentBatch, folder });
  };

  const handleBack = () => {
    if (currentFolder) {
      setSearchParams({ batch: currentBatch });
    } else if (currentBatch) {
      setSearchParams({});
    } else {
      navigate('/');
    }
  };

  const renderBatches = () => (
    <div className="menu">
      <button className="menu-btn" onClick={() => handleBatchSelect('Batch-150')}>Batch-150</button>
      <button className="menu-btn" onClick={() => handleBatchSelect('Batch-151')}>Batch-151</button>
      <button className="back-btn" onClick={handleBack}>Back to Home</button>
    </div>
  );

  const renderFolders = () => {
    const showDemo = currentBatch !== 'Batch-150' && currentBatch !== 'Batch-151';
    
    return (
      <div className="menu-vertical">
        <h2 className="section-title">{currentBatch} Folders</h2>
        <div className="menu">
          {showDemo && <button className="menu-btn" onClick={() => handleFolderSelect('Demo')}>Demo</button>}
          <button className="menu-btn" onClick={() => handleFolderSelect('AWS')}>AWS</button>
          <button className="menu-btn" onClick={() => handleFolderSelect('DevOps')}>DevOps</button>
        </div>
        <button className="back-btn" onClick={handleBack}>Back to Batches</button>
      </div>
    );
  };

  const renderMedia = () => {
    if (!videosDb) return <p className="loading">Loading media...</p>;

    // Handle Demo special case from Home page ("Main-Demo" or just "Demo")
    let folderId = currentBatch === 'Main' && currentFolder === 'Demo' 
      ? 'Demo' 
      : `${currentBatch}-${currentFolder}`;
      
    // some legacy fallback logic
    if (currentBatch === 'Demo' || currentFolder === 'Demo' && !videosDb[folderId] && videosDb['Demo']) {
      folderId = 'Demo';
    }

    const allMedia = videosDb[folderId] || [];
    
    // Filter based on mode
    const filteredMedia = allMedia.filter(record => {
      const isPdf = record.filename.toLowerCase().endsWith('.pdf') || record.filename.toLowerCase().endsWith('.docx');
      return mode === "documents" ? isPdf : !isPdf;
    });

    return (
      <div className="media-container">
        <div className="media-header">
          <button className="back-btn-small" onClick={handleBack}>⬅ Back</button>
          <h2 className="section-title">
            {mode === 'documents' ? 'Documents' : 'Videos'} for {currentFolder}
          </h2>
        </div>
        
        {filteredMedia.length === 0 ? (
          <p className="no-media">No {mode} currently available.</p>
        ) : (
          <div className="media-grid">
            {filteredMedia.map((record, idx) => {
              const isDoc = record.filename.toLowerCase().endsWith('.pdf') || record.filename.toLowerCase().endsWith('.docx');
              return (
                <div key={idx} className="media-card" onClick={() => {
                  if (isDoc) {
                    window.open(`/${record.filename}`, '_blank');
                  } else {
                    const player = document.getElementById('mediaPlayer');
                    player.src = `/${record.filename}`;
                    player.classList.remove('hidden');
                    player.play();
                  }
                }}>
                  <div className="media-icon">{isDoc ? '📄' : '🎬'}</div>
                  <div className="media-title">{record.title}</div>
                </div>
              );
            })}
          </div>
        )}
        
        <video 
          id="mediaPlayer" 
          controls 
          className="hidden video-player" 
          controlsList="nodownload"
        ></video>
      </div>
    );
  };

  return (
    <div className="section-wrapper">
      {!currentBatch ? renderBatches() : !currentFolder ? renderFolders() : renderMedia()}
    </div>
  );
};

export default MediaSection;
