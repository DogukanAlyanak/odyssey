import { Head } from '@inertiajs/react';

import { LanguageTabs } from '@/components/language-tabs';
import HeadingSmall from '@/components/heading-small';
import { type BreadcrumbItem } from '@/types';
import { useTranslation } from '@/hooks/use-translation';

import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

export default function Language() {
    const { t } = useTranslation();

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('language.title'),
            href: '/settings/language',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('language.title')} />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title={t('language.title')}
                        description={t('language.description')}
                    />
                    <LanguageTabs />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
