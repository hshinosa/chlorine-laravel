import '@testing-library/jest-dom';
import PropTypes from 'prop-types';

// Mock InertiaJS
global.route = jest.fn((name, params) => {
  const routes = {
    'dashboard': '/',
    'categories.index': '/categories',
    'categories.create': '/categories/create',
    'categories.edit': (id) => `/categories/${id}/edit`,
    'categories.show': (id) => `/categories/${id}`,
    'categories.destroy': (id) => `/categories/${id}`,
    'login': '/login',
    'logout': '/logout',
    'profile.edit': '/profile',
    'profile.update': '/profile',
    'profile.destroy': '/profile',
  };
  
  if (typeof routes[name] === 'function') {
    return routes[name](params);
  }
  return routes[name] || `/${name}`;
});

// Adding prop type validation for mocked components
const Link = ({ href, children, className, ...props }) => (
  <a href={href} className={className} {...props}>{children}</a>
);
Link.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

const Head = ({ title, children }) => (
  <head>
    <title>{title}</title>
    {children}
  </head>
);
Head.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

// Mock Inertia Link and Head
jest.mock('@inertiajs/react', () => ({
  Link,
  Head,
  useForm: () => ({
    data: {},
    setData: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    processing: false,
    errors: {},
    reset: jest.fn(),
    clearErrors: jest.fn(),
  }),
  usePage: () => ({
    props: {
      auth: {
        user: {
          id: 1,
          name: 'Test User',
          email: 'test@example.com'
        }
      },
      flash: {
        success: null,
        error: null,
        message: null
      }
    },
    url: '/'
  }),
  router: {
    delete: jest.fn(),
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    visit: jest.fn(),
  }
}));

// Mock window.location to avoid jsdom navigation errors
const mockLocation = {
  href: 'http://localhost:3000',
  assign: jest.fn(),
  reload: jest.fn(),
};

// Suppress jsdom navigation error warnings
const originalConsoleError = console.error;
console.error = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('Not implemented: navigation')) {
    return;
  }
  originalConsoleError.apply(console, args);
};

// Mock console.log untuk cleaner test output
global.console = {
  ...console,
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};
