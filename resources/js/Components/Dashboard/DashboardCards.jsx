import DashboardCard from '@/Components/Dashboard/DashboardCard';
import { dashboardCards, dashboardIcons } from '@/Data/dashboardData';

/**
 * DashboardCards component for displaying dashboard menu cards.
 * 
 * @component
 * @returns {JSX.Element} The DashboardCards component
 */
export default function DashboardCards() {
    return (
        <div className="dashboard-cards responsive-grid responsive-grid-sm responsive-grid-md responsive-grid-lg">
            {dashboardCards.map((card) => (
                <DashboardCard
                    key={card.id}
                    card={card}
                    icon={dashboardIcons[card.icon]}
                />
            ))}
        </div>
    );
}