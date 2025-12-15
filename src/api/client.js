import axios from 'axios';

// Se define la dirección donde se ejecuta JSON Server.
// En este caso, la aplicación se conecta al servidor local en el puerto 3000.
const API_BASE_URL = 'http://localhost:3000';

// Se crea una instancia de Axios.
// Esta instancia queda configurada para usar siempre la dirección base indicada
// y para trabajar con datos en formato JSON.
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json', // Se especifica que las peticiones y respuestas serán en formato JSON
    },
});

// Se exporta la instancia creada.
// De esta forma, otros archivos pueden utilizar "api" para comunicarse con el servidor
// sin necesidad de repetir la configuración cada vez.
export default api;
