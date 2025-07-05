import { Link } from '@inertiajs/react';

export default function ServicesTable({ services, auth }) {
    return (
        <div className="bg-white rounded-lg card-shadow hover:card-shadow-hover transition-shadow">
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-lg sm:text-xl font-medium text-gray-900">Layanan Tersedia</h3>
                        <p className="mt-1 text-sm text-gray-600">
                            Daftar layanan yang dapat Anda ajukan
                        </p>
                    </div>
                </div>
            </div>
            
            <div className="table-container">
                {(() => {
                    let content;
                    if (services?.data && services.data.length > 0) {
                        content = (
                            <>
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                No
                                            </th>
                                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Nama Layanan
                                            </th>
                                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Kategori
                                            </th>
                                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Permohonan
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {services.data.map((service) => (
                                            <tr key={service.no} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {service.no}
                                                </td>
                                                <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">
                                                    <div>
                                                        <div className="font-medium mobile-text-sm">{service.nama_layanan}</div>
                                                        {service.description && (
                                                            <div className="text-xs mobile-text-xs text-gray-500 mt-1">
                                                                {service.description}
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">
                                                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                                        {service.category}
                                                    </span>
                                                </td>
                                                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                        service.is_publish 
                                                            ? 'bg-green-100 text-green-800' 
                                                            : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                        {service.is_publish ? 'Aktif' : 'Nonaktif'}
                                                    </span>
                                                </td>
                                                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">
                                                    {service.is_publish ? (
                                                        <button className="mobile-button inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus-ring transition-colors touch-target">
                                                            {service.action}
                                                        </button>
                                                    ) : (
                                                        <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-md text-gray-400 bg-gray-100 cursor-not-allowed">
                                                            Tidak Tersedia
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* Pagination Section */}
                                {services.links && services.links.length > 3 && (
                                    <div className="px-4 sm:px-6 py-4 border-t border-gray-200 bg-gray-50">
                                        <div className="flex items-center justify-between">
                                            {/* Results Info */}
                                            <div className="text-sm text-gray-700">
                                                Menampilkan <span className="font-medium">{services.from || 0}</span> sampai{' '}
                                                <span className="font-medium">{services.to || 0}</span> dari{' '}
                                                <span className="font-medium">{services.total || 0}</span> hasil
                                            </div>
                                            
                                            {/* Pagination Links */}
                                            <div className="flex items-center space-x-1">
                                                {services.links.map((link, index) => {
                                                    let linkClassName = 'px-3 py-2 text-sm font-medium rounded-md transition-colors ';
                                                    if (link.active) {
                                                        linkClassName += 'bg-blue-600 text-white border border-blue-600';
                                                    } else if (link.url) {
                                                        linkClassName += 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 border border-gray-300';
                                                    } else {
                                                        linkClassName += 'text-gray-300 cursor-not-allowed border border-gray-200';
                                                    }
                                                    return (
                                                        <Link
                                                            key={`${link.label}-${link.url || index}`}
                                                            href={link.url || '#'}
                                                            className={linkClassName}
                                                            preserveState
                                                        >
                                                            {link.label}
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        );
                    } else {
                        content = <EmptyServicesState auth={auth} />;
                    }
                    return content;
                })()}
            </div>
        </div>
    );
}

/**
 * EmptyServicesState Component
 * 
 * Displays a message when there are no services available.
 * Includes a button to add the first category if the user is authenticated.
 * @param {Object} props - Component properties
 * @param {Object} props.auth - Authentication object containing user info
 * @return {JSX.Element} Rendered component
 */

function EmptyServicesState({ auth }) {
    return (
        <div className="px-4 sm:px-6 py-12 text-center">
            <div className="flex flex-col items-center">
                <svg className="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <p className="text-lg font-medium text-gray-900 mb-2">Belum Ada Layanan</p>
                <p className="text-sm text-gray-500 mb-4">
                    Belum ada kategori layanan yang tersedia.
                </p>
                {auth.user && (
                    <Link
                        href={route('categories.create')}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus-ring transition-colors"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Tambah Kategori Pertama
                    </Link>
                )}
            </div>
        </div>
    );
}