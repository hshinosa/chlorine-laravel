import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function SearchModal({ isOpen, onClose }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // Mock search functionality
    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query.length > 2) {
            // Simulate search results
            setSearchResults([
                {
                    id: 1,
                    title: "Pemerintah Luncurkan Program Digitalisasi UMKM",
                    category: "Ekonomi",
                    excerpt: "Inisiatif baru untuk mendorong transformasi digital...",
                    slug: "pemerintah-luncurkan-program-digitalisasi-umkm"
                },
                {
                    id: 2,
                    title: "Breakthrough AI Indonesia Raih Penghargaan",
                    category: "Teknologi", 
                    excerpt: "Tim peneliti berhasil mengembangkan teknologi AI...",
                    slug: "breakthrough-ai-indonesia-penghargaan"
                }
            ]);
        } else {
            setSearchResults([]);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-start justify-center p-4 pt-16">
                <div className="fixed inset-0 bg-black bg-opacity-25 transition-opacity" onClick={onClose}></div>
                
                <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-xl">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Cari Artikel</h3>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        <div className="relative mb-4">
                            <input
                                type="text"
                                placeholder="Masukkan kata kunci pencarian..."
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                autoFocus
                            />
                            <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        {searchQuery.length > 0 && (
                            <div className="max-h-96 overflow-y-auto">
                                {searchResults.length > 0 ? (
                                    <div className="space-y-3">
                                        <p className="text-sm text-gray-600">
                                            {searchResults.length} hasil ditemukan untuk "{searchQuery}"
                                        </p>
                                        {searchResults.map((result) => (
                                            <Link
                                                key={result.id}
                                                href={`/artikel/${result.slug}`}
                                                onClick={onClose}
                                                className="block p-3 hover:bg-gray-50 rounded-lg transition-colors"
                                            >
                                                <div className="flex items-start space-x-3">
                                                    <div className="flex-1">
                                                        <h4 className="font-medium text-gray-900 line-clamp-1">
                                                            {result.title}
                                                        </h4>
                                                        <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                                                            {result.excerpt}
                                                        </p>
                                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-2">
                                                            {result.category}
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <p className="text-gray-500">
                                            Tidak ada hasil untuk "{searchQuery}"
                                        </p>
                                        <p className="text-sm text-gray-400 mt-1">
                                            Coba gunakan kata kunci yang berbeda
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {searchQuery.length === 0 && (
                            <div className="text-center py-8">
                                <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <p className="text-gray-500">
                                    Mulai mengetik untuk mencari artikel
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
