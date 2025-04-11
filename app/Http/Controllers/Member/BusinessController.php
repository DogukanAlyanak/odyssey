<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\Business;
use App\Models\Company;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class BusinessController extends Controller
{
    /**
     * İşletmeleri listele
     */
    public function index(Request $request, $slug)
    {
        $company = Auth::user()->companies()
            ->where('slug', $slug)
            ->firstOrFail();

        $search = $request->input('search');
        $businesses = $company->businesses()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhere('slug', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Member/Businesses/index', [
            'company' => $company,
            'businesses' => $businesses,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Yeni işletme oluşturma formu
     */
    public function create($slug)
    {
        $company = Auth::user()->companies()
            ->where('slug', $slug)
            ->firstOrFail();

        return Inertia::render('Member/Businesses/create', [
            'company' => $company,
        ]);
    }

    /**
     * Yeni işletme kaydet
     */
    public function store(Request $request, $slug)
    {
        $company = Auth::user()->companies()
            ->where('slug', $slug)
            ->firstOrFail();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:businesses,slug',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255',
            'website' => 'nullable|url|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $business = $company->businesses()->create($validated);

        return redirect()->route('member.businesses.edit', [
            'slug' => $company->slug,
            'id' => $business->id
        ])->with('success', trans('member.businesses.messages.created'));
    }

    /**
     * İşletme detayları
     */
    public function show($slug, $id)
    {
        $company = Auth::user()->companies()
            ->where('slug', $slug)
            ->firstOrFail();

        $business = $company->businesses()
            ->findOrFail($id);

        return Inertia::render('Member/Businesses/show', [
            'company' => $company,
            'business' => $business,
        ]);
    }

    /**
     * İşletme düzenleme formu
     */
    public function edit($slug, $id)
    {
        $company = Auth::user()->companies()
            ->where('slug', $slug)
            ->firstOrFail();

        $business = $company->businesses()
            ->findOrFail($id);

        return Inertia::render('Member/Businesses/edit', [
            'company' => $company,
            'business' => $business,
        ]);
    }

    /**
     * İşletme güncelle
     */
    public function update(Request $request, $slug, $id)
    {
        $company = Auth::user()->companies()
            ->where('slug', $slug)
            ->firstOrFail();

        $business = $company->businesses()
            ->findOrFail($id);

        // is_locked kontrolü
        if ($business->is_locked) {
            return back()->with('error', trans('member.businesses.messages.locked'));
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:businesses,slug,' . $business->id,
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255',
            'website' => 'nullable|url|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $business->update($validated);

        return back()->with('success', trans('member.businesses.messages.updated'));
    }

    /**
     * İşletme sil
     */
    public function destroy($slug, $id)
    {
        $company = Auth::user()->companies()
            ->where('slug', $slug)
            ->firstOrFail();

        $business = $company->businesses()
            ->findOrFail($id);

        // is_locked kontrolü
        if ($business->is_locked) {
            return back()->with('error', trans('member.businesses.messages.locked'));
        }

        $business->delete();

        return redirect()->route('member.businesses.index', $company->slug)
            ->with('success', trans('member.businesses.messages.deleted'));
    }
}
