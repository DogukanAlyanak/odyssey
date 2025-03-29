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
        'create_user' => 'Create User',
        'edit_user' => 'Edit User',
        'delete_user' => 'Delete User',
        'view_user' => 'View User',
        'create_role' => 'Create Role',
        'edit_role' => 'Edit Role',
        'delete_role' => 'Delete Role',
        'view_role' => 'View Role',
        'assign_role' => 'Assign Role',
        'revoke_role' => 'Revoke Role',
    ],
];
