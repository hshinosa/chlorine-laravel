import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DashboardHeader from '@/Components/Dashboard/DashboardHeader';
import DashboardCards from '@/Components/Dashboard/DashboardCards';
import ServicesTable from '@/Components/Dashboard/ServicesTable';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, services = { data: [], links: [] } }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<DashboardHeader />}
        >
            <Head title="Dashboard" />

            <div className="space-y-6 sm:space-y-8">
                {/* Dashboard Cards */}
                <DashboardCards />

                {/* Services Table dengan Pagination */}
                <ServicesTable services={services} auth={auth} />
            </div>
        </AuthenticatedLayout>
    );
}