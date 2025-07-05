import { Link } from '@inertiajs/react';

/**
 * FilterSection component for filtering categories.
 * 
 * @component
 * @param {Object} props - The component props
 * @param {string} props.search - Current search value
 * @param {Function} props.setSearch - Function to set search value
 * @param {string} props.dateFilter - Current date filter value
 * @param {Function} props.setDateFilter - Function to set date filter
 * @param {Function} props.onSearch - Function to handle search
 * @param {Function} props.onReset - Function to handle reset
 * @returns {JSX.Element} The FilterSection component
 */
export default function FilterSection({
  search,
  setSearch,
  dateFilter,
  setDateFilter,
  onSearch,
  onReset,
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* filter form */}
      <div className="p-6">
        <FilterForm
          search={search}
          setSearch={setSearch}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          onSearch={onSearch}
          onReset={onReset}
        />
      </div>
    </div>
  );
}

function FilterForm({
  search,
  setSearch,
  dateFilter,
  setDateFilter,
  onSearch,
  onReset,
}) {
  const handleSubmit = e => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search by Name */}
        <div>
          <input
            type="text"
            placeholder="Cari Nama Kategori"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>
        
        {/* Date Filter */}
        <div>
          <input
            type="date"
            placeholder="Tanggal Dibuat"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>
        
        {/* Action Buttons */}
        <div className="flex space-x-2">
          <SearchButton />
          <ResetButton onClick={onReset} />
        </div>
      </div>
    </form>
  );
}

// Sub-komponen untuk tombol Search
function SearchButton() {
  return (
    <button
      type="submit"
      className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-medium text-white text-sm hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
    >
      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      Cari
    </button>
  );
}

// Sub-komponen untuk tombol Reset
function ResetButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-medium text-white text-sm hover:bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
    >
      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      Reset
    </button>
  );
}