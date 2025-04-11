import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from '@/hooks/use-translation';

import AppLayout from '@/layouts/app-layout';
import AdminLayout from '@/layouts/admin/layout';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ShowProps {
    company: {
        id: number;
        name: string;
        slug: string;
        email: string;
        phone: string;
        address: string;
        website: string;
        description: string;
        is_active: boolean;
        created_at: string;
        updated_at: string;
    };
}

export default function Show({ company }: ShowProps) {
    const { t } = useTranslation();

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('admin.companies.management'),
            href: '/admin',
        },
        {
            title: t('admin.companies.title'),
            href: '/admin/companies',
        },
        {
            title: company.name,
            href: `/admin/companies/${company.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={company.name} />

            <AdminLayout>
                <div className="space-y-6 max-w-2xl">
                    <div className="flex justify-between items-center">
                        <HeadingSmall
                            title={company.name}
                            description={t('admin.companies.company_details')}
                        />
                        <div className="flex gap-2">
                            <Link href={route('admin.companies.edit', company.id)}>
                                <Button variant="outline">
                                    {t('admin.companies.actions.edit')}
                                </Button>
                            </Link>
                            <Link href={route('admin.companies.index')}>
                                <Button variant="outline">
                                    {t('admin.companies.actions.back')}
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('admin.companies.fields.general_info')}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h4 className="text-sm font-medium text-muted-foreground">
                                        {t('admin.companies.fields.name')}
                                    </h4>
                                    <p className="mt-1">{company.name}</p>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-muted-foreground">
                                        {t('admin.companies.fields.slug')}
                                    </h4>
                                    <p className="mt-1">{company.slug}</p>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-muted-foreground">
                                        {t('admin.companies.fields.status')}
                                    </h4>
                                    <div className="mt-1">
                                        <Badge variant={company.is_active ? 'default' : 'secondary'}>
                                            {t(`admin.companies.status.${company.is_active ? 'active' : 'inactive'}`)}
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>{t('admin.companies.fields.contact_info')}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h4 className="text-sm font-medium text-muted-foreground">
                                        {t('admin.companies.fields.email')}
                                    </h4>
                                    <p className="mt-1">{company.email || t('admin.companies.no_data')}</p>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-muted-foreground">
                                        {t('admin.companies.fields.phone')}
                                    </h4>
                                    <p className="mt-1">{company.phone || t('admin.companies.no_data')}</p>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-muted-foreground">
                                        {t('admin.companies.fields.website')}
                                    </h4>
                                    <p className="mt-1">
                                        {company.website ? (
                                            <a
                                                href={company.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-primary hover:underline"
                                            >
                                                {company.website}
                                            </a>
                                        ) : (
                                            t('admin.companies.no_data')
                                        )}
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-muted-foreground">
                                        {t('admin.companies.fields.address')}
                                    </h4>
                                    <p className="mt-1">{company.address || t('admin.companies.no_data')}</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle>{t('admin.companies.fields.description')}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="whitespace-pre-wrap">
                                    {company.description || t('admin.companies.no_data')}
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle>{t('admin.companies.fields.timestamps')}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h4 className="text-sm font-medium text-muted-foreground">
                                        {t('admin.companies.fields.created_at')}
                                    </h4>
                                    <p className="mt-1">
                                        {new Date(company.created_at).toLocaleString('tr-TR')}
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-muted-foreground">
                                        {t('admin.companies.fields.updated_at')}
                                    </h4>
                                    <p className="mt-1">
                                        {new Date(company.updated_at).toLocaleString('tr-TR')}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </AdminLayout>
        </AppLayout>
    );
}
