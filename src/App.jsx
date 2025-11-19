import React, { useState } from 'react';
import { Mail, Phone, MapPin, Code, Briefcase, GraduationCap, User } from 'lucide-react';
import './App.css';

export default function App() {
  const [activeSection, setActiveSection] = useState('perfil');

  const sections = {
    perfil: { title: 'Perfil', icon: <User size={20} /> },
    experiencia: { title: 'Experiencia', icon: <Briefcase size={20} /> },
    formacion: { title: 'Formación', icon: <GraduationCap size={20} /> },
    habilidades: { title: 'Habilidades', icon: <Code size={20} /> }
  };

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
                <div className="contact-item">
                  <Phone size={16} />
                  <span>0992779736</span>
                </div>
                <div className="contact-item">
                  <Mail size={16} />
                  <span>noa00santy@gmail.com</span>
                </div>
                <div className="contact-item">
                  <MapPin size={16} />
                  <span>La Biloxi, Hernan Gmoinier</span>
                </div>
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

          {activeSection === 'experiencia' && (
            <div className="section">
              <h2>Experiencia Laboral</h2>
              
              <div className="experience-block">
                <h3>Creación De proyectos personales</h3>
                <div className="project-card">
                  <h4>Juego de Simulación "Monopolio"</h4>
                  <p>
                    Implementación de juego adaptado al entorno laboral basado en cumplimiento de metas de venta y operación.
                  </p>
                </div>
                <ul>
                  <li>Aumentar la motivación y el espíritu lúdico durante las pausas activas</li>
                  <li>Reforzar el trabajo en equipo y la competencia</li>
                  <li>Vincular actividades recreativas con objetivos comerciales</li>
                  <li>Mejorar la cohesión y el clima laboral</li>
                </ul>
              </div>

              <div className="experience-block">
                <h3>Creación de proyectos institucionales</h3>
                <div className="project-card">
                  <h4>Sistema Bancario Simulado</h4>
                  <p>
                    Aplicación web que emula operaciones centrales de un cajero automático con frontend interactivo y base de datos relacional.
                  </p>
                </div>
                <div className="project-card">
                  <h4>Plataforma Educativa de Matemáticas (Adaptativa)</h4>
                  <p>
                    Aplicación web dinámica dirigida a niños para fortalecer conocimiento matemático con dificultad progresiva adaptativa.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'formacion' && (
            <div className="section">
              <h2>Formación Académica</h2>
              <div className="education-card">
                <h3>Unidad Educativa Pedro Pablo Borja N°1</h3>
                <p>Educación Secundaria</p>
              </div>
              <div className="education-card">
                <h3>Desarrollo de Software</h3>
                <p>Tercer Semestre</p>
                <p className="email">sgcedenob@puce.edu.ec</p>
              </div>
            </div>
          )}

          {activeSection === 'habilidades' && (
            <div className="section">
              <h2>Habilidades Técnicas</h2>
              <div className="skills-grid">
                <div className="skill-category">
                  <h3>Lenguajes de Programación</h3>
                  <div className="skill-tags">
                    <span className="skill-tag blue">Python</span>
                    <span className="skill-tag blue">JavaScript</span>
                  </div>
                </div>
                
                <div className="skill-category">
                  <h3>Frontend Development</h3>
                  <div className="skill-tags">
                    <span className="skill-tag indigo">HTML</span>
                    <span className="skill-tag indigo">CSS</span>
                  </div>
                </div>

                <div className="skill-category">
                  <h3>Frameworks & Libraries</h3>
                  <div className="skill-tags">
                    <span className="skill-tag purple">Django</span>
                    <span className="skill-tag purple">Node.js</span>
                  </div>
                </div>

                <div className="skill-category">
                  <h3>Bases de Datos</h3>
                  <div className="skill-tags">
                    <span className="skill-tag green">SQL</span>
                    <span className="skill-tag green">MySQL</span>
                    <span className="skill-tag green">PostgreSQL</span>
                  </div>
                </div>

                <div className="skill-category">
                  <h3>Control de Versiones</h3>
                  <div className="skill-tags">
                    <span className="skill-tag orange">Git</span>
                    <span className="skill-tag orange">GitHub</span>
                  </div>
                </div>

                <div className="skill-category">
                  <h3>Otros</h3>
                  <div className="skill-tags">
                    <span className="skill-tag pink">Redes Sociales</span>
                    <span className="skill-tag pink">Informática Intermedio</span>
                    <span className="skill-tag pink">Inglés Intermedio</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}