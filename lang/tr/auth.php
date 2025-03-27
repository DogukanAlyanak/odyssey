<?php

return [
    'login' => [
        'title' => 'Giriş Yap',
        'description' => 'Hesabınıza giriş yapın',
        'fields' => [
            'email' => 'E-posta Adresi',
            'password' => 'Şifre',
            'remember_me' => 'Beni Hatırla',
        ],
        'actions' => [
            'login' => 'Giriş Yap',
            'forgot_password' => 'Şifremi Unuttum',
            'register' => 'Kayıt Ol',
        ],
        'messages' => [
            'failed' => 'Bu kimlik bilgileri kayıtlarımızla eşleşmiyor.',
            'throttle' => 'Çok fazla giriş denemesi. Lütfen :seconds saniye sonra tekrar deneyin.',
        ],
    ],
    'register' => [
        'title' => 'Kayıt Ol',
        'description' => 'Yeni bir hesap oluşturun',
        'fields' => [
            'name' => 'Ad Soyad',
            'email' => 'E-posta Adresi',
            'password' => 'Şifre',
            'password_confirmation' => 'Şifre Tekrar',
        ],
        'actions' => [
            'register' => 'Kayıt Ol',
            'login' => 'Giriş Yap',
        ],
        'messages' => [
            'success' => 'Kayıt başarılı! Lütfen e-posta adresinizi doğrulayın.',
        ],
    ],
    'forgot_password' => [
        'title' => 'Şifremi Unuttum',
        'description' => 'Şifrenizi mi unuttunuz? E-posta adresinizi girin, size şifre sıfırlama bağlantısı gönderelim.',
        'fields' => [
            'email' => 'E-posta Adresi',
        ],
        'actions' => [
            'send_reset_link' => 'Şifre Sıfırlama Bağlantısı Gönder',
            'back_to_login' => 'Giriş Yap',
        ],
        'messages' => [
            'sent' => 'Şifre sıfırlama bağlantısı e-posta adresinize gönderildi!',
        ],
    ],
    'reset_password' => [
        'title' => 'Şifre Sıfırla',
        'description' => 'Yeni şifrenizi belirleyin',
        'fields' => [
            'email' => 'E-posta Adresi',
            'password' => 'Yeni Şifre',
            'password_confirmation' => 'Yeni Şifre Tekrar',
        ],
        'actions' => [
            'reset_password' => 'Şifreyi Sıfırla',
        ],
        'messages' => [
            'success' => 'Şifreniz başarıyla sıfırlandı!',
        ],
    ],
    'verify_email' => [
        'title' => 'E-posta Doğrulama',
        'description' => 'E-posta adresinizi doğrulamak için size bir doğrulama bağlantısı gönderdik.',
        'messages' => [
            'sent' => 'Yeni bir doğrulama bağlantısı gönderildi.',
            'resend' => 'Başka bir doğrulama bağlantısı gönder',
        ],
    ],
    'confirm_password' => [
        'title' => 'Şifre Onayı',
        'description' => 'Bu işlem için lütfen şifrenizi onaylayın.',
        'fields' => [
            'password' => 'Şifre',
        ],
        'actions' => [
            'confirm' => 'Onayla',
        ],
    ],
];
