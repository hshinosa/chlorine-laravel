import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from '@/Components/Categories/Pagination';

// Mock Link component from Inertia
jest.mock('@inertiajs/react', () => ({
  ...jest.requireActual('@inertiajs/react'),
  Link: ({ href, children, className, ...props }) => (
    <a href={href} className={className} {...props}>
      {children}
    </a>
  ),
}));

describe('Pagination Component', () => {
  const mockPaginationData = {
    current_page: 2,
    last_page: 5,
    per_page: 10,
    total: 50,
    from: 11,
    to: 20,
    links: [
      { url: null, label: '&laquo; Previous', active: false },
      { url: '/categories?page=1', label: '1', active: false },
      { url: null, label: '2', active: true },
      { url: '/categories?page=3', label: '3', active: false },
      { url: '/categories?page=4', label: '4', active: false },
      { url: '/categories?page=5', label: '5', active: false },
      { url: '/categories?page=3', label: 'Next &raquo;', active: false }
    ]
  };

  test('renders pagination info', () => {
    render(<Pagination pagination={mockPaginationData} />);
    
    expect(screen.getByText(/Menampilkan/)).toBeInTheDocument();
    expect(screen.getByText('11')).toBeInTheDocument();
    expect(screen.getByText(/hingga/)).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText(/dari/)).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
    expect(screen.getByText(/hasil/)).toBeInTheDocument();
  });

  test('renders page links', () => {
    render(<Pagination pagination={mockPaginationData} />);
    
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('highlights current page', () => {
    render(<Pagination pagination={mockPaginationData} />);
    
    const currentPageLink = screen.getByText('2');
    expect(currentPageLink).toHaveClass(
      'bg-blue-600',
      'text-white',
      'border-blue-600'
    );
  });

  test('renders disabled previous button when on first page', () => {
    const firstPageData = {
      ...mockPaginationData,
      current_page: 1,
      links: [
        { url: null, label: '&laquo; Previous', active: false },
        { url: null, label: '1', active: true },
        { url: '/categories?page=2', label: '2', active: false },
        { url: '/categories?page=2', label: 'Next &raquo;', active: false }
      ]
    };
    
    render(<Pagination pagination={firstPageData} />);
    
    const prevButton = screen.getByText('« Previous');
    expect(prevButton).toHaveClass('cursor-not-allowed');
  });

  test('renders disabled next button when on last page', () => {
    const lastPageData = {
      ...mockPaginationData,
      current_page: 5,
      links: [
        { url: '/categories?page=4', label: '&laquo; Previous', active: false },
        { url: '/categories?page=4', label: '4', active: false },
        { url: null, label: '5', active: true },
        { url: null, label: 'Next &raquo;', active: false }
      ]
    };
    
    render(<Pagination pagination={lastPageData} />);
    
    const nextButton = screen.getByText('Next »');
    expect(nextButton).toHaveClass('cursor-not-allowed');
  });

  test('does not render pagination when there is only one page', () => {
    const singlePageData = {
      current_page: 1,
      last_page: 1,
      per_page: 10,
      total: 5,
      from: 1,
      to: 5,
      links: [
        { url: null, label: '&laquo; Previous', active: false },
        { url: null, label: '1', active: true },
        { url: null, label: 'Next &raquo;', active: false }
      ]
    };
    
    const { container } = render(<Pagination pagination={singlePageData} />);
    expect(container.firstChild).toBeNull();
  });

  test('renders clickable page links with correct href', () => {
    render(<Pagination pagination={mockPaginationData} />);
    
    const pageLink = screen.getByText('3').closest('a');
    expect(pageLink).toHaveAttribute('href', '/categories?page=3');
  });

  test('applies correct styling to pagination container', () => {
    const { container } = render(<Pagination pagination={mockPaginationData} />);
    
    const paginationContainer = container.firstChild;
    expect(paginationContainer).toHaveClass(
      'bg-white',
      'px-4',
      'py-3',
      'flex',
      'items-center',
      'justify-between',
      'border-t',
      'border-gray-200',
      'sm:px-6'
    );
  });

  test('has responsive design classes', () => {
    const { container } = render(<Pagination pagination={mockPaginationData} />);
    
    const infoSection = container.querySelector('.text-sm.text-gray-700');
    expect(infoSection).toBeInTheDocument();
  });

  test('renders ellipsis for large page ranges', () => {
    const largePaginationData = {
      current_page: 10,
      last_page: 100,
      per_page: 10,
      total: 1000,
      from: 91,
      to: 100,
      links: [
        { url: '/categories?page=9', label: '&laquo; Previous', active: false },
        { url: '/categories?page=1', label: '1', active: false },
        { url: null, label: '...', active: false },
        { url: '/categories?page=9', label: '9', active: false },
        { url: null, label: '10', active: true },
        { url: '/categories?page=11', label: '11', active: false },
        { url: null, label: '...', active: false },
        { url: '/categories?page=100', label: '100', active: false },
        { url: '/categories?page=11', label: 'Next &raquo;', active: false }
      ]
    };
    
    render(<Pagination pagination={largePaginationData} />);
    
    const ellipsis = screen.getAllByText('...');
    expect(ellipsis).toHaveLength(2);
  });

  test('handles empty pagination data gracefully', () => {
    const emptyPaginationData = {
      current_page: 1,
      last_page: 0,
      per_page: 10,
      total: 0,
      from: 0,
      to: 0,
      links: []
    };
    
    const { container } = render(<Pagination pagination={emptyPaginationData} />);
    expect(container.firstChild).toBeNull();
  });
});
