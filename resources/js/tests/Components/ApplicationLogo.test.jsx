import { render, screen } from '@testing-library/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

describe('ApplicationLogo Component', () => {
  test('renders logo container with correct layout', () => {
    const { container } = render(<ApplicationLogo />);
    
    const logoContainer = container.firstChild;
    expect(logoContainer).toHaveClass('flex', 'items-center');
  });

  test('renders SVG logo with correct attributes', () => {
    const { container } = render(<ApplicationLogo />);
    
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('viewBox', '0 0 316 316');
    expect(svg).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
  });

  test('renders application name', () => {
    render(<ApplicationLogo />);
    
    expect(screen.getByText('Chlorine')).toBeInTheDocument();
  });

  test('application name has correct styling', () => {
    render(<ApplicationLogo />);
    
    const appName = screen.getByText('Chlorine');
    expect(appName).toHaveClass(
      'ml-2',
      'text-xl',
      'font-semibold',
      'text-gray-800'
    );
  });

  test('forwards props to SVG element', () => {
    const { container } = render(
      <ApplicationLogo className="custom-class" data-testid="app-logo" />
    );
    
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('custom-class');
    expect(svg).toHaveAttribute('data-testid', 'app-logo');
  });

  test('SVG contains path elements', () => {
    const { container } = render(<ApplicationLogo />);
    
    const svg = container.querySelector('svg');
    const paths = svg.querySelectorAll('path');
    expect(paths.length).toBeGreaterThan(0);
  });

  test('maintains proper structure', () => {
    const { container } = render(<ApplicationLogo />);
    
    const logoContainer = container.firstChild;
    const svg = logoContainer.querySelector('svg');
    const span = logoContainer.querySelector('span');
    
    expect(svg).toBeInTheDocument();
    expect(span).toBeInTheDocument();
    expect(span.textContent).toBe('Chlorine');
  });

  test('handles additional className prop', () => {
    const { container } = render(<ApplicationLogo className="w-20 h-20" />);
    
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('w-20', 'h-20');
  });

  test('handles style prop', () => {
    const { container } = render(
      <ApplicationLogo style={{ width: '100px', height: '100px' }} />
    );
    
    const svg = container.querySelector('svg');
    expect(svg).toHaveStyle('width: 100px');
    expect(svg).toHaveStyle('height: 100px');
  });

  test('application name span is correctly positioned', () => {
    const { container } = render(<ApplicationLogo />);
    
    const logoContainer = container.firstChild;
    const children = Array.from(logoContainer.children);
    
    // SVG should be first child
    expect(children[0].tagName).toBe('svg');
    // Span should be second child
    expect(children[1].tagName).toBe('SPAN');
    expect(children[1].textContent).toBe('Chlorine');
  });

  test('renders without errors when no props provided', () => {
    expect(() => {
      render(<ApplicationLogo />);
    }).not.toThrow();
  });

  test('SVG has proper structure for logo', () => {
    const { container } = render(<ApplicationLogo />);
    
    const svg = container.querySelector('svg');
    const paths = svg.querySelectorAll('path');
    
    // Should have path elements for the logo design
    expect(paths.length).toBeGreaterThan(0);
    
    // Check that the first path has the expected starting content
    const firstPath = paths[0];
    expect(firstPath.getAttribute('d')).toContain('M305.8 81.125C');
  });
});
