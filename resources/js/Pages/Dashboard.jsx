import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DashboardCard from '@/Components/DashboardCard';
import { Head } from '@inertiajs/react';
import { servicesData } from '@/Data/servicesData';
import { dashboardCards, dashboardIcons } from '@/Data/dashboardData';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl sm:text-2xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="space-y-6 sm:space-y-8">
                {/* Dashboard Cards */}
                <div className="dashboard-cards responsive-grid responsive-grid-sm responsive-grid-md responsive-grid-lg">
                    {dashboardCards.map((card) => (
                        <DashboardCard
                            key={card.id}
                            card={card}
                            icon={dashboardIcons[card.icon]}
                        />
                    ))}
                </div>

                {/* Layanan Section */}
                <div className="bg-white rounded-lg card-shadow hover:card-shadow-hover transition-shadow">
                    <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg sm:text-xl font-medium text-gray-900">Layanan</h3>
                    </div>
                    <div className="table-container">
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
                                        Permohonan
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {servicesData.map((service) => (
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
                                            <button className="mobile-button inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus-ring transition-colors touch-target">
                                                {service.action}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}