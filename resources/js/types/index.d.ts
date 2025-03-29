import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

declare global {
    function trans(key: string): string;
    interface Window {
        currentLocale: string;
    }
}

export interface Auth {
    user: User;
}

/**
 * Ekmek kırıntısı (breadcrumb) öğesi
 * @property title Görünen başlık (çeviri anahtarı veya doğrudan metin olabilir)
 * @property href Yönlendirilecek bağlantı
 */
export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

/**
 * Sayfa arasında paylaşılan veriler
 */
export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    currentLocale: string;
    translations: Record<string, any>;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
