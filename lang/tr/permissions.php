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
        'create_user' => [
            'name' => 'Kullanıcı Oluştur',
            'description' => 'Yeni kullanıcı oluşturabilir',
        ],
        'edit_user' => [
            'name' => 'Kullanıcı Düzenle',
            'description' => 'Mevcut kullanıcıları düzenleyebilir',
        ],
        'delete_user' => [
            'name' => 'Kullanıcı Sil',
            'description' => 'Kullanıcıları silebilir',
        ],
        'view_user' => [
            'name' => 'Kullanıcı Görüntüle',
            'description' => 'Kullanıcıları görüntüleyebilir',
        ],
        'create_role' => [
            'name' => 'Rol Oluştur',
            'description' => 'Yeni rol oluşturabilir',
        ],
        'edit_role' => [
            'name' => 'Rol Düzenle',
            'description' => 'Mevcut rolleri düzenleyebilir',
        ],
        'delete_role' => [
            'name' => 'Rol Sil',
            'description' => 'Rolleri silebilir',
        ],
        'view_role' => [
            'name' => 'Rol Görüntüle',
            'description' => 'Rolleri görüntüleyebilir',
        ],
        'assign_role' => [
            'name' => 'Rol Ata',
            'description' => 'Kullanıcılara rol atayabilir',
        ],
        'revoke_role' => [
            'name' => 'Rol Kaldır',
            'description' => 'Kullanıcılardan rol kaldırabilir',
        ],
    ],
];
