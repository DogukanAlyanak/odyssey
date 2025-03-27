import { router } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePage } from '@inertiajs/react';
import { useTranslation } from '@/hooks/use-translation';
import { type SharedData } from '@/types';

export default function LanguageTabs() {
    const { t } = useTranslation();
    const { currentLocale: initialLocale } = usePage<SharedData>().props;
    const [currentLocale, setCurrentLocale] = useState(initialLocale);
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);
    const [processing, setProcessing] = useState(false);

    const availableLocales = {
        tr: 'Türkçe',
        en: 'English',
    };

    const handleLanguageChange = (locale: string) => {
        setCurrentLocale(locale);
        setProcessing(true);
        router.get(route('language.switch', locale), {}, {
            preserveScroll: true,
            onSuccess: () => {
                setRecentlySuccessful(true);
                setProcessing(false);
                setTimeout(() => setRecentlySuccessful(false), 2000);
            },
            onError: () => {
                setProcessing(false);
            }
        });
    };

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Select
                    value={currentLocale}
                    onValueChange={handleLanguageChange}
                >
                    <SelectTrigger>
                        <SelectValue placeholder={t('general.select_language')} />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.entries(availableLocales).map(([code, name]) => (
                            <SelectItem key={code} value={code}>
                                {name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <Transition
                show={recentlySuccessful}
                enter="transition ease-in-out"
                enterFrom="opacity-0"
                leave="transition ease-in-out"
                leaveTo="opacity-0"
            >
                <p className="text-sm text-muted-foreground">
                    {t('general.saved')}
                </p>
            </Transition>
        </div>
    );
}
