import { Link } from '@inertiajs/react';

/**
 * DashboardCard component for displaying individual dashboard cards.
 * 
 * @component
 * @param {Object} props - The component props
 * @param {Object} props.card - The card data object
 * @param {string} props.icon - The SVG icon path
 * @returns {JSX.Element} The DashboardCard component
 */
export default function DashboardCard({ card, icon }) {
    const CardContent = () => (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center">
                <div className={`w-12 h-12 ${card.bgColor} rounded-lg flex items-center justify-center mr-4`}>
                    <svg className={`w-6 h-6 ${card.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon} />
                    </svg>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-gray-900">{card.title}</h3>
                    {card.description && (
                        <p className="text-xs text-gray-500 mt-1">{card.description}</p>
                    )}
                </div>
            </div>
        </div>
    );

    // Handle placeholder routes (coming soon features)
    if (card.route === "#" || !card.route) {
        return (
            <div className="relative">
                <CardContent />
                <div className="absolute inset-0 bg-gray-50 bg-opacity-75 rounded-lg flex items-center justify-center">
                    <span className="text-xs text-gray-500 font-medium">Coming Soon</span>
                </div>
            </div>
        );
    }

    // Safe route checking
    const getSafeRoute = (routeName) => {
        try {
            return route(routeName);
        } catch (error) {
            console.warn(`Route '${routeName}' not found`);
            return '#';
        }
    };

    const routeUrl = getSafeRoute(card.route);
    
    // If route is still '#', treat as placeholder
    if (routeUrl === '#') {
        return (
            <div className="relative">
                <CardContent />
                <div className="absolute inset-0 bg-gray-50 bg-opacity-75 rounded-lg flex items-center justify-center">
                    <span className="text-xs text-gray-500 font-medium">Coming Soon</span>
                </div>
            </div>
        );
    }

    return (
        <Link href={routeUrl}>
            <CardContent />
        </Link>
    );
}