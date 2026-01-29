import React, { createContext, useState, useEffect, useContext } from 'react';

// Se crea un contexto para manejar el tema (claro u oscuro) en toda la aplicación.
const ThemeContext = createContext();

// Esta función determina cuál será el tema inicial.
const getInitialTheme = () => {
    // 1. Primero intenta cargar el tema guardado en localStorage.
    if (typeof window !== 'undefined' && localStorage.getItem('theme')) {
        return localStorage.getItem('theme');
    }
    // 2. Si no hay nada guardado, revisa la preferencia del sistema operativo.
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    // 3. Si no encuentra nada, usa "light" como predeterminado.
    return 'light';
};

// Este componente envuelve la aplicación y provee el contexto del tema.
export const ThemeProvider = ({ children }) => {
    // Se guarda el tema actual en un estado, inicializado con la función anterior.
    const [theme, setTheme] = useState(getInitialTheme);

    // Esta función alterna entre modo claro y oscuro.
    const toggleTheme = () => {
        setTheme(prevTheme => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light';
            // Se guarda la preferencia en localStorage para que se mantenga en futuras visitas.
            localStorage.setItem('theme', newTheme);
            return newTheme;
        });
    };

    // Cada vez que el tema cambia, se actualiza la clase en el elemento <html>.
    // Esto permite que el CSS aplique los estilos correspondientes.
    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Se expone el valor del tema y la función para alternarlo a través del contexto.
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Este hook personalizado permite acceder fácilmente al contexto desde cualquier componente.
export const useTheme = () => useContext(ThemeContext);
