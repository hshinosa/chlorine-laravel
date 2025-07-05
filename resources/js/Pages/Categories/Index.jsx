import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import PageHeader from '@/Components/Categories/PageHeader';
import FilterSection from '@/Components/Categories/FilterSection';
import CategoriesTable from '@/Components/Categories/CategoriesTable';
import DeleteModal from '@/Components/Categories/DeleteModal';

export default function Index({ 
    auth, 
    categories = { data: [], links: [] }, 
    filters = {} 
}) {

    const [search, setSearch] = useState(filters.search || '');
    const [dateFilter, setDateFilter] = useState(filters.date || '');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Handler functions
    const handleSearch = () => {
        router.get(route('categories.index'), { 
            search, 
            date: dateFilter 
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleReset = () => {
        setSearch('');
        setDateFilter('');
        router.get(route('categories.index'), {}, {
            preserveState: true,
            replace: true,
        });
    };

    const handleDelete = (category) => {
        setCategoryToDelete(category);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (categoryToDelete) {
            setIsDeleting(true);
            router.delete(route('categories.destroy', categoryToDelete.id), {
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setCategoryToDelete(null);
                },
                onFinish: () => {
                    setIsDeleting(false);
                }
            });
        }
    };

    // Data configuration
    const breadcrumbs = [
        { text: "Home", link: route('dashboard') },
        { text: "Kategori Layanan", link: route('categories.index') }
    ];

    // Ensure categories is properly structured
    const safeCategories = {
        data: categories?.data || [],
        links: categories?.links || [],
        from: categories?.from || 0,
        to: categories?.to || 0,
        total: categories?.total || 0,
        current_page: categories?.current_page || 1,
        last_page: categories?.last_page || 1,
        per_page: categories?.per_page || 10
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <PageHeader 
                    title="Kategori Layanan"
                    breadcrumbs={breadcrumbs}
                    createRoute={route('categories.create')}
                />
            }
        >
            <Head title="Kategori Layanan" />

            <div className="space-y-6">
                {/* Filter Section */}
                <FilterSection
                    search={search}
                    setSearch={setSearch}
                    dateFilter={dateFilter}
                    setDateFilter={setDateFilter}
                    onSearch={handleSearch}
                    onReset={handleReset}
                />

                {/* Categories Table */}
                <CategoriesTable
                    categories={safeCategories}
                    onDelete={handleDelete}
                />
            </div>

            {/* Delete Confirmation Modal */}
            <DeleteModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                category={categoryToDelete}
                onConfirm={confirmDelete}
                isDeleting={isDeleting}
            />
        </AuthenticatedLayout>
    );
}