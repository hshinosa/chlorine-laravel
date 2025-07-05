import { render, screen } from '@testing-library/react';
import ServicesTable from '@/Components/Dashboard/ServicesTable';

// Mock Link component from Inertia
jest.mock('@inertiajs/react', () => ({
  ...jest.requireActual('@inertiajs/react'),
  Link: ({ href, children, className, preserveState, dangerouslySetInnerHTML, ...props }) => (
    <a 
      href={href} 
      className={className} 
      {...props}
      {...(dangerouslySetInnerHTML && { dangerouslySetInnerHTML })}
    >
      {!dangerouslySetInnerHTML && children}
    </a>
  ),
}));

// Mock route helper
global.route = jest.fn((name) => {
  if (name === 'categories.create') {
    return '/categories/create';
  }
  return '#';
});

describe('ServicesTable Component', () => {
  const mockAuth = {
    user: {
      id: 1,
      name: 'Test User',
      email: 'test@example.com'
    }
  };

  const mockServicesWithData = {
    data: [
      {
        no: 1,
        nama_layanan: '[HI-01] Pencatatan Perselisihan',
        category: 'HI',
        description: 'Layanan pencatatan perselisihan hubungan industrial',
        is_publish: true,
        action: 'Pilih'
      },
      {
        no: 2,
        nama_layanan: '[LT-03] Pelatihan Berbasis Kompetensi',
        category: 'LT',
        description: 'Pelatihan untuk meningkatkan kompetensi kerja',
        is_publish: false,
        action: 'Pilih'
      }
    ],
    links: [
      { url: null, label: '&laquo; Previous', active: false },
      { url: null, label: '1', active: true },
      { url: '/services?page=2', label: '2', active: false },
      { url: '/services?page=2', label: 'Next &raquo;', active: false }
    ],
    from: 1,
    to: 2,
    total: 2
  };

  const mockServicesEmpty = {
    data: [],
    links: []
  };

  test('renders table header correctly', () => {
    render(<ServicesTable services={mockServicesWithData} auth={mockAuth} />);
    
    expect(screen.getByText('Layanan Tersedia')).toBeInTheDocument();
    expect(screen.getByText('Daftar layanan yang dapat Anda ajukan')).toBeInTheDocument();
  });

  test('renders table headers when data is available', () => {
    render(<ServicesTable services={mockServicesWithData} auth={mockAuth} />);
    
    expect(screen.getByText('No')).toBeInTheDocument();
    expect(screen.getByText('Nama Layanan')).toBeInTheDocument();
    expect(screen.getByText('Kategori')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Permohonan')).toBeInTheDocument();
  });

  test('renders service data correctly', () => {
    render(<ServicesTable services={mockServicesWithData} auth={mockAuth} />);
    
    // Check first service row data
    const tableRows = screen.getAllByRole('row');
    const firstDataRow = tableRows[1]; // Skip header row
    expect(firstDataRow).toHaveTextContent('1');
    
    expect(screen.getByText('[HI-01] Pencatatan Perselisihan')).toBeInTheDocument();
    expect(screen.getByText('Layanan pencatatan perselisihan hubungan industrial')).toBeInTheDocument();
    expect(screen.getByText('HI')).toBeInTheDocument();
    
    // Check second service row data  
    const secondDataRow = tableRows[2];
    expect(secondDataRow).toHaveTextContent('2');
    expect(screen.getByText('[LT-03] Pelatihan Berbasis Kompetensi')).toBeInTheDocument();
    expect(screen.getByText('Pelatihan untuk meningkatkan kompetensi kerja')).toBeInTheDocument();
    expect(screen.getByText('LT')).toBeInTheDocument();
  });

  test('renders active status correctly', () => {
    render(<ServicesTable services={mockServicesWithData} auth={mockAuth} />);
    
    const activeStatus = screen.getByText('Aktif');
    expect(activeStatus).toBeInTheDocument();
    expect(activeStatus).toHaveClass('bg-green-100', 'text-green-800');
  });

  test('renders inactive status correctly', () => {
    render(<ServicesTable services={mockServicesWithData} auth={mockAuth} />);
    
    const inactiveStatus = screen.getByText('Nonaktif');
    expect(inactiveStatus).toBeInTheDocument();
    expect(inactiveStatus).toHaveClass('bg-gray-100', 'text-gray-800');
  });

  test('renders active service button correctly', () => {
    render(<ServicesTable services={mockServicesWithData} auth={mockAuth} />);
    
    const actionButtons = screen.getAllByText('Pilih');
    expect(actionButtons[0]).toBeInTheDocument();
    expect(actionButtons[0]).toHaveClass(
      'mobile-button',
      'inline-flex',
      'items-center',
      'px-3',
      'py-1',
      'border',
      'border-transparent',
      'text-xs',
      'font-medium',
      'rounded-md',
      'text-white',
      'bg-green-600',
      'hover:bg-green-700',
      'focus-ring',
      'transition-colors',
      'touch-target'
    );
  });

  test('renders inactive service button correctly', () => {
    render(<ServicesTable services={mockServicesWithData} auth={mockAuth} />);
    
    const inactiveButton = screen.getByText('Tidak Tersedia');
    expect(inactiveButton).toBeInTheDocument();
    expect(inactiveButton).toHaveClass(
      'inline-flex',
      'items-center',
      'px-3',
      'py-1',
      'text-xs',
      'font-medium',
      'rounded-md',
      'text-gray-400',
      'bg-gray-100',
      'cursor-not-allowed'
    );
  });

  test('renders pagination when links length > 3', () => {
    const { container } = render(<ServicesTable services={mockServicesWithData} auth={mockAuth} />);
    
    // Find the pagination info div specifically
    const paginationInfo = container.querySelector('.text-sm.text-gray-700');
    expect(paginationInfo).toHaveTextContent(/Menampilkan.*1.*sampai.*2.*dari.*2.*hasil/);
    
    // Check pagination links
    const prevLink = screen.getByText(/Previous/).closest('a');
    expect(prevLink).toHaveAttribute('href', '#');
    
    const nextLink = screen.getByText(/Next/).closest('a');
    expect(nextLink).toHaveAttribute('href', '/services?page=2');
  });

  test('renders empty state when no services', () => {
    render(<ServicesTable services={mockServicesEmpty} auth={mockAuth} />);
    
    expect(screen.getByText('Belum Ada Layanan')).toBeInTheDocument();
    expect(screen.getByText('Belum ada kategori layanan yang tersedia.')).toBeInTheDocument();
  });

  test('renders add category button for authenticated user in empty state', () => {
    render(<ServicesTable services={mockServicesEmpty} auth={mockAuth} />);
    
    const addButton = screen.getByText('Tambah Kategori Pertama');
    expect(addButton).toBeInTheDocument();
    
    const addLink = addButton.closest('a');
    expect(addLink).toHaveAttribute('href', '/categories/create');
    expect(global.route).toHaveBeenCalledWith('categories.create');
  });

  test('does not render add category button for unauthenticated user in empty state', () => {
    const unauthenticatedAuth = { user: null };
    render(<ServicesTable services={mockServicesEmpty} auth={unauthenticatedAuth} />);
    
    expect(screen.queryByText('Tambah Kategori Pertama')).not.toBeInTheDocument();
  });

  test('applies correct table styling', () => {
    const { container } = render(<ServicesTable services={mockServicesWithData} auth={mockAuth} />);
    
    const tableContainer = container.querySelector('.table-container');
    expect(tableContainer).toBeInTheDocument();
    
    const table = container.querySelector('table');
    expect(table).toHaveClass('min-w-full', 'divide-y', 'divide-gray-200');
    
    const thead = container.querySelector('thead');
    expect(thead).toHaveClass('bg-gray-50');
    
    const tbody = container.querySelector('tbody');
    expect(tbody).toHaveClass('bg-white', 'divide-y', 'divide-gray-200');
  });

  test('applies hover effect to table rows', () => {
    const { container } = render(<ServicesTable services={mockServicesWithData} auth={mockAuth} />);
    
    const tableRows = container.querySelectorAll('tbody tr');
    tableRows.forEach(row => {
      expect(row).toHaveClass('hover:bg-gray-50', 'transition-colors');
    });
  });

  test('handles undefined services prop gracefully', () => {
    render(<ServicesTable auth={mockAuth} />);
    
    expect(screen.getByText('Belum Ada Layanan')).toBeInTheDocument();
  });

  test('handles services without data property', () => {
    const servicesWithoutData = { links: [] };
    render(<ServicesTable services={servicesWithoutData} auth={mockAuth} />);
    
    expect(screen.getByText('Belum Ada Layanan')).toBeInTheDocument();
  });

  test('pagination info displays correct numbers', () => {
    const servicesWithPagination = {
      ...mockServicesWithData,
      from: 11,
      to: 20,
      total: 50
    };
    
    const { container } = render(<ServicesTable services={servicesWithPagination} auth={mockAuth} />);
    
    // Find the pagination info div specifically
    const paginationInfo = container.querySelector('.text-sm.text-gray-700');
    expect(paginationInfo).toHaveTextContent(/Menampilkan.*11.*sampai.*20.*dari.*50.*hasil/);
  });

  test('category badges have correct styling', () => {
    render(<ServicesTable services={mockServicesWithData} auth={mockAuth} />);
    
    const categoryBadges = screen.getAllByText(/^(HI|LT)$/);
    categoryBadges.forEach(badge => {
      expect(badge).toHaveClass(
        'inline-flex',
        'px-2',
        'py-1',
        'text-xs',
        'font-semibold',
        'rounded-full',
        'bg-blue-100',
        'text-blue-800'
      );
    });
  });

  test('empty state icon is rendered correctly', () => {
    const { container } = render(<ServicesTable services={mockServicesEmpty} auth={mockAuth} />);
    
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('w-12', 'h-12', 'text-gray-300', 'mb-4');
  });
});
