import axios from 'axios';

// Se define la dirección donde se ejecuta JSON Server.
// Usa variables de entorno para cambiar entre desarrollo y producción
const API_BASE_URL = import.meta.env.VITE_API_URL_PROD || 
                     import.meta.env.VITE_API_URL_DEV || 
                     'http://localhost:3000';

// Se crea una instancia de Axios.
// Esta instancia queda configurada para usar siempre la dirección base indicada
// y para trabajar con datos en formato JSON.
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json', // Se especifica que las peticiones y respuestas serán en formato JSON
    },
});

// Log para debugging (eliminar en producción si es necesario)
console.log('API URL:', API_BASE_URL);

// Se exporta la instancia creada.
// De esta forma, otros archivos pueden utilizar "api" para comunicarse con el servidor
// sin necesidad de repetir la configuración cada vez.
export default api;
