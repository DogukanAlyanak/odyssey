import { BreadcrumbItem, User } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from '@/hooks/use-translation';

import MemberLayout from '@/layouts/member/layout';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import {
    Building2, Edit, Calendar, Mail, Phone, Globe, MapPin, User as UserIcon, Store, Eye
} from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface Business {
    id: number;
    name: string;
    slug: string;
    email: string | null;
    phone: string | null;
    is_active: boolean;
    is_locked: boolean;
}

interface Company {
    id: number;
    name: string;
    slug: string;
    email: string | null;
    phone: string | null;
    address: string | null;
    website: string | null;
    description: string | null;
    is_active: boolean;
    users: User[];
    businesses: Business[];
    created_at: string;
    updated_at: string;
}

interface PageProps {
    company: Company;
}

export default function Show({ company }: PageProps) {
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
    ];

    return (
        <MemberLayout>
            <Head title={company.name} />

            <div className="flex justify-between items-start">
                <HeadingSmall
                    title={company.name}
                    breadcrumbs={breadcrumbs}
                    description={t('member.companies.company_details')}
                    icon={<Building2 className="h-6 w-6 text-gray-600 dark:text-gray-400" />}
                />
                <div className="flex space-x-2">
                    <Button asChild variant="secondary">
                        <Link href={route('member.businesses.index', company.slug)}>
                            <Store className="h-4 w-4 mr-2" />
                            {t('member.businesses.title')}
                        </Link>
                    </Button>
                    <Button asChild>
                        <Link href={route('member.companies.edit', company.slug)}>
                            <Edit className="h-4 w-4 mr-2" />
                            {t('member.companies.actions.edit')}
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>{t('member.companies.fields.general_info')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                {t('member.companies.fields.name')}
                            </p>
                            <p>{company.name}</p>
                        </div>

                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                {t('member.companies.fields.slug')}
                            </p>
                            <p>{company.slug}</p>
                        </div>

                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                {t('member.companies.fields.description')}
                            </p>
                            <p>{company.description || '-'}</p>
                        </div>

                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                {t('member.companies.fields.status')}
                            </p>
                            <div>
                                <span className={`px-2 py-1 text-xs rounded-full ${company.is_active ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
                                    {company.is_active ? t('member.companies.status.active') : t('member.companies.status.inactive')}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>{t('member.companies.fields.contact_info')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                                <Mail className="h-4 w-4 mr-2" />
                                {t('member.companies.fields.email')}
                            </p>
                            <p>{company.email || '-'}</p>
                        </div>

                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                                <Phone className="h-4 w-4 mr-2" />
                                {t('member.companies.fields.phone')}
                            </p>
                            <p>{company.phone || '-'}</p>
                        </div>

                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                                <MapPin className="h-4 w-4 mr-2" />
                                {t('member.companies.fields.address')}
                            </p>
                            <p>{company.address || '-'}</p>
                        </div>

                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                                <Globe className="h-4 w-4 mr-2" />
                                {t('member.companies.fields.website')}
                            </p>
                            <p>
                                {company.website ? (
                                    <a
                                        href={company.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:underline"
                                    >
                                        {company.website}
                                    </a>
                                ) : '-'}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <UserIcon className="h-5 w-5 mr-2" />
                            {t('auth.team_members')}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {company.users.map((user) => (
                                <div
                                    key={user.id}
                                    className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-md"
                                >
                                    <Avatar className="h-10 w-10 mr-3">
                                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="text-sm font-medium flex items-center">
                                            {user.name}
                                        </div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                            {user.email}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Store className="h-5 w-5 mr-2" />
                            {t('member.businesses.title')}
                        </CardTitle>
                        <CardDescription>
                            {t('member.businesses.company_businesses')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {company.businesses && company.businesses.length > 0 ? (
                            <div className="rounded-md border overflow-hidden">
                                <table className="w-full caption-bottom text-sm">
                                    <thead className="bg-secondary/50">
                                        <tr className="border-b">
                                            <th className="h-10 px-4 text-left align-middle font-medium">
                                                {t('member.businesses.fields.name')}
                                            </th>
                                            <th className="h-10 px-4 text-left align-middle font-medium">
                                                {t('member.businesses.fields.email')}
                                            </th>
                                            <th className="h-10 px-4 text-left align-middle font-medium">
                                                {t('member.businesses.fields.phone')}
                                            </th>
                                            <th className="h-10 px-4 text-center align-middle font-medium">
                                                {t('member.businesses.fields.status')}
                                            </th>
                                            <th className="h-10 px-4 text-right align-middle font-medium">
                                                {t('member.businesses.actions.actions')}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {company.businesses.map((business) => (
                                            <tr key={business.id} className="border-t">
                                                <td className="p-4 align-middle">
                                                    <div className="flex flex-col">
                                                        <span className="font-medium">{business.name}</span>
                                                        <span className="text-xs text-gray-500">{business.slug}</span>
                                                    </div>
                                                </td>
                                                <td className="p-4 align-middle">
                                                    {business.email || '-'}
                                                </td>
                                                <td className="p-4 align-middle">
                                                    {business.phone || '-'}
                                                </td>
                                                <td className="p-4 align-middle text-center">
                                                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${business.is_active ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-400'}`}>
                                                        {business.is_active ? t('member.businesses.status.active') : t('member.businesses.status.inactive')}
                                                    </span>
                                                    {business.is_locked && (
                                                        <span className="ml-2 inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-800/20 dark:text-amber-400">
                                                            {t('member.businesses.status.locked')}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="p-4 align-middle text-right">
                                                    <Button asChild size="sm" variant="outline">
                                                        <Link href={route('member.businesses.show', {
                                                            slug: company.slug,
                                                            id: business.id
                                                        })}>
                                                            <Eye className="h-4 w-4 mr-1" />
                                                            {t('member.businesses.actions.view')}
                                                        </Link>
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="py-8 text-center">
                                <Store className="mx-auto h-12 w-12 text-gray-400" />
                                <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
                                    {t('member.businesses.no_businesses')}
                                </h3>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    {t('member.businesses.get_started')}
                                </p>
                                <div className="mt-6">
                                    <Button asChild>
                                        <Link href={route('member.businesses.create', company.slug)}>
                                            {t('member.businesses.new_business')}
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Calendar className="h-5 w-5 mr-2" />
                            {t('member.companies.fields.timestamps')}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                {t('member.companies.fields.created_at')}
                            </p>
                            <p>{new Date(company.created_at).toLocaleString()}</p>
                        </div>

                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                {t('member.companies.fields.updated_at')}
                            </p>
                            <p>{new Date(company.updated_at).toLocaleString()}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-6 flex justify-end">
                <Button asChild variant="outline">
                    <Link href={route('member.companies.index')}>
                        {t('member.companies.actions.back')}
                    </Link>
                </Button>
            </div>
        </MemberLayout>
    );
}
