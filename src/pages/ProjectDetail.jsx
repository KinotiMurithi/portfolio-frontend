import React, { useEffect, useState } from 'react';

export default function ProjectsSection() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const backendUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

        fetch(`${backendUrl}/api/projects/`)
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch projects');
                return res.json();
            })
            .then((data) => {
                setProjects(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching projects:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center mt-10">Loading projects...</div>;

    if (projects.length === 0)
        return <div className="text-center mt-10">No projects found.</div>;

    return (
        <section className="p-6">
            <h2 className="text-2xl font-bold mb-6">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                    <div key={project.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
                        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                        <p className="mb-4">{project.description}</p>
                        {project.github_link && (
                            <a
                                href={project.github_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-blue-400 underline mr-4"
                            >
                                GitHub
                            </a>
                        )}
                        {project.live_demo && (
                            <a
                                href={project.live_demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-600 dark:text-green-400 underline"
                            >
                                Live Demo
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
