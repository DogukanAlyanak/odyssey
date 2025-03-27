// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { useTranslation } from '@/hooks/use-translation';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function ConfirmPassword() {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors, reset } = useForm<Required<{ password: string }>>({
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout>
            <Head title={t('auth.confirm_password.title')} />

            <div className="w-full sm:max-w-md">
                <div className="text-center">
                    <h2 className="text-2xl font-bold tracking-tight">{t('auth.confirm_password.title')}</h2>
                    <p className="text-sm text-muted-foreground mt-2">{t('auth.confirm_password.description')}</p>
                </div>

                <form onSubmit={submit} className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="password">{t('auth.confirm_password.fields.password')}</Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                placeholder={t('auth.confirm_password.fields.password')}
                                autoComplete="current-password"
                                value={data.password}
                                autoFocus
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />

                            <InputError message={errors.password} />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <Button className="w-full" disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            {t('auth.confirm_password.actions.confirm')}
                        </Button>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
}
