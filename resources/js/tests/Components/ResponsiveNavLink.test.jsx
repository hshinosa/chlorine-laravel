import { render, screen } from '@testing-library/react';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';

// Mock Link component from Inertia
jest.mock('@inertiajs/react', () => ({
  ...jest.requireActual('@inertiajs/react'),
  Link: ({ href, children, className, ...props }) => (
    <a href={href} className={className} {...props}>
      {children}
    </a>
  ),
}));

describe('ResponsiveNavLink Component', () => {
  test('renders link with children', () => {
    render(<ResponsiveNavLink href="/test">Test Link</ResponsiveNavLink>);
    expect(screen.getByText('Test Link')).toBeInTheDocument();
  });

  test('applies correct href attribute', () => {
    render(<ResponsiveNavLink href="/dashboard">Dashboard</ResponsiveNavLink>);
    const link = screen.getByText('Dashboard');
    expect(link).toHaveAttribute('href', '/dashboard');
  });

  test('applies default inactive styling', () => {
    render(<ResponsiveNavLink href="/test">Test Link</ResponsiveNavLink>);
    const link = screen.getByText('Test Link');
    expect(link).toHaveClass(
      'flex',
      'w-full',
      'items-start',
      'border-l-4',
      'py-2',
      'pe-4',
      'ps-3',
      'border-transparent',
      'text-gray-600',
      'hover:border-gray-300',
      'hover:bg-gray-50',
      'hover:text-gray-800',
      'focus:border-gray-300',
      'focus:bg-gray-50',
      'focus:text-gray-800',
      'text-base',
      'font-medium',
      'transition',
      'duration-150',
      'ease-in-out',
      'focus:outline-none'
    );
  });

  test('applies active styling when active prop is true', () => {
    render(<ResponsiveNavLink href="/test" active={true}>Test Link</ResponsiveNavLink>);
    const link = screen.getByText('Test Link');
    expect(link).toHaveClass(
      'border-indigo-400',
      'bg-indigo-50',
      'text-indigo-700',
      'focus:border-indigo-700',
      'focus:bg-indigo-100',
      'focus:text-indigo-800'
    );
    expect(link).not.toHaveClass(
      'border-transparent',
      'text-gray-600'
    );
  });

  test('applies custom className', () => {
    const customClass = 'custom-responsive-nav-link';
    render(<ResponsiveNavLink href="/test" className={customClass}>Test Link</ResponsiveNavLink>);
    const link = screen.getByText('Test Link');
    expect(link).toHaveClass(customClass);
  });

  test('forwards other props to Link component', () => {
    render(
      <ResponsiveNavLink 
        href="/test" 
        data-testid="responsive-nav-link-test"
        target="_blank"
      >
        Test Link
      </ResponsiveNavLink>
    );
    
    const link = screen.getByTestId('responsive-nav-link-test');
    expect(link).toHaveAttribute('target', '_blank');
  });

  test('combines active and custom className correctly', () => {
    const customClass = 'my-custom-class';
    render(
      <ResponsiveNavLink 
        href="/test" 
        active={true} 
        className={customClass}
      >
        Test Link
      </ResponsiveNavLink>
    );
    
    const link = screen.getByText('Test Link');
    expect(link).toHaveClass(customClass);
    expect(link).toHaveClass('border-indigo-400');
  });

  test('handles active state false explicitly', () => {
    render(<ResponsiveNavLink href="/test" active={false}>Test Link</ResponsiveNavLink>);
    const link = screen.getByText('Test Link');
    expect(link).toHaveClass('border-transparent', 'text-gray-600');
    expect(link).not.toHaveClass('border-indigo-400', 'text-indigo-700');
  });

  test('has correct responsive design classes', () => {
    render(<ResponsiveNavLink href="/test">Test Link</ResponsiveNavLink>);
    const link = screen.getByText('Test Link');
    expect(link).toHaveClass('w-full', 'flex', 'items-start');
  });
});
