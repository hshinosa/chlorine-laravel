import { Link } from '@inertiajs/react';
import PropTypes from 'prop-types';

export default function Pagination({ pagination }) {
    if ((pagination?.links?.length ?? 0) <= 3) {
        return null;
    }

    return (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
                <PaginationMobile links={pagination.links} />
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <PaginationInfo pagination={pagination} />
                <PaginationLinks links={pagination.links} />
            </div>
        </div>
    );
}

// Sub-komponen untuk informasi pagination
function PaginationInfo({ pagination }) {
    return (
        <div className="text-sm text-gray-700">
            Menampilkan <span className="font-medium">{pagination.from}</span> hingga{' '}
            <span className="font-medium">{pagination.to}</span> dari{' '}
            <span className="font-medium">{pagination.total}</span> hasil
        </div>
    );
}

// Sub-komponen untuk mobile pagination
function PaginationMobile({ links }) {
    const previousLink = links.find(link => link.label.includes('Previous'));
    const nextLink = links.find(link => link.label.includes('Next'));

    return (
        <>
            {previousLink?.url ? (
                <Link
                    href={previousLink.url}
                    className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    preserveState
                    preserveScroll
                >
                    Previous
                </Link>
            ) : (
                <span className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-not-allowed rounded-md">
                    Previous
                </span>
            )}
            {nextLink?.url ? (
                <Link
                    href={nextLink.url}
                    className="relative ml-3 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    preserveState
                    preserveScroll
                >
                    Next
                </Link>
            ) : (
                <span className="relative ml-3 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-not-allowed rounded-md">
                    Next
                </span>
            )}
        </>
    );
}

// Sub-komponen untuk links pagination
function PaginationLinks({ links }) {
    return (
        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            {links.map((link, index) => (
                <PaginationLink key={`${link.label}-${link.url || index}`} link={link} />
            ))}
        </nav>
    );
}

// Sub-komponen untuk individual pagination link
function PaginationLink({ link }) {
    const getClassName = () => {
        const baseClass = "relative inline-flex items-center px-4 py-2 text-sm font-medium border transition-colors";
        
        if (link.active) {
            return `${baseClass} z-10 bg-blue-600 border-blue-600 text-white focus:z-20`;
        }
        
        if (link.url) {
            return `${baseClass} bg-white border-gray-300 text-gray-500 hover:bg-gray-50 focus:z-20`;
        }
        
        return `${baseClass} bg-white border-gray-300 text-gray-300 cursor-not-allowed`;
    };

    if (!link.url) {
        return (
            <span 
                className={getClassName()}
                dangerouslySetInnerHTML={{ __html: link.label }}
            />
        );
    }

    return (
        <Link
            href={link.url}
            className={getClassName()}
            preserveState
            preserveScroll
            dangerouslySetInnerHTML={{ __html: link.label }}
        />
    );
}

// PropTypes validation
Pagination.propTypes = {
  pagination: PropTypes.shape({
    from: PropTypes.number,
    to: PropTypes.number,
    total: PropTypes.number,
    links: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
        label: PropTypes.string,
        active: PropTypes.bool,
      })
    ),
  }).isRequired,
};

PaginationInfo.propTypes = {
  pagination: PropTypes.shape({
    from: PropTypes.number,
    to: PropTypes.number,
    total: PropTypes.number,
  }).isRequired,
};

PaginationMobile.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      label: PropTypes.string,
      active: PropTypes.bool,
    })
  ).isRequired,
};

PaginationLinks.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      label: PropTypes.string,
      active: PropTypes.bool,
    })
  ).isRequired,
};

PaginationLink.propTypes = {
  link: PropTypes.shape({
    url: PropTypes.string,
    label: PropTypes.string,
    active: PropTypes.bool,
  }).isRequired,
};