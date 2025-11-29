// src/components/atoms/ThemeToggle.jsx (hoặc đặt ở bất kỳ đâu bạn muốn)

import React from 'react';

// Sử dụng các biến CSS đã định nghĩa: --accent-base, --accent-text
const ThemeToggle = ({ theme, toggleTheme }) => {
    return (
        <button
            onClick={toggleTheme}
            className="grid place-items-center w-10 h-10 rounded-lg
                       /* Nền cho nút toggle */
                       bg-[rgb(var(--accent-base)/30)]
                       hover:bg-[rgb(var(--accent-base)/40)]
                       border border-[rgb(var(--accent-base)/40)]

                       /* Màu icon */
                       text-[rgb(var(--accent-text))]
                       transition-all duration-200 hover:-translate-y-0.5"
            aria-label={`Chuyển sang ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        >
            {theme === 'light' ? (
                // Icon Mặt Trời cho Light Mode
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.184a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59Z16.5 12a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 0 1.5H17.25a.75.75 0 0 1-.75-.75ZM4.21 4.772a.75.75 0 0 0-1.06 1.06l1.59 1.59a.75.75 0 0 0 1.06-1.06l-1.59-1.59ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25a.75.75 0 0 1 .75-.75ZM5.389 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.59a.75.75 0 1 0-1.06 1.06l1.59 1.59Z9.75 12a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0-4.5 0Z" />
                </svg>
            ) : (
                // Icon Mặt Trăng cho Dark Mode
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M9.52 2.53a.75.75 0 0 1 .53.22L12 5.5l1.95-2.75a.75.75 0 0 1 1.06 0l1.59 1.59a.75.75 0 0 1 0 1.06l-2.75 1.95 2.75 1.95a.75.75 0 0 1 0 1.06l-1.59 1.59a.75.75 0 0 1-1.06 0L12 10.5l-2.47 2.47a.75.75 0 0 1-1.06 0L6.95 11.5a.75.75 0 0 1 0-1.06l2.75-1.95L6.95 7.49a.75.75 0 0 1 0-1.06l1.59-1.59a.75.75 0 0 1 .53-.22ZM12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" clipRule="evenodd" />
                </svg>
            )}
        </button>
    );
};

export default ThemeToggle;