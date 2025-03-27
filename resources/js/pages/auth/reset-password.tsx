import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { useTranslation } from '@/hooks/use-translation';

import AuthLayout from '@/layouts/auth-layout';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ResetPassword({ token, email }: { token: string; email: string }) {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.store'));
    };

    return (
        <AuthLayout>
            <Head title={t('auth.reset_password.title')} />

            <div className="w-full sm:max-w-md">
                <div className="text-center">
                    <h2 className="text-2xl font-bold tracking-tight">{t('auth.reset_password.title')}</h2>
                    <p className="text-sm text-muted-foreground mt-2">{t('auth.reset_password.description')}</p>
                </div>

                <form onSubmit={submit} className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">{t('auth.reset_password.fields.email')}</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoFocus
                                placeholder={t('auth.reset_password.fields.email')}
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">{t('auth.reset_password.fields.password')}</Label>
                            <Input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                required
                                autoComplete="new-password"
                                placeholder={t('auth.reset_password.fields.password')}
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation">{t('auth.reset_password.fields.password_confirmation')}</Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                                autoComplete="new-password"
                                placeholder={t('auth.reset_password.fields.password_confirmation')}
                            />
                            <InputError message={errors.password_confirmation} />
                        </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={processing}>
                        {t('auth.reset_password.actions.reset_password')}
                    </Button>
                </form>
            </div>
        </AuthLayout>
    );
}
