import { Link } from '@inertiajs/react';
import StatusBadge from './StatusBadge';
import ActionButtons from './ActionButtons';

export default function TableRow({ category, onDelete }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const dateFormat = date.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
        const timeFormat = date.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        return `${dateFormat} ${timeFormat}`;
    };

    const generateCategoryId = (id) => {
        return `CAT${String(id).padStart(3, '0')}`;
    };

    return (
        <tr className="hover:bg-gray-50 transition-colors">
            {/* ID Kategori */}
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {generateCategoryId(category.id)}
            </td>
            
            {/* Tanggal Dibuat */}
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatDate(category.created_at)}
            </td>
            
            {/* Nama Kategori */}
            <td className="px-6 py-4 text-sm text-gray-900">
                <div className="font-medium">{category.name}</div>
            </td>
            
            {/* Status Saat Ini */}
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {category.is_publish ? 'Aktif' : 'Draft'}
            </td>
            
            {/* Status Badge */}
            <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge isPublished={category.is_publish} />
            </td>
            
            {/* Detail Button */}
            <td className="px-6 py-4 whitespace-nowrap">
                <Link
                    href={route('categories.show', category.id)}
                    className="inline-flex items-center px-3 py-1 text-xs font-semibold text-white bg-red-600 rounded hover:bg-red-700 transition-colors uppercase tracking-wide"
                >
                    VIEW
                </Link>
            </td>
            
            {/* Action Buttons */}
            <td className="px-6 py-4 whitespace-nowrap">
                <ActionButtons category={category} onDelete={onDelete} />
            </td>
        </tr>
    );
}