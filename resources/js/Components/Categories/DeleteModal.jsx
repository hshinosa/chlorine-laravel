import Modal from '@/Components/Modal';

export default function DeleteModal({ 
    show, 
    onClose, 
    category, 
    onConfirm, 
    isDeleting 
}) {
    return (
        <Modal show={show} onClose={onClose}>
            <div className="p-6">
                <ModalIcon />
                <div className="text-center">
                    <ModalHeader />
                    <ModalContent categoryName={category?.name} />
                    <ModalActions 
                        onClose={onClose}
                        onConfirm={onConfirm}
                        isDeleting={isDeleting}
                    />
                </div>
            </div>
        </Modal>
    );
}

// Sub-komponen untuk icon modal
function ModalIcon() {
    return (
        <div className="flex items-center mb-4">
            <div className="flex-shrink-0 w-10 h-10 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
            </div>
        </div>
    );
}

// Sub-komponen untuk header modal
function ModalHeader() {
    return (
        <h3 className="text-lg font-medium text-gray-900 mb-2">
            Hapus Kategori
        </h3>
    );
}

// Sub-komponen untuk konten modal
function ModalContent({ categoryName }) {
    return (
        <p className="text-sm text-gray-500 mb-6">
            Apakah Anda yakin ingin menghapus kategori "{categoryName}"? 
            Tindakan ini tidak dapat dibatalkan.
        </p>
    );
}

// Sub-komponen untuk action buttons modal
function ModalActions({ onClose, onConfirm, isDeleting }) {
    return (
        <div className="flex justify-center space-x-4">
            <CancelButton onClick={onClose} disabled={isDeleting} />
            <ConfirmButton onClick={onConfirm} isDeleting={isDeleting} />
        </div>
    );
}

// Sub-komponen untuk tombol Cancel
function CancelButton({ onClick, disabled }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus-ring transition-colors"
            disabled={disabled}
        >
            Batal
        </button>
    );
}

// Sub-komponen untuk tombol Confirm
function ConfirmButton({ onClick, isDeleting }) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={isDeleting}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus-ring transition-colors disabled:opacity-50"
        >
            {isDeleting ? 'Menghapus...' : 'Hapus'}
        </button>
    );
}