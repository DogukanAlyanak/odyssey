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

        $agentRole = Role::create([
            'name' => 'Agent',
            'slug' => 'agent',
            'description' => 'Agent kullanıcı',
            'is_locked' => BooleanStatus::FALSE->value
        ]);

        $memberRole = Role::create([
            'name' => 'Üye',
            'slug' => 'member',
            'description' => 'Üye kullanıcı',
            'is_locked' => BooleanStatus::FALSE->value
        ]);

        $userRole = Role::create([
            'name' => 'Kullanıcı',
            'slug' => 'user',
            'description' => 'Standart kullanıcı',
            'is_locked' => BooleanStatus::TRUE->value
        ]);

        // Rollere izinleri ekle
        $agentRole->givePermissionTo($permissionModels['view_user']);
        $agentRole->givePermissionTo($permissionModels['view_role']);
        $agentRole->givePermissionTo($permissionModels['create_user']);
        $agentRole->givePermissionTo($permissionModels['edit_user']);
        $agentRole->givePermissionTo($permissionModels['delete_user']);

        // Demo admin kullanıcısı oluştur
        $adminUser = User::firstOrCreate(
            ['email' => 'admin@test.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('Admin-1122'),
                'email_verified_at' => now(),
            ]
        );

        // Demo agent kullanıcısı oluştur
        $agentUser = User::firstOrCreate(
            ['email' => 'agent@test.com'],
            [
                'name' => 'Agent User',
                'password' => Hash::make('Admin-1122'),
                'email_verified_at' => now(),
            ]
        );

        // Demo üye kullanıcısı oluştur
        $memberUser = User::firstOrCreate(
            ['email' => 'member@test.com'],
            [
                'name' => 'Member User',
                'password' => Hash::make('Admin-1122'),
                'email_verified_at' => now(),
            ]
        );

        // Demo kullanıcı kullanıcısı oluştur
        $userUser = User::firstOrCreate(
            ['email' => 'user@test.com'],
            [
                'name' => 'User User',
                'password' => Hash::make('Admin-1122'),
                'email_verified_at' => now(),
            ]
        );

        // Kullanıcılara rolleri ata
        $adminUser->assignRole($adminRole);
        $agentUser->assignRole($agentRole);
        $memberUser->assignRole($memberRole);
        $userUser->assignRole($userRole);
    }
}
