import { render, screen } from '@testing-library/react';
import DashboardHeader from '@/Components/Dashboard/DashboardHeader';

describe('DashboardHeader Component', () => {
  test('renders with default title and subtitle', () => {
    render(<DashboardHeader />);
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Sistem Informasi Layanan Ketenagakerjaan')).toBeInTheDocument();
  });

  test('renders with custom title', () => {
    const customTitle = 'Custom Dashboard Title';
    render(<DashboardHeader title={customTitle} />);
    
    expect(screen.getByText(customTitle)).toBeInTheDocument();
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
  });

  test('renders with custom subtitle', () => {
    const customSubtitle = 'Custom subtitle for testing';
    render(<DashboardHeader subtitle={customSubtitle} />);
    
    expect(screen.getByText(customSubtitle)).toBeInTheDocument();
    expect(screen.queryByText('Sistem Informasi Layanan Ketenagakerjaan')).not.toBeInTheDocument();
  });

  test('renders with both custom title and subtitle', () => {
    const customTitle = 'Admin Panel';
    const customSubtitle = 'Management System';
    
    render(<DashboardHeader title={customTitle} subtitle={customSubtitle} />);
    
    expect(screen.getByText(customTitle)).toBeInTheDocument();
    expect(screen.getByText(customSubtitle)).toBeInTheDocument();
  });

  test('applies correct styling to title', () => {
    render(<DashboardHeader />);
    
    const title = screen.getByText('Dashboard');
    expect(title).toHaveClass(
      'text-xl', 'sm:text-2xl', 'font-semibold', 
      'leading-tight', 'text-gray-800'
    );
  });

  test('applies correct styling to subtitle', () => {
    render(<DashboardHeader />);
    
    const subtitle = screen.getByText('Sistem Informasi Layanan Ketenagakerjaan');
    expect(subtitle).toHaveClass('mt-1', 'text-sm', 'text-gray-600');
  });

  test('renders in correct container structure', () => {
    const { container } = render(<DashboardHeader />);
    
    const outerDiv = container.firstChild;
    expect(outerDiv).toBeInTheDocument();
    
    const title = screen.getByText('Dashboard');
    const subtitle = screen.getByText('Sistem Informasi Layanan Ketenagakerjaan');
    
    expect(outerDiv).toContainElement(title);
    expect(outerDiv).toContainElement(subtitle);
  });

  test('handles empty strings for title and subtitle', () => {
    render(<DashboardHeader title="" subtitle="" />);
    
    // Should render empty elements
    const titleElement = screen.getByRole('heading', { level: 2 });
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.textContent).toBe('');
  });
});
