import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useTranslation } from '@/hooks/use-translation';
import { useEffect, useState } from 'react';
import { slugify } from '@/lib/utils';
import axios from 'axios';

import AppLayout from '@/layouts/app-layout';
import AdminLayout from '@/layouts/admin/layout';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import InputError from '@/components/input-error';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface EditProps {
    company: {
        id: number;
        name: string;
        slug: string;
        email: string;
        phone: string;
        address: string;
        website: string;
        description: string;
        is_active: boolean;
        users: User[];
    };
    errors: Record<string, string>;
    auth: {
        user: User;
    };
}

export default function Edit({ company, errors, auth }: EditProps) {
    const { t } = useTranslation();
    const { toast } = useToast();
    const [searchEmail, setSearchEmail] = useState('');
    const [searchResults, setSearchResults] = useState<User[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [isAddingUser, setIsAddingUser] = useState(false);

    const { data, setData, put, processing } = useForm({
        name: company.name,
        slug: company.slug,
        email: company.email,
        phone: company.phone,
        address: company.address,
        website: company.website,
        description: company.description,
        is_active: company.is_active,
        users: company.users,
    });

    useEffect(() => {
        setData('slug', slugify(data.name));
    }, [data.name]);

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
            title: t('admin.companies.edit_company'),
            href: `/admin/companies/${company.id}/edit`,
        },
    ];

    const searchUsers = async (email: string) => {
        if (email.length < 3) {
            setSearchResults([]);
            setShowResults(false);
            return;
        }

        try {
            const response = await axios.get(route('admin.search.users'), {
                params: { search: email }
            });
            setSearchResults(response.data);
            setShowResults(true);
        } catch (error) {
            console.error('Kullanıcı arama hatası:', error);
        }
    };

    const handleEmailSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const emailValue = e.target.value;
        setSearchEmail(emailValue);
        searchUsers(emailValue);
    };

    const addUser = (user: User) => {
        // Eğer kullanıcı zaten eklenmişse, yeniden ekleme
        const userExists = data.users.some(u => u.email === user.email);
        if (!userExists) {
            setData('users', [...data.users, user]);
        }
        setSearchEmail('');
        setShowResults(false);
    };

    const addUserByEmail = async () => {
        if (!searchEmail || searchEmail.length < 3) {
            toast({
                title: t('admin.companies.users.search_error'),
                description: t('admin.companies.users.email_placeholder'),
            });
            return;
        }

        setIsAddingUser(true);

        try {
            const response = await axios.get(route('admin.search.users'), {
                params: { search: searchEmail }
            });

            if (response.data && response.data.length > 0) {
                // Tam eşleşmeyi kontrol et
                const exactMatch = response.data.find(user => user.email.toLowerCase() === searchEmail.toLowerCase());

                if (exactMatch) {
                    addUser(exactMatch);
                    toast({
                        title: t('admin.companies.users.user_added'),
                        description: exactMatch.name,
                    });
                } else {
                    toast({
                        title: t('admin.companies.users.search_error'),
                        description: t('admin.companies.users.no_exact_match'),
                    });
                }
            } else {
                toast({
                    title: t('admin.companies.users.search_error'),
                    description: t('admin.companies.users.user_not_found'),
                });
            }
        } catch (error) {
            toast({
                title: t('admin.companies.users.search_error'),
                description: t('admin.companies.users.error_description'),
            });
        } finally {
            setIsAddingUser(false);
        }
    };

    const removeUser = (email: string) => {
        // Kullanıcının kendisini çıkarmasını önle
        if (email === auth.user.email) return;

        setData('users', data.users.filter(user => user.email !== email));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.companies.update', company.id), {
            onSuccess: () => {
                toast({
                    title: t('admin.companies.messages.updated'),
                    description: t('admin.companies.messages.update_success'),
                });
            },
            onError: () => {
                toast({
                    title: t('admin.companies.messages.error'),
                    description: t('admin.companies.messages.error_description'),
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('admin.companies.edit_company')} />

            <AdminLayout>
                <div className="space-y-6 max-w-2xl">
                    <div className="flex justify-between items-center">
                        <HeadingSmall
                            title={t('admin.companies.edit_company')}
                            description={t('admin.companies.edit_description')}
                        />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="name">{t('admin.companies.fields.name')}</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    required
                                />
                                {errors.name && <InputError message={errors.name} />}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="slug">{t('admin.companies.fields.slug')}</Label>
                                <Input
                                    id="slug"
                                    value={data.slug}
                                    onChange={e => setData('slug', e.target.value)}
                                    required
                                />
                                {errors.slug && <InputError message={errors.slug} />}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">{t('admin.companies.fields.email')}</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                />
                                {errors.email && <InputError message={errors.email} />}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">{t('admin.companies.fields.phone')}</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={data.phone}
                                    onChange={e => setData('phone', e.target.value)}
                                />
                                {errors.phone && <InputError message={errors.phone} />}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="website">{t('admin.companies.fields.website')}</Label>
                                <Input
                                    id="website"
                                    type="url"
                                    value={data.website}
                                    onChange={e => setData('website', e.target.value)}
                                />
                                {errors.website && <InputError message={errors.website} />}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address">{t('admin.companies.fields.address')}</Label>
                                <Input
                                    id="address"
                                    value={data.address}
                                    onChange={e => setData('address', e.target.value)}
                                />
                                {errors.address && <InputError message={errors.address} />}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">{t('admin.companies.fields.description')}</Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                rows={4}
                            />
                            {errors.description && <InputError message={errors.description} />}
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>{t('admin.companies.users.title')}</CardTitle>
                                <CardDescription>{t('admin.companies.users.description')}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="userEmail">{t('admin.companies.users.add_by_email')}</Label>
                                        <div className="flex gap-2">
                                            <div className="relative flex-1">
                                                <Input
                                                    id="userEmail"
                                                    placeholder={t('admin.companies.users.email_placeholder')}
                                                    value={searchEmail}
                                                    onChange={handleEmailSearch}
                                                />
                                                {showResults && searchResults.length > 0 && (
                                                    <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto">
                                                        {searchResults.map((user) => (
                                                            <div
                                                                key={user.email}
                                                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                                                                onClick={() => addUser(user)}
                                                            >
                                                                <div className="flex items-center space-x-2">
                                                                    <Avatar className="h-8 w-8">
                                                                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                                                    </Avatar>
                                                                    <div>
                                                                        <div className="font-medium">{user.name}</div>
                                                                        <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <Button
                                                type="button"
                                                size="icon"
                                                onClick={addUserByEmail}
                                                disabled={isAddingUser || !searchEmail}
                                            >
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>{t('admin.companies.users.added_users')}</Label>
                                        <div className="space-y-2">
                                            {data.users.map((user) => (
                                                <div
                                                    key={user.email}
                                                    className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-2 rounded-md"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <div className="font-medium">{user.name}</div>
                                                            <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                                                        </div>
                                                        {user.email === auth.user.email && (
                                                            <Badge variant="outline" className="ml-2">
                                                                {t('admin.companies.users.current_user')}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        disabled={user.email === auth.user.email}
                                                        onClick={() => removeUser(user.email)}
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex items-center space-x-2">
                            <Switch
                                id="is_active"
                                checked={data.is_active}
                                onCheckedChange={checked => setData('is_active', checked)}
                            />
                            <Label htmlFor="is_active">{t('admin.companies.fields.is_active')}</Label>
                            {errors.is_active && <InputError message={errors.is_active} />}
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button
                                type="submit"
                                disabled={processing}
                            >
                                {t('admin.companies.actions.update')}
                            </Button>
                        </div>
                    </form>
                </div>
            </AdminLayout>
        </AppLayout>
    );
}
