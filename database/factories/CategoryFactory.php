<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $baseCategories = [
            'Hubungan Industrial',
            'Latihan Kerja', 
            'Pelatihan Kerja',
            'Sertifikasi Kompetensi',
            'Bursa Kerja',
            'Pemagangan',
            'Mediasi Ketenagakerjaan',
            'Pengawasan Ketenagakerjaan',
            'Pembinaan Tenaga Kerja',
            'Jaminan Sosial Ketenagakerjaan',
            'Keselamatan dan Kesehatan Kerja',
            'Pelatihan Berbasis Kompetensi',
            'Uji Kompetensi Profesi',
            'Pelatihan Kewirausahaan',
            'Konsultasi Ketenagakerjaan',
            'Penempatan Tenaga Kerja',
            'Perlindungan Pekerja',
            'Standarisasi Kompetensi',
            'Akreditasi Lembaga',
            'Sertifikasi Profesi'
        ];

        $adjectives = [
            'Dasar', 'Lanjutan', 'Profesional', 'Khusus', 'Umum', 'Teknis',
            'Praktis', 'Teoritis', 'Intensif', 'Reguler', 'Cepat', 'Komprehensif',
            'Terpadu', 'Mandiri', 'Berkelanjutan', 'Online', 'Offline', 'Hybrid'
        ];

        $sectors = [
            'Manufaktur', 'Konstruksi', 'Perhotelan', 'Pariwisata', 'Teknologi',
            'Kesehatan', 'Pendidikan', 'Pertanian', 'Perikanan', 'Kehutanan',
            'Tekstil', 'Otomotif', 'Elektronik', 'Kimia', 'Farmasi'
        ];

        $namePatterns = [
            // Pattern 1: Base + Adjective
            $this->faker->randomElement($baseCategories) . ' ' . $this->faker->randomElement($adjectives),
            
            // Pattern 2: Base + Sector
            $this->faker->randomElement($baseCategories) . ' ' . $this->faker->randomElement($sectors),
            
            // Pattern 3: Adjective + Base
            $this->faker->randomElement($adjectives) . ' ' . $this->faker->randomElement($baseCategories),
            
            // Pattern 4: Base + Number
            $this->faker->randomElement($baseCategories) . ' ' . $this->faker->numberBetween(1, 50),
            
            // Pattern 5: Base + Year
            $this->faker->randomElement($baseCategories) . ' ' . $this->faker->year(),
            
            // Pattern 6: Complex combination
            $this->faker->randomElement($adjectives) . ' ' . 
            $this->faker->randomElement($baseCategories) . ' ' . 
            $this->faker->randomElement($sectors)
        ];

        return [
            'name' => $this->faker->randomElement($namePatterns),
            'is_publish' => $this->faker->boolean(80),
        ];
    }

    /**
     * Indicate that the category is published.
     */
    public function published(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_publish' => true,
        ]);
    }

    /**
     * Indicate that the category is draft.
     */
    public function draft(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_publish' => false,
        ]);
    }
}
