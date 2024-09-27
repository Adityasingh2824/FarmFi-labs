// src/context/ThemeContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';

// Define the shape of the context value
interface ThemeContextType {
    theme: string;
    toggleTheme: () => void;
}

// Create a context with a default value (empty object cast to ThemeContextType)
export const ThemeContext = createContext<ThemeContextType>({
    theme: 'light', 
    toggleTheme: () => {},
});

// Define the props for the ThemeProvider
interface ThemeProviderProps {
    children: ReactNode; // children is of type ReactNode (anything that can be rendered)
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    // Initialize theme state with proper type
    const [theme, setTheme] = useState<string>('light');

    // Effect to add/remove theme class to body
    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    // Function to toggle theme
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
