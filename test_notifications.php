<?php

require_once 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';

use App\Services\CategoryService;
use App\Repositories\CategoryRepository;

// Test create category
echo "Testing category creation...\n";
$service = new CategoryService(new CategoryRepository());
$category = $service->createCategory([
    'name' => 'Test Category Improved',
    'is_publish' => true
]);
echo "Created category: {$category->name} (ID: {$category->id})\n";

sleep(2);

// Test update category  
echo "Testing category update...\n";
$updatedCategory = $service->updateCategory($category->id, [
    'name' => 'Updated Test Category',
    'is_publish' => false
]);
echo "Updated category: {$updatedCategory->name}\n";

sleep(2);

// Test delete category
echo "Testing category deletion...\n";
$deleted = $service->deleteCategory($category->id);
echo $deleted ? "Category deleted successfully\n" : "Failed to delete category\n";

echo "All tests completed. Check your email queue and Mailtrap!\n";
