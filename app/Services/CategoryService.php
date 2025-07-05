<?php

namespace App\Services;

use App\Interfaces\CategoryRepositoryInterface;
use App\Mail\CategoryCreatedMail;
use App\Mail\CategoryDeletedMail;
use App\Mail\CategoryUpdatedMail;
use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Mail;

class CategoryService
{
    /** @var string */
    private const DATE_FORMAT = 'd M Y, H:i';
    
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
        $category = $this->categoryRepository->createCategory($data);
        
        // Send email notification to all users
        $this->sendCategoryCreatedNotification($category);
        
        return $category;
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
        $category = $this->categoryRepository->updateCategory($id, $data);
        
        if ($category) {
            // Send email notification to all users
            $this->sendCategoryUpdatedNotification($category);
        }
        
        return $category;
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
        
        if (!$category) {
            return false;
        }
        
        // Prepare category data before deletion
        $categoryData = [
            'id' => $category->id,
            'name' => $category->name,
            'is_publish' => $category->is_publish,
            'deleted_at' => now()->format(self::DATE_FORMAT)
        ];
        
        $deleted = $this->categoryRepository->deleteCategory($id);
        
        if ($deleted) {
            // Send email notification to all users
            $this->sendCategoryDeletedNotification($categoryData);
        }
        
        return $deleted;
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

    /**
     * Send category created notification to all users.
     *
     * @param \App\Models\Category $category
     * @return void
     */
    protected function sendCategoryCreatedNotification(Category $category): void
    {
        $users = User::all();
        
        // Prepare category data as array to avoid model dependency issues
        $categoryData = [
            'id' => $category->id,
            'name' => $category->name,
            'is_publish' => $category->is_publish,
            'created_at' => $category->created_at->format(self::DATE_FORMAT)
        ];
        
        foreach ($users as $index => $user) {
            // Prepare user data as array
            $userData = [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email
            ];
            
            // Send email with primitive data and delay to avoid rate limits
            $delay = now()->addSeconds($index * 2); // 2 second delay between emails
            Mail::to($user->email)->later($delay, new CategoryCreatedMail($categoryData, $userData));
        }
    }

    /**
     * Send category deleted notification to all users.
     *
     * @param array $categoryData
     * @return void
     */
    protected function sendCategoryDeletedNotification(array $categoryData): void
    {
        $users = User::all();
        
        foreach ($users as $index => $user) {
            // Prepare user data as array
            $userData = [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email
            ];
            
            // Send email with primitive data and delay to avoid rate limits
            $delay = now()->addSeconds($index * 3); // 3 second delay for delete emails
            Mail::to($user->email)->later($delay, new CategoryDeletedMail($categoryData, $userData));
        }
    }

    /**
     * Send category updated notification to all users.
     *
     * @param \App\Models\Category $category
     * @return void
     */
    protected function sendCategoryUpdatedNotification(Category $category): void
    {
        $users = User::all();
        
        // Prepare category data as array to avoid model dependency issues
        $categoryData = [
            'id' => $category->id,
            'name' => $category->name,
            'is_publish' => $category->is_publish,
            'updated_at' => $category->updated_at->format(self::DATE_FORMAT)
        ];
        
        foreach ($users as $index => $user) {
            // Prepare user data as array
            $userData = [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email
            ];
            
            // Send email with primitive data and delay to avoid rate limits
            $delay = now()->addSeconds($index * 2); // 2 second delay between emails
            Mail::to($user->email)->later($delay, new CategoryUpdatedMail($categoryData, $userData));
        }
    }
}
