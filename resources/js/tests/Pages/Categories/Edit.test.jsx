import React from 'react';
import { render, screen } from '@testing-library/react';
import Edit from '@/Pages/Categories/Edit';

// Mock Inertia components
const mockHeadTitle = jest.fn();
jest.mock('@inertiajs/react', () => ({
    Head: ({ title, children }) => {
        mockHeadTitle(title || children);
        return <title>{title || children}</title>;
    },
    Link: ({ href, children, ...props }) => <a href={href} {...props}>{children}</a>,
    useForm: jest.fn(() => ({
        data: { 
            name: 'Test Category',
            is_publish: true
        },
        setData: jest.fn(),
        put: jest.fn(),
        processing: false,
        errors: {},
        recentlySuccessful: false
    }))
}));

// Mock Components
jest.mock('@/Components/InputError', () => {
    return function MockInputError({ message }) {
        return message ? <div data-testid="input-error">{message}</div> : null;
    };
});

jest.mock('@/Components/InputLabel', () => {
    return function MockInputLabel({ htmlFor, value }) {
        return <label htmlFor={htmlFor} data-testid="input-label">{value}</label>;
    };
});

jest.mock('@/Components/PrimaryButton', () => {
    return function MockPrimaryButton({ children, disabled }) {
        return <button data-testid="primary-button" disabled={disabled}>{children}</button>;
    };
});

jest.mock('@/Components/SecondaryButton', () => {
    return function MockSecondaryButton({ children }) {
        return <button data-testid="secondary-button">{children}</button>;
    };
});

jest.mock('@/Components/TextInput', () => {
    return function MockTextInput({ id, value, onChange }) {
        return <input id={id} data-testid="text-input" value={value} onChange={onChange} />;
    };
});

// Mock route helper
global.route = jest.fn((name, params) => {
    const routes = {
        'categories.update': `/categories/${params}`,
        'categories.index': '/categories'
    };
    return routes[name] || `/${name}`;
});

// Mock layout
jest.mock('@/Layouts/AuthenticatedLayout', () => {
    return function AuthenticatedLayout({ user, header, children }) {
        return (
            <div data-testid="authenticated-layout">
                <div data-testid="layout-header">{header}</div>
                <div data-testid="layout-content">{children}</div>
            </div>
        );
    };
});

const defaultProps = {
    auth: {
        user: {
            id: 1,
            name: 'Test User',
            email: 'test@example.com'
        }
    },
    category: {
        id: 1,
        name: 'Test Category',
        is_publish: true,
        created_at: '2023-01-01',
        updated_at: '2023-01-01'
    }
};

describe('Categories Edit Page', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders edit page correctly', () => {
        render(<Edit {...defaultProps} />);
        
        expect(screen.getByTestId('authenticated-layout')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Test Category')).toBeInTheDocument();
        expect(screen.getByTestId('primary-button')).toBeInTheDocument();
    });

    test('sets correct page title', () => {
        render(<Edit {...defaultProps} />);
        
        expect(mockHeadTitle).toHaveBeenCalledWith('Edit Kategori Layanan');
    });

    test('renders form fields correctly', () => {
        render(<Edit {...defaultProps} />);
        
        // Check form fields
        expect(screen.getByLabelText('Nama Kategori')).toBeInTheDocument();
        expect(screen.getByText('Status Publish')).toBeInTheDocument();
        expect(screen.getByRole('radio', { name: 'Published' })).toBeChecked();
    });
});
