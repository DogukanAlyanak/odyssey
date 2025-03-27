<?php

return [
    'login' => [
        'title' => 'Login',
        'description' => 'Sign in to your account',
        'fields' => [
            'email' => 'Email Address',
            'password' => 'Password',
            'remember_me' => 'Remember Me',
        ],
        'actions' => [
            'login' => 'Login',
            'forgot_password' => 'Forgot Password',
            'register' => 'Register',
        ],
        'messages' => [
            'failed' => 'These credentials do not match our records.',
            'throttle' => 'Too many login attempts. Please try again in :seconds seconds.',
        ],
    ],
    'register' => [
        'title' => 'Register',
        'description' => 'Create a new account',
        'fields' => [
            'name' => 'Full Name',
            'email' => 'Email Address',
            'password' => 'Password',
            'password_confirmation' => 'Confirm Password',
        ],
        'actions' => [
            'register' => 'Register',
            'login' => 'Login',
        ],
        'messages' => [
            'success' => 'Registration successful! Please verify your email address.',
        ],
    ],
    'forgot_password' => [
        'title' => 'Forgot Password',
        'description' => 'Forgot your password? Enter your email address and we will send you a password reset link.',
        'fields' => [
            'email' => 'Email Address',
        ],
        'actions' => [
            'send_reset_link' => 'Send Password Reset Link',
            'back_to_login' => 'Back to Login',
        ],
        'messages' => [
            'sent' => 'Password reset link has been sent to your email address!',
        ],
    ],
    'reset_password' => [
        'title' => 'Reset Password',
        'description' => 'Set your new password',
        'fields' => [
            'email' => 'Email Address',
            'password' => 'New Password',
            'password_confirmation' => 'Confirm New Password',
        ],
        'actions' => [
            'reset_password' => 'Reset Password',
        ],
        'messages' => [
            'success' => 'Your password has been successfully reset!',
        ],
    ],
    'verify_email' => [
        'title' => 'Email Verification',
        'description' => 'We have sent you a verification link to verify your email address.',
        'messages' => [
            'sent' => 'A new verification link has been sent.',
            'resend' => 'Resend verification link',
        ],
    ],
    'confirm_password' => [
        'title' => 'Confirm Password',
        'description' => 'Please confirm your password to continue.',
        'fields' => [
            'password' => 'Password',
        ],
        'actions' => [
            'confirm' => 'Confirm',
        ],
    ],
];
