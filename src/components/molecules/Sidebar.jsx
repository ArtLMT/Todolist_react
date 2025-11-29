import { useState } from 'react';
import {useTaskModal} from "../../hooks/useTaskModal.js";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);
    const modal = useTaskModal();

    const menuItems = [
        { icon: '📋', label: 'Dashboard', active: true },
        { icon: '✓', label: 'Tasks', active: false },
        { icon: '⚙️', label: 'Settings', active: false },
    ];

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 left-4 z-50 lg:hidden w-10 h-10 rounded-lg
                           bg-[rgb(var(--accent-base)/30)] hover:bg-[rgb(var(--accent-base)/40)]
                           border border-[rgb(var(--accent-base)/40)] text-[rgb(var(--accent-text))] transition-all"
            >
                ☰
            </button>

            <aside className={`
                bg-gradient-to-br from-[rgb(var(--bg-primary-from)/20)] to-[rgb(var(--bg-primary-to)/10)] 
                border-r border-[rgb(var(--accent-base)/20)] 
                transition-all duration-300 z-40 ${
                isOpen ? 'w-64' : '-translate-x-full lg:translate-x-0 lg:w-20'
            }`}>
                <div className="p-6 flex items-center justify-between">
                    {isOpen && <span className="text-[rgb(var(--accent-text))] font-semibold">Menu</span>}
                </div>

                <nav className="px-4 py-6 space-y-3">
                    {menuItems.map((item) => (
                        <button
                            key={item.label}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                                item.active
                                    ?
                                    'bg-[rgb(var(--accent-base)] border border-[rgb(var(--accent-base)/50)] text-[rgb(var(--accent-text))]'
                                    :
                                    'text-[rgb(var(--accent-text)/70)] hover:bg-[rgb(var(--accent-base)/15)] hover:border border-[rgb(var(--accent-base)/30)] hover:text-[rgb(var(--bg-primary-from))]'
                            }`}
                        >
                            <span className="text-xl">{item.icon}</span>
                            {isOpen && <span className="text-sm font-medium">{item.label}</span>}
                        </button>
                    ))}
                </nav>
            </aside>
        </>
    );
}