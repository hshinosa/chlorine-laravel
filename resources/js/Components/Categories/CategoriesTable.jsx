import TableHeader from './TableHeader';
import TableRow from './TableRow';
import EmptyState from './EmptyState';
import Pagination from './Pagination';

export default function CategoriesTable({
  categories = { data: [], links: [] },
  onDelete,
}) {
  // now categories.data and categories.links are always defined
  const categoriesData = categories.data || [];
  const hasCategories = categoriesData.length > 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader />
          <tbody className="bg-white divide-y divide-gray-200">
            {hasCategories
              ? categoriesData.map(c => (
                  <TableRow key={c.id} category={c} onDelete={onDelete} />
                ))
              : <EmptyState />}
          </tbody>
        </table>
      </div>
      
      {/* Pagination - only show if there are links and more than 3 (prev, current, next) */}
      {categories.links && categories.links.length > 3 && (
        <Pagination pagination={categories} />
      )}
    </div>
  );
}