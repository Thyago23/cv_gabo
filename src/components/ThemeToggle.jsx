import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

// Este componente muestra un botón que permite cambiar entre modo claro y modo oscuro.
// Utiliza el contexto "ThemeContext" para saber cuál es el tema actual y para ejecutar la función que lo cambia.
export default function ThemeToggle() {
    // Se obtiene el tema actual y la función para alternarlo desde el contexto.
    const { theme, toggleTheme } = useTheme();

    return (
        <button 
            // Al hacer clic en el botón, se ejecuta la función que alterna el tema.
            onClick={toggleTheme} 
            className="theme-toggle-button" 
            // Se añade un atributo aria-label para accesibilidad, indicando la acción que realizará el botón.
            aria-label={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
        >
            {/* Si el tema actual es claro, se muestra el ícono de la luna (para pasar a oscuro).
                Si el tema actual es oscuro, se muestra el ícono del sol (para pasar a claro). */}
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
    );
}
