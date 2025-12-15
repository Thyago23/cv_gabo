import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; 
import { ThemeProvider } from './context/ThemeContext'; // Se importa el proveedor de tema

// Se importan los estilos globales de la aplicación
import './styles/App.css'; 
import './styles/Utils.css';
import './styles/Theme.css'; // Este archivo define las variables de tema (claro/oscuro)

// Opcional: estilos específicos para el botón de cambio de tema
// import './components/ThemeToggle.css'; 

// Se renderiza la aplicación dentro del elemento con id "root" en el HTML.
// Se envuelve todo en React.StrictMode para ayudar a detectar problemas.
// Además, se utiliza ThemeProvider para que toda la aplicación tenga acceso al contexto de tema.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
