import { Link } from '@inertiajs/react';

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

    if (card.route === "#") {
        return <CardContent />;
    }

    return (
        <Link href={route(card.route)}>
            <CardContent />
        </Link>
    );
}