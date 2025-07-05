import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PrimaryButton from '@/Components/PrimaryButton';

describe('PrimaryButton Component', () => {
  test('renders button with children', () => {
    const buttonText = 'Click Me';
    
    render(<PrimaryButton>{buttonText}</PrimaryButton>);
    
    expect(screen.getByRole('button', { name: buttonText })).toBeInTheDocument();
  });

  test('applies default styling classes', () => {
    render(<PrimaryButton>Test Button</PrimaryButton>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'inline-flex', 'items-center', 'rounded-md', 
      'bg-gray-800', 'text-white', 'font-semibold'
    );
  });

  test('applies custom className', () => {
    const customClass = 'custom-button-class';
    
    render(<PrimaryButton className={customClass}>Test</PrimaryButton>);
    
    expect(screen.getByRole('button')).toHaveClass(customClass);
  });

  test('disables button when disabled prop is true', () => {
    render(<PrimaryButton disabled>Disabled Button</PrimaryButton>);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-25');
  });

  test('calls onClick handler when clicked', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    
    render(<PrimaryButton onClick={handleClick}>Click Me</PrimaryButton>);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not call onClick when disabled', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    
    render(
      <PrimaryButton disabled onClick={handleClick}>
        Disabled Button
      </PrimaryButton>
    );
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('passes through additional props', () => {
    render(
      <PrimaryButton type="submit" data-testid="submit-button">
        Submit
      </PrimaryButton>
    );
    
    const button = screen.getByTestId('submit-button');
    expect(button).toHaveAttribute('type', 'submit');
  });
});
