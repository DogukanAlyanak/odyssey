import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from '@/hooks/use-translation';

import AppLayout from '@/layouts/app-layout';
import AdminLayout from '@/layouts/admin/layout';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function Show({ user }) {
    const { t } = useTranslation();
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('admin.users.management'),
            href: '/admin',
        },
        {
            title: t('admin.users.title'),
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
                <div className="space-y-6 max-w-2xl">
                    <div className="flex justify-between items-center">
                        <HeadingSmall title={t('admin.users.user_details')} description={t('admin.users.view_user')} />
                        <div className="flex gap-2">
                            <Button asChild>
                                <Link href={route('admin.users.edit', user.id)}>{t('admin.users.actions.edit')}</Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href={route('admin.users.index')}>{t('admin.users.actions.back_to_list')}</Link>
                            </Button>
                        </div>
                    </div>

                    <div className="rounded-md border p-6 bg-card">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <h3 className="text-sm font-medium text-muted-foreground">{t('admin.users.fields.id')}</h3>
                                <p className="text-base">{user.id}</p>
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-sm font-medium text-muted-foreground">{t('admin.users.fields.name')}</h3>
                                <p className="text-base font-medium">{user.name}</p>
                            </div>
                        </div>

                        <Separator className="my-6" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <h3 className="text-sm font-medium text-muted-foreground">{t('admin.users.fields.email')}</h3>
                                <p className="text-base">{user.email}</p>
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-sm font-medium text-muted-foreground">{t('admin.users.fields.email_verified_at')}</h3>
                                <p className="text-base">
                                    {user.email_verified_at
                                        ? <span className="text-green-600">{t('admin.users.status.verified', { date: new Date(user.email_verified_at).toLocaleDateString('tr-TR') })}</span>
                                        : <span className="text-red-600">{t('admin.users.status.unverified')}</span>}
                                </p>
                            </div>
                        </div>

                        <Separator className="my-6" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <h3 className="text-sm font-medium text-muted-foreground">{t('admin.users.fields.created_at')}</h3>
                                <p className="text-base">{new Date(user.created_at).toLocaleDateString('tr-TR')}</p>
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-sm font-medium text-muted-foreground">{t('admin.users.fields.updated_at')}</h3>
                                <p className="text-base">{new Date(user.updated_at).toLocaleDateString('tr-TR')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </AppLayout>
    );
}
