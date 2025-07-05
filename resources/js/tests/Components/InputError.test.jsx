import { render, screen } from '@testing-library/react';
import InputError from '@/Components/InputError';

describe('InputError Component', () => {
  test('renders error message when provided', () => {
    const errorMessage = 'This field is required';
    
    render(<InputError message={errorMessage} />);
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toHaveClass('text-sm', 'text-red-600');
  });

  test('does not render when no message provided', () => {
    const { container } = render(<InputError />);
    
    expect(container.firstChild).toBeNull();
  });

  test('does not render when empty message provided', () => {
    const { container } = render(<InputError message="" />);
    
    expect(container.firstChild).toBeNull();
  });

  test('applies custom className', () => {
    const errorMessage = 'Custom error';
    const customClass = 'custom-error-class';
    
    render(<InputError message={errorMessage} className={customClass} />);
    
    expect(screen.getByText(errorMessage)).toHaveClass(customClass);
  });

  test('passes through additional props', () => {
    const errorMessage = 'Test error';
    
    render(<InputError message={errorMessage} data-testid="error-message" />);
    
    expect(screen.getByTestId('error-message')).toBeInTheDocument();
  });
});
