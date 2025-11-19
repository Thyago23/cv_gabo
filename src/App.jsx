import React, { useState, useEffect } from 'react'; 
import { Mail, Phone, MapPin, Code, Briefcase, GraduationCap, User } from 'lucide-react';
import './App.css';

// ---CARGAR DATOS DESDE LOCALSTORAGE ---
const getInitialData = (key, fallbackData) => {
  try {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : fallbackData;
  } catch (error) {
    console.error(`Error al cargar ${key} de localStorage:`, error);
    return fallbackData; 
  }
};

// --- DATOS INICIALES---

const initialExperience = [
  {
    id: 1,
    category: "Proyectos Personales", 
    title: "Juego de Simulación 'Monopolio' (Gamificación Laboral)",
    description: "Implementación de juego adaptado al entorno laboral basado en cumplimiento de metas de venta y operación.",
    bullets: [
      "Aumentar la motivación y el espíritu lúdico durante las pausas activas",
      "Reforzar el trabajo en equipo y la competencia",
      "Vincular actividades recreativas con objetivos comerciales",
      "Mejorar la cohesión y el clima laboral"
    ]
  },
  {
    id: 2,
    category: "Proyectos Institucionales",
    title: "Sistema Bancario Simulado",
    description: "Aplicación web que emula operaciones centrales de un cajero automático con frontend interactivo y base de datos relacional."
  },
  {
    id: 3,
    category: "Proyectos Institucionales",
    title: "Plataforma Educativa de Matemáticas (Adaptativa)",
    description: "Aplicación web dinámica dirigida a niños para fortalecer conocimiento matemático con dificultad progresiva adaptativa."
  }
];

const initialSkills = [
  { id: 101, category: "Lenguajes de Programación", name: "Python", color: "blue" },
  { id: 102, category: "Lenguajes de Programación", name: "JavaScript", color: "blue" },
  { id: 201, category: "Frontend Development", name: "HTML", color: "indigo" },
  { id: 202, category: "Frontend Development", name: "CSS", color: "indigo" },
  { id: 301, category: "Frameworks & Libraries", name: "Django", color: "purple" },
  { id: 302, category: "Frameworks & Libraries", name: "Node.js", color: "purple" },
  { id: 401, category: "Bases de Datos", name: "SQL", color: "green" },
  { id: 402, category: "Bases de Datos", name: "MySQL", color: "green" },
  { id: 403, category: "Bases de Datos", name: "PostgreSQL", color: "green" },
  { id: 501, category: "Control de Versiones", name: "Git", color: "orange" },
  { id: 502, category: "Control de Versiones", name: "GitHub", color: "orange" },
  { id: 601, category: "Habilidades Blandas e Idiomas", name: "Inglés Intermedio", color: "pink" }, 
  { id: 602, category: "Habilidades Blandas e Idiomas", name: "Ofimática", color: "pink" },
];

const initialEducation = [
  { id: 1, title: 'Unidad Educativa Pedro Pablo Borja N°1', detail: 'Educación Secundaria', email: null },
  { id: 2, title: 'Desarrollo de Software', detail: 'Tercer Semestre', email: 'sgcedenob@puce.edu.ec' },
];

// --- CRUD ---

const ExperienceForm = ({ setExperienceData }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCat, setNewCat] = useState('Proyectos Personales'); 

  const handleAddProject = () => {
    if (newTitle.trim() === '' || newDesc.trim() === '') return;

    const newProject = {
      id: Date.now(), 
      category: newCat,
      title: newTitle,
      description: newDesc,
      bullets: [],
    };

    setExperienceData(prev => [...prev, newProject]); 
    setNewTitle('');
    setNewDesc('');
  };

  return (
    <div className="add-form add-project-form">
      <h3>Añadir Nuevo Proyecto/Experiencia</h3>
      <input 
        type="text" 
        placeholder="Título" 
        value={newTitle} 
        onChange={(e) => setNewTitle(e.target.value)} 
      />
      <textarea 
        placeholder="Descripción" 
        value={newDesc} 
        onChange={(e) => setNewDesc(e.target.value)} 
      />
      <select value={newCat} onChange={(e) => setNewCat(e.target.value)}>
        <option value="Proyectos Personales">Proyectos Personales</option>
        <option value="Proyectos Institucionales">Proyectos Institucionales</option>
        <option value="Experiencia Laboral">Experiencia Laboral Formal</option>
      </select>
      <button onClick={handleAddProject}>Agregar Experiencia</button>
    </div>
  );
};

const SkillsForm = ({ setSkillsData }) => {
  const [newName, setNewName] = useState('');
  const [newCat, setNewCat] = useState('Lenguajes de Programación');
  const [newColor, setNewColor] = useState('blue');
  
  const categories = ["Lenguajes de Programación", "Frontend Development", "Frameworks & Libraries", "Bases de Datos", "Control de Versiones", "Habilidades Blandas e Idiomas"];
  const colors = ["blue", "indigo", "purple", "green", "orange", "pink"]; 

  const handleAddSkill = () => {
    if (newName.trim() === '') return;

    const newSkill = {
      id: Date.now(),
      category: newCat,
      name: newName,
      color: newColor,
    };

    setSkillsData(prev => [...prev, newSkill]);
    setNewName('');
  };

  return (
    <div className="add-form add-skill-form">
      <h3>Añadir Nueva Habilidad</h3>
      <input 
        type="text" 
        placeholder="Nombre de la Habilidad" 
        value={newName} 
        onChange={(e) => setNewName(e.target.value)} 
      />
      <select value={newCat} onChange={(e) => setNewCat(e.target.value)}>
        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
      </select>
      <select value={newColor} onChange={(e) => setNewColor(e.target.value)}>
        {colors.map(col => <option key={col} value={col}>{col}</option>)}
      </select>
      <button onClick={handleAddSkill}>Agregar Habilidad</button>
    </div>
  );
};

const EducationForm = ({ setEducationData }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newDetail, setNewDetail] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const handleAddEducation = () => {
    if (newTitle.trim() === '' || newDetail.trim() === '') return;

    const newEducation = {
      id: Date.now(),
      title: newTitle,
      detail: newDetail,
      email: newEmail.trim() === '' ? null : newEmail,
    };

    setEducationData(prev => [...prev, newEducation]);
    setNewTitle('');
    setNewDetail('');
    setNewEmail('');
  };

  return (
    <div className="add-form add-education-form">
      <h3>Añadir Formación/Curso</h3>
      <input 
        type="text" 
        placeholder="Título (Ej: Universidad, Curso, Certificado)" 
        value={newTitle} 
        onChange={(e) => setNewTitle(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Detalle (Ej: Licenciatura, 3er Semestre, 2023-2024)" 
        value={newDetail} 
        onChange={(e) => setNewDetail(e.target.value)} 
      />
      <input 
        type="email" 
        placeholder="Email de contacto (Opcional)" 
        value={newEmail} 
        onChange={(e) => setNewEmail(e.target.value)} 
      />
      <button onClick={handleAddEducation}>Agregar Formación</button>
    </div>
  );
};


// --- APP PRINCIPAL ---

export default function App() {
  const [activeSection, setActiveSection] = useState('perfil');
  
  // CARGA INICIAL DESDE LOCALSTORAGE 
  const [experience, setExperience] = useState(() => getInitialData('cv_experience', initialExperience));
  const [skills, setSkills] = useState(() => getInitialData('cv_skills', initialSkills)); 
  const [education, setEducation] = useState(() => getInitialData('cv_education', initialEducation));

  // EFECTOS PARA GUARDAR EN LOCALSTORAGE CADA VEZ QUE EL ESTADO CAMBIA
  useEffect(() => {
    localStorage.setItem('cv_experience', JSON.stringify(experience));
  }, [experience]);

  useEffect(() => {
    localStorage.setItem('cv_skills', JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem('cv_education', JSON.stringify(education));
  }, [education]);


  const sections = {
    perfil: { title: 'Perfil', icon: <User size={20} /> },
    experiencia: { title: 'Experiencia', icon: <Briefcase size={20} /> },
    formacion: { title: 'Formación', icon: <GraduationCap size={20} /> },
    habilidades: { title: 'Habilidades', icon: <Code size={20} /> }
  };

  // eliminacion 
  const handleDelete = (idToDelete, setter) => {
      setter(prev => prev.filter(item => item.id !== idToDelete));
  };
  
  // manteniendo tus funciones de eliminación existentes
  const handleDeleteExperience = (idToDelete) => handleDelete(idToDelete, setExperience);
  const handleDeleteSkill = (idToDelete) => handleDelete(idToDelete, setSkills);
  const handleDeleteEducation = (idToDelete) => handleDelete(idToDelete, setEducation);


  return (
    <div className="container">
      <div className="cv-card">
        
        {/* Header */}
        <div className="header">
          <div className="header-content">
            <div className="avatar">CG</div>
            <div className="header-info">
              <h1>Cedeño Baquero Santiago Gabriel</h1>
              <p className="subtitle">Estudiante de Desarrollo De Software</p>
              <div className="contact-info">
                <div className="contact-item"><Phone size={16} /><span>0992779736</span></div>
                <div className="contact-item"><Mail size={16} /><span>noa00santy@gmail.com</span></div>
                <div className="contact-item"><MapPin size={16} /><span>La Biloxi, Hernan Gmoinier</span></div>
              </div>
              <p className="extra-info">19 años | CI: 1752903995</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="navigation">
          {Object.keys(sections).map((key) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className={`nav-button ${activeSection === key ? 'active' : ''}`}
            >
              {sections[key].icon}
              <span>{sections[key].title}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="content">
          
          {/* Perfil */}
          {activeSection === 'perfil' && (
            <div className="section">
              <h2>Perfil Profesional</h2>
              <p>
                Estudiante de Desarrollo de Software con 19 años, apasionado por la tecnología y el desarrollo de soluciones innovadoras. 
                Experiencia en creación de proyectos personales e institucionales, con enfoque en desarrollo web y aplicaciones educativas. 
                Comprometido con el aprendizaje continuo y la mejora de habilidades técnicas.
              </p>
            </div>
          )}

          {/* Experiencia CRUD y Dinámica */}
          {activeSection === 'experiencia' && (
            <div className="section">
              <h2>Experiencia Laboral</h2>
              
              {Object.entries(experience.reduce((acc, item) => {
                acc[item.category] = acc[item.category] || [];
                acc[item.category].push(item);
                return acc;
              }, {})).map(([category, projects], index) => (
                <div key={index} className="experience-block">
                  <h3>{category}</h3>
                  {projects.map(project => (
                    <div key={project.id} className="project-card-wrapper"> 
                      <div className="project-card">
                        <h4>{project.title}</h4>
                        <p>{project.description}</p>
                        {project.bullets && project.bullets.length > 0 && (
                          <ul>
                            {project.bullets.map((bullet, i) => <li key={i}>{bullet}</li>)}
                          </ul>
                        )}
                      </div>
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
              <ExperienceForm setExperienceData={setExperience} />
            </div>
          )}

          {/* Formación */}
          {activeSection === 'formacion' && (
            <div className="section">
              <h2>Formación Académica</h2>
              {education.map(item => (
                <div key={item.id} className="education-card-wrapper">
                  <div className="education-card">
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                    {item.email && <p className="email">{item.email}</p>}
                  </div>
                  <button 
                    className="delete-button delete-button-education" 
                    onClick={() => handleDeleteEducation(item.id)}
                  >
                    &times;
                  </button>
                </div>
              ))}
              <hr className="divider" />
              <EducationForm setEducationData={setEducation} />
            </div>
          )}

          {/* Habilidades */}
          {activeSection === 'habilidades' && (
            <div className="section">
              <h2>Habilidades Técnicas</h2>
              
              <div className="skills-grid">
                {Object.entries(skills.reduce((acc, skill) => {
                  acc[skill.category] = acc[skill.category] || [];
                  acc[skill.category].push(skill);
                  return acc;
                }, {})).map(([category, skillList], index) => (
                  <div key={index} className="skill-category">
                    <h3>{category}</h3>
                    <div className="skill-tags">
                      {skillList.map(skill => (
                        <span key={skill.id} className={`skill-tag ${skill.color}`}>
                          {skill.name}
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
              <SkillsForm setSkillsData={setSkills} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}