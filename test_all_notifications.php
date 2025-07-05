<?php

// Test category create, update, delete
echo "=== Testing Category Email Notifications ===\n";

use App\Services\CategoryService;
use App\Models\User;

// Test create category
echo "1. Creating new category...\n";
$categoryService = app(CategoryService::class);

$categoryData = [
    'name' => 'Test Category ' . now()->format('H:i:s'),
    'is_publish' => true
];

$category = $categoryService->createCategory($categoryData);
echo "✓ Category created: " . $category->name . " (ID: " . $category->id . ")\n";

// Test update category
echo "2. Updating category...\n";
$updateData = [
    'name' => 'Updated Test Category ' . now()->format('H:i:s'),
    'is_publish' => false
];

$updatedCategory = $categoryService->updateCategory($category->id, $updateData);
echo "✓ Category updated: " . $updatedCategory->name . "\n";

// Test delete category
echo "3. Deleting category...\n";
$deleted = $categoryService->deleteCategory($category->id);
echo "✓ Category deleted: " . ($deleted ? 'Success' : 'Failed') . "\n";

// Count users to verify notifications sent to all
$userCount = User::count();
echo "4. Total users that should receive notifications: " . $userCount . "\n";

echo "\n=== Check your Mailtrap inbox for emails ===\n";
echo "Expected emails per user: 3 (created + updated + deleted)\n";
echo "Total expected emails: " . ($userCount * 3) . "\n";
