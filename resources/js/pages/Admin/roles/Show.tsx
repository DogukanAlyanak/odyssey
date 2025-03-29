import React from 'react';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from '@/hooks/use-translation';

import AppLayout from '@/layouts/app-layout';
import AdminLayout from '@/layouts/admin/layout';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, ShieldCheck } from 'lucide-react';
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from '@/components/ui/alert';

interface Permission {
    id: number;
    name: string;
    display_name: string;
    description: string;
}

interface User {
    id: number;
    name: string;
    email: string;
}

interface Role {
    id: number;
    name: string;
    display_name: string;
    description: string;
    is_locked: boolean;
    permissions: Permission[];
    users: User[];
    created_at: string;
    updated_at: string;
}

interface ShowProps {
    role: Role;
}

export default function Show({ role }: ShowProps) {
    const { t } = useTranslation();

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('admin.roles.management'),
            href: '/admin',
        },
        {
            title: t('admin.roles.title'),
            href: '/admin/roles',
        },
        {
            title: role?.display_name || '',
            href: `/admin/roles/${role?.id || ''}`,
        },
    ];

    if (!role) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title={t('admin.roles.not_found')} />
                <AdminLayout>
                    <div className="space-y-6">
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>{t('admin.roles.not_found')}</AlertTitle>
                            <AlertDescription>
                                {t('admin.roles.not_found_description')}
                            </AlertDescription>
                        </Alert>
                        <Button variant="outline" asChild>
                            <Link href={route('admin.roles.index')}>
                                {t('admin.roles.actions.back')}
                            </Link>
                        </Button>
                    </div>
                </AdminLayout>
            </AppLayout>
        );
    }

    // İzin listesini göstermek için yardımcı fonksiyon
    const renderPermissionList = () => {
        if (!role.permissions?.length) {
            return (
                <p className="text-sm text-gray-500">{t('admin.roles.no_permissions')}</p>
            );
        }

        return (
            <div className="space-y-2">
                {role.permissions.map(permission => {
                    // Çeviri için permission.name değerini kullanarak doğru çeviriyi alalım
                    const permissionName = t(`permissions.permissions.${permission.name}.name`);
                    const permissionDescription = t(`permissions.permissions.${permission.name}.description`);

                    return (
                        <div key={permission.id} className="p-2 border rounded-md">
                            <p className="font-medium">{permissionName}</p>
                            {permissionDescription && (
                                <p className="text-sm text-gray-500 mt-1">{permissionDescription}</p>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={role.display_name || ''} />

            <AdminLayout>
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <HeadingSmall
                            title={role.display_name || ''}
                            description={t('admin.roles.show_description')}
                        />
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                asChild
                            >
                                <Link href={route('admin.roles.index')}>
                                    {t('admin.roles.actions.back')}
                                </Link>
                            </Button>
                            <Button
                                asChild
                                disabled={role.is_locked}
                            >
                                <Link href={route('admin.roles.edit', role.id)}>
                                    {t('admin.roles.actions.edit')}
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {role.is_locked && (
                        <Alert variant="warning">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>{t('admin.roles.locked_role_title')}</AlertTitle>
                            <AlertDescription>
                                {t('admin.roles.locked_role_description')}
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('admin.roles.general_info')}</CardTitle>
                                <CardDescription>{t('admin.roles.role_details')}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">{t('admin.roles.fields.display_name')}</h3>
                                        <p className="mt-1 text-sm font-semibold">{role.display_name}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">{t('admin.roles.fields.name')}</h3>
                                        <p className="mt-1 text-sm font-semibold">{role.name}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <h3 className="text-sm font-medium text-gray-500">{t('admin.roles.fields.description')}</h3>
                                        <p className="mt-1 text-sm">{role.description || t('admin.roles.no_description')}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">{t('admin.roles.fields.created_at')}</h3>
                                        <p className="mt-1 text-sm">{role.created_at ? new Date(role.created_at).toLocaleDateString() : '-'}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">{t('admin.roles.fields.updated_at')}</h3>
                                        <p className="mt-1 text-sm">{role.updated_at ? new Date(role.updated_at).toLocaleDateString() : '-'}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">{t('admin.roles.fields.status')}</h3>
                                        <div className="mt-1">
                                            {role.is_locked ? (
                                                <Badge variant="outline" className="border-amber-500 text-amber-500">
                                                    {t('admin.roles.statuses.locked')}
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline" className="border-emerald-500 text-emerald-500">
                                                    {t('admin.roles.statuses.editable')}
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">{t('admin.roles.fields.users')}</h3>
                                        <p className="mt-1 text-sm">{role.users?.length || 0} {t('admin.roles.users')}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>{t('admin.roles.permissions')}</CardTitle>
                                <CardDescription>{t('admin.roles.role_permissions')}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {renderPermissionList()}
                            </CardContent>
                            <CardFooter>
                                <p className="text-sm text-gray-500">
                                    {t('admin.roles.total_permissions', { count: role.permissions?.length || 0 })}
                                </p>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </AdminLayout>
        </AppLayout>
    );
}
