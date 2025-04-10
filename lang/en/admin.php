<?php

return [
    'title' => 'Administration',
    'dashboard' => [
        'title' => 'Administration',
        'description' => 'Manage your system here',
    ],
    'sidebar' => [
        'users' => 'User List',
        'new_user' => 'New User',
        'roles' => 'Role List',
        'new_role' => 'New Role',
        'companies' => 'Companies',
        'new_company' => 'New Company',
    ],
    'users' => [
        'list' => 'User List',
        'create' => 'Create User',
        'title' => 'Users',
        'management' => 'User Management',
        'new_user' => 'New User',
        'edit_user' => 'Edit User',
        'user_details' => 'User Details',
        'user_list' => 'User List',
        'all_users' => 'All users in the system',
        'add_new_user' => 'Add a new user to the system',
        'update_user' => 'Update user information',
        'view_user' => 'View user information',
        'delete' => 'Delete User',
        'delete_confirm_title' => 'Delete User',
        'delete_confirm_message' => 'Are you sure you want to delete this user? This action cannot be undone.',
        'password' => 'Password',
        'cancel' => 'Cancel',
        'confirm_delete' => 'Delete User',
        'search_placeholder' => 'Search user...',
        'fields' => [
            'name' => 'Name',
            'email' => 'Email Address',
            'password' => 'Password',
            'password_confirmation' => 'Confirm Password',
            'id' => 'ID',
            'created_at' => 'Created At',
            'updated_at' => 'Last Update',
            'email_verified_at' => 'Email Verification',
            'roles' => 'Roles',
        ],
        'actions' => [
            'title' => 'Actions',
            'save' => 'Save',
            'update' => 'Update',
            'reset' => 'Reset',
            'back' => 'Back',
            'back_to_list' => 'Back to List',
            'view' => 'View',
            'edit' => 'Edit',
            'delete' => 'Delete',
            'cancel' => 'Cancel',
            'create' => 'Create',
            'show' => 'Show',
            'confirm' => 'Confirm',
        ],
        'messages' => [
            'saved' => 'Saved',
            'updated' => 'Updated',
            'deleted' => 'User successfully deleted',
            'showing' => 'Showing :from-:to of :total users',
            'delete_confirm_title' => 'Delete User',
            'delete_confirm_message' => 'Are you sure you want to delete this user? This action cannot be undone.',
        ],
        'status' => [
            'verified' => 'Verified: :date',
            'unverified' => 'Unverified',
        ],
    ],
    'roles' => [
        'title' => 'Roles',
        'management' => 'Role Management',
        'new_role' => 'New Role',
        'edit_role' => 'Edit Role',
        'role_details' => 'Role Details',
        'role_list' => 'Role List',
        'all_roles' => 'All roles in the system',
        'add_new_role' => 'Add a new role to the system',
        'update_role' => 'Update role information',
        'view_role' => 'View role information',
        'fields' => [
            'id' => 'ID',
            'name' => 'Role Name',
            'display_name' => 'Display Name',
            'description' => 'Description',
            'created_at' => 'Created At',
            'updated_at' => 'Last Update',
        ],
        'placeholders' => [
            'name' => 'Enter role name',
            'display_name' => 'Enter role display name',
            'description' => 'Enter a short description about the role',
        ],
        'actions' => [
            'title' => 'Actions',
            'save' => 'Save',
            'update' => 'Update',
            'reset' => 'Reset',
            'back' => 'Back',
            'back_to_list' => 'Back to List',
            'view' => 'View',
            'edit' => 'Edit',
            'delete' => 'Delete',
            'cancel' => 'Cancel',
            'create' => 'Create',
            'show' => 'Show',
            'confirm' => 'Confirm',
        ],
        'messages' => [
            'saved' => 'Role successfully saved',
            'updated' => 'Role successfully updated',
            'deleted' => 'Role successfully deleted',
            'showing' => 'Showing :from-:to of :total roles',
            'delete_confirm_title' => 'Delete Role',
            'delete_confirm_message' => 'Are you sure you want to delete this role? This action cannot be undone.',
        ],
    ],
    'companies' => [
        'management' => 'Company Management',
        'title' => 'Companies',
        'all_companies' => 'View and manage all companies',
        'new_company' => 'New Company',
        'create_description' => 'Create a new company',
        'edit_company' => 'Edit Company',
        'edit_description' => 'Update company information',
        'company_details' => 'View company details',
        'no_data' => 'No data',
        'search_placeholder' => 'Search companies...',
        'fields' => [
            'name' => 'Company Name',
            'slug' => 'SEO URL',
            'email' => 'Email',
            'phone' => 'Phone',
            'address' => 'Address',
            'website' => 'Website',
            'description' => 'Description',
            'status' => 'Status',
            'is_active' => 'Active/Inactive',
        ],
        'status' => [
            'active' => 'Active',
            'inactive' => 'Inactive',
        ],
        'actions' => [
            'title' => 'Actions',
            'view' => 'View',
            'edit' => 'Edit',
            'delete' => 'Delete',
            'cancel' => 'Cancel',
            'create' => 'Create',
            'update' => 'Update',
            'back' => 'Back',
        ],
        'messages' => [
            'showing' => 'Showing :from to :to of :total entries',
            'delete_confirm_title' => 'Delete Company',
            'delete_confirm_message' => 'Are you sure you want to delete this company? This action cannot be undone.',
            'deleted' => 'Company successfully deleted.',
            'created' => 'Company successfully created.',
            'updated' => 'Company successfully updated.',
        ],
    ],
];
