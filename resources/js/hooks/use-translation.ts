import { usePage } from '@inertiajs/react';

export function useTranslation() {
    const { translations } = usePage().props;

    const t = (key: string): string => {
        const keys = key.split('.');
        let value: any = translations;

        for (const k of keys) {
            value = value?.[k];
            if (value === undefined) {
                return key;
            }
        }

        return value;
    };

    return { t };
}
