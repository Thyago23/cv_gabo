import React, { useState } from 'react';

// Este componente permite añadir información de formación o cursos.
// Recibe como propiedad "setEducationData", que es la función para actualizar la lista de formaciones.
export default function EducationForm({ setEducationData }) {
    // Se definen tres estados locales para guardar lo que el usuario escribe en los campos:
    // - newTitle: el título de la formación (ej. universidad, curso, certificado).
    // - newDetail: el detalle de la formación (ej. licenciatura, semestre, fechas).
    // - newEmail: un correo de contacto opcional.
    const [newTitle, setNewTitle] = useState('');
    const [newDetail, setNewDetail] = useState('');
    const [newEmail, setNewEmail] = useState('');

    // Esta función se ejecuta cuando el usuario hace clic en "Agregar Formación".
    // Primero revisa que el título y el detalle no estén vacíos.
    // Luego crea un objeto "newEducation" con un id único, el título, el detalle y el email (si se ingresó).
    // Después actualiza la lista de formaciones usando la función "setEducationData".
    // Finalmente, limpia los campos para que queden listos para una nueva entrada.
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

    // En la parte visual, se muestra un formulario con tres campos de texto:
    // - Uno para el título.
    // - Uno para el detalle.
    // - Uno para el email opcional.
    // Al final, un botón que ejecuta la función "handleAddEducation".
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
