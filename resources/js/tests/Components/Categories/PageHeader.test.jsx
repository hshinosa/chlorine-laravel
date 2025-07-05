import { render, screen } from '@testing-library/react';
import PageHeader from '@/Components/Categories/PageHeader';

// Mock Link component from Inertia
jest.mock('@inertiajs/react', () => ({
  ...jest.requireActual('@inertiajs/react'),
  Link: ({ href, children, className, ...props }) => (
    <a href={href} className={className} {...props}>
      {children}
    </a>
  ),
}));

describe('PageHeader Component', () => {
  const mockProps = {
    title: 'Kelola Kategori',
    breadcrumbs: [
      { text: 'Dashboard', link: '/dashboard' },
      { text: 'Kategori', link: '#' }
    ],
    createRoute: '/categories/create'
  };

  test('renders title correctly', () => {
    render(<PageHeader {...mockProps} />);
    
    expect(screen.getByText('Kelola Kategori')).toBeInTheDocument();
    expect(screen.getByText('Kelola Kategori')).toHaveClass(
      'text-xl',
      'sm:text-2xl',
      'font-semibold',
      'leading-tight',
      'text-gray-800'
    );
  });

  test('renders breadcrumbs correctly', () => {
    render(<PageHeader {...mockProps} />);
    
    // Check breadcrumb items
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Kategori')).toBeInTheDocument();
    
    // Check breadcrumb links
    const dashboardLink = screen.getByText('Dashboard').closest('a');
    expect(dashboardLink).toHaveAttribute('href', '/dashboard');
    expect(dashboardLink).toHaveClass('text-blue-600', 'hover:text-blue-800', 'transition-colors');
  });

  test('renders last breadcrumb as non-link', () => {
    render(<PageHeader {...mockProps} />);
    
    const lastBreadcrumb = screen.getByText('Kategori');
    expect(lastBreadcrumb.closest('a')).toBeNull();
    expect(lastBreadcrumb).toHaveClass('text-gray-600', 'font-medium');
  });

  test('renders breadcrumb separators', () => {
    render(<PageHeader {...mockProps} />);
    
    const separators = screen.getAllByText('/');
    expect(separators).toHaveLength(1);
    expect(separators[0]).toHaveClass('mx-2', 'text-gray-400');
  });

  test('renders create button correctly', () => {
    render(<PageHeader {...mockProps} />);
    
    const createButton = screen.getByText('Tambah Kategori');
    expect(createButton).toBeInTheDocument();
    
    const createLink = createButton.closest('a');
    expect(createLink).toHaveAttribute('href', '/categories/create');
    expect(createLink).toHaveClass(
      'inline-flex',
      'items-center',
      'px-4',
      'py-2',
      'bg-blue-600',
      'border',
      'border-transparent',
      'rounded-md',
      'font-semibold',
      'text-xs',
      'text-white',
      'uppercase',
      'tracking-widest',
      'hover:bg-blue-700',
      'focus-ring',
      'transition-colors'
    );
  });

  test('renders create button icon', () => {
    const { container } = render(<PageHeader {...mockProps} />);
    
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('w-4', 'h-4', 'mr-2');
    expect(icon).toHaveAttribute('fill', 'none');
    expect(icon).toHaveAttribute('stroke', 'currentColor');
    expect(icon).toHaveAttribute('viewBox', '0 0 24 24');
  });

  test('applies correct container layout', () => {
    const { container } = render(<PageHeader {...mockProps} />);
    
    const headerContainer = container.firstChild;
    expect(headerContainer).toHaveClass('flex', 'justify-between', 'items-center');
  });

  test('handles single breadcrumb correctly', () => {
    const singleBreadcrumbProps = {
      ...mockProps,
      breadcrumbs: [{ text: 'Home', link: '/' }]
    };
    
    render(<PageHeader {...singleBreadcrumbProps} />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.queryByText('/')).not.toBeInTheDocument();
  });

  test('handles multiple breadcrumbs correctly', () => {
    const multipleBreadcrumbProps = {
      ...mockProps,
      breadcrumbs: [
        { text: 'Home', link: '/' },
        { text: 'Admin', link: '/admin' },
        { text: 'Categories', link: '#' }
      ]
    };
    
    render(<PageHeader {...multipleBreadcrumbProps} />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByText('Categories')).toBeInTheDocument();
    
    // Should have 2 separators
    const separators = screen.getAllByText('/');
    expect(separators).toHaveLength(2);
  });

  test('breadcrumb navigation has correct aria-label', () => {
    render(<PageHeader {...mockProps} />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Breadcrumb');
  });

  test('breadcrumb list has correct styling', () => {
    const { container } = render(<PageHeader {...mockProps} />);
    
    const breadcrumbList = container.querySelector('ol');
    expect(breadcrumbList).toHaveClass(
      'flex',
      'items-center',
      'space-x-2',
      'text-sm',
      'text-gray-500'
    );
  });

  test('handles empty breadcrumbs array', () => {
    const emptyBreadcrumbProps = {
      ...mockProps,
      breadcrumbs: []
    };
    
    render(<PageHeader {...emptyBreadcrumbProps} />);
    
    expect(screen.getByText('Kelola Kategori')).toBeInTheDocument();
    expect(screen.getByText('Tambah Kategori')).toBeInTheDocument();
    
    // Should not render any breadcrumb items
    const breadcrumbList = screen.getByRole('navigation').querySelector('ol');
    expect(breadcrumbList.children).toHaveLength(0);
  });
});
