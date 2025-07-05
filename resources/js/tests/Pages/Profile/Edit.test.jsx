import React from 'react';
import { render, screen } from '@testing-library/react';
import Edit from '@/Pages/Profile/Edit';

// Mock Inertia components
const mockHeadTitle = jest.fn();
jest.mock('@inertiajs/react', () => ({
    Head: ({ title, children }) => {
        mockHeadTitle(title || children);
        return <title>{title || children}</title>;
    },
    useForm: jest.fn(() => ({
        data: { 
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            current_password: ''
        },
        setData: jest.fn(),
        patch: jest.fn(),
        put: jest.fn(),
        delete: jest.fn(),
        processing: false,
        errors: {},
        recentlySuccessful: false
    })),
    usePage: jest.fn(() => ({
        props: {
            auth: {
                user: {
                    id: 1,
                    name: 'Test User',
                    email: 'test@example.com',
                    email_verified_at: '2023-01-01'
                }
            },
            mustVerifyEmail: false,
            status: null
        }
    }))
}));

// Mock Profile form components
jest.mock('@/Pages/Profile/Partials/UpdateProfileInformationForm', () => {
    return function MockUpdateProfileInformationForm() {
        return <div data-testid="update-profile-information-form">Profile Information</div>;
    };
});

jest.mock('@/Pages/Profile/Partials/UpdatePasswordForm', () => {
    return function MockUpdatePasswordForm() {
        return <div data-testid="update-password-form">Update Password</div>;
    };
});

jest.mock('@/Pages/Profile/Partials/DeleteUserForm', () => {
    return function MockDeleteUserForm() {
        return <div data-testid="delete-user-form">Delete Account</div>;
    };
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
            email: 'test@example.com',
            email_verified_at: '2023-01-01'
        }
    },
    mustVerifyEmail: false,
    status: null
};

describe('Profile Edit Page', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders profile edit page correctly', () => {
        render(<Edit {...defaultProps} />);
        
        expect(screen.getByTestId('authenticated-layout')).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Profile' })).toBeInTheDocument();
    });

    test('sets correct page title', () => {
        render(<Edit {...defaultProps} />);
        
        expect(mockHeadTitle).toHaveBeenCalledWith('Profile');
    });

    test('renders profile forms', () => {
        render(<Edit {...defaultProps} />);
        
        // Check for profile sections
        expect(screen.getByText('Profile Information')).toBeInTheDocument();
        expect(screen.getByText('Update Password')).toBeInTheDocument();
        expect(screen.getByText('Delete Account')).toBeInTheDocument();
    });
});
