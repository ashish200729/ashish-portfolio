import { useEffect, useState, type ReactNode } from 'react';
import { ThemeContext, type Theme } from './theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>(() => {
        // Check local storage
        let stored: string | null = null;
        try { stored = localStorage.getItem('theme'); } catch { /* Use system preference if storage is blocked. */ }
        if (stored === 'light' || stored === 'dark') {
            return stored;
        }
        // Fallback to system preference
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        root.style.colorScheme = theme;
        const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
        if (meta) meta.content = theme === 'dark' ? '#151614' : '#ffffff';
        try { localStorage.setItem('theme', theme); } catch { /* Theme switching still works without persistence. */ }
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
