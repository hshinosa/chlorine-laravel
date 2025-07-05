import React from 'react';
import { Head } from '@inertiajs/react';
import NewsLayout from '@/Layouts/NewsLayout';
import NewsCard from '@/Components/News/NewsCard';
import { newsData } from '@/Data/newsData';

export default function CategoryPage({ category = 'teknologi' }) {
    // Filter articles by category
    const allArticles = [
        ...newsData.featuredArticles,
        ...newsData.trendingArticles,
        ...newsData.latestArticles
    ];
    
    const categoryArticles = allArticles.filter(
        article => article.category.toLowerCase() === category.toLowerCase()
    );

    const categoryInfo = newsData.categories.find(
        cat => cat.slug.toLowerCase() === category.toLowerCase()
    ) || { name: category, color: 'bg-blue-100 text-blue-800' };

    return (
        <NewsLayout>
            <Head title={`${categoryInfo.name} - NewsPortal`} />

            <div className="space-y-8">
                {/* Category Header */}
                <div className="text-center py-12 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg">
                    <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${categoryInfo.color} mb-4`}>
                        {categoryInfo.name}
                    </span>
                    <h1 className="text-4xl font-bold mb-4">
                        Berita {categoryInfo.name}
                    </h1>
                    <p className="text-blue-100 max-w-2xl mx-auto">
                        Temukan berita terbaru dan terpercaya seputar {categoryInfo.name.toLowerCase()} 
                        dari berbagai sumber terpercaya
                    </p>
                </div>

                {/* Breadcrumb */}
                <nav className="flex" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <a href="/" className="text-blue-600 hover:text-blue-800">Beranda</a>
                        </li>
                        <li aria-current="page">
                            <div className="flex items-center">
                                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                                </svg>
                                <span className="ml-1 text-gray-500 md:ml-2">{categoryInfo.name}</span>
                            </div>
                        </li>
                    </ol>
                </nav>

                {/* Filter and Sort */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">
                            {categoryArticles.length} artikel ditemukan
                        </span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <label htmlFor="sort" className="text-sm text-gray-600">Urutkan:</label>
                        <select 
                            id="sort"
                            className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="newest">Terbaru</option>
                            <option value="popular">Terpopuler</option>
                            <option value="views">Paling Banyak Dibaca</option>
                        </select>
                    </div>
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryArticles.length > 0 ? (
                        categoryArticles.map((article) => (
                            <NewsCard 
                                key={article.id} 
                                article={article} 
                                size="medium"
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <div className="text-gray-400">
                                <svg className="w-16 h-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    Belum ada artikel
                                </h3>
                                <p className="text-gray-500">
                                    Artikel untuk kategori {categoryInfo.name} akan segera hadir.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Load More Button */}
                {categoryArticles.length > 0 && (
                    <div className="text-center">
                        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Muat Lebih Banyak
                        </button>
                    </div>
                )}

                {/* Related Categories */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Kategori Lainnya
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {newsData.categories
                            .filter(cat => cat.slug.toLowerCase() !== category.toLowerCase())
                            .map((cat) => (
                                <a
                                    key={cat.id}
                                    href={`/kategori/${cat.slug}`}
                                    className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                                >
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${cat.color} mb-2 group-hover:scale-105 transition-transform`}>
                                        {cat.name}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        {cat.count} artikel
                                    </span>
                                </a>
                            ))
                        }
                    </div>
                </div>
            </div>
        </NewsLayout>
    );
}
