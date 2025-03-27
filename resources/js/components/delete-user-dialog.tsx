import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { useTranslation } from '@/hooks/use-translation';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface DeleteUserDialogProps {
    userId: number;
    userName: string;
    trigger?: React.ReactNode;
}

export default function DeleteUserDialog({ userId, userName, trigger }: DeleteUserDialogProps) {
    const { t } = useTranslation();
    const { delete: destroy, processing } = useForm();

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();
        destroy(route('admin.users.destroy', userId), {
            preserveScroll: true,
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger || (
                    <Button variant="destructive" size="sm">
                        {t('admin.users.actions.delete')}
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t('admin.users.messages.delete_confirm_title')}</DialogTitle>
                    <DialogDescription>
                        {t('admin.users.messages.delete_confirm_description', { name: userName })}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={deleteUser}>
                    <DialogFooter className="gap-2">
                        <DialogTrigger asChild>
                            <Button type="button" variant="secondary">
                                {t('admin.users.actions.cancel')}
                            </Button>
                        </DialogTrigger>
                        <Button type="submit" variant="destructive" disabled={processing}>
                            {t('admin.users.actions.confirm')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
