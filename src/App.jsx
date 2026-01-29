import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'; 
import axios from 'axios';

import './styles/App.css'; 
import './styles/Utils.css'; 
import { useData } from './hooks/useData';
import CVHeader from './components/CVHeader';
import CVNavigation from './components/CVNavigation';
import SectionContent from './components/SectionContent';

import BlogHome from './pages/BlogHome'; 
import PostDetail from './pages/PostDetail'; 
import BlogManagement from './pages/BlogManagement'; 
import ThemeToggle from './components/ThemeToggle';
import Login from './components/auth/Login';

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
};

const CVPage = () => {
    const [activeSection, setActiveSection] = useState('perfil');
    const {
        experience, setExperience, handleDeleteExperience,
        skills, setSkills, handleDeleteSkill,
        education, setEducation, handleDeleteEducation
    } = useData();

    const dataProps = {
        experience, setExperience, handleDeleteExperience,
        skills, setSkills, handleDeleteSkill,
        education, setEducation, handleDeleteEducation
    };

    return (
        <div className="cv-card">
            <div style={{ padding: '1rem', textAlign: 'right', background: '#f9fafb', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '15px' }}>
                <Link to="/posts" className="nav-link-blog" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '600' }}>
                    Ir al Blog Técnico
                </Link>
                <ThemeToggle />
            </div>

            <CVHeader /> 
            <CVNavigation 
                activeSection={activeSection}
                setActiveSection={setActiveSection}
            />

            <div className="content">
                <SectionContent 
                    activeSection={activeSection}
                    data={dataProps} 
                />
            </div>
        </div>
    );
}

const MainRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<div className="container"><CVPage /></div>} />
            <Route path="/login" element={<Login />} />
            <Route path="/posts" element={<div className="container blog-container-wrapper"><BlogHome /></div>} />
            <Route path="/posts/manage" element={
                <PrivateRoute>
                    <div className="container blog-container-wrapper">
                        <BlogManagement />
                    </div>
                </PrivateRoute>
            } />
            <Route path="/posts/:id" element={<div className="container blog-container-wrapper"><PostDetail /></div>} />
            <Route path="*" element={<div className="container"><h1>404 | Página no encontrada</h1></div>} />
        </Routes>
    </BrowserRouter>
);

export default MainRouter;