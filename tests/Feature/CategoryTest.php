<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CategoryTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    private const EXISTING_CATEGORY_NAME = 'Existing Category';

    protected function setUp(): void
    {
        parent::setUp();
        
        // Create a user for authentication
        $this->user = User::factory()->create();
    }

    /** @test */
    public function it_can_create_a_category()
    {
        $categoryData = [
            'name' => 'Test Category',
            'is_publish' => true,
        ];

        $response = $this->actingAs($this->user)
            ->post(route('categories.store'), $categoryData);

        $response->assertRedirect(route('categories.index'))
            ->assertSessionHas('success', 'Kategori berhasil dibuat.');

        $this->assertDatabaseHas('categories', [
            'name' => 'Test Category',
            'is_publish' => true,
        ]);
    }

    /** @test */
    public function it_can_update_a_category()
    {
        $category = Category::factory()->create([
            'name' => 'Original Category',
            'is_publish' => false,
        ]);

        $updateData = [
            'name' => 'Updated Category',
            'is_publish' => true,
        ];

        $response = $this->actingAs($this->user)
            ->put(route('categories.update', $category), $updateData);

        $response->assertRedirect(route('categories.index'))
            ->assertSessionHas('success', 'Kategori berhasil diperbarui.');

        $this->assertDatabaseHas('categories', [
            'id' => $category->id,
            'name' => 'Updated Category',
            'is_publish' => true,
        ]);
    }

    /** @test */
    public function it_can_delete_a_category()
    {
        $category = Category::factory()->create();

        $response = $this->actingAs($this->user)
            ->delete(route('categories.destroy', $category));

        $response->assertRedirect(route('categories.index'))
            ->assertSessionHas('success', 'Kategori berhasil dihapus.');

        $this->assertDatabaseMissing('categories', [
            'id' => $category->id,
        ]);
    }

    /** @test */
    public function it_validates_required_fields_when_creating_category()
    {
        $response = $this->actingAs($this->user)
            ->post(route('categories.store'), []);

        $response->assertSessionHasErrors(['name', 'is_publish']);
    }

    /** @test */
    public function it_validates_unique_name_when_creating_category()
    {
        Category::factory()->create(['name' => self::EXISTING_CATEGORY_NAME]);

        $response = $this->actingAs($this->user)
            ->post(route('categories.store'), [
                'name' => self::EXISTING_CATEGORY_NAME,
                'is_publish' => true,
            ]);

        $response->assertSessionHasErrors(['name']);
    }

    /** @test */
    public function it_validates_unique_name_when_updating_category()
    {
        Category::factory()->create(['name' => self::EXISTING_CATEGORY_NAME]);
        $categoryToUpdate = Category::factory()->create(['name' => 'Category to Update']);

        $response = $this->actingAs($this->user)
            ->put(route('categories.update', $categoryToUpdate), [
                'name' => self::EXISTING_CATEGORY_NAME,
                'is_publish' => true,
            ]);

        $response->assertSessionHasErrors(['name']);
    }

    /** @test */
    public function it_can_filter_categories_by_search()
    {
        Category::factory()->create(['name' => 'Web Development']);
        Category::factory()->create(['name' => 'Mobile Development']);
        Category::factory()->create(['name' => 'Design']);

        $response = $this->actingAs($this->user)
            ->get(route('categories.index', ['search' => 'Development']));

        $response->assertStatus(200);
        // Additional assertions can be added based on the view structure
    }

    /** @test */
    public function it_shows_published_categories_scope()
    {
        $publishedCategory = Category::factory()->create(['is_publish' => true]);
        $draftCategory = Category::factory()->create(['is_publish' => false]);

        $publishedCategories = Category::published()->get();

        $this->assertTrue($publishedCategories->contains($publishedCategory));
        $this->assertFalse($publishedCategories->contains($draftCategory));
    }
}
