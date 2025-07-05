import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useForm } from '@inertiajs/react';
import DeleteUserForm from '@/Pages/Profile/Partials/DeleteUserForm';

// Mock dependencies
jest.mock('@inertiajs/react', () => ({
    ...jest.requireActual('@inertiajs/react'),
    useForm: jest.fn()
}));

jest.mock('@/Components/DangerButton', () => {
    return function MockDangerButton({ onClick, children, ...props }) {
        return (
            <button 
                {...props} 
                onClick={onClick}
                data-testid="danger-button"
            >
                {children}
            </button>
        );
    };
});

jest.mock('@/Components/InputError', () => {
    return function MockInputError({ message, className }) {
        return message ? (
            <div data-testid="input-error" className={className}>
                {message}
            </div>
        ) : null;
    };
});

jest.mock('@/Components/InputLabel', () => {
    return function MockInputLabel({ htmlFor, value, children, ...props }) {
        return (
            <label htmlFor={htmlFor} {...props} data-testid="input-label">
                {value || children}
            </label>
        );
    };
});

jest.mock('@/Components/Modal', () => {
    return function MockModal({ show, onClose, children, maxWidth = '2xl' }) {
        return show ? (
            <div data-testid="modal" data-max-width={maxWidth}>
                <div data-testid="modal-content">{children}</div>
                <button data-testid="modal-close" onClick={onClose}>Close</button>
            </div>
        ) : null;
    };
});

jest.mock('@/Components/SecondaryButton', () => {
    return function MockSecondaryButton({ onClick, children, ...props }) {
        return (
            <button 
                {...props} 
                onClick={onClick}
                data-testid="secondary-button"
            >
                {children}
            </button>
        );
    };
});

jest.mock('@/Components/TextInput', () => {
    const React = require('react');
    const { forwardRef, useEffect, useRef, useImperativeHandle } = React;
    
    return forwardRef(function MockTextInput({ id, type, value, onChange, placeholder, isFocused = false, ...props }, ref) {
        const localRef = useRef(null);

        // Handle ref forwarding
        useImperativeHandle(ref, () => ({
            focus: () => localRef.current?.focus(),
        }));

        // Handle auto-focus when isFocused is true
        useEffect(() => {
            if (isFocused) {
                localRef.current?.focus();
            }
        }, [isFocused]);

        return (
            <input
                {...props}
                ref={localRef}
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                data-testid={`text-input-${id}`}
            />
        );
    });
});

const mockUseForm = {
    data: {
        password: ''
    },
    setData: jest.fn(),
    delete: jest.fn(),
    processing: false,
    errors: {},
    reset: jest.fn(),
    clearErrors: jest.fn()
};

describe('DeleteUserForm', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        useForm.mockReturnValue(mockUseForm);
    });

    const defaultProps = {
        className: 'max-w-xl'
    };

    test('renders delete user form', () => {
        render(<DeleteUserForm {...defaultProps} />);
        
        expect(screen.getByRole('heading', { name: 'Delete Account' })).toBeInTheDocument();
        expect(screen.getByText(/Once your account is deleted/)).toBeInTheDocument();
        expect(screen.getByTestId('danger-button')).toHaveTextContent('Delete Account');
    });

    test('shows modal when delete button is clicked', () => {
        render(<DeleteUserForm {...defaultProps} />);
        
        const deleteButton = screen.getByTestId('danger-button');
        fireEvent.click(deleteButton);
        
        expect(screen.getByTestId('modal')).toBeInTheDocument();
        expect(screen.getByText('Are you sure you want to delete your account?')).toBeInTheDocument();
    });

    test('closes modal when cancel button is clicked', () => {
        render(<DeleteUserForm {...defaultProps} />);
        
        // Open modal
        const deleteButton = screen.getByTestId('danger-button');
        fireEvent.click(deleteButton);
        
        expect(screen.getByTestId('modal')).toBeInTheDocument();
        
        // Close modal - find the cancel button using secondary button test id
        const cancelButton = screen.getByTestId('secondary-button');
        fireEvent.click(cancelButton);
        
        expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });

    test('handles password input change', () => {
        render(<DeleteUserForm {...defaultProps} />);
        
        // Open modal
        const deleteButton = screen.getByTestId('danger-button');
        fireEvent.click(deleteButton);
        
        const passwordInput = screen.getByTestId('text-input-password');
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        
        expect(mockUseForm.setData).toHaveBeenCalledWith('password', 'password123');
    });

    test('submits delete form with correct data', async () => {
        render(<DeleteUserForm {...defaultProps} />);
        
        // Open modal
        const deleteButton = screen.getByTestId('danger-button');
        fireEvent.click(deleteButton);
        
        // Submit form - find form by its submit button
        const submitButton = screen.getAllByText('Delete Account').find(btn => btn.closest('form'));
        const form = submitButton.closest('form');
        fireEvent.submit(form);
        
        await waitFor(() => {
            expect(mockUseForm.delete).toHaveBeenCalledWith('/profile', {
                preserveScroll: true,
                onSuccess: expect.any(Function),
                onError: expect.any(Function),
                onFinish: expect.any(Function)
            });
        });
    });

    test('closes modal on successful deletion', async () => {
        const mockFormWithSubmit = {
            ...mockUseForm,
            delete: jest.fn((route, options) => {
                // Simulate successful deletion
                options.onSuccess();
            })
        };
        
        useForm.mockReturnValue(mockFormWithSubmit);
        
        render(<DeleteUserForm {...defaultProps} />);
        
        // Open modal
        const deleteButton = screen.getByTestId('danger-button');
        fireEvent.click(deleteButton);
        
        // Submit form - find form by its submit button
        const submitButton = screen.getAllByText('Delete Account').find(btn => btn.closest('form'));
        const form = submitButton.closest('form');
        fireEvent.submit(form);
        
        await waitFor(() => {
            expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
        });
    });

    test('resets form on finish', async () => {
        const mockFormWithSubmit = {
            ...mockUseForm,
            delete: jest.fn((route, options) => {
                // Simulate finished request
                options.onFinish();
            })
        };
        
        useForm.mockReturnValue(mockFormWithSubmit);
        
        render(<DeleteUserForm {...defaultProps} />);
        
        // Open modal
        const deleteButton = screen.getByTestId('danger-button');
        fireEvent.click(deleteButton);
        
        // Submit form - find form by its submit button
        const submitButton = screen.getAllByText('Delete Account').find(btn => btn.closest('form'));
        const form = submitButton.closest('form');
        fireEvent.submit(form);
        
        await waitFor(() => {
            expect(mockFormWithSubmit.reset).toHaveBeenCalled();
        });
    });

    test('displays validation errors', () => {
        const mockFormWithErrors = {
            ...mockUseForm,
            errors: {
                password: 'Password is required to delete account.'
            }
        };
        
        useForm.mockReturnValue(mockFormWithErrors);
        
        render(<DeleteUserForm {...defaultProps} />);
        
        // Open modal
        const deleteButton = screen.getByTestId('danger-button');
        fireEvent.click(deleteButton);
        
        expect(screen.getByText('Password is required to delete account.')).toBeInTheDocument();
    });

    test('shows processing state', () => {
        const mockFormProcessing = {
            ...mockUseForm,
            processing: true
        };
        
        useForm.mockReturnValue(mockFormProcessing);
        
        render(<DeleteUserForm {...defaultProps} />);
        
        // Open modal
        const deleteButton = screen.getByTestId('danger-button');
        fireEvent.click(deleteButton);
        
        const submitButton = screen.getAllByText('Delete Account').find(btn => btn.closest('form'));
        expect(submitButton).toHaveAttribute('disabled');
    });

    test('applies custom className', () => {
        render(<DeleteUserForm className="custom-class" />);
        
        // The section is the main container element
        const section = screen.getByRole('heading', { name: 'Delete Account' }).closest('section');
        expect(section).toHaveClass('custom-class');
    });

    test('password field has correct attributes', () => {
        render(<DeleteUserForm {...defaultProps} />);
        
        // Open modal
        const deleteButton = screen.getByTestId('danger-button');
        fireEvent.click(deleteButton);
        
        const passwordInput = screen.getByTestId('text-input-password');
        expect(passwordInput).toHaveAttribute('type', 'password');
        expect(passwordInput).toHaveAttribute('placeholder', 'Password');
    });

    test('modal has correct max width', () => {
        render(<DeleteUserForm {...defaultProps} />);
        
        // Open modal
        const deleteButton = screen.getByTestId('danger-button');
        fireEvent.click(deleteButton);
        
        const modal = screen.getByTestId('modal');
        expect(modal).toHaveAttribute('data-max-width', '2xl');
    });

    test('focuses password input when modal opens', () => {
        render(<DeleteUserForm {...defaultProps} />);
        
        // Open modal
        const deleteButton = screen.getByTestId('danger-button');
        fireEvent.click(deleteButton);
        
        const passwordInput = screen.getByTestId('text-input-password');
        expect(passwordInput).toHaveFocus();
    });

    test('clears errors when modal closes', () => {
        render(<DeleteUserForm {...defaultProps} />);
        
        // Open modal
        const deleteButton = screen.getByTestId('danger-button');
        fireEvent.click(deleteButton);
        
        // Close modal
        const modalClose = screen.getByTestId('modal-close');
        fireEvent.click(modalClose);
        
        expect(mockUseForm.clearErrors).toHaveBeenCalled();
    });
});
