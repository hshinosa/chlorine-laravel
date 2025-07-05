import { render, screen } from '@testing-library/react';
import { router } from '@inertiajs/react';
import Dashboard from '@/Pages/Dashboard';

// Mock dependencies
jest.mock('@inertiajs/react', () => ({
    ...jest.requireActual('@inertiajs/react'),
    router: {
        get: jest.fn(),
        post: jest.fn(),
        put: jest.fn(),
        patch: jest.fn(),
        delete: jest.fn(),
    },
    usePage: () => ({
        props: {
            auth: {
                user: {
                    id: 1,
                    name: 'Test User',
                    email: 'test@example.com'
                }
            }
        },
        url: '/dashboard'
    }),
    Head: ({ title, children }) => <title>{title}</title>,
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

jest.mock('@/Components/Dashboard/DashboardHeader', () => {
    return function MockDashboardHeader() {
        return <div data-testid="dashboard-header">Dashboard Header</div>;
    };
});

jest.mock('@/Components/Dashboard/DashboardCards', () => {
    return function MockDashboardCards() {
        return <div data-testid="dashboard-cards">Dashboard Cards</div>;
    };
});

jest.mock('@/Components/Dashboard/ServicesTable', () => {
    return function MockServicesTable({ services, auth }) {
        return (
            <div data-testid="services-table">
                Services Table - {services.data.length} items
            </div>
        );
    };
});

describe('Dashboard Page', () => {
    const mockAuth = {
        user: {
            id: 1,
            name: 'Test User',
            email: 'test@example.com'
        }
    };

    const mockServices = {
        data: [
            {
                id: 1,
                no: 1,
                nama_layanan: '[TEST] Test Service',
                action: 'Pilih',
                category: 'TEST'
            }
        ],
        links: []
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders dashboard page correctly', () => {
        render(<Dashboard auth={mockAuth} services={mockServices} />);

        expect(screen.getByTestId('authenticated-layout')).toBeInTheDocument();
        expect(screen.getByTestId('dashboard-header')).toBeInTheDocument();
        expect(screen.getByTestId('dashboard-cards')).toBeInTheDocument();
        expect(screen.getByTestId('services-table')).toBeInTheDocument();
    });

    test('passes correct props to AuthenticatedLayout', () => {
        render(<Dashboard auth={mockAuth} services={mockServices} />);

        const layout = screen.getByTestId('authenticated-layout');
        expect(layout).toBeInTheDocument();
    });

    test('displays dashboard header in layout header', () => {
        render(<Dashboard auth={mockAuth} services={mockServices} />);

        const header = screen.getByTestId('layout-header');
        expect(header).toBeInTheDocument();
        expect(screen.getByTestId('dashboard-header')).toBeInTheDocument();
    });

    test('passes services data to ServicesTable component', () => {
        render(<Dashboard auth={mockAuth} services={mockServices} />);

        expect(screen.getByText('Services Table - 1 items')).toBeInTheDocument();
    });

    test('handles empty services data', () => {
        const emptyServices = { data: [], links: [] };
        render(<Dashboard auth={mockAuth} services={emptyServices} />);

        expect(screen.getByText('Services Table - 0 items')).toBeInTheDocument();
    });

    test('uses default services structure when not provided', () => {
        render(<Dashboard auth={mockAuth} />);

        expect(screen.getByText('Services Table - 0 items')).toBeInTheDocument();
    });

    test('sets correct page title', () => {
        render(<Dashboard auth={mockAuth} services={mockServices} />);

        expect(document.title).toBe('Dashboard');
    });

    test('renders main content structure', () => {
        render(<Dashboard auth={mockAuth} services={mockServices} />);

        const content = screen.getByTestId('layout-content');
        expect(content).toBeInTheDocument();
        
        // Check if main content has correct spacing classes
        const mainDiv = content.querySelector('div');
        expect(mainDiv).toHaveClass('space-y-6', 'sm:space-y-8');
    });
});
