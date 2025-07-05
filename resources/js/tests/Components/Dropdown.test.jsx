import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dropdown from '@/Components/Dropdown';

// Mock Link component from Inertia
jest.mock('@inertiajs/react', () => ({
  ...jest.requireActual('@inertiajs/react'),
  Link: ({ href, children, className, ...props }) => (
    <a href={href} className={className} {...props}>
      {children}
    </a>
  ),
}));

describe('Dropdown Component', () => {
  test('renders dropdown trigger', () => {
    render(
      <Dropdown>
        <Dropdown.Trigger>
          <button>Dropdown Trigger</button>
        </Dropdown.Trigger>
        <Dropdown.Content>
          <div>Dropdown Content</div>
        </Dropdown.Content>
      </Dropdown>
    );
    
    expect(screen.getByText('Dropdown Trigger')).toBeInTheDocument();
  });

  test('dropdown content is hidden by default', () => {
    render(
      <Dropdown>
        <Dropdown.Trigger>
          <button>Dropdown Trigger</button>
        </Dropdown.Trigger>
        <Dropdown.Content>
          <div>Dropdown Content</div>
        </Dropdown.Content>
      </Dropdown>
    );
    
    expect(screen.queryByText('Dropdown Content')).not.toBeInTheDocument();
  });

  test('shows dropdown content when trigger is clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <Dropdown>
        <Dropdown.Trigger>
          <button>Dropdown Trigger</button>
        </Dropdown.Trigger>
        <Dropdown.Content>
          <div>Dropdown Content</div>
        </Dropdown.Content>
      </Dropdown>
    );
    
    const trigger = screen.getByText('Dropdown Trigger');
    await user.click(trigger);
    
    expect(screen.getByText('Dropdown Content')).toBeInTheDocument();
  });

  test('hides dropdown content when clicked outside', async () => {
    const user = userEvent.setup();
    render(
      <Dropdown>
        <Dropdown.Trigger>
          <button>Dropdown Trigger</button>
        </Dropdown.Trigger>
        <Dropdown.Content>
          <div>Dropdown Content</div>
        </Dropdown.Content>
      </Dropdown>
    );

    // Open dropdown
    const trigger = screen.getByText('Dropdown Trigger');
    await user.click(trigger);
    expect(screen.getByText('Dropdown Content')).toBeInTheDocument();

    // Wait for overlay to appear and then click it
    const overlay = await screen.findByTestId('dropdown-overlay');
    expect(overlay).toBeInTheDocument();
    
    // Click the overlay to close dropdown
    await user.click(overlay);
    
    // Wait for transition to complete and check that content is gone
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(screen.queryByText('Dropdown Content')).not.toBeInTheDocument();
  });

  test('dropdown link renders correctly', async () => {
    const user = userEvent.setup();
    render(
      <Dropdown>
        <Dropdown.Trigger>
          <button>Dropdown Trigger</button>
        </Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Link href="/test">Test Link</Dropdown.Link>
        </Dropdown.Content>
      </Dropdown>
    );
    
    // Need to open dropdown first
    const trigger = screen.getByText('Dropdown Trigger');
    await user.click(trigger);
    
    const link = screen.getByText('Test Link');
    expect(link.closest('a')).toHaveAttribute('href', '/test');
  });

  test('dropdown content applies correct alignment classes', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Dropdown>
        <Dropdown.Trigger>
          <button>Dropdown Trigger</button>
        </Dropdown.Trigger>
        <Dropdown.Content align="left">
          <div>Dropdown Content</div>
        </Dropdown.Content>
      </Dropdown>
    );
    
    // Open dropdown to render content
    const trigger = screen.getByText('Dropdown Trigger');
    await user.click(trigger);
    
    const contentWrapper = container.querySelector('.start-0');
    expect(contentWrapper).toBeInTheDocument();
  });

  test('dropdown content applies correct width classes', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Dropdown>
        <Dropdown.Trigger>
          <button>Dropdown Trigger</button>
        </Dropdown.Trigger>
        <Dropdown.Content width="60">
          <div>Dropdown Content</div>
        </Dropdown.Content>
      </Dropdown>
    );
    
    // Open dropdown to render content
    const trigger = screen.getByText('Dropdown Trigger');
    await user.click(trigger);
    
    const contentWrapper = container.querySelector('.w-60');
    expect(contentWrapper).toBeInTheDocument();
  });

  test('dropdown has relative positioning container', () => {
    const { container } = render(
      <Dropdown>
        <Dropdown.Trigger>
          <button>Dropdown Trigger</button>
        </Dropdown.Trigger>
        <Dropdown.Content>
          <div>Dropdown Content</div>
        </Dropdown.Content>
      </Dropdown>
    );
    
    const dropdownContainer = container.querySelector('.relative');
    expect(dropdownContainer).toBeInTheDocument();
  });
});
