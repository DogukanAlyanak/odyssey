import React, { useState } from 'react';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from '@/hooks/use-translation';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';

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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

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
    const { toast } = useToast();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

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
            title: role?.name || '',
            href: `/admin/roles/${role?.id || ''}`,
        },
    ];

    const handleDelete = () => {
        window.axios.delete(`/api/v1/roles/${role.id}`)
            .then(() => {
                toast({
                    title: t('admin.roles.deleted'),
                    description: t('admin.roles.delete_success'),
                });
                window.location.href = route('admin.roles.index');
            })
            .catch(() => {
                toast({
                    title: t('admin.roles.delete_error'),
                    description: t('admin.roles.delete_error_description'),
                    variant: 'destructive',
                });
            });
    };

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
            <Head title={role.name || ''} />

            <AdminLayout>
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <HeadingSmall
                            title={t('admin.roles.role_details')}
                            description={t('admin.roles.view_role_details')}
                        />
                        <div className="flex gap-2">
                            {!role.is_locked && (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="px-2 shadow-none"
                                        >
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">Open</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem asChild>
                                            <Link href={route('admin.roles.edit', { id: role?.id })} className="flex items-center">
                                                <Pencil className="w-4 h-4 mr-2 text-muted-foreground" />
                                                <span>{t('admin.roles.actions.edit')}</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild>
                                            <button
                                                type="button"
                                                onClick={() => setShowDeleteDialog(true)}
                                                className="w-full flex items-center"
                                            >
                                                <Trash2 className="w-4 h-4 mr-2 text-destructive" />
                                                <span className="text-destructive">{t('admin.roles.actions.delete')}</span>
                                            </button>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}
                            <Button
                                type="button"
                                variant="outline"
                                asChild
                            >
                                <Link href={route('admin.roles.index')}>
                                    {t('admin.roles.actions.back')}
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

                    <div>
                        <Card className="relative">
                            <CardHeader className="pb-0">
                                <CardTitle>{t('admin.roles.general_info')}</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="grid gap-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">{t('admin.roles.fields.name')}</h3>
                                            <p className="mt-1 text-sm">{role.name}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">{t('admin.roles.fields.status')}</h3>
                                            <div className="mt-1">
                                                {role.is_locked ? (
                                                    <Badge variant="destructive">{t('admin.roles.locked')}</Badge>
                                                ) : (
                                                    <Badge variant="outline">{t('admin.roles.editable')}</Badge>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">{t('admin.roles.fields.description')}</h3>
                                        <p className="mt-1 text-sm">{role.description || t('admin.roles.no_description')}</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">{t('admin.roles.fields.created_at')}</h3>
                                            <p className="mt-1 text-sm">{role.created_at ? new Date(role.created_at).toLocaleDateString() : '-'}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">{t('admin.roles.fields.updated_at')}</h3>
                                            <p className="mt-1 text-sm">{role.updated_at ? new Date(role.updated_at).toLocaleDateString() : '-'}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">{t('admin.roles.fields.users')}</h3>
                                        <p className="mt-1 text-sm">{role.users?.length || 0} {t('admin.roles.users')}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="mt-6">
                            <Card className="relative">
                                <CardHeader className="pb-0">
                                    <CardTitle>{t('admin.roles.permissions')}</CardTitle>
                                    <CardDescription>{t('admin.roles.role_permissions')}</CardDescription>
                                </CardHeader>
                                <CardContent className="pt-6">
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
                </div>

                <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>{t('admin.roles.delete_role')}</AlertDialogTitle>
                            <AlertDialogDescription>
                                {t('admin.roles.delete_confirm')}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>{t('admin.roles.actions.cancel')}</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleDelete}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                                {t('admin.roles.actions.delete')}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </AdminLayout>
        </AppLayout>
    );
}
