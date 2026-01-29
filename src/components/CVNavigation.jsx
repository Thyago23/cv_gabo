import React from 'react';
import '../styles/CVNavigation.css';
import { Code, Briefcase, GraduationCap, User } from 'lucide-react';

// Se definen las secciones del currículum en un objeto.
// Cada sección tiene un título y un ícono asociado.
const sections = {
    perfil: { title: 'Perfil', icon: <User size={20} /> },
    experiencia: { title: 'Experiencia', icon: <Briefcase size={20} /> },
    formacion: { title: 'Formación', icon: <GraduationCap size={20} /> },
    habilidades: { title: 'Habilidades', icon: <Code size={20} /> }
};

// Este componente muestra la barra de navegación del currículum.
// Recibe dos propiedades:
// - activeSection: indica cuál sección está activa en ese momento.
// - setActiveSection: función que permite cambiar la sección activa.
export default function CVNavigation({ activeSection, setActiveSection }) {
    return (
        <div className="navigation">
            {/* Se recorre cada clave del objeto sections para generar un botón */}
            {Object.keys(sections).map((key) => (
                <button
                    key={key}
                    // Al hacer clic en un botón, se actualiza la sección activa
                    onClick={() => setActiveSection(key)}
                    // Se aplica la clase "active" si el botón corresponde a la sección activa
                    className={`nav-button ${activeSection === key ? 'active' : ''}`}
                >
                    {/* Se muestra el ícono y el título de la sección */}
                    {sections[key].icon}
                    <span>{sections[key].title}</span>
                </button>
            ))}
        </div>
    );
}
