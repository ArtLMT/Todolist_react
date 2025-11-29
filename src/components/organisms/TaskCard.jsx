import {deleteTaskApi} from '../../api/taskApi.js'
import { useState } from 'react';

export default function TaskCard({ task, onEditRequested ,onDeleteRequest }) {

    const handleEditToggle = () => {
        onEditRequested({...task, completed: !task.completed});
    }

    const deleteClicked = (task) => {
        console.log('delete clicked');
        onDeleteRequest(task);
    }

    return (
        <div
            className="group flex gap-3 items-start rounded-lg p-3 transition-all duration-200 cursor-pointer
            /* Thay thế nền thẻ */
            bg-gradient-to-br from-[rgb(var(--bg-primary-from)/20)] to-[rgb(var(--bg-primary-to)/10)] 

            hover:border-[rgb(var(--accent-base)/40)] hover:shadow-xs hover:shadow-[rgb(var(--accent-base)/10)] hover:-translate-y-1"
        >
            <div className="flex-1 min-w-0" onClick={() => onEditRequested?.(task)}>
                <h3 className={`text-base font-semibold leading-tight transition-colors duration-200 line-clamp-1 ${
                    task.completed
                        /* Chữ gạch ngang */
                        ? 'text-[rgb(var(--text-base)/60)] line-through'
                        /* Chữ thường (Accent Text) */
                        : 'text-[rgb(var(--accent-text))]'
                }`}>
                    {task.title}
                </h3>

                {task.description && (
                    <p className="text-sm text-[rgb(var(--text-base)/60)] mt-1">
                        {task.description}
                    </p>
                )}

                <div className="flex flex-wrap gap-3 items-center mt-2 text-xs">
                    <span className="flex items-center gap-1 text-[rgb(var(--text-base)/70)]">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-3.5 h-3.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 8v4l3 3m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}
                    </span>

                    {/* Bảng màu Trạng thái */}
                    <span className={`px-2.5 py-1 rounded-full font-medium transition-colors duration-200 text-white
                    ${
                        /* Todo: Màu VÀNG */
                        task.status === "todo" && "bg-[rgb(var(--color-status-red)/20)] text-[rgb(var(--color-status-red))] border border-[rgb(var(--color-status-red)/30)]"
                    } ${
                        /* In Progress: Màu XANH (Accent Base) */
                        task.status === "in_progress" && "bg-[rgb(var(--color-status-yellow)/20)] text-[rgb(var(--color-status-yellow))] border border-[rgb(var(--color-status-yellow)/30)]"
                    } ${
                        /* Done: Màu LIME (Giữ nguyên) */
                        task.status === "done" && "bg-lime-600/100 text-green-300 border border-lime-500/30"
                    }`}>
                        {task.status.replace("_", " ").toUpperCase()}
                    </span>
                </div>
            </div>

            <div className="flex gap-2 items-center flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {/* Nút Hoàn thành (Màu XANH ACCENT) */}
                <button className="grid place-items-center w-8 h-8 rounded-md
                bg-[rgb(var(--accent-base)/10)] hover:bg-[rgb(var(--accent-base)/20)] text-[rgb(var(--accent-text-light))] hover:text-[rgb(var(--accent-text))]
                transition-all duration-200 hover:-translate-y-0.5"
                        onClick={handleEditToggle}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M5 13l4 4L19 7" />
                    </svg>
                </button>

                {/* Nút Xóa (Màu ĐỎ) */}
                <button className="grid place-items-center w-8 h-8 rounded-md
                bg-[rgb(var(--color-status-red)/10)] hover:bg-[rgb(var(--color-status-red)/20)] text-[rgb(var(--color-status-red)/80)] hover:text-[rgb(var(--color-status-red))]
                transition-all duration-200 hover:-translate-y-0.5"
                        onClick={() => { deleteClicked(task)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                        <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22" />
                    </svg>
                </button>
            </div>
        </div>
    );
}