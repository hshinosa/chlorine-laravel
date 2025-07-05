import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterSection from '@/Components/Categories/FilterSection';

describe('FilterSection Component', () => {
  const defaultFilters = {
    search: '',
    date: ''
  };

  const mockOnFilterChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders search input and date input', () => {
    render(
      <FilterSection 
        search=""
        setSearch={jest.fn()}
        dateFilter=""
        setDateFilter={jest.fn()}
        onSearch={jest.fn()}
        onReset={jest.fn()}
      />
    );
    
    expect(screen.getByPlaceholderText('Cari Nama Kategori')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tanggal Dibuat')).toBeInTheDocument();
  });

  test('displays current search value', () => {
    render(
      <FilterSection 
        search="test search"
        setSearch={jest.fn()}
        dateFilter=""
        setDateFilter={jest.fn()}
        onSearch={jest.fn()}
        onReset={jest.fn()}
      />
    );
    
    const searchInput = screen.getByPlaceholderText('Cari Nama Kategori');
    expect(searchInput).toHaveValue('test search');
  });

  test('displays current date value', () => {
    render(
      <FilterSection 
        search=""
        setSearch={jest.fn()}
        dateFilter="2025-01-01"
        setDateFilter={jest.fn()}
        onSearch={jest.fn()}
        onReset={jest.fn()}
      />
    );
    
    const dateInput = screen.getByPlaceholderText('Tanggal Dibuat');
    expect(dateInput).toHaveValue('2025-01-01');
  });

  test('calls setSearch when search input changes', async () => {
    const mockSetSearch = jest.fn();
    const user = userEvent.setup();
    
    render(
      <FilterSection 
        search=""
        setSearch={mockSetSearch}
        dateFilter=""
        setDateFilter={jest.fn()}
        onSearch={jest.fn()}
        onReset={jest.fn()}
      />
    );
    
    const searchInput = screen.getByPlaceholderText('Cari Nama Kategori');
    await user.type(searchInput, 'new search');
    
    expect(mockSetSearch).toHaveBeenCalled();
  });

  test('calls setDateFilter when date input changes', async () => {
    const mockSetDateFilter = jest.fn();
    const user = userEvent.setup();
    
    render(
      <FilterSection 
        search=""
        setSearch={jest.fn()}
        dateFilter=""
        setDateFilter={mockSetDateFilter}
        onSearch={jest.fn()}
        onReset={jest.fn()}
      />
    );
    
    const dateInput = screen.getByPlaceholderText('Tanggal Dibuat');
    await user.type(dateInput, '2025-01-01');
    
    expect(mockSetDateFilter).toHaveBeenCalled();
  });

  test('renders reset button', () => {
    render(
      <FilterSection 
        search="test"
        setSearch={jest.fn()}
        dateFilter="2025-01-01"
        setDateFilter={jest.fn()}
        onSearch={jest.fn()}
        onReset={jest.fn()}
      />
    );
    
    expect(screen.getByText('Reset')).toBeInTheDocument();
  });

  test('renders reset button always', () => {
    render(
      <FilterSection 
        search=""
        setSearch={jest.fn()}
        dateFilter=""
        setDateFilter={jest.fn()}
        onSearch={jest.fn()}
        onReset={jest.fn()}
      />
    );
    
    expect(screen.getByText('Reset')).toBeInTheDocument();
  });

  test('calls onReset when reset button is clicked', async () => {
    const mockOnReset = jest.fn();
    const user = userEvent.setup();
    
    render(
      <FilterSection 
        search="test"
        setSearch={jest.fn()}
        dateFilter="2025-01-01"
        setDateFilter={jest.fn()}
        onSearch={jest.fn()}
        onReset={mockOnReset}
      />
    );
    
    const resetButton = screen.getByText('Reset');
    await user.click(resetButton);
    
    expect(mockOnReset).toHaveBeenCalled();
  });

  test('applies correct styling to filter container', () => {
    const { container } = render(
      <FilterSection 
        filters={defaultFilters} 
        onFilterChange={mockOnFilterChange} 
      />
    );
    
    const filterContainer = container.firstChild;
    expect(filterContainer).toHaveClass(
      'bg-white',
      'rounded-lg',
      'shadow-sm',
      'border',
      'border-gray-200'
    );
  });

  test('has responsive grid layout', () => {
    const { container } = render(
      <FilterSection 
        filters={defaultFilters} 
        onFilterChange={mockOnFilterChange} 
      />
    );
    
    const gridContainer = container.querySelector('.grid');
    expect(gridContainer).toHaveClass(
      'grid',
      'grid-cols-1',
      'md:grid-cols-2',
      'lg:grid-cols-4',
      'gap-4'
    );
  });

  test('search input has correct properties', () => {
    render(
      <FilterSection 
        filters={defaultFilters} 
        onFilterChange={mockOnFilterChange} 
      />
    );
    
    const searchInput = screen.getByPlaceholderText('Cari Nama Kategori');
    expect(searchInput).toHaveAttribute('type', 'text');
    expect(searchInput).toHaveClass('w-full');
  });

  test('date input has correct properties', () => {
    render(
      <FilterSection 
        filters={defaultFilters} 
        onFilterChange={mockOnFilterChange} 
      />
    );
    
    const dateInput = screen.getByPlaceholderText('Tanggal Dibuat');
    expect(dateInput).toHaveAttribute('type', 'date');
    expect(dateInput).toHaveClass('w-full');
  });
});
