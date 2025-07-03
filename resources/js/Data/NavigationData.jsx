const getCurrentRouteName = () => {
    try {
        return route().current();
    } catch {
        return window.location.pathname.replace('/', '') || 'dashboard';
    }
};

export const sidebarItems = [
    {
        name: "Beranda",
        icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
        route: "dashboard",
        current: true
    },
    {
        name: "Inbox",
        icon: "M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4",
        route: "#"
    },
    {
        name: "Layanan",
        icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
        route: "#"
    },
    {
        name: "Permohonan Saya",
        icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
        route: "#"
    },
    {
        name: "Survey Kepuasan",
        icon: "M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
        route: "#"
    },
    {
        name: "Bursa Kerja",
        icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6",
        route: "#",
        hasSubmenu: true,
        submenu: [
            { name: "Cari Lowongan", route: "#" },
            { name: "Lamaran Saya", route: "#" }
        ]
    },
    {
        name: "Profile",
        icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
        route: "profile.edit",
        hasSubmenu: true,
        submenu: [
            { name: "Edit Profile", route: "profile.edit" },
            { name: "Change Password", route: "#" }
        ]
    }
];

export const menuConfig = {
    title: "MAIN MENU",
    activeClass: "bg-blue-50 text-blue-700 border-r-2 border-blue-700",
    inactiveClass: "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
};

// Helper function to get menu items with current state
export const getSidebarItemsWithCurrentState = (currentRoute) => {
    if (!currentRoute) {
        currentRoute = getCurrentRouteName();
    }
    
    return sidebarItems.map(item => {
        // Check if current route matches this item
        const isCurrentRoute = item.route === currentRoute;
        
        // Check if current route matches any submenu item
        const hasActiveSubmenu = item.hasSubmenu && 
            item.submenu?.some(sub => sub.route === currentRoute);
        
        return {
            ...item,
            current: isCurrentRoute || hasActiveSubmenu
        };
    });
};

// Helper function to get default sidebar items (for fallback)
export const getDefaultSidebarItems = () => {
    return getSidebarItemsWithCurrentState();
};

// Helper function to check if route exists
export const isValidRoute = (routeName) => {
    try {
        return route().has(routeName);
    } catch {
        return false;
    }
};