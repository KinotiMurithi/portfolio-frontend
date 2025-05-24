import React from 'react';
import ProfileSection from '../components/ProfileSection';
import ProjectsSection from '../components/ProjectsSection';

const Home = () => {
    return (
        <div className="max-w-5xl mx-auto space-y-12 py-8 px-4">
            <ProfileSection />
            <ProjectsSection />
        </div>
    );
};

export default Home;
