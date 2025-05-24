import React, { useEffect, useState } from 'react';

export default function ProfileSection() {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/profiles/')
            .then((res) => res.json())
            .then((data) => {
                if (data.length > 0) {
                    setProfile(data[0]); // Just use the first profile
                }
            })
            .catch((err) => console.error("Error fetching profile:", err));
    }, []);

    if (!profile) return <div className="text-center mt-10">Loading profile...</div>;

    return (
        <section className="p-6">
            <div className="flex flex-col items-center">
                <img
                    src={profile.profile_picture}
                    alt="Profile"
                    className="w-32 h-32 rounded-full mb-4"
                />
                <h1 className="text-3xl font-bold">{profile.name}</h1>
                <p className="mt-2 text-center max-w-xl">{profile.bio}</p>
                {profile.resume && (
                    <a
                        href={profile.resume}
                        download
                        className="text-blue-600 dark:text-blue-400 mt-4 inline-block"
                    >
                        Download Resume
                    </a>
                )}
            </div>
        </section>
    );
}
