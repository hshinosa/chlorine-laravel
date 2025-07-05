import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextInput from '@/Components/TextInput';

describe('TextInput Component', () => {
  test('renders input with default type text', () => {
    render(<TextInput data-testid="text-input" />);
    
    const input = screen.getByTestId('text-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
  });

  test('renders with custom type', () => {
    render(<TextInput type="email" data-testid="email-input" />);
    
    const input = screen.getByTestId('email-input');
    expect(input).toHaveAttribute('type', 'email');
  });

  test('applies default className', () => {
    render(<TextInput data-testid="text-input" />);
    
    const input = screen.getByTestId('text-input');
    expect(input).toHaveClass('rounded-md', 'border-gray-300', 'shadow-sm');
  });

  test('applies custom className', () => {
    const customClass = 'custom-input-class';
    render(<TextInput className={customClass} data-testid="text-input" />);
    
    const input = screen.getByTestId('text-input');
    expect(input).toHaveClass(customClass);
  });

  test('focuses when isFocused is true', () => {
    render(<TextInput isFocused={true} data-testid="text-input" />);
    
    const input = screen.getByTestId('text-input');
    expect(input).toHaveFocus();
  });

  test('accepts user input', async () => {
    const user = userEvent.setup();
    render(<TextInput data-testid="text-input" />);
    
    const input = screen.getByTestId('text-input');
    await user.type(input, 'Hello World');
    
    expect(input).toHaveValue('Hello World');
  });

  test('calls onChange handler', async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();
    
    render(<TextInput onChange={handleChange} data-testid="text-input" />);
    
    const input = screen.getByTestId('text-input');
    await user.type(input, 'test');
    
    expect(handleChange).toHaveBeenCalled();
  });

  test('passes through additional props', () => {
    render(
      <TextInput 
        placeholder="Enter text" 
        name="test-input" 
        data-testid="text-input" 
      />
    );
    
    const input = screen.getByTestId('text-input');
    expect(input).toHaveAttribute('placeholder', 'Enter text');
    expect(input).toHaveAttribute('name', 'test-input');
  });
});
