import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8000/api/',
});

export const getProfile = () => API.get('profiles/');
export const getResume = () => API.get('resumes/');
export const getProjects = () => API.get('projects/');
