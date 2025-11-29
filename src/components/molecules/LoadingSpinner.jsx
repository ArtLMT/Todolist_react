export default function LoadingSpinner() {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50
         bg-[#181818]/10 backdrop-blur-xs"> {/* <-- Dùng /70 (opacity 70%) */}
            <div className="flex flex-col items-center gap-4">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-4 border-green-500/20"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-green-500 border-r-green-500/50 animate-spin"></div>
                </div>
                <p className="text-green-300 font-medium">Đang tải dữ liệu Task Board...</p>
            </div>
        </div>
    );
}