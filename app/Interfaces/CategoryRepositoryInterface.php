<?php

namespace App\Interfaces;

use App\Models\Category;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface CategoryRepositoryInterface
{
    public function getAllCategories(): Collection;

    public function getCategoriesWithPagination(int $perPage = 10, ?string $search = null, ?string $date = null): LengthAwarePaginator;

    public function getPublishedCategories(): Collection;

    public function getPublishedCategoriesWithPagination(int $perPage = 10): LengthAwarePaginator;
    
    public function getCategoryById(int $id): ?Category;

    public function createCategory(array $data): Category;

    public function updateCategory(int $id, array $data): ?Category;

    public function deleteCategory(int $id): bool;

    public function getTotalCount(): int;

    public function getPublishedCount(): int;

    public function getDraftCount(): int;

    public function getRecentCount(int $days = 7): int;
}
