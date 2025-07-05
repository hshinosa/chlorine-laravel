import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import SearchModal from '@/Components/News/SearchModal';

export default function NewsLayout({ children, header }) {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation Header */}
            <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Link href="/" className="flex items-center">
                                <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">N</span>
                                </div>
                                <span className="ml-2 text-xl font-bold text-gray-900">NewsPortal</span>
                            </Link>
                        </div>

                        {/* Navigation Menu */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-8">
                                <Link href="/" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium border-b-2 border-blue-600">
                                    Beranda
                                </Link>
                                <Link href="/kategori/politik" className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                                    Politik
                                </Link>
                                <Link href="/kategori/ekonomi" className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                                    Ekonomi
                                </Link>
                                <Link href="/kategori/teknologi" className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                                    Teknologi
                                </Link>
                                <Link href="/kategori/olahraga" className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                                    Olahraga
                                </Link>
                                <Link href="/kategori/lifestyle" className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                                    Lifestyle
                                </Link>
                            </div>
                        </div>

                        {/* Search & Mobile Menu Button */}
                        <div className="flex items-center space-x-3">
                            <button 
                                onClick={() => setIsSearchOpen(true)}
                                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                            
                            {/* Mobile menu button */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 border-t border-gray-200">
                            <Link href="/" className="text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
                                Beranda
                            </Link>
                            <Link href="/kategori/politik" className="text-gray-500 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
                                Politik
                            </Link>
                            <Link href="/kategori/ekonomi" className="text-gray-500 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
                                Ekonomi
                            </Link>
                            <Link href="/kategori/teknologi" className="text-gray-500 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
                                Teknologi
                            </Link>
                            <Link href="/kategori/olahraga" className="text-gray-500 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
                                Olahraga
                            </Link>
                            <Link href="/kategori/lifestyle" className="text-gray-500 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
                                Lifestyle
                            </Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* Header Section */}
            {header && (
                <header className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center">
                                <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">N</span>
                                </div>
                                <span className="ml-2 text-xl font-bold">NewsPortal</span>
                            </div>
                            <p className="mt-4 text-gray-300 text-sm">
                                Portal berita terdepan yang menyajikan informasi terkini dan terpercaya 
                                dari berbagai bidang kehidupan.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Kategori</h3>
                            <ul className="mt-4 space-y-4">
                                <li><Link href="/kategori/politik" className="text-base text-gray-300 hover:text-white">Politik</Link></li>
                                <li><Link href="/kategori/ekonomi" className="text-base text-gray-300 hover:text-white">Ekonomi</Link></li>
                                <li><Link href="/kategori/teknologi" className="text-base text-gray-300 hover:text-white">Teknologi</Link></li>
                                <li><Link href="/kategori/olahraga" className="text-base text-gray-300 hover:text-white">Olahraga</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Tentang</h3>
                            <ul className="mt-4 space-y-4">
                                <li><a href="/tentang" className="text-base text-gray-300 hover:text-white">Tentang Kami</a></li>
                                <li><a href="/kontak" className="text-base text-gray-300 hover:text-white">Kontak</a></li>
                                <li><a href="/kebijakan" className="text-base text-gray-300 hover:text-white">Kebijakan Privasi</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-8 border-t border-gray-700 pt-8">
                        <p className="text-base text-gray-400 text-center">
                            © 2025 NewsPortal. Semua hak dilindungi.
                        </p>
                    </div>
                </div>
            </footer>

            {/* Search Modal */}
            <SearchModal 
                isOpen={isSearchOpen} 
                onClose={() => setIsSearchOpen(false)} 
            />
        </div>
    );
}
