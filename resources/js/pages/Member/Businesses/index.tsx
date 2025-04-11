import { BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { useTranslation } from '@/hooks/use-translation';

import MemberLayout from '@/layouts/member/layout';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Eye, Edit, Trash2, MoreHorizontal, Building2, Store } from 'lucide-react';
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

interface Business {
    id: number;
    name: string;
    email: string | null;
    phone: string | null;
    address: string | null;
    website: string | null;
    is_active: boolean;
    is_locked: boolean;
    created_at: string;
    slug: string;
}

interface Company {
    id: number;
    name: string;
    slug: string;
}

interface BusinessesIndexProps {
    company: Company;
    businesses: {
        data: Business[];
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

export default function Index({ company, businesses, filters }: BusinessesIndexProps) {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [deleteBusinessId, setDeleteBusinessId] = useState<number | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('member.companies.management'),
            href: '/member/my-companies',
        },
        {
            title: company.name,
            href: `/member/my-companies/${company.slug}`,
        },
        {
            title: t('member.businesses.title'),
            href: `/member/companies/${company.slug}/businesses`,
        },
    ];

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);

        router.get(
            route('member.businesses.index', company.slug),
            { search: value },
            { preserveState: true }
        );
    };

    const confirmDelete = (businessId: number) => {
        setDeleteBusinessId(businessId);
        setIsDeleting(true);
    };

    const handleDelete = () => {
        if (!deleteBusinessId) return;

        router.delete(route('member.businesses.destroy', {
            slug: company.slug,
            id: deleteBusinessId
        }), {
            onFinish: () => {
                setIsDeleting(false);
                setDeleteBusinessId(null);
                setRecentlySuccessful(true);
                setTimeout(() => setRecentlySuccessful(false), 2000);
            },
        });
    };

    const cancelDelete = () => {
        setIsDeleting(false);
        setDeleteBusinessId(null);
    };

    return (
        <MemberLayout>
            <Head title={t('member.businesses.title')} />

            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <HeadingSmall
                        title={t('member.businesses.title')}
                        breadcrumbs={breadcrumbs}
                        description={t('member.businesses.all_businesses')}
                        icon={<Store className="h-6 w-6 text-gray-600 dark:text-gray-400" />}
                    />

                    <Button asChild>
                        <Link href={route('member.businesses.create', company.slug)}>
                            {t('member.businesses.new_business')}
                        </Link>
                    </Button>
                </div>

                <div className="flex justify-between items-center mb-4">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                            type="search"
                            placeholder={t('member.businesses.search_placeholder')}
                            className="pl-8"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                </div>

                <div className="rounded-md border">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="bg-secondary/50">
                                <tr className="border-b">
                                    <th className="h-10 px-4 text-left align-middle font-medium">
                                        {t('member.businesses.fields.name')}
                                    </th>
                                    <th className="h-10 px-4 text-left align-middle font-medium">
                                        {t('member.businesses.fields.email')}
                                    </th>
                                    <th className="h-10 px-4 text-left align-middle font-medium">
                                        {t('member.businesses.fields.phone')}
                                    </th>
                                    <th className="h-10 px-4 text-center align-middle font-medium">
                                        {t('member.businesses.fields.status')}
                                    </th>
                                    <th className="h-10 px-4 text-right align-middle font-medium">
                                        {t('member.businesses.actions.actions')}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {businesses.data.length > 0 ? (
                                    businesses.data.map((business) => (
                                        <tr key={business.id} className="border-t">
                                            <td className="p-4 align-middle">
                                                <div className="flex flex-col">
                                                    <span className="font-medium">{business.name}</span>
                                                    <span className="text-xs text-gray-500">{business.slug}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 align-middle">
                                                {business.email || '-'}
                                            </td>
                                            <td className="p-4 align-middle">
                                                {business.phone || '-'}
                                            </td>
                                            <td className="p-4 align-middle text-center">
                                                <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${business.is_active ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-400'}`}>
                                                    {business.is_active ? t('member.businesses.status.active') : t('member.businesses.status.inactive')}
                                                </span>
                                                {business.is_locked && (
                                                    <span className="ml-2 inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-800/20 dark:text-amber-400">
                                                        {t('member.businesses.status.locked')}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-4 align-middle text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                            <span className="sr-only">Actions</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem asChild>
                                                            <Link href={route('member.businesses.show', {
                                                                slug: company.slug,
                                                                id: business.id
                                                            })}>
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                {t('member.businesses.actions.view')}
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        {!business.is_locked && (
                                                            <DropdownMenuItem asChild>
                                                                <Link href={route('member.businesses.edit', {
                                                                    slug: company.slug,
                                                                    id: business.id
                                                                })}>
                                                                    <Edit className="mr-2 h-4 w-4" />
                                                                    {t('member.businesses.actions.edit')}
                                                                </Link>
                                                            </DropdownMenuItem>
                                                        )}
                                                        {!business.is_locked && (
                                                            <DropdownMenuItem
                                                                className="text-red-500 focus:text-red-500"
                                                                onClick={() => confirmDelete(business.id)}
                                                            >
                                                                <Trash2 className="mr-2 h-4 w-4" />
                                                                {t('member.businesses.actions.delete')}
                                                            </DropdownMenuItem>
                                                        )}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="p-4 text-center">
                                            <div className="py-8">
                                                <Store className="mx-auto h-12 w-12 text-gray-400" />
                                                <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
                                                    {t('member.businesses.no_businesses')}
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                    {t('member.businesses.get_started')}
                                                </p>
                                                <div className="mt-6">
                                                    <Button asChild>
                                                        <Link href={route('member.businesses.create', company.slug)}>
                                                            {t('member.businesses.new_business')}
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {businesses.data.length > 0 && businesses.links.length > 3 && (
                    <div className="flex items-center justify-center space-x-2 py-4">
                        {businesses.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url || '#'}
                                className={`px-3 py-1 rounded text-sm ${link.active ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'} ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                preserveScroll
                            >
                                {link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <Dialog open={isDeleting} onOpenChange={setIsDeleting}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t('member.businesses.delete_title')}</DialogTitle>
                        <DialogDescription>
                            {t('member.businesses.delete_description')}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={cancelDelete}
                        >
                            {t('member.businesses.actions.cancel')}
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                        >
                            {t('member.businesses.actions.delete')}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </MemberLayout>
    );
}
