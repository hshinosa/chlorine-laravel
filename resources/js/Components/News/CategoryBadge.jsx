import React from 'react';
import { Link } from '@inertiajs/react';

export default function CategoryBadge({ categories }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Kategori Populer</h3>
            <div className="space-y-3">
                {categories.map((category) => (
                    <Link
                        key={category.id}
                        href={`/kategori/${category.slug}`}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                        <div className="flex items-center space-x-3">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${category.color}`}>
                                {category.name}
                            </span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <span>{category.count} artikel</span>
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
