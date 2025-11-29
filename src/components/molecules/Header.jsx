// src/components/Header.jsx (hoặc tương tự)

import ThemeToggle from "../atoms/ThemeToggle.jsx"; // Đảm bảo đúng đường dẫn

// Nhận theme và toggleTheme làm props từ Layout
export default function Header({ theme, toggleTheme }) {
    return (
        <header className="
            /* Thay thế nền gradient */
            bg-gradient-to-br from-[rgb(var(--bg-primary-from)/20)] to-[rgb(var(--bg-primary-to)/10)]

            /* Thay thế viền */
            border-b border-[rgb(var(--accent-base)/20)]

            backdrop-blur-md sticky top-0 z-40"
        >
            <div className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg
                        /* Thay thế nền icon */
                        bg-gradient-to-br from-[rgb(var(--accent-base)/40)] to-[rgb(var(--accent-base)/30)]
                        border border-[rgb(var(--accent-base)/60)]
                        flex items-center justify-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                            /* Thay thế màu icon */
                             className="w-6 h-6 text-[rgb(var(--accent-text))]"
                        >
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                        </svg>
                    </div>
                    <h1
                        /* Thay thế màu tiêu đề */
                        className="text-2xl font-bold text-[rgb(var(--accent-text))]">
                        TaskBoard
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    {/* Nút chuyển đổi Theme */}
                    <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

                    {/* Văn bản "Welcome back" */}
                    <div className="text-[rgb(var(--accent-text)/70)] text-sm hidden sm:block">Welcome back!</div>
                </div>
            </div>
        </header>
    );
}