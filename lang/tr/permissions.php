<?php

return [
    'middleware' => [
        'role' => [
            'unauthorized' => 'Bu işlemi yapmak için yetkiniz yok.',
            'login_required' => 'Lütfen önce giriş yapın.',
        ],
        'permission' => [
            'unauthorized' => 'Bu işlemi yapmak için gereken izne sahip değilsiniz.',
            'login_required' => 'Lütfen önce giriş yapın.',
        ],
    ],
    'roles' => [
        'admin' => 'Yönetici',
        'user' => 'Kullanıcı',
        'manager' => 'Müdür',
        'editor' => 'Editör',
    ],
    'permissions' => [
        'create_user' => 'Kullanıcı Oluştur',
        'edit_user' => 'Kullanıcı Düzenle',
        'delete_user' => 'Kullanıcı Sil',
        'view_user' => 'Kullanıcı Görüntüle',
        'create_role' => 'Rol Oluştur',
        'edit_role' => 'Rol Düzenle',
        'delete_role' => 'Rol Sil',
        'view_role' => 'Rol Görüntüle',
        'assign_role' => 'Rol Ata',
        'revoke_role' => 'Rol Kaldır',
    ],
];
