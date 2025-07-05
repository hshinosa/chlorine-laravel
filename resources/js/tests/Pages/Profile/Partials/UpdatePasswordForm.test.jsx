import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useForm } from '@inertiajs/react';
import UpdatePasswordForm from '@/Pages/Profile/Partials/UpdatePasswordForm';

// Mock dependencies
jest.mock('@inertiajs/react', () => ({
    ...jest.requireActual('@inertiajs/react'),
    useForm: jest.fn()
}));

jest.mock('@headlessui/react', () => ({
    Transition: ({ show, children, enter, enterFrom, enterTo, leave, leaveFrom, leaveTo }) => {
        return show ? (
            <div 
                data-testid="transition" 
                className={`${enter} ${enterFrom} ${enterTo} ${leave} ${leaveFrom} ${leaveTo}`}
            >
                {children}
            </div>
        ) : null;
    }
}));

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

jest.mock('@/Components/PrimaryButton', () => {
    return function MockPrimaryButton({ disabled, children, ...props }) {
        return (
            <button 
                {...props} 
                data-testid="primary-button"
                disabled={disabled}
            >
                {children}
            </button>
        );
    };
});

jest.mock('@/Components/TextInput', () => {
    return function MockTextInput({ id, type, value, onChange, ...props }) {
        return (
            <input
                {...props}
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                data-testid={`text-input-${id}`}
            />
        );
    };
});

const mockUseForm = {
    data: {
        current_password: '',
        password: '',
        password_confirmation: ''
    },
    setData: jest.fn(),
    put: jest.fn(),
    processing: false,
    errors: {},
    reset: jest.fn(),
    recentlySuccessful: false
};

describe('UpdatePasswordForm', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        useForm.mockReturnValue(mockUseForm);
    });

    const defaultProps = {
        className: 'max-w-xl'
    };

    test('renders update password form', () => {
        render(<UpdatePasswordForm {...defaultProps} />);
        
        expect(screen.getByText('Update Password')).toBeInTheDocument();
        expect(screen.getByText('Ensure your account is using a long, random password to stay secure.')).toBeInTheDocument();
    });

    test('renders all password fields', () => {
        render(<UpdatePasswordForm {...defaultProps} />);
        
        // Current Password
        expect(screen.getByText('Current Password')).toBeInTheDocument();
        expect(screen.getByTestId('text-input-current_password')).toBeInTheDocument();
        expect(screen.getByTestId('text-input-current_password')).toHaveAttribute('type', 'password');
        
        // New Password
        expect(screen.getByText('New Password')).toBeInTheDocument();
        expect(screen.getByTestId('text-input-password')).toBeInTheDocument();
        expect(screen.getByTestId('text-input-password')).toHaveAttribute('type', 'password');
        
        // Confirm Password
        expect(screen.getByText('Confirm Password')).toBeInTheDocument();
        expect(screen.getByTestId('text-input-password_confirmation')).toBeInTheDocument();
        expect(screen.getByTestId('text-input-password_confirmation')).toHaveAttribute('type', 'password');
    });

    test('handles current password input change', () => {
        render(<UpdatePasswordForm {...defaultProps} />);
        
        const currentPasswordInput = screen.getByTestId('text-input-current_password');
        fireEvent.change(currentPasswordInput, { target: { value: 'current_password' } });
        
        expect(mockUseForm.setData).toHaveBeenCalledWith('current_password', 'current_password');
    });

    test('handles new password input change', () => {
        render(<UpdatePasswordForm {...defaultProps} />);
        
        const passwordInput = screen.getByTestId('text-input-password');
        fireEvent.change(passwordInput, { target: { value: 'new_password' } });
        
        expect(mockUseForm.setData).toHaveBeenCalledWith('password', 'new_password');
    });

    test('handles password confirmation input change', () => {
        render(<UpdatePasswordForm {...defaultProps} />);
        
        const confirmationInput = screen.getByTestId('text-input-password_confirmation');
        fireEvent.change(confirmationInput, { target: { value: 'new_password' } });
        
        expect(mockUseForm.setData).toHaveBeenCalledWith('password_confirmation', 'new_password');
    });

    test('submits form with correct data', async () => {
        render(<UpdatePasswordForm {...defaultProps} />);
        
        const form = screen.getByRole('button', { name: 'Save' }).closest('form');
        fireEvent.submit(form);
        
        await waitFor(() => {
            expect(mockUseForm.put).toHaveBeenCalledWith('/password.update', {
                preserveScroll: true,
                onSuccess: expect.any(Function),
                onError: expect.any(Function)
            });
        });
    });

    test('resets form on success', async () => {
        const mockFormWithSubmit = {
            ...mockUseForm,
            put: jest.fn((route, options) => {
                // Simulate successful submission
                options.onSuccess();
            })
        };
        
        useForm.mockReturnValue(mockFormWithSubmit);
        
        render(<UpdatePasswordForm {...defaultProps} />);
        
        const form = screen.getByRole('button', { name: 'Save' }).closest('form');
        fireEvent.submit(form);
        
        await waitFor(() => {
            expect(mockFormWithSubmit.reset).toHaveBeenCalled();
        });
    });

    test('displays validation errors', () => {
        const mockFormWithErrors = {
            ...mockUseForm,
            errors: {
                current_password: 'Current password is required.',
                password: 'Password must be at least 8 characters.',
                password_confirmation: 'Password confirmation does not match.'
            }
        };
        
        useForm.mockReturnValue(mockFormWithErrors);
        
        render(<UpdatePasswordForm {...defaultProps} />);
        
        expect(screen.getByText('Current password is required.')).toBeInTheDocument();
        expect(screen.getByText('Password must be at least 8 characters.')).toBeInTheDocument();
        expect(screen.getByText('Password confirmation does not match.')).toBeInTheDocument();
    });

    test('shows processing state', () => {
        const mockFormProcessing = {
            ...mockUseForm,
            processing: true
        };
        
        useForm.mockReturnValue(mockFormProcessing);
        
        render(<UpdatePasswordForm {...defaultProps} />);
        
        const saveButton = screen.getByTestId('primary-button');
        expect(saveButton).toHaveAttribute('disabled');
    });

    test('shows success message when recently successful', () => {
        const mockFormSuccessful = {
            ...mockUseForm,
            recentlySuccessful: true
        };
        
        useForm.mockReturnValue(mockFormSuccessful);
        
        render(<UpdatePasswordForm {...defaultProps} />);
        
        expect(screen.getByText('Saved.')).toBeInTheDocument();
    });

    test('applies custom className', () => {
        render(<UpdatePasswordForm className="custom-class" />);
        
        const section = screen.getByText('Update Password').closest('section');
        expect(section).toHaveClass('custom-class');
    });

    test('has correct form structure', () => {
        render(<UpdatePasswordForm {...defaultProps} />);
        
        const form = screen.getByRole('button', { name: 'Save' }).closest('form');
        expect(form).toBeInTheDocument();
        
        const saveButton = screen.getByTestId('primary-button');
        expect(saveButton).toHaveTextContent('Save');
    });

    test('has correct autocomplete attributes', () => {
        render(<UpdatePasswordForm {...defaultProps} />);
        
        expect(screen.getByTestId('text-input-current_password')).toHaveAttribute('autoComplete', 'current-password');
        expect(screen.getByTestId('text-input-password')).toHaveAttribute('autoComplete', 'new-password');
        expect(screen.getByTestId('text-input-password_confirmation')).toHaveAttribute('autoComplete', 'new-password');
    });
});
