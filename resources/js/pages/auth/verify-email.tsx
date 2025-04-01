// Components
import { Head, Link, router } from '@inertiajs/react';
import { useTranslation } from '@/hooks/use-translation';

import AuthLayout from '@/layouts/auth-layout';
import { Button } from '@/components/ui/button';

export default function VerifyEmail({ status }: { status?: string }) {
    const { t } = useTranslation();

    const handleResendVerification = () => {
        router.post(route('verification.send'));
    };

    const handleLogout = () => {
        router.post(route('logout'));
    };

    return (
        <>
            <Head title={t('auth.verify_email.title')} />

            <div className="flex min-h-screen flex-col items-center justify-center">
                <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-900">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight">
                            {t('auth.verify_email.title')}
                        </h2>
                        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                            {t('auth.verify_email.description')}
                        </p>
                    </div>

                    {status === 'verification-link-sent' && (
                        <div className="rounded-md bg-green-50 p-4 text-sm text-green-800 dark:bg-green-900/50 dark:text-green-200">
                            {t('auth.verify_email.verification_link_sent')}
                        </div>
                    )}

                    <div className="mt-8 space-y-4">
                        <Button onClick={handleResendVerification} className="w-full">
                            {t('auth.verify_email.resend_button')}
                        </Button>

                        <Button onClick={handleLogout} variant="outline" className="w-full">
                            {t('auth.verify_email.logout_button')}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
