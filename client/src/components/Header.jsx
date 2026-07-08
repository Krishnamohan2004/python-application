import React, { useState } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [showContact, setShowContact] = useState(false);

  return (
    <>
      <div className="top-left-logos">
        <div className="logo-circle">
          <img src="/vamsi.png" alt="Vamsi" style={{ objectPosition: '50% 15%', transform: 'scale(1.4)' }} />
        </div>
        <div className="logo-circle">
          <img src="/ak.png" alt="AK" style={{ objectPosition: '50% 10%' }} />
        </div>
        <a href="https://madhukarreddyvenna.com/" target="_blank" rel="noopener noreferrer" className="logo-circle">
          <img src="/madhu.png" alt="Madhu" style={{ objectPosition: '50% 5%' }} />
        </a>
      </div>

      <div className="contact-container">
        <button 
          className="call-us-btn"
          onClick={() => setShowContact(!showContact)}
        >
          <Phone size={20} /> Call Us
        </button>

        <AnimatePresence>
          {showContact && (
            <motion.div 
              className="contact-card"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="contact-item">
                <Phone size={18} />
                <a href="tel:9014790362">9014790362</a>
                <a href="https://wa.me/919014790362" target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={18} color="#25D366" />
                </a>
              </div>
              <div className="contact-item">
                <Phone size={18} />
                <a href="tel:8143291237">8143291237</a>
                <a href="https://wa.me/918143291237" target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={18} color="#25D366" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Header;
