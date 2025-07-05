/* eslint-disable react/prop-types */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UpdateProfileInformationForm from '@/Pages/Profile/Partials/UpdateProfileInformationForm';

// Define mockRoute function
const mockRoute = jest.fn((name) => `/mocked-route/${name}`);

// Mock global route function
global.route = mockRoute;

// Create mock functions
const mockPatch = jest.fn();
const mockSetData = jest.fn();

jest.mock('@inertiajs/react', () => {
    const mockUseForm = jest.fn();
    const mockUsePage = jest.fn();
    
    return {
        Link: ({ href, children, className, method, as, ...props }) => (
            <a href={href} className={className} data-method={method} data-as={as} {...props}>
                {children}
            </a>
        ),
        useForm: mockUseForm,
        usePage: mockUsePage
    };
});

// Get the mocked functions from the module
const { useForm: mockUseForm, usePage: mockUsePage } = require('@inertiajs/react');

// Set up default mock return values
mockUseForm.mockReturnValue({
    data: {
        name: 'Test User',
        email: 'test@example.com'
    },
    setData: jest.fn(),
    patch: mockPatch,
    errors: {},
    processing: false,
    recentlySuccessful: false
});

mockUsePage.mockReturnValue({
    props: {
        auth: {
            user: {
                id: 1,
                name: 'Test User',
                email: 'test@example.com',
                email_verified_at: '2024-01-01T00:00:00.000Z'
            }
        }
    }
});

// Mock Headless UI Transition
jest.mock('@headlessui/react', () => ({
    Transition: ({ show, children }) => show ? <div data-testid="transition">{children}</div> : null
}));

// Mock Components
jest.mock('@/Components/InputError', () => {
    return function MockInputError({ message, className }) {
        return message ? <div data-testid="input-error" className={className}>{message}</div> : null;
    };
});

jest.mock('@/Components/InputLabel', () => {
    return function MockInputLabel({ htmlFor, value, children }) {
        return (
            <label htmlFor={htmlFor} data-testid="input-label">
                {value || children}
            </label>
        );
    };
});

jest.mock('@/Components/PrimaryButton', () => {
    return function MockPrimaryButton({ children, disabled, ...props }) {
        return (
            <button data-testid="primary-button" disabled={disabled} {...props}>
                {children}
            </button>
        );
    };
});

jest.mock('@/Components/TextInput', () => {
    return function MockTextInput({ id, value, onChange, className, isFocused, required, autoComplete, ...props }) {
        return (
            <input
                id={id}
                data-testid="text-input"
                value={value}
                onChange={onChange}
                className={className}
                data-focused={isFocused}
                required={required}
                autoComplete={autoComplete}
                {...props}
            />
        );
    };
});

describe('UpdateProfileInformationForm', () => {
    const defaultProps = {
        mustVerifyEmail: false,
        status: null,
        className: 'test-class'
    };

    beforeEach(() => {
        jest.clearAllMocks();
        mockUsePage.mockReturnValue({
            props: {
                auth: {
                    user: {
                        id: 1,
                        name: 'Test User',
                        email: 'test@example.com',
                        email_verified_at: '2024-01-01T00:00:00.000Z'
                    }
                }
            }
        });
    });

    describe('Rendering', () => {
        it('should render the profile information form correctly', () => {
            render(<UpdateProfileInformationForm {...defaultProps} />);

            expect(screen.getByText('Profile Information')).toBeInTheDocument();
            expect(screen.getByText("Update your account's profile information and email address.")).toBeInTheDocument();
        });

        it('should apply custom className', () => {
            render(<UpdateProfileInformationForm {...defaultProps} />);

            const section = screen.getByText('Profile Information').closest('section');
            expect(section).toHaveClass('test-class');
        });

        it('should render form fields with correct labels', () => {
            render(<UpdateProfileInformationForm {...defaultProps} />);

            expect(screen.getByLabelText('Name')).toBeInTheDocument();
            expect(screen.getByLabelText('Email')).toBeInTheDocument();
        });

        it('should render save button', () => {
            render(<UpdateProfileInformationForm {...defaultProps} />);

            expect(screen.getByText('Save')).toBeInTheDocument();
        });
    });

    describe('Form Behavior', () => {
        it('should pre-fill form with user data', () => {
            mockUseForm.mockReturnValue({
                data: {
                    name: 'John Doe',
                    email: 'john@example.com'
                },
                setData: jest.fn(),
                patch: mockPatch,
                errors: {},
                processing: false,
                recentlySuccessful: false
            });

            render(<UpdateProfileInformationForm {...defaultProps} />);

            expect(mockUseForm).toHaveBeenCalledWith({
                name: 'Test User',
                email: 'test@example.com'
            });
        });

        it('should handle form submission', async () => {
            render(<UpdateProfileInformationForm {...defaultProps} />);

            const form = screen.getByRole('button', { name: 'Save' }).closest('form');
            fireEvent.submit(form);

            await waitFor(() => {
                expect(mockPatch).toHaveBeenCalledWith('/mocked-route/profile.update');
            });
        });

        it('should display processing state', () => {
            mockUseForm.mockReturnValue({
                data: { name: 'Test', email: 'test@example.com' },
                setData: jest.fn(),
                patch: mockPatch,
                errors: {},
                processing: true,
                recentlySuccessful: false
            });

            render(<UpdateProfileInformationForm {...defaultProps} />);

            expect(screen.getByTestId('primary-button')).toBeDisabled();
        });

        it('should display success message when recently successful', () => {
            mockUseForm.mockReturnValue({
                data: { name: 'Test', email: 'test@example.com' },
                setData: jest.fn(),
                patch: mockPatch,
                errors: {},
                processing: false,
                recentlySuccessful: true
            });

            render(<UpdateProfileInformationForm {...defaultProps} />);

            expect(screen.getByText('Saved.')).toBeInTheDocument();
        });

        it('should display validation errors', () => {
            mockUseForm.mockReturnValue({
                data: { name: '', email: 'invalid-email' },
                setData: jest.fn(),
                patch: mockPatch,
                errors: {
                    name: 'The name field is required.',
                    email: 'The email must be a valid email address.'
                },
                processing: false,
                recentlySuccessful: false
            });

            render(<UpdateProfileInformationForm {...defaultProps} />);

            expect(screen.getByText('The name field is required.')).toBeInTheDocument();
            expect(screen.getByText('The email must be a valid email address.')).toBeInTheDocument();
        });
    });

    describe('Email Verification', () => {
        it('should show verification notice when email is unverified', () => {
            mockUsePage.mockReturnValue({
                props: {
                    auth: {
                        user: {
                            id: 1,
                            name: 'Test User',
                            email: 'test@example.com',
                            email_verified_at: null
                        }
                    }
                }
            });

            const propsWithVerification = {
                ...defaultProps,
                mustVerifyEmail: true
            };

            render(<UpdateProfileInformationForm {...propsWithVerification} />);

            expect(screen.getByText('Your email address is unverified.')).toBeInTheDocument();
            expect(screen.getByText('Click here to re-send the verification email.')).toBeInTheDocument();
        });

        it('should not show verification notice when email is verified', () => {
            const propsWithVerification = {
                ...defaultProps,
                mustVerifyEmail: true
            };

            render(<UpdateProfileInformationForm {...propsWithVerification} />);

            expect(screen.queryByText('Your email address is unverified.')).not.toBeInTheDocument();
        });

        it('should not show verification notice when mustVerifyEmail is false', () => {
            mockUsePage.mockReturnValue({
                props: {
                    auth: {
                        user: {
                            id: 1,
                            name: 'Test User',
                            email: 'test@example.com',
                            email_verified_at: null
                        }
                    }
                }
            });

            render(<UpdateProfileInformationForm {...defaultProps} />);

            expect(screen.queryByText('Your email address is unverified.')).not.toBeInTheDocument();
        });

        it('should show verification link sent message', () => {
            mockUsePage.mockReturnValue({
                props: {
                    auth: {
                        user: {
                            id: 1,
                            name: 'Test User',
                            email: 'test@example.com',
                            email_verified_at: null
                        }
                    }
                }
            });

            const propsWithStatus = {
                ...defaultProps,
                mustVerifyEmail: true,
                status: 'verification-link-sent'
            };

            render(<UpdateProfileInformationForm {...propsWithStatus} />);

            expect(screen.getByText('A new verification link has been sent to your email address.')).toBeInTheDocument();
        });

        it('should render verification email link correctly', () => {
            mockUsePage.mockReturnValue({
                props: {
                    auth: {
                        user: {
                            id: 1,
                            name: 'Test User',
                            email: 'test@example.com',
                            email_verified_at: null
                        }
                    }
                }
            });

            const propsWithVerification = {
                ...defaultProps,
                mustVerifyEmail: true
            };

            render(<UpdateProfileInformationForm {...propsWithVerification} />);

            const verificationLink = screen.getByText('Click here to re-send the verification email.');
            expect(verificationLink).toHaveAttribute('href', '/mocked-route/verification.send');
            expect(verificationLink).toHaveAttribute('data-method', 'post');
            expect(verificationLink).toHaveAttribute('data-as', 'button');
        });
    });

    describe('User Interactions', () => {
        it('should handle name input changes', async () => {
            const mockSetDataLocal = jest.fn();
            mockUseForm.mockReturnValue({
                data: { name: 'Test User', email: 'test@example.com' },
                setData: mockSetDataLocal,
                patch: mockPatch,
                errors: {},
                processing: false,
                recentlySuccessful: false
            });

            const user = userEvent.setup();
            render(<UpdateProfileInformationForm {...defaultProps} />);

            const nameInput = screen.getByLabelText('Name');
            await user.clear(nameInput);
            await user.type(nameInput, 'New Name');

            expect(mockSetDataLocal).toHaveBeenCalledWith('name', expect.any(String));
        });

        it('should handle email input changes', async () => {
            const mockSetDataLocal = jest.fn();
            mockUseForm.mockReturnValue({
                data: { name: 'Test User', email: 'test@example.com' },
                setData: mockSetDataLocal,
                patch: mockPatch,
                errors: {},
                processing: false,
                recentlySuccessful: false
            });

            const user = userEvent.setup();
            render(<UpdateProfileInformationForm {...defaultProps} />);

            const emailInput = screen.getByLabelText('Email');
            await user.clear(emailInput);
            await user.type(emailInput, 'new@example.com');

            expect(mockSetDataLocal).toHaveBeenCalledWith('email', expect.any(String));
        });
    });

    describe('Accessibility', () => {
        it('should have proper form structure', () => {
            render(<UpdateProfileInformationForm {...defaultProps} />);

            const form = screen.getByRole('button', { name: 'Save' }).closest('form');
            expect(form).toBeInTheDocument();
        });

        it('should have proper input labels', () => {
            render(<UpdateProfileInformationForm {...defaultProps} />);

            expect(screen.getByLabelText('Name')).toBeInTheDocument();
            expect(screen.getByLabelText('Email')).toBeInTheDocument();
        });

        it('should have required fields marked', () => {
            render(<UpdateProfileInformationForm {...defaultProps} />);

            const nameInput = screen.getByLabelText('Name');
            const emailInput = screen.getByLabelText('Email');

            expect(nameInput).toHaveAttribute('required');
            expect(emailInput).toHaveAttribute('required');
        });

        it('should have proper autocomplete attributes', () => {
            render(<UpdateProfileInformationForm {...defaultProps} />);

            const nameInput = screen.getByLabelText('Name');
            const emailInput = screen.getByLabelText('Email');

            expect(nameInput).toHaveAttribute('autoComplete', 'name');
            expect(emailInput).toHaveAttribute('autoComplete', 'username');
        });

        it('should focus on name input', () => {
            render(<UpdateProfileInformationForm {...defaultProps} />);

            const nameInput = screen.getByLabelText('Name');
            expect(nameInput).toHaveAttribute('data-focused', 'true');
        });
    });

    describe('Edge Cases', () => {
        it('should handle missing user data gracefully', () => {
            mockUsePage.mockReturnValue({
                props: {
                    auth: {
                        user: {
                            id: null,
                            name: '',
                            email: '',
                            email_verified_at: null
                        }
                    }
                }
            });

            expect(() => render(<UpdateProfileInformationForm {...defaultProps} />)).not.toThrow();
        });

        it('should handle empty className', () => {
            const propsWithoutClass = { ...defaultProps, className: '' };
            expect(() => render(<UpdateProfileInformationForm {...propsWithoutClass} />)).not.toThrow();
        });

        it('should handle undefined props', () => {
            expect(() => render(<UpdateProfileInformationForm />)).not.toThrow();
        });
    });
});
