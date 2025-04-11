import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import { useTranslation } from '@/hooks/use-translation';
import { Building2, LayoutDashboard, Plus, Users } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

const sidebarNavItems = (t: (key: string) => string): NavItem[] => [
    {
        title: t('member.sidebar.my_companies'),
        href: '/member/my-companies',
        icon: Building2,
    },
    {
        title: t('member.sidebar.new_company'),
        href: '/member/my-companies/create',
        icon: Plus,
    },
];

export default function MemberLayout({ children }: PropsWithChildren) {
    const { t } = useTranslation();

    // When server-side rendering, we only render the layout on the client...
    if (typeof window === 'undefined') {
        return null;
    }

    const currentPath = window.location.pathname;
    const navItems = sidebarNavItems(t);

    return (
        <AppLayout>
            <div className="px-4 py-6">
                <Heading title={t('member.dashboard.title')} description={t('member.dashboard.description')} />

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
                                        (item.href === '/member/my-companies' && currentPath.match(/^\/member\/my-companies\/.*$/)) ||
                                        (item.href === '/member/team' && currentPath.match(/^\/member\/team\/.*$/)),
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
                        <section className="space-y-4">{children}</section>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
