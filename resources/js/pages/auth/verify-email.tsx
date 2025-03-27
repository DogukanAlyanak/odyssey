// Components
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from '@/hooks/use-translation';

import AuthLayout from '@/layouts/auth-layout';
import { Button } from '@/components/ui/button';

export default function VerifyEmail({ status }: { status?: string }) {
    const { t } = useTranslation();

    return (
        <AuthLayout>
            <Head title={t('auth.verify_email.title')} />

            <div className="w-full sm:max-w-md">
                <div className="text-center">
                    <h2 className="text-2xl font-bold tracking-tight">{t('auth.verify_email.title')}</h2>
                    <p className="text-sm text-muted-foreground mt-2">{t('auth.verify_email.description')}</p>
                </div>

                {status === 'verification-link-sent' && (
                    <div className="mt-4 text-sm text-green-600">
                        {t('auth.verify_email.messages.sent')}
                    </div>
                )}

                <div className="mt-8 space-y-6">
                    <Button asChild className="w-full">
                        <Link href={route('verification.send')} method="post">
                            {t('auth.verify_email.messages.resend')}
                        </Link>
                    </Button>
                </div>
            </div>
        </AuthLayout>
    );
}
