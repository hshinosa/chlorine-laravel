import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '@/Pages/Auth/Login';

// Mock dependencies
jest.mock('@inertiajs/react', () => ({
    ...jest.requireActual('@inertiajs/react'),
    useForm: () => ({
        data: {
            email: '',
            password: '',
            remember: false
        },
        setData: jest.fn(),
        post: jest.fn(),
        processing: false,
        errors: {},
        reset: jest.fn()
    }),
    route: (name) => {
        const routes = {
            'login': '/login',
            'dashboard': '/dashboard'
        };
        return routes[name] || '/';
    },
    Head: ({ title }) => <title>{title}</title>,
    Link: ({ href, children, ...props }) => <a href={href} {...props}>{children}</a>
}));

jest.mock('@/Layouts/GuestLayout', () => {
    return function MockGuestLayout({ children }) {
        return <div data-testid="guest-layout">{children}</div>;
    };
});

jest.mock('@/Components/Checkbox', () => {
    return function MockCheckbox({ name, checked, onChange }) {
        return (
            <input
                data-testid="checkbox"
                type="checkbox"
                name={name}
                checked={checked}
                onChange={onChange}
            />
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
    return function MockInputLabel({ htmlFor, value }) {
        return <label data-testid="input-label" htmlFor={htmlFor}>{value}</label>;
    };
});

jest.mock('@/Components/PrimaryButton', () => {
    return function MockPrimaryButton({ children, className, disabled, ...props }) {
        return (
            <button
                data-testid="primary-button"
                className={className}
                disabled={disabled}
                {...props}
            >
                {children}
            </button>
        );
    };
});

jest.mock('@/Components/TextInput', () => {
    return function MockTextInput({ id, type, name, value, onChange, className, placeholder, ...props }) {
        return (
            <input
                data-testid="text-input"
                id={id}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className={className}
                placeholder={placeholder}
                {...props}
            />
        );
    };
});

describe('Login Page', () => {
    const defaultProps = {
        status: null
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders login page correctly', () => {
        render(<Login {...defaultProps} />);

        expect(screen.getByTestId('guest-layout')).toBeInTheDocument();
        expect(screen.getByText('Login ke Chlorine')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByTestId('checkbox')).toBeInTheDocument();
        expect(screen.getByTestId('primary-button')).toBeInTheDocument();
    });

    test('displays status message when provided', () => {
        render(<Login status="Registration successful!" />);

        expect(screen.getByText('Registration successful!')).toBeInTheDocument();
        expect(screen.getByText('Registration successful!')).toHaveClass('text-green-600');
    });

    test('renders all form fields', () => {
        render(<Login {...defaultProps} />);

        // Check email field
        expect(screen.getByText('Email')).toBeInTheDocument();
        const emailInput = screen.getAllByTestId('text-input')[0];
        expect(emailInput).toHaveAttribute('type', 'email');
        expect(emailInput).toHaveAttribute('placeholder', 'Masukkan email Anda');

        // Check password field
        expect(screen.getByText('Password')).toBeInTheDocument();
        const passwordInput = screen.getAllByTestId('text-input')[1];
        expect(passwordInput).toHaveAttribute('type', 'password');
        expect(passwordInput).toHaveAttribute('placeholder', 'Masukkan password Anda');

        // Check remember me checkbox
        expect(screen.getByText('Remember me')).toBeInTheDocument();
        expect(screen.getByTestId('checkbox')).toBeInTheDocument();
    });

    test('renders login button with correct text', () => {
        render(<Login {...defaultProps} />);

        const loginButton = screen.getByTestId('primary-button');
        expect(loginButton).toBeInTheDocument();
        expect(loginButton).toHaveTextContent('Login');
        expect(loginButton).not.toBeDisabled();
    });

    test('renders back to dashboard link', () => {
        render(<Login {...defaultProps} />);

        const dashboardLink = screen.getByText('← Kembali ke Dashboard');
        expect(dashboardLink).toBeInTheDocument();
        expect(dashboardLink.closest('a')).toHaveAttribute('href', '/');
    });

    test('sets correct page title', () => {
        render(<Login {...defaultProps} />);

        expect(document.title).toBe('Login');
    });

    test('form has correct structure', () => {
        render(<Login {...defaultProps} />);

        const form = screen.getByRole('button', { name: 'Login' }).closest('form');
        expect(form).toBeInTheDocument();
    });

    test('all input fields have proper attributes', () => {
        render(<Login {...defaultProps} />);

        const emailInput = screen.getAllByTestId('text-input')[0];
        expect(emailInput).toHaveAttribute('autoComplete', 'username');
        expect(emailInput).toHaveAttribute('name', 'email');

        const passwordInput = screen.getAllByTestId('text-input')[1];
        expect(passwordInput).toHaveAttribute('autoComplete', 'current-password');
        expect(passwordInput).toHaveAttribute('name', 'password');
    });

    test('checkbox has correct attributes', () => {
        render(<Login {...defaultProps} />);

        const checkbox = screen.getByTestId('checkbox');
        expect(checkbox).toHaveAttribute('name', 'remember');
        expect(checkbox).not.toBeChecked();
    });

    test('displays proper styling classes', () => {
        render(<Login {...defaultProps} />);

        // Check main container structure
        const loginTitle = screen.getByText('Login ke Chlorine');
        expect(loginTitle).toHaveClass('text-2xl', 'font-bold', 'text-center', 'text-gray-800');

        // Check button styling
        const loginButton = screen.getByTestId('primary-button');
        expect(loginButton).toHaveClass('w-full');
    });
});
