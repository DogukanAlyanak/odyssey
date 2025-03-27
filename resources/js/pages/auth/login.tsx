import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { useTranslation } from '@/hooks/use-translation';

import AuthLayout from '@/layouts/auth-layout';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export default function Login() {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <AuthLayout>
            <Head title={t('auth.login.title')} />

            <div className="w-full sm:max-w-md">
                <div className="text-center">
                    <h2 className="text-2xl font-bold tracking-tight">{t('auth.login.title')}</h2>
                    <p className="text-sm text-muted-foreground mt-2">{t('auth.login.description')}</p>
                </div>

                <form onSubmit={submit} className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">{t('auth.login.fields.email')}</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoFocus
                                placeholder={t('auth.login.fields.email')}
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">{t('auth.login.fields.password')}</Label>
                            <Input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                required
                                autoComplete="current-password"
                                placeholder={t('auth.login.fields.password')}
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="remember"
                                checked={data.remember}
                                onCheckedChange={(checked) => setData('remember', checked as boolean)}
                            />
                            <Label htmlFor="remember" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                {t('auth.login.fields.remember_me')}
                            </Label>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <Link
                            href={route('password.request')}
                            className="text-sm text-muted-foreground hover:text-primary"
                        >
                            {t('auth.login.actions.forgot_password')}
                        </Link>
                    </div>

                    <Button type="submit" className="w-full" disabled={processing}>
                        {t('auth.login.actions.login')}
                    </Button>

                    <div className="text-center text-sm">
                        <span className="text-muted-foreground">{t('auth.register.description')}</span>{' '}
                        <Link href={route('register')} className="text-primary hover:underline">
                            {t('auth.login.actions.register')}
                        </Link>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
}
