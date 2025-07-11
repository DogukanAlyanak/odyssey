<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        // Dil ayarını belirle
        $locale = session('locale');
        if (!$locale && $request->user()) {
            $locale = $request->user()->locale;
        }
        $locale = $locale ?? config('app.locale');

        // Uygulama dilini ayarla
        app()->setLocale($locale);

        // Çevirileri yükle
        // cursora not : bu kısımda tüm dil dosyalarını yükler bu yüzden güncellemene gerek yok.
        $translations = [];
        $langFiles = glob(lang_path($locale . '/*.php'));
        foreach ($langFiles as $file) {
            $key = basename($file, '.php');
            $translations[$key] = require $file;
        }

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user() ? $request->user()->load('companies') : null,
            ],
            'ziggy' => fn (): array => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'currentLocale' => $locale,
            'translations' => $translations,
        ];
    }
}
