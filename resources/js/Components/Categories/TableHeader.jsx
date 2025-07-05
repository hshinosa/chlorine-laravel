export default function TableHeader() {
    const headers = [
        'ID Kategori',
        'Tgl Dibuat',
        'Nama Kategori',
        'Status Saat Ini',
        'Status',
        'Detail',
        'Aksi'
    ];

    return (
        <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
                {headers.map((header, index) => (
                    <th 
                        key={index}
                        className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                        {header}
                    </th>
                ))}
            </tr>
        </thead>
    );
}