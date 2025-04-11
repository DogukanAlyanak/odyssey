import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Users, UserPlus, UserCog, UserCheck, Shield, Building2 } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

const memberNavItems: NavItem[] = [
    {
        title: 'member.sidebar.my_companies',
        href: '/member/my-companies',
        icon: Building2,
    },
    {
        title: 'member.sidebar.new_company',
        href: '/member/my-companies/create',
        icon: UserPlus,
    },
];

export function NavMember() {
    const page = usePage();
    const { t } = useTranslation();

    // İlgili sayfalarda aktif göstermek için kontrol
    const isActive = (href: string) => {
        // "/member/users/5" gibi bir kullanıcı detay sayfasında olduğumuzda
        // kullanıcı listesi menüsünü aktif gösterme işlevi
        if (href === "/member/users" && page.url.match(/^\/member\/users\/\d+$/)) {
            return true;
        }

        // "/member/users/5/edit" gibi bir düzenleme sayfasında olduğumuzda
        // kullanıcı listesi menüsünü aktif gösterme işlevi
        if (href === "/member/users" && page.url.match(/^\/member\/users\/\d+\/edit$/)) {
            return true;
        }

        // Rol sayfaları için aktif kontrolleri
        if (href === "/member/roles" && page.url.match(/^\/member\/roles\/\d+$/)) {
            return true;
        }

        if (href === "/member/roles" && page.url.match(/^\/member\/roles\/\d+\/edit$/)) {
            return true;
        }

        // Şirket sayfaları için aktif kontrolleri
        if (href === "/member/companies" && page.url.match(/^\/member\/companies\/\d+$/)) {
            return true;
        }

        if (href === "/member/companies" && page.url.match(/^\/member\/companies\/\d+\/edit$/)) {
            return true;
        }

        // Tam eşleşme veya sayfa URL'si menü öğesiyle başlıyorsa
        return page.url === href || page.url.startsWith(href + "/");
    };

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>{t('member.title')}</SidebarGroupLabel>
            <SidebarMenu>
                {memberNavItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            asChild
                            isActive={isActive(item.href)}
                            tooltip={{ children: t(item.title) }}
                        >
                            <Link href={item.href} prefetch>
                                {item.icon && <item.icon />}
                                <span>{t(item.title)}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
