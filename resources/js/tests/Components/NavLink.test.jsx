import { render, screen } from '@testing-library/react';
import NavLink from '@/Components/NavLink';

// Mock Link component from Inertia
jest.mock('@inertiajs/react', () => ({
  ...jest.requireActual('@inertiajs/react'),
  Link: ({ href, children, className, ...props }) => (
    <a href={href} className={className} {...props}>
      {children}
    </a>
  ),
}));

describe('NavLink Component', () => {
  test('renders link with children', () => {
    render(<NavLink href="/test">Test Link</NavLink>);
    expect(screen.getByText('Test Link')).toBeInTheDocument();
  });

  test('applies correct href attribute', () => {
    render(<NavLink href="/dashboard">Dashboard</NavLink>);
    const link = screen.getByText('Dashboard');
    expect(link).toHaveAttribute('href', '/dashboard');
  });

  test('applies default inactive styling', () => {
    render(<NavLink href="/test">Test Link</NavLink>);
    const link = screen.getByText('Test Link');
    expect(link).toHaveClass(
      'inline-flex',
      'items-center',
      'border-b-2',
      'px-1',
      'pt-1',
      'text-sm',
      'font-medium',
      'leading-5',
      'transition',
      'duration-150',
      'ease-in-out',
      'focus:outline-none',
      'border-transparent',
      'text-gray-500',
      'hover:border-gray-300',
      'hover:text-gray-700',
      'focus:border-gray-300',
      'focus:text-gray-700'
    );
  });

  test('applies active styling when active prop is true', () => {
    render(<NavLink href="/test" active={true}>Test Link</NavLink>);
    const link = screen.getByText('Test Link');
    expect(link).toHaveClass(
      'border-indigo-400',
      'text-gray-900',
      'focus:border-indigo-700'
    );
    expect(link).not.toHaveClass(
      'border-transparent',
      'text-gray-500'
    );
  });

  test('applies custom className', () => {
    const customClass = 'custom-nav-link';
    render(<NavLink href="/test" className={customClass}>Test Link</NavLink>);
    const link = screen.getByText('Test Link');
    expect(link).toHaveClass(customClass);
  });

  test('forwards other props to Link component', () => {
    render(
      <NavLink 
        href="/test" 
        data-testid="nav-link-test"
        target="_blank"
      >
        Test Link
      </NavLink>
    );
    
    const link = screen.getByTestId('nav-link-test');
    expect(link).toHaveAttribute('target', '_blank');
  });

  test('combines active and custom className correctly', () => {
    const customClass = 'my-custom-class';
    render(
      <NavLink 
        href="/test" 
        active={true} 
        className={customClass}
      >
        Test Link
      </NavLink>
    );
    
    const link = screen.getByText('Test Link');
    expect(link).toHaveClass(customClass);
    expect(link).toHaveClass('border-indigo-400');
  });

  test('handles active state false explicitly', () => {
    render(<NavLink href="/test" active={false}>Test Link</NavLink>);
    const link = screen.getByText('Test Link');
    expect(link).toHaveClass('border-transparent', 'text-gray-500');
    expect(link).not.toHaveClass('border-indigo-400', 'text-gray-900');
  });
});
