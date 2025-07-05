import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ActionButtons from '@/Components/Categories/ActionButtons';

// Mock Link component from Inertia
jest.mock('@inertiajs/react', () => ({
  ...jest.requireActual('@inertiajs/react'),
  Link: ({ href, children, className }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

describe('ActionButtons Component', () => {
  const mockCategory = {
    id: 1,
    name: 'Test Category',
    is_publish: true
  };

  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders edit and delete buttons', () => {
    render(<ActionButtons category={mockCategory} onDelete={mockOnDelete} />);
    
    expect(screen.getByText('EDIT')).toBeInTheDocument();
    expect(screen.getByText('DELETE')).toBeInTheDocument();
  });

  test('edit button has correct link', () => {
    render(<ActionButtons category={mockCategory} onDelete={mockOnDelete} />);
    
    const editLink = screen.getByText('EDIT').closest('a');
    expect(editLink).toHaveAttribute('href', '/categories/1/edit');
  });

  test('edit button has correct styling', () => {
    render(<ActionButtons category={mockCategory} onDelete={mockOnDelete} />);
    
    const editButton = screen.getByText('EDIT');
    expect(editButton).toHaveClass(
      'inline-flex', 'items-center', 'px-3', 'py-1', 'text-xs',
      'font-semibold', 'text-white', 'bg-green-600', 'rounded',
      'hover:bg-green-700', 'transition-colors', 'uppercase', 'tracking-wide'
    );
  });

  test('delete button has correct styling', () => {
    render(<ActionButtons category={mockCategory} onDelete={mockOnDelete} />);
    
    const deleteButton = screen.getByText('DELETE');
    expect(deleteButton).toHaveClass(
      'inline-flex', 'items-center', 'px-3', 'py-1', 'text-xs',
      'font-semibold', 'text-white', 'bg-blue-600', 'rounded',
      'hover:bg-blue-700', 'transition-colors', 'uppercase', 'tracking-wide'
    );
  });

  test('delete button calls onDelete when clicked', async () => {
    const user = userEvent.setup();
    render(<ActionButtons category={mockCategory} onDelete={mockOnDelete} />);
    
    const deleteButton = screen.getByText('DELETE');
    await user.click(deleteButton);
    
    expect(mockOnDelete).toHaveBeenCalledWith(mockCategory);
  });

  test('buttons are contained in flex container with correct spacing', () => {
    const { container } = render(<ActionButtons category={mockCategory} onDelete={mockOnDelete} />);
    
    const flexContainer = container.querySelector('.flex.items-center.space-x-2');
    expect(flexContainer).toBeInTheDocument();
  });

  test('handles category with different id', () => {
    const differentCategory = { ...mockCategory, id: 999 };
    render(<ActionButtons category={differentCategory} onDelete={mockOnDelete} />);
    
    const editLink = screen.getByText('EDIT').closest('a');
    expect(editLink).toHaveAttribute('href', '/categories/999/edit');
  });
});
