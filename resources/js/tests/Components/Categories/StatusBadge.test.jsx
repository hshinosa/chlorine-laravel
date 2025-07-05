import { render, screen } from '@testing-library/react';
import StatusBadge from '@/Components/Categories/StatusBadge';

describe('StatusBadge Component', () => {
  test('renders PUBLISHED badge when isPublished is true', () => {
    render(<StatusBadge isPublished={true} />);
    
    const badge = screen.getByText('PUBLISHED');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-blue-100', 'text-blue-800', 'border-blue-200');
  });

  test('renders DRAFT badge when isPublished is false', () => {
    render(<StatusBadge isPublished={false} />);
    
    const badge = screen.getByText('DRAFT');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-gray-100', 'text-gray-800', 'border-gray-200');
  });

  test('applies base styling classes', () => {
    render(<StatusBadge isPublished={true} />);
    
    const badge = screen.getByText('PUBLISHED');
    expect(badge).toHaveClass(
      'inline-flex', 'px-3', 'py-1', 'text-xs', 
      'font-semibold', 'rounded-full', 'uppercase', 'tracking-wide'
    );
  });

  test('handles undefined isPublished as falsy', () => {
    render(<StatusBadge />);
    
    const badge = screen.getByText('DRAFT');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-gray-100', 'text-gray-800');
  });

  test('handles null isPublished as falsy', () => {
    render(<StatusBadge isPublished={null} />);
    
    const badge = screen.getByText('DRAFT');
    expect(badge).toBeInTheDocument();
  });
});
