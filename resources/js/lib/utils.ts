import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')           // Boşlukları tire ile değiştir
        .replace(/[ğ]/g, 'g')           // Türkçe karakterleri değiştir
        .replace(/[ü]/g, 'u')
        .replace(/[ş]/g, 's')
        .replace(/[ı]/g, 'i')
        .replace(/[ö]/g, 'o')
        .replace(/[ç]/g, 'c')
        .replace(/[^a-z0-9-]/g, '')     // Alfanümerik ve tire dışındaki karakterleri kaldır
        .replace(/-+/g, '-')            // Ardışık tireleri tek tireye dönüştür
        .replace(/^-+|-+$/g, '');       // Baş ve sondaki tireleri kaldır
}
