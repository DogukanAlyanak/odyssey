import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Users, UserPlus, UserCog, UserCheck } from 'lucide-react';

const adminNavItems: NavItem[] = [
    {
        title: 'Kullanıcı Listesi',
        href: '/admin/users',
        icon: Users,
    },
    {
        title: 'Yeni Kullanıcı',
        href: '/admin/users/create',
        icon: UserPlus,
    },
];

export function NavAdmin() {
    const page = usePage();

    // İlgili sayfalarda aktif göstermek için kontrol
    const isActive = (href: string) => {
        // "/admin/users/5" gibi bir kullanıcı detay sayfasında olduğumuzda
        // kullanıcı listesi menüsünü aktif gösterme işlevi
        if (href === "/admin/users" && page.url.match(/^\/admin\/users\/\d+$/)) {
            return true;
        }

        // "/admin/users/5/edit" gibi bir düzenleme sayfasında olduğumuzda
        // kullanıcı listesi menüsünü aktif gösterme işlevi
        if (href === "/admin/users" && page.url.match(/^\/admin\/users\/\d+\/edit$/)) {
            return true;
        }

        // Tam eşleşme veya sayfa URL'si menü öğesiyle başlıyorsa
        return page.url === href || page.url.startsWith(href + "/");
    };

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Yönetim</SidebarGroupLabel>
            <SidebarMenu>
                {adminNavItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            asChild
                            isActive={isActive(item.href)}
                            tooltip={{ children: item.title }}
                        >
                            <Link href={item.href} prefetch>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
