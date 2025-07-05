import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DangerButton from '@/Components/DangerButton';

describe('DangerButton Component', () => {
  test('renders button with children', () => {
    const buttonText = 'Delete';
    
    render(<DangerButton>{buttonText}</DangerButton>);
    
    expect(screen.getByRole('button', { name: buttonText })).toBeInTheDocument();
  });

  test('applies default danger styling classes', () => {
    render(<DangerButton>Delete</DangerButton>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'bg-red-600', 'text-white', 'border-transparent',
      'hover:bg-red-500', 'focus:ring-red-500'
    );
  });

  test('applies custom className', () => {
    const customClass = 'custom-danger-class';
    
    render(<DangerButton className={customClass}>Delete</DangerButton>);
    
    expect(screen.getByRole('button')).toHaveClass(customClass);
  });

  test('disables button when disabled prop is true', () => {
    render(<DangerButton disabled>Disabled Delete</DangerButton>);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-25');
  });

  test('calls onClick handler when clicked', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    
    render(<DangerButton onClick={handleClick}>Delete</DangerButton>);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not call onClick when disabled', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    
    render(
      <DangerButton disabled onClick={handleClick}>
        Delete
      </DangerButton>
    );
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('passes through additional props', () => {
    render(
      <DangerButton type="button" data-testid="danger-btn">
        Danger Action
      </DangerButton>
    );
    
    const button = screen.getByTestId('danger-btn');
    expect(button).toHaveAttribute('type', 'button');
  });
});
