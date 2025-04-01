import { BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { useTranslation } from '@/hooks/use-translation';

import AppLayout from '@/layouts/app-layout';
import AdminLayout from '@/layouts/admin/layout';
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
}

interface CompaniesIndexProps {
    companies: {
        data: Company[];
        from: number;
        to: number;
        total: number;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
    filters: {
        search: string;
    };
}

export default function Index({ companies, filters }: CompaniesIndexProps) {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [deleteCompanyId, setDeleteCompanyId] = useState<number | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('admin.companies.management'),
            href: '/admin',
        },
        {
            title: t('admin.companies.title'),
            href: '/admin/companies',
        },
    ];

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);

        router.get(
            route('admin.companies.index'),
            { search: value },
            { preserveState: true }
        );
    };

    const confirmDelete = (companyId: number) => {
        setDeleteCompanyId(companyId);
        setIsDeleting(true);
    };

    const handleDelete = () => {
        if (!deleteCompanyId) return;

        router.delete(route('admin.companies.destroy', deleteCompanyId), {
            onFinish: () => {
                setIsDeleting(false);
                setDeleteCompanyId(null);
                setRecentlySuccessful(true);
                setTimeout(() => setRecentlySuccessful(false), 2000);
            },
        });
    };

    const cancelDelete = () => {
        setIsDeleting(false);
        setDeleteCompanyId(null);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('admin.companies.title')} />

            <AdminLayout>
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <HeadingSmall
                            title={t('admin.companies.title')}
                            description={t('admin.companies.all_companies')}
                        />

                        <Button asChild>
                            <Link href={route('admin.companies.create')}>
                                {t('admin.companies.new_company')}
                            </Link>
                        </Button>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                            <Input
                                type="search"
                                placeholder={t('admin.companies.search_placeholder')}
                                className="pl-8"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>
                    </div>

                    <div className="rounded-md border">
                        <div className="overflow-hidden">
                            <table className="w-full text-sm">
                                <thead className="bg-muted/50">
                                    <tr className="text-left">
                                        <th className="px-4 py-3 font-medium">{t('admin.companies.fields.name')}</th>
                                        <th className="px-4 py-3 font-medium">{t('admin.companies.fields.email')}</th>
                                        <th className="px-4 py-3 font-medium">{t('admin.companies.fields.phone')}</th>
                                        <th className="px-4 py-3 font-medium">{t('admin.companies.fields.status')}</th>
                                        <th className="px-4 py-3 font-medium text-right">{t('admin.companies.actions.title')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {companies.data.map((company) => (
                                        <tr key={company.id} className="border-t">
                                            <td className="px-4 py-3 font-medium">{company.name}</td>
                                            <td className="px-4 py-3">{company.email || '-'}</td>
                                            <td className="px-4 py-3">{company.phone || '-'}</td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    company.is_active
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {company.is_active
                                                        ? t('admin.companies.status.active')
                                                        : t('admin.companies.status.inactive')}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-8 w-8 p-0"
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem asChild>
                                                            <Link href={route('admin.companies.show', company.id)}>
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                {t('admin.companies.actions.view')}
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={route('admin.companies.edit', company.id)}>
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                {t('admin.companies.actions.edit')}
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            className="text-red-500 focus:text-red-500"
                                                            onClick={() => confirmDelete(company.id)}
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            {t('admin.companies.actions.delete')}
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <div className="text-sm text-muted-foreground">
                            {t('admin.companies.messages.showing', {
                                total: companies.total,
                                from: companies.from,
                                to: companies.to
                            })}
                        </div>
                        <div className="flex gap-1">
                            {companies.links.map((link, i) => {
                                if (i === 0 || i === companies.links.length - 1) return null;

                                return (
                                    <Button
                                        key={i}
                                        variant={link.active ? "default" : "outline"}
                                        size="sm"
                                        className="h-8 w-8 p-0"
                                        asChild={!link.active && !!link.url}
                                        disabled={!link.url || link.active}
                                    >
                                        {link.url ? (
                                            <Link href={link.url}>{link.label}</Link>
                                        ) : (
                                            <span>{link.label}</span>
                                        )}
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <Dialog open={isDeleting} onOpenChange={setIsDeleting}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{t('admin.companies.messages.delete_confirm_title')}</DialogTitle>
                            <DialogDescription>
                                {t('admin.companies.messages.delete_confirm_message')}
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="outline" onClick={cancelDelete}>
                                {t('admin.companies.actions.cancel')}
                            </Button>
                            <Button variant="destructive" onClick={handleDelete}>
                                {t('admin.companies.actions.delete')}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out duration-300"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out duration-300"
                    leaveTo="opacity-0"
                >
                    <div className="fixed bottom-4 right-4 z-50 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                        <p>{t('admin.companies.messages.deleted')}</p>
                    </div>
                </Transition>
            </AdminLayout>
        </AppLayout>
    );
}
