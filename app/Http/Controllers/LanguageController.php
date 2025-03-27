<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LanguageController extends Controller
{
    public function switchLang($lang)
    {
        if (array_key_exists($lang, config('app.available_locales'))) {
            session()->put('locale', $lang);

            if (Auth::check()) {
                Auth::user()->update(['locale' => $lang]);
            }

            return redirect()->back()->with([
                'currentLocale' => $lang
            ]);
        }
        return redirect()->back();
    }

    public function update(Request $request)
    {
        $request->validate([
            'locale' => ['required', 'string', 'in:' . implode(',', array_keys(config('app.available_locales')))],
        ]);

        $locale = $request->input('locale');
        session()->put('locale', $locale);

        if (Auth::check()) {
            Auth::user()->update(['locale' => $locale]);
        }

        // Uygulama dilini ayarla
        app()->setLocale($locale);

        return redirect()->back();
    }
}
