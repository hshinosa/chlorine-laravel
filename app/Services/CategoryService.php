<?php

namespace App\Services;

use App\Interfaces\CategoryRepositoryInterface;
use App\Models\Category;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class CategoryService
{
    /** @var \App\Interfaces\CategoryRepositoryInterface */
    protected CategoryRepositoryInterface $categoryRepository;

    /**
     * Create a new service instance.
     *
     * @param \App\Interfaces\CategoryRepositoryInterface $categoryRepository
     */
    public function __construct(CategoryRepositoryInterface $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    /**
     * Get all categories.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAllCategories(): Collection
    {
        return $this->categoryRepository->getAllCategories();
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
        return $this->categoryRepository->getCategoriesWithPagination($perPage, $search, $date);
    }

    /**
     * Get published categories.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getPublishedCategories(): Collection
    {
        return $this->categoryRepository->getPublishedCategories();
    }

    /**
     * Get published categories with pagination.
     *
     * @param int $perPage
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function getPublishedCategoriesWithPagination(int $perPage = 10): LengthAwarePaginator
    {
        return $this->categoryRepository->getPublishedCategoriesWithPagination($perPage);
    }

    /**
     * Get category by ID.
     *
     * @param int $id
     * @return \App\Models\Category|null
     */
    public function getCategoryById(int $id): ?Category
    {
        return $this->categoryRepository->getCategoryById($id);
    }

    /**
     * Create a new category.
     *
     * @param array $data
     * @return \App\Models\Category
     */
    public function createCategory(array $data): Category
    {
        return $this->categoryRepository->createCategory($data);
    }

    /**
     * Update a category.
     *
     * @param int $id
     * @param array $data
     * @return \App\Models\Category|null
     */
    public function updateCategory(int $id, array $data): ?Category
    {
        return $this->categoryRepository->updateCategory($id, $data);
    }

    /**
     * Delete a category.
     *
     * @param int $id
     * @return bool
     */
    public function deleteCategory(int $id): bool
    {
        return $this->categoryRepository->deleteCategory($id);
    }

    /**
     * Get total categories count.
     *
     * @return int
     */
    public function getTotalCount(): int
    {
        return $this->categoryRepository->getTotalCount();
    }

    /**
     * Get published categories count.
     *
     * @return int
     */
    public function getPublishedCount(): int
    {
        return $this->categoryRepository->getPublishedCount();
    }

    /**
     * Get draft categories count.
     *
     * @return int
     */
    public function getDraftCount(): int
    {
        return $this->categoryRepository->getDraftCount();
    }

    public function getRecentCount(int $days = 7): int
    {
        return $this->categoryRepository->getRecentCount($days);
    }
}
