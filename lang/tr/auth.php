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
        'description' => 'Kayıt olduğunuz için teşekkürler! Başlamadan önce, size az önce e-posta ile gönderdiğimiz bağlantıya tıklayarak e-posta adresinizi doğrulayabilir misiniz?',
        'verification_link_sent' => 'Yeni bir doğrulama bağlantısı e-posta adresinize gönderildi.',
        'resend_button' => 'Doğrulama Bağlantısını Yeniden Gönder',
        'logout_button' => 'Çıkış Yap',
        'subject' => 'E-posta Adresinizi Doğrulayın',
        'greeting' => 'Merhaba :name,',
        'thanks' => 'Hesabınızı oluşturduğunuz için teşekkür ederiz. Lütfen aşağıdaki butona tıklayarak e-posta adresinizi doğrulayın.',
        'action' => 'E-posta Adresimi Doğrula',
        'no_action' => 'Eğer hesap oluşturmadıysanız, başka bir işlem yapmanıza gerek yoktur.',
        'footer' => 'Bu e-posta :app_name tarafından gönderilmiştir.',
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
    'failed' => 'Bu kimlik bilgileri kayıtlarımızla eşleşmiyor.',
    'password' => 'Belirtilen şifre yanlış.',
    'throttle' => 'Çok fazla giriş denemesi. Lütfen :seconds saniye sonra tekrar deneyin.',
    'team_members' => 'Takım Üyeleri',
    'you' => 'Siz',
];
