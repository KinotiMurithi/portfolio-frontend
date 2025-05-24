import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import DarkModeToggle from './components/DarkModeToggle';
import Contact from './pages/Contact';
import ProfileSection from './pages/ProfileSection';
import ProjectsSection from './pages/ProjectsSection';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                <DarkModeToggle />
                <Navbar />

                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <ProfileSection />
                                <ProjectsSection />
                            </>
                        }
                    />
                    <Route path="/projects" element={<ProjectsSection />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
