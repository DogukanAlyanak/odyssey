import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useTranslation } from '@/hooks/use-translation';

import AppLayout from '@/layouts/app-layout';
import AdminLayout from '@/layouts/admin/layout';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import InputError from '@/components/input-error';

interface CreateProps {
    errors: Record<string, string>;
}

export default function Create({ errors }: CreateProps) {
    const { t } = useTranslation();
    const { data, setData, post, processing } = useForm({
        name: '',
        email: '',
        phone: '',
        address: '',
        website: '',
        description: '',
        is_active: true,
    });

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
        post(route('admin.companies.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('admin.companies.new_company')} />

            <AdminLayout>
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <HeadingSmall
                            title={t('admin.companies.new_company')}
                            description={t('admin.companies.create_description')}
                        />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">{t('admin.companies.fields.name')}</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">{t('admin.companies.fields.email')}</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">{t('admin.companies.fields.phone')}</Label>
                                <Input
                                    id="phone"
                                    value={data.phone}
                                    onChange={e => setData('phone', e.target.value)}
                                />
                                <InputError message={errors.phone} className="mt-2" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address">{t('admin.companies.fields.address')}</Label>
                                <Input
                                    id="address"
                                    value={data.address}
                                    onChange={e => setData('address', e.target.value)}
                                />
                                <InputError message={errors.address} className="mt-2" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="website">{t('admin.companies.fields.website')}</Label>
                                <Input
                                    id="website"
                                    type="url"
                                    value={data.website}
                                    onChange={e => setData('website', e.target.value)}
                                />
                                <InputError message={errors.website} className="mt-2" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">{t('admin.companies.fields.description')}</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                />
                                <InputError message={errors.description} className="mt-2" />
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="is_active"
                                    checked={data.is_active}
                                    onCheckedChange={checked => setData('is_active', checked)}
                                />
                                <Label htmlFor="is_active">{t('admin.companies.fields.status')}</Label>
                            </div>
                        </div>

                        <div className="flex justify-end gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => window.history.back()}
                            >
                                {t('admin.companies.actions.cancel')}
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {t('admin.companies.actions.create')}
                            </Button>
                        </div>
                    </form>
                </div>
            </AdminLayout>
        </AppLayout>
    );
}
