import { BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { useTranslation } from '@/hooks/use-translation';

import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Transition } from '@headlessui/react';
import AppLayout from '@/layouts/app-layout';
import AdminLayout from '@/layouts/admin/layout';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
}

interface UsersIndexProps {
    users: {
        data: User[];
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

export default function Index({ users, filters }: UsersIndexProps) {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('admin.users.management'),
            href: '/admin',
        },
        {
            title: t('admin.users.title'),
            href: '/admin/users',
        },
    ];

    const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);

        router.get(
            route('admin.users.index'),
            { search: value },
            { preserveState: true }
        );
    };

    const confirmDelete = (userId: number) => {
        setDeleteUserId(userId);
        setIsDeleting(true);
    };

    const handleDelete = () => {
        if (!deleteUserId) return;

        router.delete(route('admin.users.destroy', deleteUserId), {
            onFinish: () => {
                setIsDeleting(false);
                setDeleteUserId(null);
                setRecentlySuccessful(true);
                setTimeout(() => setRecentlySuccessful(false), 2000);
            },
        });
    };

    const cancelDelete = () => {
        setIsDeleting(false);
        setDeleteUserId(null);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('admin.users.title')} />

            <AdminLayout>
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <HeadingSmall title={t('admin.users.user_list')} description={t('admin.users.all_users')} />
                        <Button asChild>
                            <Link href={route('admin.users.create')}>{t('admin.users.new_user')}</Link>
                        </Button>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                            <Input
                                type="search"
                                placeholder={t('admin.users.search_placeholder', { default: 'Kullanıcı ara...' })}
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
                                        <th className="px-4 py-3 font-medium">{t('admin.users.fields.id')}</th>
                                        <th className="px-4 py-3 font-medium">{t('admin.users.fields.name')}</th>
                                        <th className="px-4 py-3 font-medium">{t('admin.users.fields.email')}</th>
                                        <th className="px-4 py-3 font-medium">{t('admin.users.fields.created_at')}</th>
                                        <th className="px-4 py-3 font-medium text-right">{t('admin.users.actions.title')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.data.map((user: User) => (
                                        <tr key={user.id} className="border-t">
                                            <td className="px-4 py-3">{user.id}</td>
                                            <td className="px-4 py-3 font-medium">{user.name}</td>
                                            <td className="px-4 py-3">{user.email}</td>
                                            <td className="px-4 py-3">{new Date(user.created_at).toLocaleDateString('tr-TR')}</td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        asChild
                                                        className="h-8 px-2"
                                                    >
                                                        <Link href={route('admin.users.show', user.id)}>
                                                            {t('admin.users.actions.view')}
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        asChild
                                                        className="h-8 px-2"
                                                    >
                                                        <Link href={route('admin.users.edit', user.id)}>
                                                            {t('admin.users.actions.edit')}
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 px-2 text-red-500 hover:text-red-600 hover:bg-red-50"
                                                        onClick={() => confirmDelete(user.id)}
                                                    >
                                                        {t('admin.users.actions.delete')}
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <div className="text-sm text-muted-foreground">
                            {t('admin.users.messages.showing', { total: users.total, from: users.from, to: users.to })}
                        </div>
                        <div className="flex gap-1">
                            {users.links.map((link, i) => {
                                if (i === 0 || i === users.links.length - 1) return null;

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
                            <DialogTitle>{t('admin.users.messages.delete_confirm_title')}</DialogTitle>
                            <DialogDescription>
                                {t('admin.users.messages.delete_confirm_message')}
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="outline" onClick={cancelDelete}>
                                {t('admin.users.actions.cancel')}
                            </Button>
                            <Button variant="destructive" onClick={handleDelete}>
                                {t('admin.users.actions.delete')}
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
                        <p>{t('admin.users.messages.deleted')}</p>
                    </div>
                </Transition>
            </AdminLayout>
        </AppLayout>
    );
}
