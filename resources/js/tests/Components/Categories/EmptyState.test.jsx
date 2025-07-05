import { render, screen } from '@testing-library/react';
import EmptyState from '@/Components/Categories/EmptyState';

describe('EmptyState Component', () => {
  test('renders empty state message', () => {
    render(
      <table>
        <tbody>
          <EmptyState />
        </tbody>
      </table>
    );
    
    expect(screen.getByText('Tidak ada kategori yang ditemukan')).toBeInTheDocument();
    expect(screen.getByText('Silakan tambah kategori baru atau ubah filter pencarian')).toBeInTheDocument();
  });

  test('renders as table row with correct colspan', () => {
    const { container } = render(
      <table>
        <tbody>
          <EmptyState />
        </tbody>
      </table>
    );
    
    const tableRow = container.querySelector('tr');
    expect(tableRow).toBeInTheDocument();
    
    const tableCell = container.querySelector('td');
    expect(tableCell).toHaveAttribute('colSpan', '7');
  });

  test('applies correct styling classes', () => {
    const { container } = render(
      <table>
        <tbody>
          <EmptyState />
        </tbody>
      </table>
    );
    
    const tableCell = container.querySelector('td');
    expect(tableCell).toHaveClass('px-6', 'py-12', 'text-center', 'text-gray-500');
  });

  test('contains centered flex layout', () => {
    const { container } = render(
      <table>
        <tbody>
          <EmptyState />
        </tbody>
      </table>
    );
    
    const flexContainer = container.querySelector('.flex.flex-col.items-center');
    expect(flexContainer).toBeInTheDocument();
  });

  test('displays main message with correct styling', () => {
    render(
      <table>
        <tbody>
          <EmptyState />
        </tbody>
      </table>
    );
    
    const mainMessage = screen.getByText('Tidak ada kategori yang ditemukan');
    expect(mainMessage).toHaveClass('text-lg', 'font-medium');
  });

  test('displays sub message with correct styling', () => {
    render(
      <table>
        <tbody>
          <EmptyState />
        </tbody>
      </table>
    );
    
    const subMessage = screen.getByText('Silakan tambah kategori baru atau ubah filter pencarian');
    expect(subMessage).toHaveClass('text-sm', 'text-gray-400', 'mt-1');
  });

  test('renders SVG icon', () => {
    const { container } = render(
      <table>
        <tbody>
          <EmptyState />
        </tbody>
      </table>
    );
    
    const svgIcon = container.querySelector('svg');
    expect(svgIcon).toBeInTheDocument();
    expect(svgIcon).toHaveClass('w-12', 'h-12', 'text-gray-300', 'mb-4');
  });
});
