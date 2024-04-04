import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export const ThemeContext = createContext({
    theme: 'light',
    toggleTheme: () => { }
});

export const useTheme = () => (useContext(ThemeContext));

export const ThemeProvider = (props: { children: React.ReactNode }) => {

    const [isDarktheme, setDarktheme] = useState(false);

    const toggleTheme = useCallback(() => {
        setDarktheme(!isDarktheme)
    }, [isDarktheme]);

    useEffect(() => {
        document.querySelector('html')?.classList.remove('dark', 'light');
        document.querySelector('html')?.classList.add(isDarktheme ? 'dark' : 'light')
    }, [isDarktheme]);

    const value = useMemo(() => ({
        theme: isDarktheme ? 'dark' : 'light',
        toggleTheme
    }), [isDarktheme, toggleTheme]);

    return (
        <ThemeContext.Provider value={value}>
            {props.children}
        </ThemeContext.Provider>
    )
}