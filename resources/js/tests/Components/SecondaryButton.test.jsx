import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SecondaryButton from '@/Components/SecondaryButton';

describe('SecondaryButton Component', () => {
  test('renders button with children', () => {
    const buttonText = 'Cancel';
    
    render(<SecondaryButton>{buttonText}</SecondaryButton>);
    
    expect(screen.getByRole('button', { name: buttonText })).toBeInTheDocument();
  });

  test('has default type of button', () => {
    render(<SecondaryButton>Test</SecondaryButton>);
    
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  test('applies default styling classes', () => {
    render(<SecondaryButton>Test Button</SecondaryButton>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'inline-flex', 'items-center', 'rounded-md', 
      'border-gray-300', 'bg-white', 'text-gray-700'
    );
  });

  test('applies custom className', () => {
    const customClass = 'custom-secondary-class';
    
    render(<SecondaryButton className={customClass}>Test</SecondaryButton>);
    
    expect(screen.getByRole('button')).toHaveClass(customClass);
  });

  test('disables button when disabled prop is true', () => {
    render(<SecondaryButton disabled>Disabled</SecondaryButton>);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-25');
  });

  test('calls onClick handler when clicked', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    
    render(<SecondaryButton onClick={handleClick}>Click Me</SecondaryButton>);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('accepts custom type', () => {
    render(<SecondaryButton type="submit">Submit</SecondaryButton>);
    
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  test('passes through additional props', () => {
    render(
      <SecondaryButton data-testid="secondary-btn" form="test-form">
        Cancel
      </SecondaryButton>
    );
    
    const button = screen.getByTestId('secondary-btn');
    expect(button).toHaveAttribute('form', 'test-form');
  });
});
