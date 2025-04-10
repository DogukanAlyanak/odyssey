import React, { useState } from 'react';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { useTranslation } from '@/hooks/use-translation';

import AppLayout from '@/layouts/app-layout';
import AdminLayout from '@/layouts/admin/layout';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Transition } from '@headlessui/react';
import { Input } from '@/components/ui/input';
import { Eye, Edit, Trash2, Search, Plus, MoreHorizontal } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Role {
    id: number;
    name: string;
    description: string;
    is_locked: boolean;
    permissions_count: number;
    users_count: number;
}

interface RolesIndexProps {
    roles: {
        data: Role[];
        meta?: {
            current_page?: number;
            from?: number;
            last_page?: number;
            links?: Array<{
                url: string | null;
                label: string;
                active: boolean;
            }>;
            path?: string;
            per_page?: number;
            to?: number;
            total?: number;
        };
    };
    filters: {
        search: string;
    };
}

export default function Index({ roles, filters }: RolesIndexProps) {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [isDeleting, setIsDeleting] = useState(false);
    const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('admin.roles.management'),
            href: '/admin',
        },
        {
            title: t('admin.roles.title'),
            href: '/admin/roles',
        },
    ];

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);

        router.get(
            route('admin.roles.index'),
            { search: value },
            { preserveState: true }
        );
    };

    const confirmDelete = (role: Role) => {
        setRoleToDelete(role);
        setIsDeleting(true);
    };

    const handleDelete = () => {
        if (!roleToDelete) return;

        router.delete(route('admin.roles.destroy', roleToDelete.id), {
            onFinish: () => {
                setIsDeleting(false);
                setRoleToDelete(null);
                setRecentlySuccessful(true);
                setTimeout(() => setRecentlySuccessful(false), 2000);
            },
        });
    };

    const cancelDelete = () => {
        setIsDeleting(false);
        setRoleToDelete(null);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('admin.roles.title')} />

            <AdminLayout>
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <HeadingSmall
                            title={t('admin.roles.title')}
                            description={t('admin.roles.all_roles')}
                        />

                        <Button asChild>
                            <Link href={route('admin.roles.create')}>
                                {t('admin.roles.new_role')}
                            </Link>
                        </Button>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                            <Input
                                type="search"
                                placeholder={t('admin.roles.search_placeholder')}
                                className="pl-8"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>
                    </div>

                    {roles?.data?.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 px-4 text-center border rounded-md bg-gray-50">
                            <h3 className="mt-2 text-lg font-medium text-gray-900">
                                {t('admin.roles.no_roles')}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500 max-w-md">
                                {t('admin.roles.no_roles_description')}
                            </p>
                            <div className="mt-6">
                                <Button asChild>
                                    <Link href={route('admin.roles.create')}>
                                        {t('admin.roles.new_role')}
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="rounded-md border">
                                <div className="overflow-hidden">
                                    <table className="w-full text-sm">
                                        <thead className="bg-muted/50">
                                            <tr className="text-left">
                                                <th className="px-4 py-3 font-medium">{t('admin.roles.fields.name')}</th>
                                                <th className="px-4 py-3 font-medium">{t('admin.roles.fields.description')}</th>
                                                <th className="px-4 py-3 font-medium text-right">{t('admin.roles.actions.title')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {roles?.data?.map((role) => (
                                                <tr key={role.id} className="border-t">
                                                    <td className="px-4 py-3 font-medium">{role.name}</td>
                                                    <td className="px-4 py-3 max-w-xs truncate">
                                                        {role.description || '-'}
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
                                                                    <Link href={route('admin.roles.show', role.id)}>
                                                                        <Eye className="mr-2 h-4 w-4" />
                                                                        {t('admin.roles.actions.view')}
                                                                    </Link>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem asChild>
                                                                    <Link href={route('admin.roles.edit', role.id)}>
                                                                        <Edit className="mr-2 h-4 w-4" />
                                                                        {t('admin.roles.actions.edit')}
                                                                    </Link>
                                                                </DropdownMenuItem>
                                                                {role.is_locked !== 1 && (
                                                                    <DropdownMenuItem
                                                                        className="text-red-500 focus:text-red-500"
                                                                        onClick={() => confirmDelete(role)}
                                                                    >
                                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                                        {t('admin.roles.actions.delete')}
                                                                    </DropdownMenuItem>
                                                                )}
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
                                    {roles?.meta?.from && roles?.meta?.to && roles?.meta?.total &&
                                        t('admin.roles.messages.showing', {
                                            from: roles.meta.from,
                                            to: roles.meta.to,
                                            total: roles.meta.total
                                        })
                                    }
                                </div>
                                <div className="flex gap-1">
                                    {roles?.meta?.links && roles.meta.links.map((link, i) => {
                                        if (!link || i === 0 || i === roles.meta.links.length - 1) return null;

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
                        </>
                    )}

                    <Dialog open={isDeleting} onOpenChange={setIsDeleting}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{t('admin.roles.messages.delete_confirm_title')}</DialogTitle>
                                <DialogDescription>
                                    {roleToDelete && (
                                        <div>
                                            {t('admin.roles.messages.delete_confirm_message')}
                                        </div>
                                    )}
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={cancelDelete}>
                                    {t('admin.roles.actions.cancel')}
                                </Button>
                                <Button
                                    type="button"
                                    variant="destructive"
                                    onClick={handleDelete}
                                >
                                    {t('admin.roles.actions.delete')}
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
                        className="fixed bottom-4 right-4 z-50"
                    >
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                            <p>{t('admin.roles.messages.deleted')}</p>
                        </div>
                    </Transition>
                </div>
            </AdminLayout>
        </AppLayout>
    );
}
