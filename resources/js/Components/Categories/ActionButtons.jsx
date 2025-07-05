import { Link } from '@inertiajs/react';

export default function ActionButtons({ category, onDelete }) {
    return (
        <div className="flex items-center space-x-2">
            <EditButton categoryId={category.id} />
            <DeleteButton category={category} onDelete={onDelete} />
        </div>
    );
}

// Sub-komponen untuk tombol Edit
function EditButton({ categoryId }) {
    return (
        <Link
            href={route('categories.edit', categoryId)}
            className="inline-flex items-center px-3 py-1 text-xs font-semibold text-white bg-green-600 rounded hover:bg-green-700 transition-colors uppercase tracking-wide"
        >
            EDIT
        </Link>
    );
}

// Sub-komponen untuk tombol Delete
function DeleteButton({ category, onDelete }) {
    return (
        <button
            onClick={() => onDelete(category)}
            className="inline-flex items-center px-3 py-1 text-xs font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors uppercase tracking-wide"
        >
            DELETE
        </button>
    );
}