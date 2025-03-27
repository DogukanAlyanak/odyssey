import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { useTranslation } from '@/hooks/use-translation';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    const { t } = useTranslation();
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>{t('general.nav.platform')}</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={t(item.title)}>
                        <SidebarMenuButton
                            asChild isActive={item.href === page.url}
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
