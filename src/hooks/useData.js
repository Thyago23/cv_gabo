import { useState, useEffect, useCallback } from 'react';
import api from '../api/client';

// --- Función Auxiliar ---
// Esta función recibe una lista de habilidades y las organiza por categorías.
// Devuelve un arreglo donde cada elemento representa una categoría con sus habilidades.
const groupSkillsByCategory = (skills) => {
    const grouped = skills.reduce((acc, skill) => {
        // Se extrae la categoría y se guardan las demás propiedades (id, name, color).
        const { category, ...rest } = skill;
        
        // Si la categoría aún no existe en el acumulador, se crea.
        if (!acc[category]) {
            acc[category] = [];
        }
        // Se añade la habilidad dentro de la categoría correspondiente.
        acc[category].push(rest);
        return acc;
    }, {});
    
    // Se convierte el objeto en un arreglo para que sea más fácil recorrerlo en React.
    return Object.keys(grouped).map(category => ({
        category,
        skills: grouped[category]
    }));
};

// --- Hook Principal ---
export const useData = () => {
    // Se define el estado inicial con las secciones del CV: experiencia, educación, habilidades y posts.
    const [cvData, setCvData] = useState({
        experience: [],
        education: [], 
        skills: [],
        posts: []
    });
    const [loading, setLoading] = useState(true);

    // --- Carga Inicial de Datos ---
    // Esta función obtiene los datos desde el servidor (JSON Server) usando Axios.
    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            // Se hacen varias peticiones en paralelo a los diferentes endpoints.
            const [experienceResponse, educationResponse, skillsResponse, postsResponse] = await Promise.all([
                api.get('/experiencia'),    // Datos de experiencia
                api.get('/formacion'),      // Datos de formación
                api.get('/skills'),         // Datos de habilidades
                api.get('/posts')           // Datos de posts
            ]);

            // Se agrupan las habilidades por categoría.
            const groupedSkills = groupSkillsByCategory(skillsResponse.data);

            // Se actualiza el estado con los datos obtenidos.
            setCvData({
                experience: experienceResponse.data,
                education: educationResponse.data,
                skills: groupedSkills,
                posts: postsResponse.data
            });
        } catch (error) {
            console.error("Error al obtener los datos del CV:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Se ejecuta la carga de datos al montar el componente.
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // --- Funciones CRUD para Experiencia ---
    const addExperience = async (newItem) => {
        try {
            const response = await api.post('/experiencia', newItem);
            const addedItem = response.data;
            
            // Se añade la nueva experiencia al estado.
            setCvData(prevData => ({
                ...prevData,
                experience: [...prevData.experience, addedItem]
            }));
            
            return addedItem;
        } catch (error) {
            console.error("Error al añadir experiencia:", error);
        }
    };

    const deleteExperience = async (id) => {
        try {
            await api.delete(`/experiencia/${id}`);
            
            // Se elimina la experiencia del estado.
            setCvData(prevData => ({
                ...prevData,
                experience: prevData.experience.filter(item => item.id !== id)
            }));
        } catch (error) {
            console.error("Error al eliminar experiencia:", error);
        }
    };

    // --- Funciones CRUD para Educación ---
    const addEducation = async (newItem) => {
        try {
            const response = await api.post('/formacionD', newItem);
            const addedItem = response.data;
            
            // Se añade la nueva formación al estado.
            setCvData(prevData => ({
                ...prevData,
                education: [...prevData.education, addedItem]
            }));
            
            return addedItem;
        } catch (error) {
            console.error("Error al añadir formación:", error);
        }
    };

    const deleteEducation = async (id) => {
        try {
            await api.delete(`/formacionD/${id}`);
            
            // Se elimina la formación del estado.
            setCvData(prevData => ({
                ...prevData,
                education: prevData.education.filter(item => item.id !== id)
            }));
        } catch (error) {
            console.error("Error al eliminar formación:", error);
        }
    };

    // --- Funciones CRUD para Habilidades ---
    const addSkill = async (newSkill) => {
        try {
            const response = await api.post('/skills', newSkill);
            
            // Después de añadir, se recargan todas las habilidades y se agrupan.
            const skillsResponse = await api.get('/skills');
            const groupedSkills = groupSkillsByCategory(skillsResponse.data);
            
            setCvData(prevData => ({
                ...prevData,
                skills: groupedSkills
            }));
            
            return response.data;
        } catch (error) {
            console.error("Error al añadir skill:", error);
        }
    };

    const deleteSkill = async (id) => {
        try {
            await api.delete(`/skills/${id}`);
            
            // Después de eliminar, se recargan todas las habilidades y se agrupan.
            const skillsResponse = await api.get('/skills');
            const groupedSkills = groupSkillsByCategory(skillsResponse.data);
            
            setCvData(prevData => ({
                ...prevData,
                skills: groupedSkills
            }));
        } catch (error) {
            console.error("Error al eliminar skill:", error);
        }
    };

    // --- Retorno ---
    // Se devuelven los datos del CV, el estado de carga y todas las funciones CRUD.
    return { 
        ...cvData, 
        loading, 
        fetchData,
        addExperience, 
        deleteExperience,
        addEducation,
        deleteEducation,
        addSkill,
        deleteSkill
    };
};
