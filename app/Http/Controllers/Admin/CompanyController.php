<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class CompanyController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $companies = Company::query()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhere('slug', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Companies/Index', [
            'companies' => $companies,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Companies/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:companies,slug',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255',
            'website' => 'nullable|url|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'users' => 'nullable|array',
            'users.*.email' => 'nullable|email|exists:users,email',
        ]);

        $company = Company::create(collect($validated)->except('users')->toArray());

        // Oturum kullanıcısını ekle
        $company->users()->attach(Auth::id());

        // Ek kullanıcıları ekle
        if (!empty($validated['users'])) {
            foreach ($validated['users'] as $userData) {
                if (!empty($userData['email'])) {
                    $user = User::where('email', $userData['email'])->first();
                    if ($user && !$company->users->contains($user->id)) {
                        $company->users()->attach($user->id);
                    }
                }
            }
        }

        return redirect()->route('admin.companies.edit', $company)
            ->with('success', trans('admin.companies.messages.created'));
    }

    public function show(Company $company)
    {
        return Inertia::render('Admin/Companies/Show', [
            'company' => $company->load('users'),
        ]);
    }

    public function edit(Company $company)
    {
        return Inertia::render('Admin/Companies/Edit', [
            'company' => $company->load('users'),
        ]);
    }

    public function update(Request $request, Company $company)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:companies,slug,' . $company->id,
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255',
            'website' => 'nullable|url|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'users' => 'nullable|array',
            'users.*.email' => 'nullable|email|exists:users,email',
        ]);

        $company->update(collect($validated)->except('users')->toArray());

        // Kullanıcıları güncelle
        if (isset($validated['users'])) {
            $userIds = [];
            foreach ($validated['users'] as $userData) {
                if (!empty($userData['email'])) {
                    $user = User::where('email', $userData['email'])->first();
                    if ($user) {
                        $userIds[] = $user->id;
                    }
                }
            }
            $company->users()->sync($userIds);
        }

        return back()->with('success', trans('admin.companies.messages.updated'));
    }

    public function destroy(Company $company)
    {
        $company->delete();

        return redirect()->route('admin.companies.index')
            ->with('success', trans('admin.companies.messages.deleted'));
    }

    public function searchUsers(Request $request)
    {
        $search = $request->input('search');
        $users = User::where('email', 'like', "%{$search}%")
            ->orWhere('name', 'like', "%{$search}%")
            ->limit(10)
            ->get(['id', 'name', 'email']);

        return response()->json($users);
    }
}
