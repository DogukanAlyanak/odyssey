import { BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Transition } from '@headlessui/react';
import AppLayout from '@/layouts/app-layout';
import AdminLayout from '@/layouts/admin/layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Yönetim',
        href: '/admin',
    },
    {
        title: 'Kullanıcılar',
        href: '/admin/users',
    },
];

export default function Index({ users }) {
    const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);

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
            <Head title="Kullanıcılar" />

            <AdminLayout>
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <HeadingSmall title="Kullanıcı Listesi" description="Sistemdeki tüm kullanıcılar" />
                        <Button asChild>
                            <Link href={route('admin.users.create')}>Yeni Kullanıcı</Link>
                        </Button>
                    </div>

                    <div className="rounded-md border">
                        <div className="overflow-hidden">
                            <table className="w-full text-sm">
                                <thead className="bg-muted/50">
                                    <tr className="text-left">
                                        <th className="px-4 py-3 font-medium">ID</th>
                                        <th className="px-4 py-3 font-medium">Ad Soyad</th>
                                        <th className="px-4 py-3 font-medium">E-posta</th>
                                        <th className="px-4 py-3 font-medium">Kayıt Tarihi</th>
                                        <th className="px-4 py-3 font-medium text-right">İşlemler</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.data.map((user) => (
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
                                                            Görüntüle
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        asChild
                                                        className="h-8 px-2"
                                                    >
                                                        <Link href={route('admin.users.edit', user.id)}>
                                                            Düzenle
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 px-2 text-red-500 hover:text-red-600 hover:bg-red-50"
                                                        onClick={() => confirmDelete(user.id)}
                                                    >
                                                        Sil
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
                            {users.total} kullanıcıdan {users.from}-{users.to} arası gösteriliyor
                        </div>
                        <div className="flex gap-1">
                            {users.links.map((link, i) => {
                                // Önceki ve sonraki düğmelerini atlayalım
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

                {isDeleting && (
                    <div className="fixed inset-0 bg-black/25 flex items-center justify-center z-50">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
                            <h3 className="text-lg font-medium mb-4">Kullanıcı Silme</h3>
                            <p className="mb-4">Bu kullanıcıyı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.</p>
                            <div className="flex justify-end gap-2">
                                <Button variant="outline" onClick={cancelDelete}>İptal</Button>
                                <Button variant="destructive" onClick={handleDelete}>Sil</Button>
                            </div>
                        </div>
                    </div>
                )}

                <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out duration-300"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out duration-300"
                    leaveTo="opacity-0"
                    className="fixed bottom-4 right-4 z-50"
                >
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                        <p>Kullanıcı başarıyla silindi.</p>
                    </div>
                </Transition>
            </AdminLayout>
        </AppLayout>
    );
}
