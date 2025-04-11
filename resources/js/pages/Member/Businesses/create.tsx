import { BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useTranslation } from '@/hooks/use-translation';
import { useToast } from '@/hooks/use-toast';
import slugify from 'slugify';

import MemberLayout from '@/layouts/member/layout';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Store } from 'lucide-react';

interface Company {
    id: number;
    name: string;
    slug: string;
}

interface CreateProps {
    company: Company;
    errors: Record<string, string>;
}

export default function Create({ company, errors }: CreateProps) {
    const { t } = useTranslation();
    const { toast } = useToast();

    const { data, setData, post, processing } = useForm({
        name: '',
        slug: '',
        email: '',
        phone: '',
        address: '',
        website: '',
        description: '',
        is_active: true,
    });

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
            title: t('member.businesses.new_business'),
            href: `/member/companies/${company.slug}/businesses/create`,
        },
    ];

    const generateSlug = () => {
        if (data.name) {
            setData('slug', slugify(data.name, { lower: true, strict: true }));
        }
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setData('name', newName);
        setData('slug', slugify(newName, { lower: true, strict: true }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('member.businesses.store', company.slug), {
            onSuccess: (response) => {
                toast({
                    title: t('member.businesses.messages.created'),
                    description: t('member.businesses.messages.redirecting'),
                });
            },
            onError: () => {
                toast({
                    title: t('member.businesses.messages.error'),
                    description: t('member.businesses.messages.error_description'),
                });
            },
        });
    };

    return (
        <MemberLayout>
            <Head title={t('member.businesses.new_business')} />

            <HeadingSmall
                title={t('member.businesses.new_business')}
                breadcrumbs={breadcrumbs}
                description={t('member.businesses.create_description')}
                icon={<Store className="h-6 w-6 text-gray-600 dark:text-gray-400" />}
            />

            <form onSubmit={handleSubmit} className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('member.businesses.fields.general_info')}</CardTitle>
                            <CardDescription>
                                {t('member.businesses.create_description')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">{t('member.businesses.fields.name')}</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={handleNameChange}
                                    error={errors.name}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="slug">{t('member.businesses.fields.slug')}</Label>
                                <Input
                                    id="slug"
                                    value={data.slug}
                                    onChange={(e) => setData('slug', e.target.value)}
                                    error={errors.slug}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">
                                    {t('member.businesses.fields.description')}
                                </Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    error={errors.description}
                                    rows={3}
                                />
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="is_active"
                                    checked={data.is_active}
                                    onCheckedChange={(checked) => setData('is_active', checked)}
                                />
                                <Label htmlFor="is_active" className="cursor-pointer">
                                    {t('member.businesses.fields.is_active')}
                                </Label>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>{t('member.businesses.fields.contact_info')}</CardTitle>
                            <CardDescription>
                                {t('member.businesses.contact_description')}
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">{t('member.businesses.fields.email')}</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    error={errors.email}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">{t('member.businesses.fields.phone')}</Label>
                                <Input
                                    id="phone"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    error={errors.phone}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address">{t('member.businesses.fields.address')}</Label>
                                <Textarea
                                    id="address"
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    error={errors.address}
                                    rows={2}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="website">{t('member.businesses.fields.website')}</Label>
                                <Input
                                    id="website"
                                    value={data.website}
                                    onChange={(e) => setData('website', e.target.value)}
                                    error={errors.website}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-6 flex items-center justify-end space-x-4">
                    <Button
                        type="button"
                        variant="outline"
                        disabled={processing}
                        asChild
                    >
                        <Link href={route('member.businesses.index', company.slug)}>
                            {t('member.businesses.actions.cancel')}
                        </Link>
                    </Button>
                    <Button
                        type="submit"
                        disabled={processing}
                    >
                        {t('member.businesses.actions.create')}
                    </Button>
                </div>
            </form>
        </MemberLayout>
    );
}
