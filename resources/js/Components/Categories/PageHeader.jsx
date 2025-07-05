import { Link } from '@inertiajs/react';

export default function PageHeader({ title, breadcrumbs, createRoute }) {
    return (
        <div className="flex justify-between items-center">
            <div>
                <h2 className="text-xl sm:text-2xl font-semibold leading-tight text-gray-800">
                    {title}
                </h2>
                {/* Breadcrumb */}
                <nav className="flex mt-2" aria-label="Breadcrumb">
                    <ol className="flex items-center space-x-2 text-sm text-gray-500">
                        {breadcrumbs.map((crumb, index) => (
                            <li key={index} className="flex items-center">
                                {index > 0 && (
                                    <span className="mx-2 text-gray-400">/</span>
                                )}
                                {index === breadcrumbs.length - 1 ? (
                                    <span className="text-gray-600 font-medium">{crumb.text}</span>
                                ) : (
                                    <Link 
                                        href={crumb.link}
                                        className="text-blue-600 hover:text-blue-800 transition-colors"
                                    >
                                        {crumb.text}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ol>
                </nav>
            </div>
            <Link
                href={createRoute}
                className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus-ring transition-colors"
            >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Tambah Kategori
            </Link>
        </div>
    );
}