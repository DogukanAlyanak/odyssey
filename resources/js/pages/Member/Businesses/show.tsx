import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from '@/hooks/use-translation';

import MemberLayout from '@/layouts/member/layout';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import {
    Store, Edit, Calendar, Mail, Phone, Globe, MapPin,
} from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Business {
    id: number;
    name: string;
    slug: string;
    email: string | null;
    phone: string | null;
    address: string | null;
    website: string | null;
    description: string | null;
    is_active: boolean;
    is_locked: boolean;
    created_at: string;
    updated_at: string;
}

interface Company {
    id: number;
    name: string;
    slug: string;
}

interface PageProps {
    company: Company;
    business: Business;
}

export default function Show({ company, business }: PageProps) {
    const { t } = useTranslation();

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('member.companies.management'),
            href: '/member/my-companies',
        },
        {
            title: company.name,
            href: `/member/my-companies/${company.slug}`,
        },
        {
            title: t('member.businesses.title'),
            href: `/member/companies/${company.slug}/businesses`,
        },
        {
            title: business.name,
            href: `/member/companies/${company.slug}/businesses/${business.id}`,
        },
    ];

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <MemberLayout>
            <Head title={business.name} />

            <div className="flex justify-between items-start">
                <HeadingSmall
                    title={business.name}
                    breadcrumbs={breadcrumbs}
                    description={t('member.businesses.business_details')}
                    icon={<Store className="h-6 w-6 text-gray-600 dark:text-gray-400" />}
                />
                {!business.is_locked && (
                    <Button asChild>
                        <Link href={route('member.businesses.edit', {
                            slug: company.slug,
                            id: business.id
                        })}>
                            <Edit className="h-4 w-4 mr-2" />
                            {t('member.businesses.actions.edit')}
                        </Link>
                    </Button>
                )}
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>{t('member.businesses.fields.general_info')}</CardTitle>
                        <CardDescription>{t('member.businesses.general_description')}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    {t('member.businesses.fields.status')}
                                </h4>
                                <div className="mt-1 flex items-center space-x-2">
                                    <Badge variant={business.is_active ? "success" : "outline"}>
                                        {business.is_active ? t('member.businesses.status.active') : t('member.businesses.status.inactive')}
                                    </Badge>
                                    {business.is_locked && (
                                        <Badge variant="warning">
                                            {t('member.businesses.status.locked')}
                                        </Badge>
                                    )}
                                </div>
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    {t('member.businesses.fields.slug')}
                                </h4>
                                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                                    {business.slug}
                                </p>
                            </div>
                        </div>

                        {business.description && (
                            <div>
                                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    {t('member.businesses.fields.description')}
                                </h4>
                                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100 whitespace-pre-line">
                                    {business.description}
                                </p>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    {t('member.businesses.fields.created_at')}
                                </h4>
                                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                                    {formatDate(business.created_at)}
                                </p>
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    {t('member.businesses.fields.updated_at')}
                                </h4>
                                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                                    {formatDate(business.updated_at)}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>{t('member.businesses.fields.contact_info')}</CardTitle>
                        <CardDescription>{t('member.businesses.contact_description')}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {business.email && (
                            <div>
                                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                                    <Mail className="h-4 w-4 mr-1" />
                                    {t('member.businesses.fields.email')}
                                </h4>
                                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                                    <a href={`mailto:${business.email}`} className="text-primary hover:underline">
                                        {business.email}
                                    </a>
                                </p>
                            </div>
                        )}

                        {business.phone && (
                            <div>
                                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                                    <Phone className="h-4 w-4 mr-1" />
                                    {t('member.businesses.fields.phone')}
                                </h4>
                                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                                    <a href={`tel:${business.phone}`} className="text-primary hover:underline">
                                        {business.phone}
                                    </a>
                                </p>
                            </div>
                        )}

                        {business.website && (
                            <div>
                                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                                    <Globe className="h-4 w-4 mr-1" />
                                    {t('member.businesses.fields.website')}
                                </h4>
                                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                                    <a href={business.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                        {business.website}
                                    </a>
                                </p>
                            </div>
                        )}

                        {business.address && (
                            <div>
                                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    {t('member.businesses.fields.address')}
                                </h4>
                                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100 whitespace-pre-line">
                                    {business.address}
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            <div className="mt-6 flex justify-end">
                <Button
                    variant="outline"
                    asChild
                >
                    <Link href={route('member.businesses.index', company.slug)}>
                        {t('member.businesses.actions.back')}
                    </Link>
                </Button>
            </div>
        </MemberLayout>
    );
}
