import React, { useState } from 'react';
import {useWordModal} from "../../hooks/useWordModal.js";
import Button from "../atoms/Button.jsx";

export default function Sidebar( { theme, toggleTheme, openCreateModal } ) {
    const modal = useWordModal();

    return (
        <>
            <aside className="
                bg-gradient-to-br from-[rgb(var(--bg-primary-from)/20)]
                to-[rgb(var(--bg-primary-to)/10)]
                border-r border-[rgb(var(--accent-base)/20)]
                transition-all duration-300 z-40"
            >

            <div className="px-4 py-3">
                <Button
                    onClick={openCreateModal}
                    text={"Create Task"}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold transition-all duration-200 
                                    bg-[rgb(var(--accent-base)/40)] hover:bg-[rgb(var(--accent-base)/60)] text-white`}
                />
                </div>
            </aside>
        </>
    );
}