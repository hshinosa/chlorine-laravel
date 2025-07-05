<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $defaultCategories = [
            [
                'name' => 'Hubungan Industrial',
                'is_publish' => true,
            ],
            [
                'name' => 'Latihan Kerja',
                'is_publish' => true,
            ],
            [
                'name' => 'Pelatihan Berbasis Kompetensi',
                'is_publish' => true,
            ],
            [
                'name' => 'Uji Kompetensi',
                'is_publish' => true,
            ],
            [
                'name' => 'Bursa Kerja',
                'is_publish' => true,
            ],
            [
                'name' => 'Pemagangan',
                'is_publish' => true,
            ],
            [
                'name' => 'Keselamatan dan Kesehatan Kerja',
                'is_publish' => true,
            ],
            [
                'name' => 'Sertifikasi Kompetensi',
                'is_publish' => true,
            ],
            [
                'name' => 'Pengawasan Ketenagakerjaan',
                'is_publish' => true,
            ],
            [
                'name' => 'Jaminan Sosial Ketenagakerjaan',
                'is_publish' => true,
            ],
        ];

        foreach ($defaultCategories as $category) {
            Category::firstOrCreate(
                ['name' => $category['name']],
                $category
            );
        }

        $createdCount = 0;
        $maxAttempts = 200;
        $targetCount = 90;

        for ($i = 0; $i < $maxAttempts && $createdCount < $targetCount; $i++) {
            try {
                $categoryData = Category::factory()->make()->toArray();
                
                if (!Category::where('name', $categoryData['name'])->exists()) {
                    Category::create($categoryData);
                    $createdCount++;
                }
            } catch (\Exception $e) {
                continue;
            }
        }

        if ($createdCount < $targetCount) {
            $remaining = $targetCount - $createdCount;
            
            for ($i = 1; $i <= $remaining; $i++) {
                $name = "Kategori Layanan " . ($createdCount + $i);
                
                Category::firstOrCreate(
                    ['name' => $name],
                    [
                        'name' => $name,
                        'is_publish' => rand(0, 1) == 1,
                    ]
                );
            }
        }

        $this->command->info('Categories seeded successfully. Total: ' . Category::count());
    }
}
