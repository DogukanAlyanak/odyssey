import { router } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePage } from '@inertiajs/react';
import { useTranslation } from '@/hooks/use-translation';
import { type SharedData } from '@/types';

export function LanguageTabs() {
    const { t } = useTranslation();
    const page = usePage();
    const [currentLocale, setCurrentLocale] = useState(page.props.currentLocale);
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);
    const [processing, setProcessing] = useState(false);

    // Props değiştiğinde currentLocale'i güncelle
    useEffect(() => {
        setCurrentLocale(page.props.currentLocale);
    }, [page.props.currentLocale]);

    const handleLanguageChange = (value: string) => {
        if (value === currentLocale) return;

        setProcessing(true);
        setCurrentLocale(value);

        router.post('/language', { locale: value }, {
            onSuccess: () => {
                setRecentlySuccessful(true);
                setProcessing(false);
                setTimeout(() => setRecentlySuccessful(false), 2000);
                window.location.reload();
            },
            onError: () => {
                setProcessing(false);
                setCurrentLocale(page.props.currentLocale);
            },
        });
    };

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Select
                    value={currentLocale as string}
                    onValueChange={handleLanguageChange}
                    disabled={processing}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={t('language.select_language')} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="en">{t('language.english')}</SelectItem>
                        <SelectItem value="tr">{t('language.turkish')}</SelectItem>
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
