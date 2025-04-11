import { BreadcrumbItem, User } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useTranslation } from '@/hooks/use-translation';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import slugify from 'slugify';

import MemberLayout from '@/layouts/member/layout';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs';
import { Building2, X, UserPlus, User as UserIcon, Mail } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface CreateProps {
    errors: Record<string, string>;
    auth: {
        user: User;
    };
}

export default function Create({ errors, auth }: CreateProps) {
    const { t } = useTranslation();
    const { toast } = useToast();
    const [searchEmail, setSearchEmail] = useState('');
    const [searchResults, setSearchResults] = useState<User[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [isAddingUser, setIsAddingUser] = useState(false);

    const { data, setData, post, processing, reset } = useForm({
        name: '',
        slug: '',
        email: '',
        phone: '',
        address: '',
        website: '',
        description: '',
        is_active: true,
        users: [auth.user] as User[],
    });

    useEffect(() => {
        setData('slug', slugify(data.name, { lower: true }));
    }, [data.name]);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('member.companies.management'),
            href: '/member/my-companies',
        },
        {
            title: t('member.companies.new_company'),
            href: '/member/my-companies/create',
        },
    ];

    const searchUsers = async (email: string) => {
        if (email.length < 3) {
            setSearchResults([]);
            setShowResults(false);
            return;
        }

        try {
            const response = await axios.get(route('member.search.users'), {
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
        // Kullanıcı zaten eklenmiş mi kontrol et
        if (data.users.some((u) => u.email === user.email)) return;

        setData('users', [...data.users, user]);
        setSearchEmail('');
        setSearchResults([]);
        setShowResults(false);
    };

    const addUserByEmail = async () => {
        if (!searchEmail || searchEmail.length < 3) return;

        try {
            setIsAddingUser(true);
            const response = await axios.get(route('member.search.users'), {
                params: { search: searchEmail }
            });

            const users = response.data;
            if (users.length === 0) {
                toast({
                    title: t('member.companies.messages.no_user_found'),
                    description: t('member.companies.messages.no_user_found_description'),
                });
                return;
            }

            // E-postaya tam eşleşme arama
            const exactMatch = users.find((user: User) => user.email === searchEmail);
            if (exactMatch) {
                addUser(exactMatch);
            } else {
                toast({
                    title: t('member.companies.messages.no_exact_match'),
                    description: t('member.companies.messages.no_exact_match_description'),
                });
            }
        } catch (error) {
            console.error('Kullanıcı ekleme hatası:', error);
            toast({
                title: t('member.companies.messages.user_add_error'),
                description: t('member.companies.messages.user_add_error_description'),
            });
        } finally {
            setIsAddingUser(false);
        }
    };

    const removeUser = (email: string) => {
        // Oturum kullanıcısı kaldırılamaz
        if (email === auth.user.email) return;

        setData('users', data.users.filter(user => user.email !== email));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('member.companies.store'), {
            onSuccess: (response) => {
                toast({
                    title: t('member.companies.messages.created'),
                    description: t('member.companies.messages.redirecting'),
                });
            },
            onError: () => {
                toast({
                    title: t('member.companies.messages.error'),
                    description: t('member.companies.messages.error_description'),
                });
            },
        });
    };

    return (
        <MemberLayout>
            <Head title={t('member.companies.new_company')} />

            <HeadingSmall
                title={t('member.companies.new_company')}
                breadcrumbs={breadcrumbs}
                description={t('member.companies.create_description')}
                icon={<Building2 className="h-6 w-6 text-gray-600 dark:text-gray-400" />}
            />

            <form onSubmit={handleSubmit} className="mt-6">
                <Tabs defaultValue="general" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                        <TabsTrigger value="general">{t('member.companies.fields.general_info')}</TabsTrigger>
                        <TabsTrigger value="users">{t('auth.team_members')}</TabsTrigger>
                    </TabsList>

                    <TabsContent value="general" className="mt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>{t('member.companies.fields.general_info')}</CardTitle>
                                    <CardDescription>
                                        {t('member.companies.create_description')}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">{t('member.companies.fields.name')}</Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            error={errors.name}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="slug">{t('member.companies.fields.slug')}</Label>
                                        <Input
                                            id="slug"
                                            value={data.slug}
                                            onChange={(e) => setData('slug', e.target.value)}
                                            error={errors.slug}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description">{t('member.companies.fields.description')}</Label>
                                        <Textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            error={errors.description}
                                            rows={4}
                                        />
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="is_active"
                                            checked={data.is_active}
                                            onCheckedChange={(checked) => setData('is_active', checked)}
                                        />
                                        <Label htmlFor="is_active">{t('member.companies.fields.is_active')}</Label>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>{t('member.companies.fields.contact_info')}</CardTitle>
                                    <CardDescription>
                                        {t('member.companies.contact_description')}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">{t('member.companies.fields.email')}</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            error={errors.email}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone">{t('member.companies.fields.phone')}</Label>
                                        <Input
                                            id="phone"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            error={errors.phone}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="address">{t('member.companies.fields.address')}</Label>
                                        <Textarea
                                            id="address"
                                            value={data.address}
                                            onChange={(e) => setData('address', e.target.value)}
                                            error={errors.address}
                                            rows={2}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="website">{t('member.companies.fields.website')}</Label>
                                        <Input
                                            id="website"
                                            value={data.website}
                                            onChange={(e) => setData('website', e.target.value)}
                                            error={errors.website}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="users" className="mt-0">
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('auth.team_members')}</CardTitle>
                                <CardDescription>
                                    {t('member.companies.team_description')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col space-y-4">
                                    <div className="relative">
                                        <div className="flex space-x-2">
                                            <div className="flex-1">
                                                <Input
                                                    placeholder={t('member.companies.search_users')}
                                                    value={searchEmail}
                                                    onChange={handleEmailSearch}
                                                    className="w-full"
                                                />
                                                {showResults && searchResults.length > 0 && (
                                                    <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-56 overflow-y-auto">
                                                        {searchResults.map((user) => (
                                                            <div
                                                                key={user.id}
                                                                className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                                                                onClick={() => addUser(user)}
                                                            >
                                                                <Avatar className="h-8 w-8 mr-2">
                                                                    <AvatarFallback>
                                                                        {user.name.charAt(0)}
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                                <div>
                                                                    <div className="text-sm font-medium">{user.name}</div>
                                                                    <div className="text-xs text-gray-500 dark:text-gray-400">{user.email}</div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <Button
                                                type="button"
                                                onClick={addUserByEmail}
                                                variant="outline"
                                                disabled={isAddingUser || searchEmail.length < 3}
                                            >
                                                <UserPlus className="h-4 w-4 mr-2" />
                                                {t('member.companies.add_user')}
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <h4 className="text-sm font-medium">{t('member.companies.current_users')}</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                            {data.users.map((user) => (
                                                <div
                                                    key={user.email}
                                                    className="flex items-center justify-between p-2 border border-gray-200 dark:border-gray-700 rounded-md"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <div className="text-sm font-medium flex items-center">
                                                                {user.name}
                                                                {user.email === auth.user.email && (
                                                                    <Badge variant="outline" className="ml-2">
                                                                        {t('auth.you')}
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                            <div className="text-xs text-gray-500 dark:text-gray-400">{user.email}</div>
                                                        </div>
                                                    </div>
                                                    {user.email !== auth.user.email && (
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => removeUser(user.email)}
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                <div className="mt-6 flex justify-end space-x-4">
                    <Button asChild variant="outline">
                        <Link href={route('member.companies.index')}>
                            {t('member.companies.actions.cancel')}
                        </Link>
                    </Button>
                    <Button type="submit" disabled={processing}>
                        {t('member.companies.actions.create')}
                    </Button>
                </div>
            </form>
        </MemberLayout>
    );
}
