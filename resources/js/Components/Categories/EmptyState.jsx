export default function EmptyState() {
    return (
        <tr>
            <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                <div className="flex flex-col items-center">
                    <EmptyIcon />
                    <p className="text-lg font-medium">Tidak ada kategori yang ditemukan</p>
                    <p className="text-sm text-gray-400 mt-1">
                        Silakan tambah kategori baru atau ubah filter pencarian
                    </p>
                </div>
            </td>
        </tr>
    );
}

// Sub-komponen untuk icon empty state
function EmptyIcon() {
    return (
        <svg 
            className="w-12 h-12 text-gray-300 mb-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
            />
        </svg>
    );
}