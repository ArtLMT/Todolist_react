import Button from "../atoms/Button.jsx";

export default function DeleteConfirmModal({ show, wordTitle, onConfirm, onCancel, isLoading }) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm
            bg-[rgb(var(--overlay-bg-rgb)/10)] text-[rgb(var(--text-base)/60)]"
        >
            <div className="relative bg-gradient-to-br from-[rgb(var(--bg-primary-to)/40)] to-[rgb(var(--bg-primary-from)/40)]
                rounded-lg w-full max-w-sm p-6 shadow-2xl border border-[rgb(var(--accent-base)/30)]"
            >
                <h2 className="text-lg font-bold mb-3 text-[rgb(var(--color-status-red))]">
                    Confirm Delete
                </h2>

                <p className="text-[rgb(var(--text-base)/80)] mb-6">
                    Are you sure you want to delete
                    <span className="font-semibold text-[rgb(var(--accent-text))]"> "{wordTitle}"</span>?
                    This action cannot be undone.
                </p>

                <div className="flex justify-end gap-2">
                    <Button
                        type="button"
                        onClick={onCancel}
                        className="bg-[rgb(var(--accent-base)/20)] hover:bg-[rgb(var(--accent-base)/30)]
                            text-white
                            border border-[rgb(var(--accent-base)/30)]
                            px-4 py-2 rounded-md transition-all duration-200 disabled:opacity-50"
                        text="Cancel"
                        disabled={isLoading}
                    />

                    <Button
                        type="button"
                        onClick={onConfirm}
                        className="bg-[rgb(var(--color-status-red)/30)] hover:bg-[rgb(var(--color-status-red)/40)]
                            text-white
                            border border-[rgb(var(--color-status-red)/50)]
                            px-4 py-2 rounded-md transition-all duration-200 disabled:opacity-50 font-medium"
                        text={isLoading ? "Deleting..." : "Delete"}
                        disabled={isLoading}
                    />
                </div>
            </div>
        </div>
    );
}
