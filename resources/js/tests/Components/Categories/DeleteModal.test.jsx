import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DeleteModal from '@/Components/Categories/DeleteModal';

describe('DeleteModal Component', () => {
  const mockCategory = {
    id: 1,
    name: 'Test Category'
  };

  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders modal when show is true', () => {
    render(
      <DeleteModal 
        show={true} 
        category={mockCategory} 
        onClose={mockOnClose} 
        onConfirm={mockOnConfirm} 
      />
    );
    
    expect(screen.getByText('Hapus Kategori')).toBeInTheDocument();
    expect(screen.getByText(/Apakah Anda yakin ingin menghapus kategori/)).toBeInTheDocument();
    expect(screen.getByText(/Test Category/)).toBeInTheDocument();
  });

  test('does not render modal when show is false', () => {
    render(
      <DeleteModal 
        show={false} 
        category={mockCategory} 
        onClose={mockOnClose} 
        onConfirm={mockOnConfirm} 
      />
    );
    
    expect(screen.queryByText('Hapus Kategori')).not.toBeInTheDocument();
  });

  test('calls onClose when cancel button is clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <DeleteModal 
        show={true} 
        category={mockCategory} 
        onClose={mockOnClose} 
        onConfirm={mockOnConfirm} 
      />
    );
    
    const cancelButton = screen.getByText('Batal');
    await user.click(cancelButton);
    
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('calls onConfirm when delete button is clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <DeleteModal 
        show={true} 
        category={mockCategory} 
        onClose={mockOnClose} 
        onConfirm={mockOnConfirm} 
      />
    );
    
    const deleteButton = screen.getByText('Hapus');
    await user.click(deleteButton);
    
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  test('shows processing state correctly', () => {
    render(
      <DeleteModal 
        show={true} 
        category={mockCategory} 
        onClose={mockOnClose} 
        onConfirm={mockOnConfirm} 
        isDeleting={true}
      />
    );
    
    const deleteButton = screen.getByText('Menghapus...');
    expect(deleteButton).toBeDisabled();
  });

  test('applies correct styling to buttons', () => {
    render(
      <DeleteModal 
        show={true} 
        category={mockCategory} 
        onClose={mockOnClose} 
        onConfirm={mockOnConfirm} 
      />
    );
    
    const cancelButton = screen.getByText('Batal');
    expect(cancelButton).toHaveClass(
      'px-4',
      'py-2',
      'text-sm',
      'font-medium',
      'text-gray-700',
      'bg-white',
      'border',
      'border-gray-300',
      'rounded-md'
    );
    
    const deleteButton = screen.getByText('Hapus');
    expect(deleteButton).toHaveClass(
      'px-4',
      'py-2',
      'text-sm',
      'font-medium',
      'text-white',
      'bg-red-600',
      'border',
      'border-transparent',
      'rounded-md'
    );
  });

  test('displays warning icon', () => {
    render(
      <DeleteModal 
        show={true} 
        category={mockCategory} 
        onClose={mockOnClose} 
        onConfirm={mockOnConfirm} 
      />
    );
    
    // SVG is nested inside HeadlessUI portal, use different selector
    const warningIcon = screen.getByRole('dialog').querySelector('svg');
    expect(warningIcon).toBeInTheDocument();
    expect(warningIcon).toHaveClass('w-6', 'h-6', 'text-red-600');
  });

  test('has proper modal structure', () => {
    render(
      <DeleteModal 
        show={true} 
        category={mockCategory} 
        onClose={mockOnClose} 
        onConfirm={mockOnConfirm} 
      />
    );
    
    // Just verify the modal renders correctly by checking for content
    expect(screen.getByText(/Hapus Kategori/)).toBeInTheDocument();
  });

  test('shows correct warning message', () => {
    render(
      <DeleteModal 
        show={true} 
        category={mockCategory} 
        onClose={mockOnClose} 
        onConfirm={mockOnConfirm} 
      />
    );
    
    expect(screen.getByText(/Tindakan ini tidak dapat dibatalkan/)).toBeInTheDocument();
  });

  test('handles different category names', () => {
    const differentCategory = {
      id: 2,
      name: 'Different Category Name'
    };
    
    render(
      <DeleteModal 
        show={true} 
        category={differentCategory} 
        onClose={mockOnClose} 
        onConfirm={mockOnConfirm} 
      />
    );
    
    expect(screen.getByText(/Different Category Name/)).toBeInTheDocument();
  });
});
