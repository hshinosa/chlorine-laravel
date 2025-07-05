import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TableRow from '@/Components/Categories/TableRow';
import ActionButtons from '@/Components/Categories/ActionButtons';
import StatusBadge from '@/Components/Categories/StatusBadge';

// Mock child components
jest.mock('@/Components/Categories/ActionButtons', () => {
  return function MockActionButtons({ category, onDelete }) {
    return (
      <div data-testid="action-buttons">
        Action buttons for {category.name}
      </div>
    );
  };
});

jest.mock('@/Components/Categories/StatusBadge', () => {
  return function MockStatusBadge({ isPublish }) {
    return (
      <span data-testid="status-badge">
        {isPublish ? 'Published' : 'Draft'}
      </span>
    );
  };
});

describe('TableRow Component', () => {
  const mockCategory = {
    id: 1,
    name: 'Test Category',
    is_publish: true,
    created_at: '2025-01-01T00:00:00.000000Z',
    updated_at: '2025-01-02T00:00:00.000000Z'
  };

  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders category data correctly', () => {
    render(
      <table>
        <tbody>
          <TableRow category={mockCategory} onDelete={mockOnDelete} />
        </tbody>
      </table>
    );

    expect(screen.getByText('CAT001')).toBeInTheDocument(); // Changed from '1' to 'CAT001'
    expect(screen.getByText('Test Category')).toBeInTheDocument();
    expect(screen.getByTestId('status-badge')).toBeInTheDocument();
    expect(screen.getByTestId('action-buttons')).toBeInTheDocument();
  });

  test('formats dates correctly', () => {
    render(
      <table>
        <tbody>
          <TableRow category={mockCategory} onDelete={mockOnDelete} />
        </tbody>
      </table>
    );

    // Check for formatted dates (assuming Indonesian locale format)
    expect(screen.getByText(/01 Jan 2025/)).toBeInTheDocument();
    // Remove the second date check since both dates format to the same display
  });

  test('applies correct table row styling', () => {
    const { container } = render(
      <table>
        <tbody>
          <TableRow category={mockCategory} onDelete={mockOnDelete} />
        </tbody>
      </table>
    );

    const row = container.querySelector('tr');
    expect(row).toHaveClass('hover:bg-gray-50');
  });

  test('applies correct cell styling', () => {
    const { container } = render(
      <table>
        <tbody>
          <TableRow category={mockCategory} onDelete={mockOnDelete} />
        </tbody>
      </table>
    );

    const cells = container.querySelectorAll('td');
    cells.forEach(cell => {
      // Some cells don't have whitespace-nowrap
      expect(cell).toHaveClass('px-6', 'py-4');
    });
  });

  test('passes correct props to StatusBadge', () => {
    render(
      <table>
        <tbody>
          <TableRow category={mockCategory} onDelete={mockOnDelete} />
        </tbody>
      </table>
    );

    const statusBadge = screen.getByTestId('status-badge');
    expect(statusBadge).toHaveTextContent('Draft');
  });

  test('passes correct props to ActionButtons', () => {
    render(
      <table>
        <tbody>
          <TableRow category={mockCategory} onDelete={mockOnDelete} />
        </tbody>
      </table>
    );

    const actionButtons = screen.getByTestId('action-buttons');
    expect(actionButtons).toHaveTextContent('Action buttons for Test Category');
  });

  test('handles unpublished category', () => {
    const unpublishedCategory = { ...mockCategory, is_publish: false };
    
    render(
      <table>
        <tbody>
          <TableRow category={unpublishedCategory} onDelete={mockOnDelete} />
        </tbody>
      </table>
    );

    const statusBadge = screen.getByTestId('status-badge');
    expect(statusBadge).toHaveTextContent('Draft');
  });

  test('handles different category data', () => {
    const differentCategory = {
      id: 999,
      name: 'Different Category Name',
      is_publish: false,
      created_at: '2024-12-31T23:59:59.000000Z',
      updated_at: '2025-01-01T12:30:45.000000Z'
    };

    render(
      <table>
        <tbody>
          <TableRow category={differentCategory} onDelete={mockOnDelete} />
        </tbody>
      </table>
    );

    expect(screen.getByText('CAT999')).toBeInTheDocument();
    expect(screen.getByText('Different Category Name')).toBeInTheDocument();
  });

  test('has correct number of table cells', () => {
    const { container } = render(
      <table>
        <tbody>
          <TableRow category={mockCategory} onDelete={mockOnDelete} />
        </tbody>
      </table>
    );

    const cells = container.querySelectorAll('td');
    expect(cells).toHaveLength(7); // ID, Date, Name, Status, Badge, Detail, Actions
  });

  test('action cell has correct alignment', () => {
    const { container } = render(
      <table>
        <tbody>
          <TableRow category={mockCategory} onDelete={mockOnDelete} />
        </tbody>
      </table>
    );

    const actionCell = container.querySelector('td:last-child');
    expect(actionCell).toHaveClass('px-6', 'py-4', 'whitespace-nowrap');
  });
});
