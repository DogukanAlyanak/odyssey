import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from '@/hooks/use-translation';

import AppLayout from '@/layouts/app-layout';
import AdminLayout from '@/layouts/admin/layout';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Mail, Phone, MapPin, Globe, FileText } from 'lucide-react';

interface Company {
    id: number;
    name: string;
    email: string | null;
    phone: string | null;
    address: string | null;
    website: string | null;
    description: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface ShowProps {
    company: Company;
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
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <HeadingSmall
                            title={company.name}
                            description={t('admin.companies.company_details')}
                        />

                        <div className="flex gap-2">
                            <Button variant="outline" asChild>
                                <Link href={route('admin.companies.edit', company.id)}>
                                    {t('admin.companies.actions.edit')}
                                </Link>
                            </Button>
                            <Button asChild>
                                <Link href={route('admin.companies.index')}>
                                    {t('admin.companies.actions.back')}
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <div className="grid gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Building2 className="h-5 w-5" />
                                    {t('admin.companies.fields.name')}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-muted-foreground">{company.name}</p>
                                    <Badge variant={company.is_active ? "success" : "destructive"}>
                                        {company.is_active
                                            ? t('admin.companies.status.active')
                                            : t('admin.companies.status.inactive')}
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Mail className="h-5 w-5" />
                                    {t('admin.companies.fields.email')}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    {company.email || t('admin.companies.no_data')}
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Phone className="h-5 w-5" />
                                    {t('admin.companies.fields.phone')}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    {company.phone || t('admin.companies.no_data')}
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5" />
                                    {t('admin.companies.fields.address')}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    {company.address || t('admin.companies.no_data')}
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Globe className="h-5 w-5" />
                                    {t('admin.companies.fields.website')}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    {company.website || t('admin.companies.no_data')}
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="h-5 w-5" />
                                    {t('admin.companies.fields.description')}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                    {company.description || t('admin.companies.no_data')}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </AdminLayout>
        </AppLayout>
    );
}
