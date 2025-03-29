import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
// import { initializeTheme } from './hooks/use-appearance';
import { useTranslation } from '@/hooks/use-translation';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { Toaster } from '@/components/ui/sonner';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <ThemeProvider defaultTheme="system" storageKey="odyssey-theme">
                <App {...props} />
                <Toaster />
            </ThemeProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// initializeTheme() fonksiyonu siyah ekran sorununa neden oluyor, bu yüzden kaldırıldı
// initializeTheme();
