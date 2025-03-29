import { usePage } from '@inertiajs/react';

export function useTranslation() {
    const { translations } = usePage().props;

    /**
     * Çeviri anahtarını kullanarak metni çevirir
     * @param key Çeviri anahtarı (nokta ile ayrılmış)
     * @param replacements Değiştirilecek parametreler
     * @returns Çevirisi yapılmış metin
     */
    const t = (key: string, replacements?: Record<string, any>): string => {
        // Çeviri anahtarını parçalara ayır
        const keys = key.split('.');
        let value: any = translations;

        // Çeviri anahtarını derinlemesine ara
        for (const k of keys) {
            value = value?.[k];
            if (value === undefined) {
                return key;
            }
        }

        // Eğer değer bir string ise ve replacements bir obje ise
        if (typeof value === 'string' && replacements && typeof replacements === 'object') {
            // Değişkenlerin yerlerine değerlerini koy (:variable_name formatındaki değişkenler)
            return value.replace(/:(\w+)/g, (match, key) => {
                return replacements[key] !== undefined ? String(replacements[key]) : match;
            });
        }

        return value;
    };

    return { t };
}
