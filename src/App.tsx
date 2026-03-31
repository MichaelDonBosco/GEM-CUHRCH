import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { LeadershipPage } from './pages/LeadershipPage';
import { MissionsPage } from './pages/MissionsPage';
import { DonatePage } from './pages/DonatePage';
import { AdminDashboard } from './pages/AdminDashboard';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans">
        <Navbar />
        <Routes>
          <Route path="/admin" element={
            <main className="flex-grow">
              <AdminDashboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            </main>
          } />
          <Route path="*" element={
            <>
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/leadership" element={<LeadershipPage />} />
                  <Route path="/missions" element={<MissionsPage />} />
                  <Route path="/donate" element={<DonatePage />} />
                </Routes>
              </main>
            </>
          } />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
