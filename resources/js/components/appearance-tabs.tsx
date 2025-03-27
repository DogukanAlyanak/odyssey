import { Appearance, useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import { LucideIcon, Monitor, Moon, Sun } from 'lucide-react';
import { HTMLAttributes } from 'react';
import { useTranslation } from '@/hooks/use-translation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AppearanceToggleTab({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
    const { t } = useTranslation();
    const { appearance, updateAppearance } = useAppearance();

    const tabs: { value: Appearance; icon: LucideIcon; label: string }[] = [
        { value: 'light', icon: Sun, label: t('appearance.light') },
        { value: 'dark', icon: Moon, label: t('appearance.dark') },
        { value: 'system', icon: Monitor, label: t('appearance.system') },
    ];

    return (
        <div className={cn('inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800', className)} {...props}>
            {tabs.map(({ value, icon: Icon, label }) => (
                <button
                    key={value}
                    onClick={() => updateAppearance(value)}
                    className={cn(
                        'flex items-center rounded-md px-3.5 py-1.5 transition-colors',
                        appearance === value
                            ? 'bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100'
                            : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60',
                    )}
                >
                    <Icon className="-ml-1 h-4 w-4" />
                    <span className="ml-1.5 text-sm">{label}</span>
                </button>
            ))}
        </div>
    );
}

export function AppearanceTabs() {
    const { t } = useTranslation();

    return (
        <Tabs defaultValue="light" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="light">{t('appearance.light')}</TabsTrigger>
                <TabsTrigger value="dark">{t('appearance.dark')}</TabsTrigger>
                <TabsTrigger value="system">{t('appearance.system')}</TabsTrigger>
            </TabsList>
            <TabsContent value="light" className="mt-4">
                <div className="rounded-lg border p-4">
                    <p className="text-sm text-muted-foreground">{t('appearance.light_description')}</p>
                </div>
            </TabsContent>
            <TabsContent value="dark" className="mt-4">
                <div className="rounded-lg border p-4">
                    <p className="text-sm text-muted-foreground">{t('appearance.dark_description')}</p>
                </div>
            </TabsContent>
            <TabsContent value="system" className="mt-4">
                <div className="rounded-lg border p-4">
                    <p className="text-sm text-muted-foreground">{t('appearance.system_description')}</p>
                </div>
            </TabsContent>
        </Tabs>
    );
}
