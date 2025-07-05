import { render, screen } from '@testing-library/react';
import TableHeader from '@/Components/Categories/TableHeader';

describe('TableHeader Component', () => {
  test('renders all header columns', () => {
    render(
      <table>
        <TableHeader />
      </table>
    );
    
    const expectedHeaders = [
      'ID Kategori',
      'Tgl Dibuat', 
      'Nama Kategori',
      'Status Saat Ini',
      'Status',
      'Detail',
      'Aksi'
    ];
    
    expectedHeaders.forEach(header => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  test('renders correct number of header cells', () => {
    render(
      <table>
        <TableHeader />
      </table>
    );
    
    const headerCells = screen.getAllByRole('columnheader');
    expect(headerCells).toHaveLength(7);
  });

  test('applies correct styling to header cells', () => {
    render(
      <table>
        <TableHeader />
      </table>
    );
    
    const headerCells = screen.getAllByRole('columnheader');
    
    headerCells.forEach(cell => {
      expect(cell).toHaveClass(
        'px-6', 'py-4', 'text-left', 'text-xs', 
        'font-semibold', 'text-gray-600', 'uppercase', 'tracking-wider'
      );
    });
  });

  test('applies correct styling to thead row', () => {
    render(
      <table>
        <TableHeader />
      </table>
    );
    
    const headerRow = screen.getByRole('row');
    expect(headerRow).toHaveClass('bg-gray-50', 'border-b', 'border-gray-200');
  });

  test('renders within thead element', () => {
    const { container } = render(
      <table>
        <TableHeader />
      </table>
    );
    
    const thead = container.querySelector('thead');
    expect(thead).toBeInTheDocument();
    
    const headerRow = thead?.querySelector('tr');
    expect(headerRow).toBeInTheDocument();
  });
});
