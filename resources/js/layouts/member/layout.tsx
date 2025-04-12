import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren, useEffect, useState } from 'react';
import { useTranslation } from '@/hooks/use-translation';
import { Building2, LayoutDashboard, Plus, Users, ChevronDown, ChevronRight } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

interface Company {
    id: number;
    name: string;
    slug: string;
}

interface CustomPageProps {
    auth: {
        user: {
            companies?: Company[];
        }
    };
    [key: string]: any;
}

export default function MemberLayout({ children }: PropsWithChildren) {
    const { t } = useTranslation();
    const { auth } = usePage<CustomPageProps>().props;
    const [isCompaniesOpen, setIsCompaniesOpen] = useState(true);

    useEffect(() => {
        console.log('Auth user companies:', auth.user.companies);
    }, []);

    // When server-side rendering, we only render the layout on the client...
    if (typeof window === 'undefined') {
        return null;
    }

    const currentPath = window.location.pathname;

    const toggleCompanies = () => {
        setIsCompaniesOpen(!isCompaniesOpen);
    };

    const navItems: NavItem[] = [
        {
            title: t('member.sidebar.my_companies'),
            href: '/member/my-companies',
            icon: Building2,
        }
    ];

    // Kullanıcının şirketleri
    const userCompanies = auth?.user?.companies || [];
    console.log("userCompanies:", userCompanies);

    return (
        <AppLayout>
            <div className="px-4 py-6">
                <Heading title={t('member.dashboard.title')} description={t('member.dashboard.description')} />

                <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                    <aside className="w-full max-w-xl lg:w-48">
                        <nav className="flex flex-col space-y-1 space-x-0">
                            {/* Ana menü */}
                            <Button
                                size="sm"
                                variant="ghost"
                                asChild
                                className={cn('w-full justify-start', {
                                    'bg-muted': currentPath === '/member/my-companies' ||
                                    currentPath.match(/^\/member\/my-companies\/(?!create).*$/)
                                })}
                            >
                                <Link href="/member/my-companies" prefetch>
                                    <Building2 className="mr-2 h-4 w-4" />
                                    {t('member.sidebar.my_companies')}
                                </Link>
                            </Button>

                            {/* Şirket listesi */}
                            {userCompanies.length > 0 && (
                                <>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="w-full justify-start pl-8"
                                        onClick={toggleCompanies}
                                    >
                                        {isCompaniesOpen ? (
                                            <ChevronDown className="mr-2 h-4 w-4" />
                                        ) : (
                                            <ChevronRight className="mr-2 h-4 w-4" />
                                        )}
                                        {t('member.sidebar.company_list')}
                                    </Button>

                                    {isCompaniesOpen && (
                                        <div className="pl-10 space-y-1">
                                            {userCompanies.map((company) => (
                                                <Button
                                                    key={company.id}
                                                    size="sm"
                                                    variant="ghost"
                                                    asChild
                                                    className={cn('w-full justify-start', {
                                                        'bg-muted': currentPath === `/member/my-companies/${company.slug}`
                                                    })}
                                                >
                                                    <Link href={`/member/my-companies/${company.slug}`} prefetch>
                                                        {company.name}
                                                    </Link>
                                                </Button>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}

                            {/* Yeni şirket ekle */}
                            <Button
                                size="sm"
                                variant="ghost"
                                asChild
                                className={cn('w-full justify-start', {
                                    'bg-muted': currentPath === '/member/my-companies/create'
                                })}
                            >
                                <Link href="/member/my-companies/create" prefetch>
                                    <Plus className="mr-2 h-4 w-4" />
                                    {t('member.sidebar.new_company')}
                                </Link>
                            </Button>
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
