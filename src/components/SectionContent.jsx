import React from 'react';
import '../styles/Sections.css';
import '../styles/FormStyles.css';
import ExperienceForm from './crud/ExperienceForm';
import SkillsForm from './crud/SkillsForm';
import EducationForm from './crud/EducationForm';

// --- SECCIONES ESTÁTICAS Y DINÁMICAS ---

// Esta sección muestra un perfil profesional fijo, sin datos dinámicos.
const ProfileSection = () => (
    <div className="section">
        <h2>Perfil Profesional</h2>
        <p>
            Estudiante de Desarrollo de Software con 19 años, apasionado por la tecnología y el desarrollo de soluciones innovadoras. 
            Experiencia en creación de proyectos personales e institucionales, con enfoque en desarrollo web y aplicaciones educativas. 
            Comprometido con el aprendizaje continuo y la mejora de habilidades técnicas.
        </p>
    </div>
);

// Esta sección muestra la experiencia laboral.
// Agrupa los proyectos por categoría y permite eliminarlos.
const ExperienceList = ({ experience, handleDeleteExperience, setExperience }) => (
    <div className="section">
        <h2>Experiencia Laboral</h2>
        
        {/* Se agrupan los proyectos por categoría */}
        {Object.entries(experience.reduce((acc, item) => {
            acc[item.category] = acc[item.category] || [];
            acc[item.category].push(item);
            return acc;
        }, {})).map(([category, projects]) => ( 
            <div key={category} className="experience-block"> 
                <h3>{category}</h3>
                {projects.map(project => (
                    <div key={project.id} className="project-card-wrapper"> 
                        <div className="project-card">
                            <h4>{project.title}</h4>
                            <p>{project.description}</p>
                            {/* Si el proyecto tiene puntos adicionales, se muestran en una lista */}
                            {project.bullets && project.bullets.length > 0 && (
                                <ul>
                                    {project.bullets.map((bullet, i) => <li key={i}>{bullet}</li>)}
                                </ul>
                            )}
                        </div>
                        {/* Botón para eliminar el proyecto */}
                        <button 
                            className="delete-button" 
                            onClick={() => handleDeleteExperience(project.id)}
                        >
                            &times;
                        </button>
                    </div>
                ))}
            </div>
        ))}
        
        <hr className="divider" />
        {/* Formulario para añadir nueva experiencia */}
        <ExperienceForm setExperienceData={setExperience} />
    </div>
);

// Esta sección muestra la formación académica.
// Cada elemento tiene título, detalle y correo opcional.
const EducationList = ({ education, handleDeleteEducation, setEducation }) => (
    <div className="section">
        <h2>Formación Académica</h2>
        {education.map(item => (
            <div key={item.id} className="education-card-wrapper">
                <div className="education-card">
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                    {item.email && <p className="email">{item.email}</p>}
                </div>
                {/* Botón para eliminar la formación */}
                <button 
                    className="delete-button delete-button-education" 
                    onClick={() => handleDeleteEducation(item.id)}
                >
                    &times;
                </button>
            </div>
        ))}
        <hr className="divider" />
        {/* Formulario para añadir nueva formación */}
        <EducationForm setEducationData={setEducation} />
    </div>
);

// Esta sección muestra las habilidades técnicas.
// Se agrupan por categoría y cada habilidad tiene un color asociado.
const SkillsList = ({ skills, handleDeleteSkill, setSkills }) => {
    
    // Si aún no hay datos o no es un array válido, se muestra solo el formulario.
    if (!skills || !Array.isArray(skills)) {
        return (
            <div className="section">
                <h2>Habilidades Técnicas</h2>
                <hr className="divider" />
                <SkillsForm setSkillsData={setSkills} />
            </div>
        );
    }

    return (
        <div className="section">
            <h2>Habilidades Técnicas</h2>
            
            <div className="skills-grid">
                {skills.map((group) => (
                    <div key={group.category} className="skill-category"> 
                        <h3>{group.category}</h3>
                        <div className="skill-tags">
                            {group.skills.map(skill => (
                                <span 
                                    key={skill.id} 
                                    className={`skill-tag ${skill.color}`}
                                >
                                    {skill.name}
                                    {/* Botón para eliminar la habilidad */}
                                    <button 
                                        className="delete-skill-button" 
                                        onClick={() => handleDeleteSkill(skill.id)}
                                    >
                                        &times;
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            
            <hr className="divider" />
            {/* Formulario para añadir nueva habilidad */}
            <SkillsForm setSkillsData={setSkills} />
        </div>
    );
};


// --- COMPONENTE PRINCIPAL ---

// Este componente decide qué sección mostrar según la opción activa.
export default function SectionContent({ activeSection, data }) {
    // Se usan las funciones de eliminación que vienen en "data".
    const handleDeleteExperience = data.deleteExperience; 
    const handleDeleteEducation = data.deleteExperience; 
    // Nota: Para habilidades aún no hay lógica CRUD completa.

    switch (activeSection) {
        case 'perfil':
            return <ProfileSection />;
        case 'experiencia':
            return (
                <ExperienceList 
                    experience={data.experience} 
                    handleDeleteExperience={handleDeleteExperience} 
                    setExperience={data.setExperience} 
                />
            );
        case 'formacion':
            return (
                <EducationList 
                    education={data.education} 
                    handleDeleteEducation={handleDeleteEducation} 
                    setEducation={data.setEducation} 
                />
            );
        case 'habilidades':
            return (
                <SkillsList 
                    skills={data.skills} 
                    handleDeleteSkill={() => console.log('Delete Skill not implemented yet')} 
                    setSkills={() => console.log('Add Skill not implemented yet')} 
                />
            );
        default:
            return <ProfileSection />;
    }
}
