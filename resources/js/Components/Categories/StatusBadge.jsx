export default function StatusBadge({ isPublished }) {
    return (
        <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wide ${
            isPublished 
                ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                : 'bg-gray-100 text-gray-800 border border-gray-200'
        }`}>
            {isPublished ? 'PUBLISHED' : 'DRAFT'}
        </span>
    );
}