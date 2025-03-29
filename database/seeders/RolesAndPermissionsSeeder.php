<?php

namespace Database\Seeders;

use App\Enums\BooleanStatus;
use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Lang;

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

        // İzinleri oluştur - sadece slug değerini veritabanında saklıyoruz
        $permissions = [
            'create_user',
            'edit_user',
            'delete_user',
            'view_user',
            'create_role',
            'edit_role',
            'delete_role',
            'view_role',
            'assign_role',
            'revoke_role',
        ];

        $permissionModels = [];

        foreach ($permissions as $permissionSlug) {
            $permissionModels[$permissionSlug] = Permission::create([
                'slug' => $permissionSlug,
            ]);
        }

        // Rolleri oluştur
        $adminRole = Role::create([
            'name' => 'Yönetici',
            'slug' => 'admin',
            'description' => 'Tam yetkiye sahip kullanıcı',
            'is_locked' => BooleanStatus::TRUE->value
        ]);

        $userRole = Role::create([
            'name' => 'Kullanıcı',
            'slug' => 'user',
            'description' => 'Standart kullanıcı',
            'is_locked' => BooleanStatus::TRUE->value
        ]);

        $editorRole = Role::create([
            'name' => 'Editör',
            'slug' => 'editor',
            'description' => 'İçerik oluşturma ve düzenleme yetkisine sahip kullanıcı',
            'is_locked' => BooleanStatus::FALSE->value
        ]);

        // Rollere izinleri ekle
        $editorRole->givePermissionTo($permissionModels['view_user']);
        $editorRole->givePermissionTo($permissionModels['view_role']);

        // Demo admin kullanıcısı oluştur
        $adminUser = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        // Demo editor kullanıcısı oluştur
        $editorUser = User::firstOrCreate(
            ['email' => 'editor@example.com'],
            [
                'name' => 'Editor User',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        // Kullanıcılara rolleri ata
        $adminUser->assignRole($adminRole);
        $editorUser->assignRole($editorRole);
    }
}
