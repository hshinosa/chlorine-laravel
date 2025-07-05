export default function DashboardHeader({ 
    title = "Dashboard", 
    subtitle = "Sistem Informasi Layanan Ketenagakerjaan" 
}) {
    return (
        <div>
            <h2 className="text-xl sm:text-2xl font-semibold leading-tight text-gray-800">
                {title}
            </h2>
            <p className="mt-1 text-sm text-gray-600">
                {subtitle}
            </p>
        </div>
    );
}