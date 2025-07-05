<?php

namespace App\Repositories;

use App\Interfaces\CategoryRepositoryInterface;
use App\Models\Category;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class CategoryRepository implements CategoryRepositoryInterface
{
    /**
     * Get all categories.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAllCategories(): Collection
    {
        return Category::orderBy('created_at', 'desc')->get();
    }

    /**
     * Get categories with pagination.
     *
     * @param int $perPage
     * @param string|null $search
     * @param string|null $date
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function getCategoriesWithPagination(int $perPage = 10, ?string $search = null, ?string $date = null): LengthAwarePaginator
    {
        $query = Category::query();

        if ($search) {
            $query->where('name', 'like', '%' . $search . '%');
        }

        if ($date) {
            $query->whereDate('created_at', $date);
        }

        return $query->orderBy('created_at', 'desc')
            ->paginate($perPage)
            ->withQueryString();
    }

    /**
     * Get published categories.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getPublishedCategories(): Collection
    {
        return Category::published()
            ->orderBy('name', 'asc')
            ->get();
    }

    /**
     * Get published categories with pagination.
     *
     * @param int $perPage
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function getPublishedCategoriesWithPagination(int $perPage = 10): LengthAwarePaginator
    {
        return Category::published()
            ->orderBy('name', 'asc')
            ->paginate($perPage)
            ->withQueryString();
    }

    /**
     * Get category by ID.
     *
     * @param int $id
     * @return \App\Models\Category|null
     */
    public function getCategoryById(int $id): ?Category
    {
        return Category::find($id);
    }

    /**
     * Create a new category.
     *
     * @param array $data
     * @return \App\Models\Category
     */
    public function createCategory(array $data): Category
    {
        return Category::create($data);
    }

    /**
     * Update an existing category.
     *
     * @param int $id
     * @param array $data
     * @return \App\Models\Category|null
     */
    public function updateCategory(int $id, array $data): ?Category
    {
        $category = $this->getCategoryById($id);
        
        if ($category) {
            $category->update($data);
            return $category;
        }
        
        return null;
    }

    /**
     * Delete a category.
     *
     * @param int $id
     * @return bool
     */
    public function deleteCategory(int $id): bool
    {
        $category = $this->getCategoryById($id);
        
        if ($category) {
            return $category->delete();
        }
        
        return false;
    }

    /**
     * Get total count of categories.
     *
     * @return int
     */
    public function getTotalCount(): int
    {
        return Category::count();
    }

    /**
     * Get count of published categories.
     *
     * @return int
     */
    public function getPublishedCount(): int
    {
        return Category::where('is_publish', true)->count();
    }

    /**
     * Get count of draft categories.
     *
     * @return int
     */
    public function getDraftCount(): int
    {
        return Category::where('is_publish', false)->count();
    }

    /**
     * Get count of categories created in the last X days.
     *
     * @param int $days
     * @return int
     */
    public function getRecentCount(int $days = 7): int
    {
        return Category::where('created_at', '>=', now()->subDays($days))->count();
    }
}
