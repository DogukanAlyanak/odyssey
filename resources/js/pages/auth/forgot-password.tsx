// Components
import { Head, Link, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { useTranslation } from '@/hooks/use-translation';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function ForgotPassword() {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <AuthLayout>
            <Head title={t('auth.forgot_password.title')} />

            <div className="w-full sm:max-w-md">
                <div className="text-center">
                    <h2 className="text-2xl font-bold tracking-tight">{t('auth.forgot_password.title')}</h2>
                    <p className="text-sm text-muted-foreground mt-2">{t('auth.forgot_password.description')}</p>
                </div>

                <form onSubmit={submit} className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">{t('auth.forgot_password.fields.email')}</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoFocus
                                placeholder={t('auth.forgot_password.fields.email')}
                            />
                            <InputError message={errors.email} />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <Link
                            href={route('login')}
                            className="text-sm text-muted-foreground hover:text-primary"
                        >
                            {t('auth.forgot_password.actions.back_to_login')}
                        </Link>
                    </div>

                    <Button type="submit" className="w-full" disabled={processing}>
                        {t('auth.forgot_password.actions.send_reset_link')}
                    </Button>
                </form>
            </div>
        </AuthLayout>
    );
}
