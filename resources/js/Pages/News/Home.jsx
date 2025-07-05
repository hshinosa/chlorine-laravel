import React from 'react';
import { Head } from '@inertiajs/react';
import NewsLayout from '@/Layouts/NewsLayout';
import NewsCard from '@/Components/News/NewsCard';
import TrendingSection from '@/Components/News/TrendingSection';
import CategoryBadge from '@/Components/News/CategoryBadge';
import { newsData } from '@/Data/newsData';

export default function NewsHome() {
    const { featuredArticles, trendingArticles, latestArticles, categories } = newsData;

    return (
        <NewsLayout>
            <Head title="Beranda - NewsPortal" />

            <div className="space-y-8">
                {/* Hero Section dengan Artikel Featured */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {featuredArticles.map((article) => (
                        <NewsCard 
                            key={article.id} 
                            article={article} 
                            featured={true}
                        />
                    ))}
                </section>

                {/* Breaking News Banner */}
                <section className="bg-red-600 text-white rounded-lg p-4">
                    <div className="flex items-center space-x-4">
                        <span className="bg-white text-red-600 px-3 py-1 rounded-full text-sm font-bold">
                            BREAKING
                        </span>
                        <div className="flex-1">
                            <p className="font-medium">
                                Pemerintah umumkan kebijakan baru untuk mendukung pemulihan ekonomi nasional
                            </p>
                        </div>
                        <button className="text-white hover:text-gray-200">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </section>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Content Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Berita Terbaru Section */}
                        <section>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">Berita Terbaru</h2>
                                <button className="text-blue-600 hover:text-blue-500 font-medium">
                                    Lihat Semua
                                </button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {latestArticles.map((article) => (
                                    <NewsCard 
                                        key={article.id} 
                                        article={article} 
                                        size="medium"
                                    />
                                ))}
                            </div>
                        </section>

                        {/* Newsletter Subscription */}
                        <section className="bg-blue-50 rounded-lg p-6">
                            <div className="text-center">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    Berlangganan Newsletter
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Dapatkan berita terbaru langsung di inbox Anda
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                                    <input
                                        type="email"
                                        placeholder="Masukkan email Anda"
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                        Berlangganan
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Trending Section */}
                        <TrendingSection articles={trendingArticles} />

                        {/* Category Section */}
                        <CategoryBadge categories={categories} />

                        {/* Advertisement Placeholder */}
                        <div className="bg-gray-100 rounded-lg p-8 text-center">
                            <div className="text-gray-400">
                                <svg className="w-12 h-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p className="text-sm">Advertisement Space</p>
                            </div>
                        </div>

                        {/* Social Media Widget */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ikuti Kami</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <a href="#" className="flex items-center justify-center p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                                    <span className="text-blue-600 font-medium">Facebook</span>
                                </a>
                                <a href="#" className="flex items-center justify-center p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                                    <span className="text-blue-600 font-medium">Twitter</span>
                                </a>
                                <a href="#" className="flex items-center justify-center p-3 bg-pink-50 hover:bg-pink-100 rounded-lg transition-colors">
                                    <span className="text-pink-600 font-medium">Instagram</span>
                                </a>
                                <a href="#" className="flex items-center justify-center p-3 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
                                    <span className="text-red-600 font-medium">YouTube</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </NewsLayout>
    );
}
