import { BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect } from 'react';

import AppLayout from '@/layouts/app-layout';
import AdminLayout from '@/layouts/admin/layout';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Transition } from '@headlessui/react';

type UserForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export default function Edit({ user }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Yönetim',
            href: '/admin',
        },
        {
            title: 'Kullanıcılar',
            href: '/admin/users',
        },
        {
            title: `${user.name} Düzenle`,
            href: `/admin/users/${user.id}/edit`,
        },
    ];

    const { data, setData, patch, errors, processing, reset, recentlySuccessful } = useForm<UserForm>({
        name: user.name || '',
        email: user.email || '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('admin.users.update', user.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${user.name} Düzenle`} />

            <AdminLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Kullanıcı Düzenle" description="Kullanıcı bilgilerini güncelleyin" />

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Ad Soyad</Label>
                            <Input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                autoFocus
                                placeholder="Ad Soyad"
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">E-posta Adresi</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                placeholder="E-posta Adresi"
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">Şifre</Label>
                            <Input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Şifre (Değiştirmek için doldurun)"
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation">Şifre Tekrar</Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                placeholder="Şifre Tekrar"
                            />
                            <InputError message={errors.password_confirmation} />
                        </div>

                        <div className="flex items-center gap-4">
                            <Button type="submit" disabled={processing}>Güncelle</Button>
                            <Button
                                type="button"
                                variant="outline"
                                asChild
                            >
                                <Link href={route('admin.users.index')}>Geri Dön</Link>
                            </Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-green-600">Güncellendi</p>
                            </Transition>
                        </div>
                    </form>
                </div>
            </AdminLayout>
        </AppLayout>
    );
}
