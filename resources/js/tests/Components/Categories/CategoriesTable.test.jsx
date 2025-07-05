import { render, screen, fireEvent } from '@testing-library/react';
import CategoriesTable from '@/Components/Categories/CategoriesTable';

// Mock child components
jest.mock('@/Components/Categories/TableHeader', () => {
  return function MockTableHeader() {
    return (
      <thead>
        <tr>
          <th>Nama</th>
          <th>Status</th>
          <th>Aksi</th>
        </tr>
      </thead>
    );
  };
});

jest.mock('@/Components/Categories/TableRow', () => {
  return function MockTableRow({ category, onDelete }) {
    return (
      <tr data-testid={`category-row-${category.id}`}>
        <td>{category.name}</td>
        <td>{category.status}</td>
        <td>
          <button onClick={() => onDelete(category)}>Delete</button>
        </td>
      </tr>
    );
  };
});

jest.mock('@/Components/Categories/EmptyState', () => {
  return function MockEmptyState() {
    return (
      <tr data-testid="empty-state">
        <td colSpan="3">No categories found</td>
      </tr>
    );
  };
});

jest.mock('@/Components/Categories/Pagination', () => {
  return function MockPagination({ pagination }) {
    return (
      <div data-testid="pagination">
        Pagination for {pagination?.data?.length || 0} items
      </div>
    );
  };
});

describe('CategoriesTable Component', () => {
  const mockOnDelete = jest.fn();

  const mockCategoriesWithData = {
    data: [
      { id: 1, name: 'Technology', status: 'active' },
      { id: 2, name: 'Sports', status: 'inactive' },
      { id: 3, name: 'Music', status: 'active' }
    ],
    links: [
      { url: null, label: '&laquo; Previous', active: false },
      { url: null, label: '1', active: true },
      { url: '/categories?page=2', label: '2', active: false },
      { url: '/categories?page=2', label: 'Next &raquo;', active: false }
    ]
  };

  const mockCategoriesEmpty = {
    data: [],
    links: []
  };

  const mockCategoriesFewLinks = {
    data: [
      { id: 1, name: 'Technology', status: 'active' }
    ],
    links: [
      { url: null, label: '&laquo; Previous', active: false },
      { url: null, label: '1', active: true },
      { url: null, label: 'Next &raquo;', active: false }
    ]
  };

  beforeEach(() => {
    mockOnDelete.mockClear();
  });

  test('renders table with categories data', () => {
    render(<CategoriesTable categories={mockCategoriesWithData} onDelete={mockOnDelete} />);
    
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText('Nama')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Aksi')).toBeInTheDocument();
  });

  test('renders all category rows when data is available', () => {
    render(<CategoriesTable categories={mockCategoriesWithData} onDelete={mockOnDelete} />);
    
    expect(screen.getByTestId('category-row-1')).toBeInTheDocument();
    expect(screen.getByTestId('category-row-2')).toBeInTheDocument();
    expect(screen.getByTestId('category-row-3')).toBeInTheDocument();
    
    expect(screen.getByText('Technology')).toBeInTheDocument();
    expect(screen.getByText('Sports')).toBeInTheDocument();
    expect(screen.getByText('Music')).toBeInTheDocument();
  });

  test('renders empty state when no categories', () => {
    render(<CategoriesTable categories={mockCategoriesEmpty} onDelete={mockOnDelete} />);
    
    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
    expect(screen.getByText('No categories found')).toBeInTheDocument();
    expect(screen.queryByTestId('category-row-1')).not.toBeInTheDocument();
  });

  test('calls onDelete when delete button is clicked', () => {
    render(<CategoriesTable categories={mockCategoriesWithData} onDelete={mockOnDelete} />);
    
    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);
    
    expect(mockOnDelete).toHaveBeenCalledWith(mockCategoriesWithData.data[0]);
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  test('renders pagination when links length > 3', () => {
    render(<CategoriesTable categories={mockCategoriesWithData} onDelete={mockOnDelete} />);
    
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
    expect(screen.getByText('Pagination for 3 items')).toBeInTheDocument();
  });

  test('does not render pagination when links length <= 3', () => {
    render(<CategoriesTable categories={mockCategoriesFewLinks} onDelete={mockOnDelete} />);
    
    expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
  });

  test('applies correct CSS classes to table', () => {
    const { container } = render(<CategoriesTable categories={mockCategoriesWithData} onDelete={mockOnDelete} />);
    
    const tableContainer = container.firstChild;
    expect(tableContainer).toHaveClass('bg-white', 'rounded-lg', 'shadow-sm', 'border', 'border-gray-200', 'overflow-hidden');
    
    const table = container.querySelector('table');
    expect(table).toHaveClass('min-w-full', 'divide-y', 'divide-gray-200');
  });

  test('applies correct CSS classes to tbody', () => {
    const { container } = render(<CategoriesTable categories={mockCategoriesWithData} onDelete={mockOnDelete} />);
    
    const tbody = container.querySelector('tbody');
    expect(tbody).toHaveClass('bg-white', 'divide-y', 'divide-gray-200');
  });

  test('handles undefined categories prop gracefully', () => {
    render(<CategoriesTable onDelete={mockOnDelete} />);
    
    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
    expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
  });

  test('handles categories prop with only data defined', () => {
    const categoriesOnlyData = { data: mockCategoriesWithData.data };
    render(<CategoriesTable categories={categoriesOnlyData} onDelete={mockOnDelete} />);
    
    expect(screen.getByTestId('category-row-1')).toBeInTheDocument();
    expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
  });

  test('handles categories prop with only links defined', () => {
    const categoriesOnlyLinks = { links: mockCategoriesWithData.links };
    render(<CategoriesTable categories={categoriesOnlyLinks} onDelete={mockOnDelete} />);
    
    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  test('handles categories prop with empty data array', () => {
    const categoriesEmptyData = { 
      data: [], 
      links: mockCategoriesWithData.links 
    };
    render(<CategoriesTable categories={categoriesEmptyData} onDelete={mockOnDelete} />);
    
    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  test('pagination component receives correct props', () => {
    render(<CategoriesTable categories={mockCategoriesWithData} onDelete={mockOnDelete} />);
    
    // The pagination should receive the categories prop
    expect(screen.getByText('Pagination for 3 items')).toBeInTheDocument();
  });
});
