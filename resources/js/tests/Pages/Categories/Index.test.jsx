import { render, screen, fireEvent } from '@testing-library/react';
import { router } from '@inertiajs/react';
import CategoriesIndex from '@/Pages/Categories/Index';

// Mock dependencies
jest.mock('@inertiajs/react', () => ({
    ...jest.requireActual('@inertiajs/react'),
    router: {
        get: jest.fn(),
        delete: jest.fn(),
    },
    route: (name, params) => {
        const routes = {
            'dashboard': '/dashboard',
            'categories.index': '/categories',
            'categories.create': '/categories/create',
            'categories.destroy': params ? `/categories/${params}` : '/categories/:id'
        };
        return routes[name] || '/';
    },
    Head: ({ title }) => <title>{title}</title>,
    Link: ({ href, children, ...props }) => <a href={href} {...props}>{children}</a>
}));

jest.mock('@/Layouts/AuthenticatedLayout', () => {
    return function MockAuthenticatedLayout({ user, header, children }) {
        return (
            <div data-testid="authenticated-layout">
                <div data-testid="layout-header">{header}</div>
                <div data-testid="layout-content">{children}</div>
            </div>
        );
    };
});

jest.mock('@/Components/Categories/PageHeader', () => {
    return function MockPageHeader({ title, breadcrumbs, createRoute }) {
        return (
            <div data-testid="page-header">
                <h1>{title}</h1>
                <a href={createRoute} data-testid="create-link">Create New</a>
            </div>
        );
    };
});

jest.mock('@/Components/Categories/FilterSection', () => {
    return function MockFilterSection({ search, setSearch, dateFilter, setDateFilter, onSearch, onReset }) {
        return (
            <div data-testid="filter-section">
                <input
                    data-testid="search-input"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search..."
                />
                <input
                    data-testid="date-input"
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                />
                <button data-testid="search-button" onClick={onSearch}>Search</button>
                <button data-testid="reset-button" onClick={onReset}>Reset</button>
            </div>
        );
    };
});

jest.mock('@/Components/Categories/CategoriesTable', () => {
    return function MockCategoriesTable({ categories, onDelete }) {
        return (
            <div data-testid="categories-table">
                <div>Categories: {categories.data.length}</div>
                <div>Total: {categories.total}</div>
                {categories.data.map((category) => (
                    <div key={category.id} data-testid={`category-${category.id}`}>
                        {category.name}
                        <button
                            data-testid={`delete-${category.id}`}
                            onClick={() => onDelete(category)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        );
    };
});

jest.mock('@/Components/Categories/DeleteModal', () => {
    return function MockDeleteModal({ show, onClose, category, onConfirm, isDeleting }) {
        return show ? (
            <div data-testid="delete-modal">
                <p>Delete {category?.name}?</p>
                <button data-testid="modal-close" onClick={onClose}>Cancel</button>
                <button 
                    data-testid="modal-confirm" 
                    onClick={onConfirm}
                    disabled={isDeleting}
                >
                    {isDeleting ? 'Deleting...' : 'Confirm'}
                </button>
            </div>
        ) : null;
    };
});

describe('Categories Index Page', () => {
    const mockAuth = {
        user: {
            id: 1,
            name: 'Test User',
            email: 'test@example.com'
        }
    };

    const mockCategories = {
        data: [
            { id: 1, name: 'Category 1', is_publish: true },
            { id: 2, name: 'Category 2', is_publish: false }
        ],
        links: [],
        from: 1,
        to: 2,
        total: 2,
        current_page: 1,
        last_page: 1,
        per_page: 10
    };

    const mockFilters = {
        search: 'test search',
        date: '2025-01-01'
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders categories index page correctly', () => {
        render(
            <CategoriesIndex 
                auth={mockAuth} 
                categories={mockCategories} 
                filters={mockFilters} 
            />
        );

        expect(screen.getByTestId('authenticated-layout')).toBeInTheDocument();
        expect(screen.getByTestId('page-header')).toBeInTheDocument();
        expect(screen.getByTestId('filter-section')).toBeInTheDocument();
        expect(screen.getByTestId('categories-table')).toBeInTheDocument();
    });

    test('sets correct page title', () => {
        render(
            <CategoriesIndex 
                auth={mockAuth} 
                categories={mockCategories} 
                filters={mockFilters} 
            />
        );

        expect(document.title).toBe('Kategori Layanan');
    });

    test('passes correct props to PageHeader', () => {
        render(
            <CategoriesIndex 
                auth={mockAuth} 
                categories={mockCategories} 
                filters={mockFilters} 
            />
        );

        expect(screen.getByRole('heading', { name: 'Kategori Layanan' })).toBeInTheDocument();
        expect(screen.getByTestId('create-link')).toHaveAttribute('href', '/categories/create');
    });

    test('initializes filter state from props', () => {
        render(
            <CategoriesIndex 
                auth={mockAuth} 
                categories={mockCategories} 
                filters={mockFilters} 
            />
        );

        expect(screen.getByTestId('search-input')).toHaveValue('test search');
        expect(screen.getByTestId('date-input')).toHaveValue('2025-01-01');
    });

    test('handles search functionality', () => {
        render(
            <CategoriesIndex 
                auth={mockAuth} 
                categories={mockCategories} 
                filters={mockFilters} 
            />
        );

        const searchButton = screen.getByTestId('search-button');
        fireEvent.click(searchButton);

        expect(router.get).toHaveBeenCalledWith(
            '/categories',
            { search: 'test search', date: '2025-01-01' },
            { preserveState: true, replace: true }
        );
    });

    test('handles reset functionality', () => {
        render(
            <CategoriesIndex 
                auth={mockAuth} 
                categories={mockCategories} 
                filters={mockFilters} 
            />
        );

        const resetButton = screen.getByTestId('reset-button');
        fireEvent.click(resetButton);

        expect(router.get).toHaveBeenCalledWith(
            '/categories',
            {},
            { preserveState: true, replace: true }
        );
    });

    test('handles category deletion flow', () => {
        render(
            <CategoriesIndex 
                auth={mockAuth} 
                categories={mockCategories} 
                filters={mockFilters} 
            />
        );

        // Click delete button for first category
        const deleteButton = screen.getByTestId('delete-1');
        fireEvent.click(deleteButton);

        // Delete modal should appear
        expect(screen.getByTestId('delete-modal')).toBeInTheDocument();
        expect(screen.getByText('Delete Category 1?')).toBeInTheDocument();
    });

    test('handles modal close', () => {
        render(
            <CategoriesIndex 
                auth={mockAuth} 
                categories={mockCategories} 
                filters={mockFilters} 
            />
        );

        // Open modal
        const deleteButton = screen.getByTestId('delete-1');
        fireEvent.click(deleteButton);

        // Close modal
        const closeButton = screen.getByTestId('modal-close');
        fireEvent.click(closeButton);

        expect(screen.queryByTestId('delete-modal')).not.toBeInTheDocument();
    });

    test('handles delete confirmation', () => {
        render(
            <CategoriesIndex 
                auth={mockAuth} 
                categories={mockCategories} 
                filters={mockFilters} 
            />
        );

        // Open modal
        const deleteButton = screen.getByTestId('delete-1');
        fireEvent.click(deleteButton);

        // Confirm deletion
        const confirmButton = screen.getByTestId('modal-confirm');
        fireEvent.click(confirmButton);

        expect(router.delete).toHaveBeenCalledWith('/categories/1', {
            onSuccess: expect.any(Function),
            onFinish: expect.any(Function)
        });
    });

    test('displays categories data correctly', () => {
        render(
            <CategoriesIndex 
                auth={mockAuth} 
                categories={mockCategories} 
                filters={mockFilters} 
            />
        );

        expect(screen.getByText('Categories: 2')).toBeInTheDocument();
        expect(screen.getByText('Total: 2')).toBeInTheDocument();
        expect(screen.getByTestId('category-1')).toBeInTheDocument();
        expect(screen.getByTestId('category-2')).toBeInTheDocument();
    });

    test('handles empty categories gracefully', () => {
        const emptyCategories = {
            data: [],
            links: [],
            from: 0,
            to: 0,
            total: 0,
            current_page: 1,
            last_page: 1,
            per_page: 10
        };

        render(
            <CategoriesIndex 
                auth={mockAuth} 
                categories={emptyCategories} 
                filters={{}} 
            />
        );

        expect(screen.getByText('Categories: 0')).toBeInTheDocument();
        expect(screen.getByText('Total: 0')).toBeInTheDocument();
    });

    test('handles missing filters gracefully', () => {
        render(
            <CategoriesIndex 
                auth={mockAuth} 
                categories={mockCategories} 
            />
        );

        expect(screen.getByTestId('search-input')).toHaveValue('');
        expect(screen.getByTestId('date-input')).toHaveValue('');
    });
});
