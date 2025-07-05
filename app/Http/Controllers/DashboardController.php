<?php

namespace App\Http\Controllers;

use App\Services\CategoryService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /** @var \App\Services\CategoryService */
    protected CategoryService $categoryService;

    /**
     * Create a new controller instance.
     *
     * @param \App\Services\CategoryService $categoryService
     */
    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    /**
     * Display dashboard with paginated services
     *
     * @param \Illuminate\Http\Request $request
     * @return \Inertia\Response
     */
    public function index(Request $request): Response
    {
        // Get pagination parameters
        // Default 5 items per page for dashboard
        $perPage = $request->input('per_page', 5);
        
        // Get paginated published categories only
        $categories = $this->categoryService
            ->getPublishedCategoriesWithPagination($perPage);
        
        // Transform categories into services format for dashboard
        $services = $this->transformCategoriesToServices($categories);

        return Inertia::render('Dashboard', [
            'auth' => [
                'user' => auth()->user(),
            ],
            'services' => $services,
        ]);
    }

    /**
     * Transform paginated categories to services format
     *
     * @param \Illuminate\Contracts\Pagination\LengthAwarePaginator $categories
     * @return array
     */
    private function transformCategoriesToServices($categories)
    {
        $services = $categories->toArray();
        $counter = ($categories->currentPage() - 1)
            * $categories->perPage() + 1;

        // Transform data structure
        $services['data'] = array_map(function($category) use (&$counter) {
            $categoryCode = $this->generateCategoryCode($category['name']);
            
            return [
                'no' => $counter++,
                'nama_layanan' => "[{$categoryCode}] {$category['name']}",
                'action' => 'Pilih',
                'category' => $categoryCode,
                'category_id' => $category['id'],
                'description' => $this->generateServiceDescription(
                    $category['name']
                ),
                'is_publish' => $category['is_publish'],
                'created_at' => $category['created_at'],
                'updated_at' => $category['updated_at'],
            ];
        }, $services['data']);

        return $services;
    }

    /**
     * Generate category code from category name
     *
     * @param string $categoryName
     * @return string
     */
    private function generateCategoryCode($categoryName)
    {
        $words = explode(' ', $categoryName);
        $code = '';
        
        foreach ($words as $word) {
            if (strlen(trim($word)) > 0) {
                $code .= strtoupper(substr(trim($word), 0, 1));
            }
        }
        
        return substr($code, 0, 3);
    }

    /**
     * Generate service description based on category
     *
     * @param string $categoryName
     * @return string
     */
    private function generateServiceDescription($categoryName)
    {
        $descriptions = [
            'Hubungan Industrial' => 'Layanan terkait hubungan antara pekerja dan pengusaha',
            'Latihan Kerja' => 'Program pelatihan untuk meningkatkan keterampilan kerja',
            'Pelatihan Berbasis Kompetensi' => 'Pelatihan sesuai standar kompetensi kerja nasional',
            'Uji Kompetensi' => 'Penilaian kompetensi sesuai standar yang berlaku',
            'Bursa Kerja' => 'Layanan penempatan dan pencarian kerja',
            'Pemagangan' => 'Program pemagangan untuk pengembangan keterampilan',
            'Keselamatan dan Kesehatan Kerja' => 'Layanan K3 untuk lingkungan kerja yang aman',
            'Sertifikasi Kompetensi' => 'Penerbitan sertifikat kompetensi kerja',
        ];

        foreach ($descriptions as $key => $desc) {
            if (stripos($categoryName, $key) !== false) {
                return $desc;
            }
        }

        return "Layanan dalam kategori {$categoryName}";
    }
}
