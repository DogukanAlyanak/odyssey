import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import { useTranslation } from '@/hooks/use-translation';
import { Building2, Shield, ShieldPlus, User, UserPlus } from 'lucide-react';

const sidebarNavItems = (t: (key: string) => string): NavItem[] => [
    {
        title: t('admin.sidebar.users'),
        href: '/admin/users',
        icon: User,
    },
    {
        title: t('admin.sidebar.new_user'),
        href: '/admin/users/create',
        icon: UserPlus,
    },
    {
        title: t('admin.sidebar.roles'),
        href: '/admin/roles',
        icon: Shield,
    },
    {
        title: t('admin.sidebar.new_role'),
        href: '/admin/roles/create',
        icon: ShieldPlus,
    },
    {
        title: t('admin.sidebar.companies'),
        href: '/admin/companies',
        icon: Building2,
    },
    {
        title: t('admin.sidebar.new_company'),
        href: '/admin/companies/create',
        icon: Building2,
    },
];

export default function AdminLayout({ children }: PropsWithChildren) {
    const { t } = useTranslation();

    // When server-side rendering, we only render the layout on the client...
    if (typeof window === 'undefined') {
        return null;
    }

    const currentPath = window.location.pathname;
    const navItems = sidebarNavItems(t);

    return (
        <div className="px-4 py-6">
            <Heading title={t('admin.dashboard.title')} description={t('admin.dashboard.description')} />

            <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                <aside className="w-full max-w-xl lg:w-48">
                    <nav className="flex flex-col space-y-1 space-x-0">
                        {navItems.map((item) => (
                            <Button
                                key={item.href}
                                size="sm"
                                variant="ghost"
                                asChild
                                className={cn('w-full justify-start', {
                                    'bg-muted': currentPath === item.href ||
                                    (item.href === '/admin/users' && currentPath.match(/^\/admin\/users\/\d+$/)) ||
                                    (item.href === '/admin/users' && currentPath.match(/^\/admin\/users\/\d+\/edit$/)) ||
                                    (item.href === '/admin/roles' && currentPath.match(/^\/admin\/roles\/\d+$/)) ||
                                    (item.href === '/admin/roles' && currentPath.match(/^\/admin\/roles\/\d+\/edit$/)) ||
                                    (item.href === '/admin/companies' && currentPath.match(/^\/admin\/companies\/\d+$/)) ||
                                    (item.href === '/admin/companies' && currentPath.match(/^\/admin\/companies\/\d+\/edit$/)),
                                })}
                            >
                                <Link href={item.href} prefetch>
                                    {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                                    {item.title}
                                </Link>
                            </Button>
                        ))}
                    </nav>
                </aside>

                <Separator className="my-6 md:hidden" />

                <div className="flex-1">
                    <section className="space-y-12">{children}</section>
                </div>
            </div>
        </div>
    );
}
