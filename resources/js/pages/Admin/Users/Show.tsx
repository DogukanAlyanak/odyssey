import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';
import AdminLayout from '@/layouts/admin/layout';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function Show({ user }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Yönetim',
            href: '/admin',
        },
        {
            title: 'Kullanıcılar',
            href: '/admin/users',
        },
        {
            title: user.name,
            href: `/admin/users/${user.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={user.name} />

            <AdminLayout>
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <HeadingSmall title="Kullanıcı Detayı" description="Kullanıcı bilgilerini görüntüleyin" />
                        <div className="flex gap-2">
                            <Button asChild>
                                <Link href={route('admin.users.edit', user.id)}>Düzenle</Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href={route('admin.users.index')}>Listeye Dön</Link>
                            </Button>
                        </div>
                    </div>

                    <div className="rounded-md border p-6 bg-card">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <h3 className="text-sm font-medium text-muted-foreground">ID</h3>
                                <p className="text-base">{user.id}</p>
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-sm font-medium text-muted-foreground">Ad Soyad</h3>
                                <p className="text-base font-medium">{user.name}</p>
                            </div>
                        </div>

                        <Separator className="my-6" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <h3 className="text-sm font-medium text-muted-foreground">E-posta Adresi</h3>
                                <p className="text-base">{user.email}</p>
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-sm font-medium text-muted-foreground">E-posta Doğrulaması</h3>
                                <p className="text-base">
                                    {user.email_verified_at
                                        ? <span className="text-green-600">Doğrulanmış: {new Date(user.email_verified_at).toLocaleDateString('tr-TR')}</span>
                                        : <span className="text-red-600">Doğrulanmamış</span>}
                                </p>
                            </div>
                        </div>

                        <Separator className="my-6" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <h3 className="text-sm font-medium text-muted-foreground">Oluşturulma Tarihi</h3>
                                <p className="text-base">{new Date(user.created_at).toLocaleDateString('tr-TR')}</p>
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-sm font-medium text-muted-foreground">Son Güncelleme</h3>
                                <p className="text-base">{new Date(user.updated_at).toLocaleDateString('tr-TR')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </AppLayout>
    );
}
