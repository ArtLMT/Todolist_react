export default function DeleteConfirmModal({ show, taskTitle, onConfirm, onCancel, isLoading }) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/50">
            <div className="bg-gradient-to-br from-green-900/40 to-green-950/40 rounded-lg w-full max-w-sm p-6 relative shadow-2xl border border-green-500/30 backdrop-blur-md">
                <h2 className="text-lg font-bold mb-3 text-red-300">
                    Confirm Delete
                </h2>

                <p className="text-green-200/80 mb-6">
                    Are you sure you want to delete <span className="font-semibold text-green-300">"{taskTitle}"</span>? This action cannot be undone.
                </p>

                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        className="bg-green-500/20 hover:bg-green-500/30 text-green-300 hover:text-green-200 border border-green-500/30 px-4 py-2 rounded-md transition-all duration-200 disabled:opacity-50"
                        onClick={onCancel}
                        disabled={isLoading}
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        className="bg-red-500/30 hover:bg-red-500/40 text-red-200 hover:text-red-100 border border-red-500/50 px-4 py-2 rounded-md transition-all duration-200 disabled:opacity-50 font-medium"
                        onClick={onConfirm}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
    );
}
