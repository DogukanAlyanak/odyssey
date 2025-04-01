<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class TestMailCommand extends Command
{
    protected $signature = 'mail:test {email=test@example.com}';
    protected $description = 'Test mail gönderimi yapar';

    public function handle()
    {
        $email = $this->argument('email');

        try {
            Mail::raw('Bu bir test mailidir.', function($message) use ($email) {
                $message->to($email)
                       ->subject('Test Mail');
            });

            $this->info('Mail başarıyla gönderildi!');
            $this->info('Mailpit web arayüzünü kontrol edin: http://localhost:8025');
        } catch (\Exception $e) {
            $this->error('Mail gönderilirken bir hata oluştu: ' . $e->getMessage());
            $this->error($e->getTraceAsString());
        }
    }
}
