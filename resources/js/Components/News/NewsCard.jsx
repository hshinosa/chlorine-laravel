import React from 'react';
import { Link } from '@inertiajs/react';
import { formatDate, formatNumber } from '@/Data/newsData';

export default function NewsCard({ article, featured = false, size = 'medium' }) {
    const cardSizes = {
        small: 'group cursor-pointer',
        medium: 'group cursor-pointer',
        large: 'group cursor-pointer',
        featured: 'group cursor-pointer'
    };

    const imageSizes = {
        small: 'h-32 w-full',
        medium: 'h-48 w-full',
        large: 'h-64 w-full',
        featured: 'h-96 w-full'
    };

    if (featured) {
        return (
            <Link href={`/artikel/${article.slug}`} className={cardSizes.featured}>
                <article className="relative overflow-hidden rounded-lg shadow-lg bg-white hover:shadow-xl transition-all duration-300">
                    <div className="relative">
                        <img
                            src={article.image}
                            alt={article.title}
                            className={`${imageSizes.featured} object-cover group-hover:scale-105 transition-transform duration-300`}
                        />
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                        
                        {/* Category badge */}
                        <div className="absolute top-4 left-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-600 text-white">
                                {article.category}
                            </span>
                        </div>

                        {/* Content overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                            <h2 className="text-2xl font-bold mb-3 line-clamp-2 group-hover:text-blue-300 transition-colors">
                                {article.title}
                            </h2>
                            <p className="text-gray-200 mb-4 line-clamp-2">
                                {article.excerpt}
                            </p>
                            <div className="flex items-center justify-between text-sm text-gray-300">
                                <div className="flex items-center space-x-4">
                                    <span>{article.author}</span>
                                    <span>{formatDate(article.publishedAt)}</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span>{article.readTime}</span>
                                    <span>{formatNumber(article.views)} views</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </Link>
        );
    }

    return (
        <Link href={`/artikel/${article.slug}`} className={cardSizes[size]}>
            <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative">
                    <img
                        src={article.image}
                        alt={article.title}
                        className={`${imageSizes[size]} object-cover group-hover:scale-105 transition-transform duration-300`}
                    />
                    {/* Category badge */}
                    <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-800">
                            {article.category}
                        </span>
                    </div>
                </div>
                
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center space-x-2">
                            <span>{article.author}</span>
                            <span>•</span>
                            <span>{formatDate(article.publishedAt)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span>{article.readTime}</span>
                            <span>•</span>
                            <span>{formatNumber(article.views)} views</span>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
}
