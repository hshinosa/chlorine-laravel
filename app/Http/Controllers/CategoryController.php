<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Inertia\Response
     */
    public function index(Request $request): Response
    {
        $query = Category::query();

        // Apply search filter
        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Apply date filter
        if ($request->filled('date')) {
            $query->whereDate('created_at', $request->date);
        }

        $categories = $query->orderBy('created_at', 'desc')->paginate(10);

        return Inertia::render('Categories/Index', [
            'categories' => $categories,
            'filters' => $request->only(['search', 'date']),
            'auth' => [
                'user' => auth()->user(),
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response
     */
    public function create(): Response
    {
        return Inertia::render('Categories/Create', [
            'auth' => [
                'user' => auth()->user(),
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Http\Requests\StoreCategoryRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StoreCategoryRequest $request)
    {
        try {
            Category::create($request->validated());

            return redirect()->route('categories.index')
                ->with('success', 'Kategori berhasil dibuat.');
        } catch (\Exception $e) {
            return back()->with('error', 'Gagal membuat kategori.');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Category $category
     * @return \Inertia\Response
     */
    public function show(Category $category): Response
    {
        return Inertia::render('Categories/Show', [
            'category' => $category,
            'auth' => [
                'user' => auth()->user(),
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Category $category
     * @return \Inertia\Response
     */
    public function edit(Category $category): Response
    {
        return Inertia::render('Categories/Edit', [
            'category' => $category,
            'auth' => [
                'user' => auth()->user(),
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\UpdateCategoryRequest $request
     * @param \App\Models\Category $category
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        try {
            $validated = $request->validated();
            
            // Compute only changed fields
            $dirty = [];
            foreach ($validated as $key => $value) {
                if ($category->{$key} != $value) {
                    $dirty[$key] = $value;
                }
            }

            if (!empty($dirty)) {
                $category->update($dirty);
            } else {
                // No changes detected
                \Log::info(
                    'No category fields changed for update',
                    ['category_id' => $category->id]
                );
            }

            return redirect()->route('categories.index')
                ->with('success', 'Kategori berhasil diperbarui.');
        } catch (\Exception $e) {
            \Log::error('Category update failed', [
                'category_id' => $category->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return back()
                ->withInput()
                ->with(
                    'error',
                    'Gagal memperbarui kategori: ' . $e->getMessage()
                );
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Category $category
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Category $category)
    {
        try {
            $category->delete();

            return redirect()->route('categories.index')
                ->with('success', 'Kategori berhasil dihapus.');
        } catch (\Exception $e) {
            return back()->with('error', 'Gagal menghapus kategori.');
        }
    }
}