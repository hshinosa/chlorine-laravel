// filepath: d:\Code\chlorine-laravel\resources\js\Layouts\AuthenticatedLayout.jsx
import { useState, useEffect } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import { Link, usePage } from '@inertiajs/react';
import { getSidebarItemsWithCurrentState, menuConfig } from '@/Data/navigationData';

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [expandedMenus, setExpandedMenus] = useState({});
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    // Get current route name safely
    const { url } = usePage();
    let currentRoute;
    try {
        currentRoute = route().current();
    } catch {
        // Fallback if route helper is not available
        currentRoute = 'dashboard';
    }
    
    // Get sidebar items with correct current state
    const sidebarItems = getSidebarItemsWithCurrentState(currentRoute);
    
    // Check if user is authenticated
    const isAuthenticated = user !== null && user !== undefined;

    // Toggle sidebar on mobile
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarOpen && !event.target.closest('.sidebar-container') && !event.target.closest('.mobile-menu-button')) {
                setSidebarOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [sidebarOpen]);

    // Close sidebar on route change
    useEffect(() => {
        setSidebarOpen(false);
        setShowingNavigationDropdown(false);
    }, [url]);

    const toggleSubmenu = (menuName) => {
        setExpandedMenus(prev => ({
            ...prev,
            [menuName]: !prev[menuName]
        }));
    };

    const handleMenuClick = (item) => {
        if (item.hasSubmenu) {
            toggleSubmenu(item.name);
        } else if (item.route !== "#") {
            window.location.href = safeRoute(item.route);
        }
    };

    // Safe route helper
    const safeRoute = (routeName) => {
        try {
            return route(routeName);
        } catch {
            return '#';
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-overlay lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
                sidebar-container
                fixed inset-y-0 left-0 z-sidebar w-64 bg-white shadow-lg
                transform transition-transform-300 ease-in-out
                lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                flex flex-col
            `}>
                {/* Sidebar Header */}
                <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
                    <div className="flex items-center justify-center h-16 px-4 safe-top">
                        <Link href="/" className="focus-ring rounded-lg p-1">
                            <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                        </Link>
                    </div>
                </div>
                
                {/* Sidebar Content */}
                <div className="flex-1 custom-scrollbar overflow-y-auto">
                    <div className="px-4 py-6">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                            {menuConfig.title}
                        </p>
                        
                        <nav className="space-y-1">
                            {sidebarItems.map((item, index) => (
                                <div key={index}>
                                    <div
                                        className={`
                                            group flex items-center px-3 py-2 text-sm font-medium rounded-md 
                                            cursor-pointer transition-colors-200 touch-target focus-ring
                                            ${item.current 
                                                ? menuConfig.activeClass
                                                : menuConfig.inactiveClass
                                            }
                                        `}
                                        onClick={() => handleMenuClick(item)}
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault();
                                                handleMenuClick(item);
                                            }
                                        }}
                                    >
                                        <svg
                                            className={`mr-3 h-5 w-5 transition-colors flex-shrink-0 ${
                                                item.current ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                                            }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                                        </svg>
                                        
                                        {item.hasSubmenu ? (
                                            <span className="flex-1 truncate">{item.name}</span>
                                        ) : item.route === "#" ? (
                                            <span className="flex-1 truncate">{item.name}</span>
                                        ) : (
                                            <Link href={safeRoute(item.route)} className="flex-1 truncate focus-ring rounded">
                                                {item.name}
                                            </Link>
                                        )}
                                        
                                        {item.hasSubmenu && (
                                            <svg
                                                className={`ml-auto h-4 w-4 transform transition-transform flex-shrink-0 ${
                                                    expandedMenus[item.name] ? 'rotate-90' : ''
                                                }`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                aria-hidden="true"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        )}
                                    </div>
                                    
                                    {item.hasSubmenu && expandedMenus[item.name] && (
                                        <div className="ml-8 mt-1 space-y-1">
                                            {item.submenu.map((subItem, subIndex) => (
                                                <Link
                                                    key={subItem.name}
                                                    href={subItem.route === "#" ? "#" : safeRoute(subItem.route)}
                                                    className="group flex items-center px-3 py-2 text-sm font-medium text-gray-500 rounded-md hover:text-gray-900 hover:bg-gray-50 transition-colors-200 focus-ring touch-target"
                                                >
                                                    <span className="truncate">{subItem.name}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 min-w-0 flex flex-col lg:ml-0">
                {/* Top navigation */}
                <nav className="bg-white border-b border-gray-200 safe-top sticky top-0 z-50 shadow-sm">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            {/* Mobile menu button */}
                            <div className="flex items-center lg:hidden">
                                <button
                                    onClick={() => setSidebarOpen(!sidebarOpen)}
                                    className="mobile-menu-button inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors focus-ring touch-target"
                                    aria-label="Toggle sidebar"
                                >
                                    <svg 
                                        className="h-6 w-6" 
                                        stroke="currentColor" 
                                        fill="none" 
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>

                            {/* Right side navigation */}
                            <div className="flex items-center ml-auto">
                                {isAuthenticated ? (
                                    /* Authenticated User Dropdown */
                                    <div className="ml-3 relative">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <span className="inline-flex rounded-md">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus-ring transition-colors touch-target"
                                                    >
                                                        <div className="flex items-center">
                                                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                                                                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                                </svg>
                                                            </div>
                                                            <span className="hidden md:block truncate max-w-32">
                                                                {user?.name || 'User'}
                                                            </span>
                                                        </div>

                                                        <svg
                                                            className="ml-2 -mr-0.5 h-4 w-4 flex-shrink-0"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                            aria-hidden="true"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </button>
                                                </span>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content className="z-dropdown">
                                                <div className="px-4 py-2 border-b border-gray-100">
                                                    <p className="text-sm text-gray-600">Signed in as</p>
                                                    <p className="text-sm font-medium text-gray-900 truncate">{user?.email}</p>
                                                </div>
                                                <Dropdown.Link href={safeRoute('profile.edit')} className="focus-ring">
                                                    <div className="flex items-center">
                                                        <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                        Profile
                                                    </div>
                                                </Dropdown.Link>
                                                <Dropdown.Link href={safeRoute('logout')} method="post" as="button" className="focus-ring">
                                                    <div className="flex items-center">
                                                        <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                        </svg>
                                                        Log Out
                                                    </div>
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                ) : (
                                    /* Guest Login Button */
                                    <div className="flex items-center space-x-4">
                                        <Link
                                            href={safeRoute('login')}
                                            className="inline-flex items-center px-4 py-2 border border-blue-600 text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 focus-ring transition-colors touch-target"
                                        >
                                            <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                            </svg>
                                            <span className="hidden sm:block">Sign In</span>
                                            <span className="sm:hidden">Login</span>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Mobile menu dropdown */}
                    {showingNavigationDropdown && (
                        <div className="lg:hidden border-t border-gray-200 bg-white">
                            <div className="pt-2 pb-3 space-y-1">
                                {sidebarItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.route === "#" ? "#" : safeRoute(item.route)}
                                        className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors touch-target ${
                                            item.current
                                                ? 'bg-blue-50 border-blue-500 text-blue-700'
                                                : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300'
                                        }`}
                                    >
                                        <span className="truncate">{item.name}</span>
                                    </Link>
                                ))}
                            </div>

                            {/* Mobile authentication section */}
                            <div className="pt-4 pb-1 border-t border-gray-200 safe-bottom">
                                {isAuthenticated ? (
                                    <>
                                        <div className="px-4">
                                            <div className="font-medium text-base text-gray-800 truncate">{user.name}</div>
                                            <div className="font-medium text-sm text-gray-500 truncate">{user.email}</div>
                                        </div>

                                        <div className="mt-3 space-y-1">
                                            <Link
                                                href={safeRoute('profile.edit')}
                                                className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors touch-target focus-ring"
                                            >
                                                Profile
                                            </Link>
                                            <Link
                                                href={safeRoute('logout')}
                                                method="post"
                                                as="button"
                                                className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors touch-target focus-ring"
                                            >
                                                Log Out
                                            </Link>
                                        </div>
                                    </>
                                ) : (
                                    <div className="px-4">
                                        <Link
                                            href={safeRoute('login')}
                                            className="block w-full text-center px-4 py-2 border border-blue-600 text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-colors touch-target focus-ring"
                                        >
                                            Sign In
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </nav>

                {/* Main content container */}
                <div className="flex-1 custom-scrollbar overflow-y-auto">
                    <div className="px-4 sm:px-6 lg:px-8">
                        {/* Page Heading */}
                        {header && (
                            <header className="py-4 sm:py-6">
                                {header}
                            </header>
                        )}

                        {/* Page Content */}
                        <main className="pb-6 safe-bottom">
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
}