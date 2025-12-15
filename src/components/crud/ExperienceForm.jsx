import React, { useState } from 'react';

// Este componente permite añadir proyectos o experiencias a una lista.
// Recibe como propiedad "setExperienceData", que es la función para actualizar esa lista.
export default function ExperienceForm({ setExperienceData }) {
    // Se definen tres estados locales para guardar lo que el usuario escribe:
    // - newTitle: el título del proyecto o experiencia.
    // - newDesc: la descripción del proyecto o experiencia.
    // - newCat: la categoría seleccionada (por defecto "Proyectos Personales").
    const [newTitle, setNewTitle] = useState('');
    const [newDesc, setNewDesc] = useState('');
    const [newCat, setNewCat] = useState('Proyectos Personales'); 

    // Esta función se ejecuta cuando el usuario hace clic en "Agregar Experiencia".
    // Primero revisa que el título y la descripción no estén vacíos.
    // Luego crea un objeto "newProject" con un id único, la categoría, el título,
    // la descripción y un arreglo vacío para posibles puntos adicionales (bullets).
    // Después actualiza la lista de experiencias usando "setExperienceData".
    // Finalmente, limpia los campos de título y descripción para que queden listos.
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

    // En la parte visual, se muestra un formulario con:
    // - Un campo de texto para el título.
    // - Un área de texto para la descripción.
    // - Un menú desplegable para elegir la categoría.
    // - Un botón que ejecuta la función "handleAddProject".
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
