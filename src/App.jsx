import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'; 

// --- Importaciones de estilos y lógica del CV ---
import './styles/App.css'; 
import './styles/Utils.css'; 
import { useData } from './hooks/useData';
import CVHeader from './components/CVHeader';
import CVNavigation from './components/CVNavigation';
import SectionContent from './components/SectionContent';

// --- Importaciones de las nuevas páginas del Blog ---
import BlogHome from './pages/BlogHome'; 
import PostDetail from './pages/PostDetail'; 
import BlogManagement from './pages/BlogManagement'; 

// Nuevo componente utilitario para el CV
import ThemeToggle from './components/ThemeToggle'; // Botón para cambiar tema


// =========================================================================
// 1. COMPONENTE DE PÁGINA: HOJA DE VIDA (CVPage)
//    Contiene toda la lógica y renderizado del CV dinámico.
// =========================================================================
const CVPage = () => {
    // Se define el estado para controlar qué sección del CV está activa.
    const [activeSection, setActiveSection] = useState('perfil');
    
    // Se obtienen los datos y funciones CRUD desde el hook personalizado.
    const {
        experience, setExperience, handleDeleteExperience,
        skills, setSkills, handleDeleteSkill,
        education, setEducation, handleDeleteEducation
    } = useData();

    // Se agrupan todas las propiedades en un objeto para pasarlas a SectionContent.
    const dataProps = {
        experience, setExperience, handleDeleteExperience,
        skills, setSkills, handleDeleteSkill,
        education, setEducation, handleDeleteEducation
    };

    return (
        <div className="cv-card">
            
            {/* Barra superior con enlace al blog y botón de cambio de tema */}
            <div style={{ padding: '1rem', textAlign: 'right', background: '#f9fafb', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '15px' }}>
                <Link to="/posts" className="nav-link-blog" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '600' }}>
                    Ir al Blog Técnico
                </Link>
                <ThemeToggle />
            </div>

            {/* Encabezado del CV */}
            <CVHeader /> 
            
            {/* Navegación entre secciones */}
            <CVNavigation 
                activeSection={activeSection}
                setActiveSection={setActiveSection}
            />

            {/* Contenido dinámico según la sección activa */}
            <div className="content">
                <SectionContent 
                    activeSection={activeSection}
                    data={dataProps} 
                />
            </div>
        </div>
    );
}


// =========================================================================
// 2. COMPONENTE DE RUTAS PRINCIPAL (MainRouter)
//    Decide qué componente se renderiza según la URL.
// =========================================================================
const MainRouter = () => (
    <BrowserRouter>
        <Routes>
            
            {/* Ruta raíz (/) → muestra el CV */}
            <Route path="/" element={<div className="container"><CVPage /></div>} />
            
            {/* Ruta /posts → listado de posts del blog */}
            <Route path="/posts" element={<div className="container blog-container-wrapper"><BlogHome /></div>} />
            
            {/* Ruta /posts/manage → gestión de posts (crear, editar, eliminar) */}
            <Route path="/posts/manage" element={<div className="container blog-container-wrapper"><BlogManagement /></div>} />
            
            {/* Ruta /posts/:id → detalle de un post específico */}
            <Route path="/posts/:id" element={<div className="container blog-container-wrapper"><PostDetail /></div>} />

            {/* Ruta comodín → página 404 */}
            <Route path="*" element={<div className="container"><h1>404 | Página no encontrada</h1></div>} />
        </Routes>
    </BrowserRouter>
);

export default MainRouter;
