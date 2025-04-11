import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useTranslation } from '@/hooks/use-translation';
import { useEffect } from 'react';
import { slugify } from '@/lib/utils';

import AppLayout from '@/layouts/app-layout';
import AdminLayout from '@/layouts/admin/layout';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import InputError from '@/components/input-error';
import { useToast } from '@/components/ui/use-toast';

interface CreateProps {
    errors: Record<string, string>;
}

export default function Create({ errors }: CreateProps) {
    const { t } = useTranslation();
    const { toast } = useToast();
    const { data, setData, post, processing, reset } = useForm({
        name: '',
        slug: '',
        email: '',
        phone: '',
        address: '',
        website: '',
        description: '',
        is_active: true,
    });

    useEffect(() => {
        setData('slug', slugify(data.name));
    }, [data.name]);

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
            title: t('admin.companies.new_company'),
            href: '/admin/companies/create',
        },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.companies.store'), {
            onSuccess: (response) => {
                toast({
                    title: t('admin.companies.messages.created'),
                    description: t('admin.companies.messages.redirecting'),
                });
            },
            onError: () => {
                toast({
                    variant: "destructive",
                    title: t('admin.companies.messages.error'),
                    description: t('admin.companies.messages.error_description'),
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('admin.companies.new_company')} />

            <AdminLayout>
                <div className="space-y-6 max-w-2xl">
                    <div className="flex justify-between items-center">
                        <HeadingSmall
                            title={t('admin.companies.new_company')}
                            description={t('admin.companies.create_description')}
                        />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="name">{t('admin.companies.fields.name')}</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    required
                                />
                                {errors.name && <InputError message={errors.name} />}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="slug">{t('admin.companies.fields.slug')}</Label>
                                <Input
                                    id="slug"
                                    value={data.slug}
                                    onChange={e => setData('slug', e.target.value)}
                                    required
                                />
                                {errors.slug && <InputError message={errors.slug} />}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">{t('admin.companies.fields.email')}</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                />
                                {errors.email && <InputError message={errors.email} />}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">{t('admin.companies.fields.phone')}</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={data.phone}
                                    onChange={e => setData('phone', e.target.value)}
                                />
                                {errors.phone && <InputError message={errors.phone} />}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="website">{t('admin.companies.fields.website')}</Label>
                                <Input
                                    id="website"
                                    type="url"
                                    value={data.website}
                                    onChange={e => setData('website', e.target.value)}
                                />
                                {errors.website && <InputError message={errors.website} />}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address">{t('admin.companies.fields.address')}</Label>
                                <Input
                                    id="address"
                                    value={data.address}
                                    onChange={e => setData('address', e.target.value)}
                                />
                                {errors.address && <InputError message={errors.address} />}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">{t('admin.companies.fields.description')}</Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                rows={4}
                            />
                            {errors.description && <InputError message={errors.description} />}
                        </div>

                        <div className="flex items-center space-x-2">
                            <Switch
                                id="is_active"
                                checked={data.is_active}
                                onCheckedChange={checked => setData('is_active', checked)}
                            />
                            <Label htmlFor="is_active">{t('admin.companies.fields.is_active')}</Label>
                            {errors.is_active && <InputError message={errors.is_active} />}
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button
                                type="submit"
                                disabled={processing}
                            >
                                {t('admin.companies.actions.create')}
                            </Button>
                        </div>
                    </form>
                </div>
            </AdminLayout>
        </AppLayout>
    );
}
