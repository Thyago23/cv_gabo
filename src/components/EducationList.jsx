import React, { useState, useEffect } from 'react';
import api from '../api/client'; 
import '../styles/Sections.css'; 

// Este componente se encarga de mostrar la sección de "Formación Académica".
// Obtiene los datos desde el servidor y los presenta en forma de tarjetas.
export default function EducationList() {
    // Se define un estado para guardar los datos de formación.
    const [educationData, setEducationData] = useState([]);
    // Se define un estado para controlar si los datos aún están cargando.
    const [loading, setLoading] = useState(true);
    
    // --- FUNCIÓN DE CARGA DE DATOS (READ) ---
    useEffect(() => {
        const fetchEducation = async () => {
            try {
                // Se hace una petición GET al servidor en la ruta /education.
                const response = await api.get('/education'); 
                // Se guardan los datos recibidos en el estado.
                setEducationData(response.data); 
            } catch (error) {
                // Si ocurre un error, se muestra en consola y se deja la lista vacía.
                console.error("Error al cargar la educación:", error);
                setEducationData([]); 
            } finally {
                // Al final, se indica que ya terminó el proceso de carga.
                setLoading(false);
            }
        };
        // Se ejecuta la función al montar el componente.
        fetchEducation();
    }, []);

    // --- RENDERIZADO ---

    // Si los datos aún están cargando, se muestra un mensaje.
    if (loading) {
        return <div className="section education-section">Cargando Formación Académica...</div>;
    }
    
    // Si ya se cargaron los datos, se muestran en la interfaz.
    return (
        <div className="section education-section">
            <h2>Formación Académica</h2>

            {educationData.length > 0 ? (
                // Si hay datos, se recorre la lista y se muestra cada elemento en una tarjeta.
                educationData.map((item) => (
                    <div key={item.id} className="education-card-wrapper">
                        <div className="education-card">
                            <h3>{item.title}</h3>
                            <p>{item.detail}</p>
                            
                            {/* Si el objeto incluye un email, se muestra como contacto */}
                            {item.email && (
                                <p className="email">Contacto: {item.email}</p>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                // Si no hay datos, se muestra un mensaje indicando que no se encontró información.
                <p>No se encontraron datos de formación.</p>
            )}
            
            {/* Aquí se podría añadir un formulario para agregar nuevas formaciones.
                Por ahora está comentado, pero se puede habilitar más adelante. */}
            {/* 
            <hr className="divider" />
            <EducationForm setEducationData={setEducationData} />
            */}
        </div>
    );
}
