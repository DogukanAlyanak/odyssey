<?php

namespace Database\Seeders;

use App\Enums\BooleanStatus;
use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Tüm tabloları temizle
        Permission::truncate();
        Role::truncate();

        // İzinleri oluştur
        $createUserPermission = Permission::create([
            'name' => 'Kullanıcı Oluştur',
            'slug' => 'create_user',
            'description' => 'Yeni kullanıcı oluşturabilir'
        ]);

        $editUserPermission = Permission::create([
            'name' => 'Kullanıcı Düzenle',
            'slug' => 'edit_user',
            'description' => 'Mevcut kullanıcıları düzenleyebilir'
        ]);

        $deleteUserPermission = Permission::create([
            'name' => 'Kullanıcı Sil',
            'slug' => 'delete_user',
            'description' => 'Kullanıcıları silebilir'
        ]);

        $viewUserPermission = Permission::create([
            'name' => 'Kullanıcı Görüntüle',
            'slug' => 'view_user',
            'description' => 'Kullanıcıları görüntüleyebilir'
        ]);

        $createRolePermission = Permission::create([
            'name' => 'Rol Oluştur',
            'slug' => 'create_role',
            'description' => 'Yeni rol oluşturabilir'
        ]);

        $editRolePermission = Permission::create([
            'name' => 'Rol Düzenle',
            'slug' => 'edit_role',
            'description' => 'Mevcut rolleri düzenleyebilir'
        ]);

        $deleteRolePermission = Permission::create([
            'name' => 'Rol Sil',
            'slug' => 'delete_role',
            'description' => 'Rolleri silebilir'
        ]);

        $viewRolePermission = Permission::create([
            'name' => 'Rol Görüntüle',
            'slug' => 'view_role',
            'description' => 'Rolleri görüntüleyebilir'
        ]);

        // Rolleri oluştur
        $adminRole = Role::create([
            'name' => 'Yönetici',
            'slug' => 'admin',
            'description' => 'Tam yetkiye sahip kullanıcı',
            'is_locked' => BooleanStatus::TRUE->value
        ]);

        $editorRole = Role::create([
            'name' => 'Editör',
            'slug' => 'editor',
            'description' => 'İçerik oluşturma ve düzenleme yetkisine sahip kullanıcı',
            'is_locked' => BooleanStatus::FALSE->value
        ]);

        $userRole = Role::create([
            'name' => 'Kullanıcı',
            'slug' => 'user',
            'description' => 'Standart kullanıcı',
            'is_locked' => BooleanStatus::TRUE->value
        ]);

        // Rollere izinleri ekle
        $adminRole->givePermissionTo($createUserPermission);
        $adminRole->givePermissionTo($editUserPermission);
        $adminRole->givePermissionTo($deleteUserPermission);
        $adminRole->givePermissionTo($viewUserPermission);
        $adminRole->givePermissionTo($createRolePermission);
        $adminRole->givePermissionTo($editRolePermission);
        $adminRole->givePermissionTo($deleteRolePermission);
        $adminRole->givePermissionTo($viewRolePermission);

        $editorRole->givePermissionTo($viewUserPermission);
        $editorRole->givePermissionTo($viewRolePermission);

        // Demo admin kullanıcısı oluştur
        $admin = User::firstOrCreate([
            'name' => 'Admin User',
            'email' => 'admin@test.com',
            'password' => Hash::make('Admin-1122'),
            'email_verified_at' => now(),
        ]);

        // Demo editor kullanıcısı oluştur
        $editor = User::firstOrCreate(
            ['email' => 'editor@test.com'],
            [
                'name' => 'Editor User',
                'password' => Hash::make('Admin-1122'),
                'email_verified_at' => now(),
            ]
        );

        // Demo kullanıcı oluştur
        $user = User::firstOrCreate(
            ['email' => 'user@test.com'],
            [
                'name' => 'User User',
                'password' => Hash::make('Admin-1122'),
                'email_verified_at' => now(),
            ]
        );

        // Kullanıcılara rolleri ata
        $admin->assignRole($adminRole);
        $editor->assignRole($editorRole);
        $user->assignRole($userRole);
    }
}
