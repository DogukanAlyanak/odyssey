import React, { FormEventHandler, useEffect, useState } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';
import { useTranslation } from '@/hooks/use-translation';

import AppLayout from '@/layouts/app-layout';
import AdminLayout from '@/layouts/admin/layout';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertCircle } from 'lucide-react';

interface Permission {
    id: number;
    name: string;
    display_name: string;
    description: string;
}

interface Role {
    id: number;
    name: string;
    display_name: string;
    description: string;
    is_locked: boolean;
    permissions: Permission[];
}

interface EditProps {
    role: Role;
    permissions: Permission[];
}

export default function Edit({ role, permissions = [] }: EditProps) {
    const { t } = useTranslation();
    const { data, setData, put, errors, processing, recentlySuccessful } = useForm({
        name: role?.name || '',
        description: role?.description || '',
        permissions: role?.permissions?.map(permission => permission.id) || [],
    });

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
            href: `/admin/roles/${role?.id}`,
        },
        {
            title: t('admin.roles.actions.edit'),
            href: `/admin/roles/${role?.id}/edit`,
        },
    ];

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (role?.id) {
            put(route('admin.roles.update', role.id));
        }
    };

    function renderPermissionList() {
        if (!permissions || !Array.isArray(permissions)) {
            return [];
        }

        return permissions.map((permission) => {
            if (!permission) return null;

            const permissionName = t(`permissions.permissions.${permission.name}.name`);
            const permissionDescription = t(`permissions.permissions.${permission.name}.description`);

            return (
                <div key={permission.id} className="flex items-center space-x-2 mb-2">
                    <Checkbox
                        id={`permission-${permission.id}`}
                        checked={data.permissions.includes(permission.id)}
                        onCheckedChange={(checked) => {
                            if (checked) {
                                setData('permissions', [...data.permissions, permission.id]);
                            } else {
                                setData('permissions', data.permissions.filter(id => id !== permission.id));
                            }
                        }}
                    />
                    <Label
                        htmlFor={`permission-${permission.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        <span className="font-semibold">{permissionName}</span>
                        {permissionDescription && <p className="text-xs text-gray-500 mt-1">{permissionDescription}</p>}
                    </Label>
                </div>
            );
        }).filter(Boolean);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('admin.roles.actions.edit')} />

            <AdminLayout>
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <HeadingSmall
                            title={t('admin.roles.actions.edit')}
                            description={t('admin.roles.edit_description')}
                        />
                    </div>

                    {role?.is_locked === 1 && (
                        <Alert variant="warning" className="mb-6">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>{t('admin.roles.locked_role_title')}</AlertTitle>
                            <AlertDescription>
                                {t('admin.roles.locked_role_description')}
                            </AlertDescription>
                        </Alert>
                    )}

                    <div>
                        <form onSubmit={submit} className="space-y-6">
                            <Card className="relative">
                                <CardHeader className="pb-0">
                                    <CardTitle>{t('admin.roles.general_info')}</CardTitle>
                                    <CardDescription>{t('admin.roles.general_info_description')}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4 pt-2">
                                    <div className="space-y-1">
                                        <Label htmlFor="name">{t('admin.roles.fields.name')}</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            required
                                            disabled={processing}
                                        />
                                        <InputError message={errors.name} />
                                        <p className="text-sm text-muted-foreground">
                                            {t('admin.roles.fields.name_help')}
                                        </p>
                                    </div>

                                    <div className="space-y-1">
                                        <Label htmlFor="description">{t('admin.roles.fields.description')}</Label>
                                        <Textarea
                                            id="description"
                                            value={data.description || ''}
                                            onChange={(e) => setData('description', e.target.value)}
                                            disabled={processing}
                                            rows={3}
                                        />
                                        <InputError message={errors.description} />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="relative">
                                <CardHeader className="pb-0">
                                    <CardTitle>{t('admin.roles.permissions')}</CardTitle>
                                    <CardDescription>{t('admin.roles.permissions_description')}</CardDescription>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {renderPermissionList()}
                                    </div>
                                    <InputError message={errors.permissions} className="mt-2" />
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        asChild
                                    >
                                        <Link href={route('admin.roles.index')}>
                                            {t('admin.roles.actions.cancel')}
                                        </Link>
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                    >
                                        {t('admin.roles.actions.save')}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </form>
                    </div>
                </div>
            </AdminLayout>
        </AppLayout>
    );
}
