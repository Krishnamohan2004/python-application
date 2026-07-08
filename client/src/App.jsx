import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MediaSection from './pages/MediaSection';
import Admin from './pages/Admin';
import StudentLogin from './pages/StudentLogin';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videos" element={<MediaSection mode="videos" />} />
          <Route path="/documents" element={<MediaSection mode="documents" />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/student-login" element={<StudentLogin />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
