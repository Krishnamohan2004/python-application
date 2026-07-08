import { useState } from 'react';
import { Phone, PhoneCall } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showContact, setShowContact] = useState(false);

  const isStudent = localStorage.getItem('studentLoggedIn') === 'true';
  const isAdmin = localStorage.getItem('adminLoggedIn') === 'true';
  const studentEmail = localStorage.getItem('studentEmail') || '';

  return (
    <header className="navbar">
      {/* Top-Left Logos */}
      <div className="top-left-logos">
        <div className="logo-circle vamsi-logo">
          <img src="/vamsi.png" alt="Vamsi" />
        </div>
        <div className="logo-circle ak-logo">
          <img src="/ak.png" alt="AK" />
        </div>
        <a href="https://madhukarreddyvenna.com/" target="_blank" rel="noreferrer" className="logo-circle madhu-logo">
          <img src="/madhu.png" alt="Madhu" />
        </a>
      </div>

      <div className="navbar-right" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        {/* Contact Info */}
        <div className="contact-container">
          <button 
            className="call-us-btn"
            onClick={() => setShowContact(!showContact)}
          >
            <Phone size={16} /> Call Us
          </button>
          
          {showContact && (
            <div className="contact-card">
              <div className="contact-item">
                <PhoneCall size={14} />
                <a href="tel:9014790362">9014790362</a>
                <a href="https://wa.me/919014790362" target="_blank" rel="noreferrer" className="whatsapp-icon">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M12.031 0C5.385 0 .002 5.385.002 12.03c0 2.124.553 4.195 1.603 6.02L.05 24l6.103-1.601a11.96 11.96 0 005.877 1.528h.005c6.645 0 12.028-5.384 12.028-12.028C24.062 5.385 18.678 0 12.031 0zM12.03 21.968a9.924 9.924 0 01-5.06-1.378l-.364-.216-3.757.985.998-3.666-.237-.377a9.925 9.925 0 01-1.52-5.348C2.091 5.485 7.42 1.905 12.03 1.905c4.61 0 9.938 3.58 9.938 9.937 0 6.357-5.328 10.126-9.938 10.126zm5.45-7.447c-.298-.15-1.767-.872-2.04-.972-.273-.1-.472-.15-.67.15-.2.299-.77 1.05-.944 1.25-.175.2-.35.224-.648.074-2.083-1.04-3.415-2.61-4.02-3.666-.086-.15-.01-.23.064-.305.068-.067.15-.174.225-.262.074-.087.1-.15.15-.248.05-.1.025-.187-.012-.262-.037-.075-.67-1.614-.92-2.21-.242-.58-.487-.5-.67-.51-.175-.01-.375-.01-.575-.01-.2 0-.523.075-.797.375C3.218 8.164 2.446 8.887 2.446 10.36c0 1.472 1.07 2.894 1.22 3.094.15.2 2.106 3.22 5.105 4.512.713.308 1.267.491 1.698.628.714.227 1.365.195 1.88.118.577-.086 1.767-.723 2.015-1.424.25-.7.25-1.3.175-1.424-.074-.125-.274-.2-.573-.35z"/>
                  </svg>
                </a>
              </div>
              <div className="contact-item">
                <PhoneCall size={14} />
                <a href="tel:8143291237">8143291237</a>
                <a href="https://wa.me/918143291237" target="_blank" rel="noreferrer" className="whatsapp-icon">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M12.031 0C5.385 0 .002 5.385.002 12.03c0 2.124.553 4.195 1.603 6.02L.05 24l6.103-1.601a11.96 11.96 0 005.877 1.528h.005c6.645 0 12.028-5.384 12.028-12.028C24.062 5.385 18.678 0 12.031 0zM12.03 21.968a9.924 9.924 0 01-5.06-1.378l-.364-.216-3.757.985.998-3.666-.237-.377a9.925 9.925 0 01-1.52-5.348C2.091 5.485 7.42 1.905 12.03 1.905c4.61 0 9.938 3.58 9.938 9.937 0 6.357-5.328 10.126-9.938 10.126zm5.45-7.447c-.298-.15-1.767-.872-2.04-.972-.273-.1-.472-.15-.67.15-.2.299-.77 1.05-.944 1.25-.175.2-.35.224-.648.074-2.083-1.04-3.415-2.61-4.02-3.666-.086-.15-.01-.23.064-.305.068-.067.15-.174.225-.262.074-.087.1-.15.15-.248.05-.1.025-.187-.012-.262-.037-.075-.67-1.614-.92-2.21-.242-.58-.487-.5-.67-.51-.175-.01-.375-.01-.575-.01-.2 0-.523.075-.797.375C3.218 8.164 2.446 8.887 2.446 10.36c0 1.472 1.07 2.894 1.22 3.094.15.2 2.106 3.22 5.105 4.512.713.308 1.267.491 1.698.628.714.227 1.365.195 1.88.118.577-.086 1.767-.723 2.015-1.424.25-.7.25-1.3.175-1.424-.074-.125-.274-.2-.573-.35z"/>
                  </svg>
                </a>
              </div>
            </div>
          )}
        </div>
        {isStudent && <span className="user-badge student">🎓 {studentEmail.split('@')[0]}</span>}
        {isAdmin && <span className="user-badge admin">🛡️ Admin</span>}
        <Link to="/" className="home-btn-navbar">Home</Link>
      </div>
    </header>
  );
};

export default Navbar;
