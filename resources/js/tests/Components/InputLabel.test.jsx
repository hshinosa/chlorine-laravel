import { render, screen } from '@testing-library/react';
import InputLabel from '@/Components/InputLabel';

describe('InputLabel Component', () => {
  test('renders label with value prop', () => {
    const labelText = 'Username';
    
    render(<InputLabel value={labelText} />);
    
    expect(screen.getByText(labelText)).toBeInTheDocument();
    expect(screen.getByText(labelText)).toHaveClass('block', 'text-sm', 'font-medium', 'text-gray-700');
  });

  test('renders label with children when no value prop', () => {
    const labelText = 'Email Address';
    
    render(<InputLabel>{labelText}</InputLabel>);
    
    expect(screen.getByText(labelText)).toBeInTheDocument();
  });

  test('prefers value prop over children', () => {
    const valueProp = 'Value Prop';
    const childrenText = 'Children Text';
    
    render(<InputLabel value={valueProp}>{childrenText}</InputLabel>);
    
    expect(screen.getByText(valueProp)).toBeInTheDocument();
    expect(screen.queryByText(childrenText)).not.toBeInTheDocument();
  });

  test('applies custom className', () => {
    const labelText = 'Custom Label';
    const customClass = 'custom-label-class';
    
    render(<InputLabel value={labelText} className={customClass} />);
    
    expect(screen.getByText(labelText)).toHaveClass(customClass);
  });

  test('passes through additional props', () => {
    const labelText = 'Test Label';
    
    render(<InputLabel value={labelText} htmlFor="test-input" data-testid="label" />);
    
    const label = screen.getByTestId('label');
    expect(label).toHaveAttribute('for', 'test-input');
  });
});
