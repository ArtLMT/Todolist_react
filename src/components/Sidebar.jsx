import { useState } from 'react';
import {useTaskModal} from "../hooks/useTaskModal.js";

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
                className="fixed top-4 left-4 z-50 lg:hidden w-10 h-10 rounded-lg bg-green-500/30 hover:bg-green-500/40 border border-green-500/40 text-green-300 transition-all"
            >
                ☰
            </button>

            <aside className={`bg-gradient-to-b from-green-800/60 to-green-700/40 border-r border-green-500/30 backdrop-blur-md transition-all duration-300 z-40 ${
                isOpen ? 'w-64' : '-translate-x-full lg:translate-x-0 lg:w-20'
            }`}>
                <div className="p-6 flex items-center justify-between">
                    {isOpen && <span className="text-green-300 font-semibold">Menu</span>}
                </div>

                <nav className="px-4 py-6 space-y-3">
                    {menuItems.map((item) => (
                        <button
                            key={item.label}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                                item.active
                                    ? 'bg-green-500/30 border border-green-500/50 text-green-300' // Sáng hơn
                                    : 'text-green-300/70 hover:bg-green-500/15 hover:border border-green-500/30' // Sáng hơn
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