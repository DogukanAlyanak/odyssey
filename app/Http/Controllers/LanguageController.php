<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class LanguageController extends Controller
{
    public function switchLang($lang)
    {
        if (array_key_exists($lang, config('app.available_locales'))) {
            session()->put('locale', $lang);

            return redirect()->back()->with([
                'currentLocale' => $lang
            ]);
        }
        return redirect()->back();
    }
}
