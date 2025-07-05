import React from 'react';
import { Link } from '@inertiajs/react';
import { formatDate, formatNumber } from '@/Data/newsData';

export default function TrendingSection({ articles }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-6">
                <div className="flex items-center space-x-2">
                    <div className="w-2 h-6 bg-red-500 rounded-full"></div>
                    <h2 className="text-xl font-bold text-gray-900">Trending Hari Ini</h2>
                </div>
                <div className="ml-auto">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        🔥 Hot
                    </span>
                </div>
            </div>
            
            <div className="space-y-4">
                {articles.map((article, index) => (
                    <Link 
                        key={article.id}
                        href={`/artikel/${article.slug}`}
                        className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                        <div className="flex-shrink-0">
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-800 text-sm font-bold">
                                {index + 1}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">
                                {article.title}
                            </h4>
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                    {article.category}
                                </span>
                                <span>•</span>
                                <span>{formatNumber(article.views)} views</span>
                                <span>•</span>
                                <span>{article.readTime}</span>
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-16 h-16 rounded-lg object-cover group-hover:scale-105 transition-transform"
                            />
                        </div>
                    </Link>
                ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
                <Link 
                    href="/trending" 
                    className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                    Lihat semua trending
                    <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}
