<?php

return [
    'middleware' => [
        'role' => [
            'unauthorized' => 'You do not have permission to perform this action.',
            'login_required' => 'Please login first.',
        ],
        'permission' => [
            'unauthorized' => 'You do not have the required permission to perform this action.',
            'login_required' => 'Please login first.',
        ],
    ],
    'roles' => [
        'admin' => 'Administrator',
        'user' => 'User',
        'manager' => 'Manager',
        'editor' => 'Editor',
    ],
    'permissions' => [
        'create_user' => [
            'name' => 'Create User',
            'description' => 'Can create new users',
        ],
        'edit_user' => [
            'name' => 'Edit User',
            'description' => 'Can edit existing users',
        ],
        'delete_user' => [
            'name' => 'Delete User',
            'description' => 'Can delete users',
        ],
        'view_user' => [
            'name' => 'View User',
            'description' => 'Can view users',
        ],
        'create_role' => [
            'name' => 'Create Role',
            'description' => 'Can create new roles',
        ],
        'edit_role' => [
            'name' => 'Edit Role',
            'description' => 'Can edit existing roles',
        ],
        'delete_role' => [
            'name' => 'Delete Role',
            'description' => 'Can delete roles',
        ],
        'view_role' => [
            'name' => 'View Role',
            'description' => 'Can view roles',
        ],
        'assign_role' => [
            'name' => 'Assign Role',
            'description' => 'Can assign roles to users',
        ],
        'revoke_role' => [
            'name' => 'Revoke Role',
            'description' => 'Can revoke roles from users',
        ],
    ],
];
