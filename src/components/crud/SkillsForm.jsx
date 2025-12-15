import React, { useState } from 'react';

// Este componente permite añadir nuevas habilidades a una lista.
// Recibe como propiedad "setSkillsData", que es la función para actualizar esa lista.
export default function SkillsForm({ setSkillsData }) {
    // Se definen tres estados locales para guardar lo que el usuario escribe:
    // - newName: el nombre de la habilidad.
    // - newCat: la categoría de la habilidad (por defecto "Lenguajes de Programación").
    // - newColor: el color asociado a la habilidad (por defecto "blue").
    const [newName, setNewName] = useState('');
    const [newCat, setNewCat] = useState('Lenguajes de Programación');
    const [newColor, setNewColor] = useState('blue');
    
    // Se definen las categorías disponibles para clasificar las habilidades.
    const categories = [
        "Lenguajes de Programación", 
        "Frontend Development", 
        "Frameworks & Libraries", 
        "Bases de Datos", 
        "Control de Versiones", 
        "Habilidades Blandas e Idiomas"
    ];

    // Se definen los colores disponibles para asignar a cada habilidad.
    const colors = ["azul", "índigo", "morado", "verde", "naranja", "rosado"]; 

    // Esta función se ejecuta cuando el usuario hace clic en "Agregar Habilidad".
    // Primero revisa que el nombre no esté vacío.
    // Luego crea un objeto "newSkill" con un id único, la categoría, el nombre y el color.
    // Después actualiza la lista de habilidades usando "setSkillsData".
    // Finalmente, limpia el campo del nombre para que quede listo para otra entrada.
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

    // En la parte visual, se muestra un formulario con:
    // - Un campo de texto para el nombre de la habilidad.
    // - Un menú desplegable para elegir la categoría.
    // - Un menú desplegable para elegir el color.
    // - Un botón que ejecuta la función "handleAddSkill".
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
