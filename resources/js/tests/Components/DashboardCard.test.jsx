import { render, screen } from '@testing-library/react';
import DashboardCard from '@/Components/Dashboard/DashboardCard';

// Mock Link component from Inertia
jest.mock('@inertiajs/react', () => ({
  ...jest.requireActual('@inertiajs/react'),
  Link: ({ href, children, className, ...props }) => (
    <a href={href} className={className} {...props}>
      {children}
    </a>
  ),
}));

describe('DashboardCard Component', () => {
  const mockCard = {
    title: 'Total Users',
    description: 'Active users in the system',
    route: 'users.index',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600'
  };

  const mockIcon = 'M12 4.354a48.108 48.108 0 00-48.108 48.108';

  test('renders card with title and description', () => {
    render(<DashboardCard card={mockCard} icon={mockIcon} />);
    
    expect(screen.getByText('Total Users')).toBeInTheDocument();
    expect(screen.getByText('Active users in the system')).toBeInTheDocument();
  });

  test('renders as link when route is provided', () => {
    render(<DashboardCard card={mockCard} icon={mockIcon} />);
    
    const link = screen.getByText('Total Users').closest('a');
    expect(link).toHaveAttribute('href', expect.stringContaining('users'));
  });

  test('renders as static card when route is "#"', () => {
    const staticCard = { ...mockCard, route: '#' };
    
    render(<DashboardCard card={staticCard} icon={mockIcon} />);
    
    const cardElement = screen.getByText('Total Users').closest('div');
    expect(cardElement).not.toHaveAttribute('href');
  });

  test('applies correct background color to icon container', () => {
    const { container } = render(<DashboardCard card={mockCard} icon={mockIcon} />);
    
    const iconContainer = container.querySelector('.bg-blue-100');
    expect(iconContainer).toBeInTheDocument();
  });

  test('applies correct icon color', () => {
    const { container } = render(<DashboardCard card={mockCard} icon={mockIcon} />);
    
    const icon = container.querySelector('svg');
    expect(icon).toHaveClass('text-blue-600');
  });

  test('renders without description', () => {
    const cardWithoutDescription = { ...mockCard, description: undefined };
    
    render(<DashboardCard card={cardWithoutDescription} icon={mockIcon} />);
    
    expect(screen.getByText('Total Users')).toBeInTheDocument();
    expect(screen.queryByText('Active users in the system')).not.toBeInTheDocument();
  });

  test('applies correct styling classes', () => {
    const { container } = render(<DashboardCard card={mockCard} icon={mockIcon} />);
    
    const cardContainer = container.querySelector('.bg-white.rounded-lg.shadow-sm');
    expect(cardContainer).toBeInTheDocument();
    expect(cardContainer).toHaveClass(
      'bg-white',
      'rounded-lg',
      'shadow-sm',
      'border',
      'border-gray-200',
      'p-6',
      'hover:shadow-md',
      'transition-shadow',
      'cursor-pointer'
    );
  });

  test('icon container has correct styling', () => {
    const { container } = render(<DashboardCard card={mockCard} icon={mockIcon} />);
    
    const iconContainer = container.querySelector('.w-12.h-12');
    expect(iconContainer).toHaveClass(
      'w-12',
      'h-12',
      'rounded-lg',
      'flex',
      'items-center',
      'justify-center',
      'mr-4'
    );
  });

  test('icon has correct attributes', () => {
    const { container } = render(<DashboardCard card={mockCard} icon={mockIcon} />);
    
    const icon = container.querySelector('svg');
    expect(icon).toHaveClass('w-6', 'h-6');
    expect(icon).toHaveAttribute('fill', 'none');
    expect(icon).toHaveAttribute('stroke', 'currentColor');
    expect(icon).toHaveAttribute('viewBox', '0 0 24 24');
  });

  test('title has correct styling', () => {
    render(<DashboardCard card={mockCard} icon={mockIcon} />);
    
    const title = screen.getByText('Total Users');
    expect(title).toHaveClass('text-sm', 'font-medium', 'text-gray-900');
  });

  test('description has correct styling when present', () => {
    render(<DashboardCard card={mockCard} icon={mockIcon} />);
    
    const description = screen.getByText('Active users in the system');
    expect(description).toHaveClass('text-xs', 'text-gray-500', 'mt-1');
  });

  test('handles different color schemes', () => {
    const redCard = {
      ...mockCard,
      bgColor: 'bg-red-100',
      iconColor: 'text-red-600'
    };
    
    const { container } = render(<DashboardCard card={redCard} icon={mockIcon} />);
    
    expect(container.querySelector('.bg-red-100')).toBeInTheDocument();
    expect(container.querySelector('svg')).toHaveClass('text-red-600');
  });

  test('flex layout is applied correctly', () => {
    const { container } = render(<DashboardCard card={mockCard} icon={mockIcon} />);
    
    const flexContainer = container.querySelector('.flex.items-center');
    expect(flexContainer).toBeInTheDocument();
  });
});
