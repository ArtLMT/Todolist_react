export default function LoadingSpinner() {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50
         /* Thay thế màu nền overlay */
         bg-[rgb(var(--overlay-bg)/70)] backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-4 border-[rgb(var(--accent-base)/70)]"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[rgb(var(--accent-base))] border-r-[rgb(var(--accent-base)/50)] animate-spin"></div>
                </div>
                <p className="text-[rgb(var(--accent-text))] font-medium">Vocabulary Vault is loading...</p>
            </div>
        </div>
    );
}