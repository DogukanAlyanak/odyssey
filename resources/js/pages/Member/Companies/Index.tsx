import { BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { useTranslation } from '@/hooks/use-translation';

import MemberLayout from '@/layouts/member/layout';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Eye, Edit, Trash2, MoreHorizontal, Building2 } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Transition } from '@headlessui/react';

interface Company {
    id: number;
    name: string;
    email: string | null;
    phone: string | null;
    address: string | null;
    website: string | null;
    is_active: boolean;
    created_at: string;
    slug: string;
}

interface Filters {
    search?: string;
}

interface PageProps {
    companies: {
        data: Company[];
        links: any;
        from: number;
        to: number;
        total: number;
    };
    filters: Filters;
}

export default function Index({ companies, filters }: PageProps) {
    const { t } = useTranslation();
    const [search, setSearch] = useState(filters.search || '');
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [companyToDelete, setCompanyToDelete] = useState<Company | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('member.companies.management'),
            href: '/member/my-companies',
        },
    ];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const queryParams = new URLSearchParams(search ? { search } : {}).toString();
        router.get(`/member/my-companies${queryParams ? `?${queryParams}` : ''}`, {}, {
            preserveState: true,
            preserveScroll: true,
            only: ['companies'],
        });
    };

    const openDeleteDialog = (company: Company) => {
        setCompanyToDelete(company);
        setIsConfirmOpen(true);
    };

    const deleteCompany = () => {
        if (!companyToDelete) return;

        setIsDeleting(true);
        router.delete(route('member.companies.destroy', companyToDelete.slug), {
            onSuccess: () => {
                setIsConfirmOpen(false);
                setCompanyToDelete(null);
            },
            onFinish: () => setIsDeleting(false),
        });
    };

    return (
        <MemberLayout>
            <Head title={t('member.companies.title')} />

            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6">
                    <HeadingSmall
                        title={t('member.companies.title')}
                        breadcrumbs={breadcrumbs}
                        description={t('member.companies.all_companies')}
                        icon={<Building2 className="h-6 w-6 text-gray-600 dark:text-gray-400" />}
                    />

                    <div className="mt-6 flex flex-wrap justify-between items-center gap-4">
                        <form onSubmit={handleSearch} className="relative w-full sm:w-auto sm:min-w-[20rem]">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                            <Input
                                type="search"
                                placeholder={t('member.companies.search_placeholder')}
                                className="pl-8"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </form>
                        <Button asChild>
                            <Link href={route('member.companies.create')}>
                                {t('member.companies.new_company')}
                            </Link>
                        </Button>
                    </div>

                    <div className="mt-6 overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">{t('member.companies.fields.name')}</th>
                                    <th scope="col" className="px-6 py-3">{t('member.companies.fields.email')}</th>
                                    <th scope="col" className="px-6 py-3">{t('member.companies.fields.phone')}</th>
                                    <th scope="col" className="px-6 py-3">{t('member.companies.fields.status')}</th>
                                    <th scope="col" className="px-6 py-3">{t('member.companies.actions.title')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {companies.data.length > 0 ? (
                                    companies.data.map((company) => (
                                        <tr key={company.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="px-6 py-4 font-medium">{company.name}</td>
                                            <td className="px-6 py-4">{company.email}</td>
                                            <td className="px-6 py-4">{company.phone}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 text-xs rounded-full ${company.is_active ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
                                                    {company.is_active ? t('member.companies.status.active') : t('member.companies.status.inactive')}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                            <span className="sr-only">Açılır Menü</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem asChild>
                                                            <Link href={route('member.companies.show', company.slug)}>
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                {t('member.companies.actions.view')}
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={route('member.companies.edit', company.slug)}>
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                {t('member.companies.actions.edit')}
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => openDeleteDialog(company)}>
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            {t('member.companies.actions.delete')}
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-4 text-center">
                                            {t('member.companies.no_data')}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {companies.data.length > 0 && (
                        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                            {t('member.companies.messages.showing', {
                                from: companies.from,
                                to: companies.to,
                                total: companies.total
                            })}
                        </div>
                    )}
                </div>
            </div>

            <Transition show={isConfirmOpen} as="div">
                <Dialog open={isConfirmOpen} onClose={() => setIsConfirmOpen(false)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{t('member.companies.messages.delete_confirm_title')}</DialogTitle>
                            <DialogDescription>
                                {t('member.companies.messages.delete_confirm_message')}
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setIsConfirmOpen(false)}
                                disabled={isDeleting}
                            >
                                {t('member.companies.actions.cancel')}
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={deleteCompany}
                                disabled={isDeleting}
                            >
                                {t('member.companies.actions.delete')}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </Transition>
        </MemberLayout>
    );
}
