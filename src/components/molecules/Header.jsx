import ThemeToggle from "../atoms/ThemeToggle.jsx";
import Button from "../atoms/Button.jsx";
import {useWordModal} from "../../hooks/useWordModal.js"; // Đảm bảo đúng đường dẫn

export default function Header({ theme, toggleTheme, openCreateModal }) {
    return (
        <header className="
            bg-gradient-to-br from-[rgb(var(--bg-primary-from)/20)] to-[rgb(var(--bg-primary-to)/10)]
            border-b border-[rgb(var(--accent-base)/20)]
            backdrop-blur-md sticky top-0 z-40"
        >
            <div className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg
                        bg-gradient-to-br from-[rgb(var(--accent-base)/40)] to-[rgb(var(--accent-base)/30)]
                        border border-[rgb(var(--accent-base)/60)]
                        flex items-center justify-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                             className="w-6 h-6 text-white"
                        >
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                        </svg>
                    </div>
                    <h1
                        className="text-2xl font-bold text-[rgb(var(--accent-text))]">
                        Vocabulary Vault
                    </h1>
                </div>

                <div className="flex items-center gap-4 ">
                    <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

                    <Button
                        onClick={openCreateModal}
                        text={"+ Add Word"}
                        className="flex items-center justify-center gap-2 h-10 px-4 rounded-lg font-semibold
                            bg-[rgb(var(--accent-base)/35)] border border-[rgb(var(--accent-base)/50)] shadow-[0_2px_6px_rgba(0,0,0,0.15)] text-white
                            transition-all duration-200
                            "
                    />

                </div>
            </div>
        </header>
    );
}