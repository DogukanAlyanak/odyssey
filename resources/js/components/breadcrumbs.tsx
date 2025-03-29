import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { useTranslation } from '@/hooks/use-translation';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { Link } from '@inertiajs/react';
import { Fragment } from 'react';


export function Breadcrumbs({ breadcrumbs }: { breadcrumbs: BreadcrumbItemType[] }) {
    const { t } = useTranslation();

    // Title'ı çevirme fonksiyonu
    const getTitle = (title: string) => {
        // Eğer title bir çeviri anahtarı ise (içinde nokta varsa)
        if (title.includes('.')) {
            return t(title);
        }
        // Değilse doğrudan metni göster
        return title;
    };

    return (
        <>
            {breadcrumbs.length > 0 && (
                <Breadcrumb>
                    <BreadcrumbList>
                        {breadcrumbs.map((item, index) => {
                            const isLast = index === breadcrumbs.length - 1;
                            return (
                                <Fragment key={index}>
                                    <BreadcrumbItem>
                                        {isLast ? (
                                            <BreadcrumbPage>{getTitle(item.title)}</BreadcrumbPage>
                                        ) : (
                                            <BreadcrumbLink asChild>
                                                <Link href={item.href}>{getTitle(item.title)}</Link>
                                            </BreadcrumbLink>
                                        )}
                                    </BreadcrumbItem>
                                    {!isLast && <BreadcrumbSeparator />}
                                </Fragment>
                            );
                        })}
                    </BreadcrumbList>
                </Breadcrumb>
            )}
        </>
    );
}
