import { render, screen } from '@testing-library/react';
import Checkbox from '@/Components/Checkbox';

describe('Checkbox Component', () => {
  test('renders checkbox input', () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  test('applies default classes', () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveClass(
      'rounded',
      'border-gray-300',
      'text-indigo-600',
      'shadow-sm',
      'focus:ring-indigo-500'
    );
  });

  test('applies custom className', () => {
    const customClass = 'custom-checkbox-class';
    render(<Checkbox className={customClass} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveClass(customClass);
  });

  test('handles checked prop', () => {
    render(<Checkbox checked />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  test('handles unchecked prop', () => {
    render(<Checkbox checked={false} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  test('handles disabled state', () => {
    render(<Checkbox disabled />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });

  test('handles name prop', () => {
    const name = 'test-checkbox';
    render(<Checkbox name={name} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('name', name);
  });

  test('handles value prop', () => {
    const value = 'checkbox-value';
    render(<Checkbox value={value} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('value', value);
  });

  test('forwards other props', () => {
    render(<Checkbox data-testid="test-checkbox" />);
    const checkbox = screen.getByTestId('test-checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  test('has correct input type', () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('type', 'checkbox');
  });
});
