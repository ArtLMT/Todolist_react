import React, { useState, useEffect } from 'react';
import { updateTaskApi, createTaskApi } from '../../api/taskApi.js';
import LoadingSpinner from "../molecules/LoadingSpinner.jsx";
import Button from "../atoms/Button.jsx";

export default function TaskModal({ show, isEdit, initialTask, onSave, onDelete, onClose }) {
    if (!show) return null;

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'todo',
        dueDate: '',
    });

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isEdit && initialTask) {
            const formattedDate = initialTask.dueDate ? new Date(initialTask.dueDate).toISOString().split('T')[0] : '';
            setFormData({
                title: initialTask.title || '',
                description: initialTask.description || '',
                status: initialTask.status || 'todo',
                dueDate: formattedDate,
            });
        } else if (!isEdit) {
            setFormData({ title: '', description: '', status: 'todo', dueDate: '' });
        }
    }, [isEdit, initialTask])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500));

        try {
            let result;
            if (isEdit) {
                result = await updateTaskApi(initialTask._id, formData);
            } else {
                result = await createTaskApi(formData);
            }
            onSave(result);
            onClose();
        } catch (error) {
            console.error("Lỗi khi lưu công việc:", error);
            alert(`Lỗi khi ${isEdit ? 'cập nhật' : 'tạo mới'} công việc.`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50
             /* Áp dụng backdrop-blur và nền bán trong suốt cùng lúc */
             backdrop-blur-sm bg-[rgb(var(--overlay-bg-rgb)/10)]">
            <div className="
                /* Nền Modal (Background chính của Modal/Spinner) */
                bg-gradient-to-br from-[rgb(var(--bg-primary-to)/40)] to-[rgb(var(--bg-primary-from)/40)]
                rounded-lg w-full max-w-md p-6 relative shadow-2xl
                border border-[rgb(var(--accent-base)/30)] backdrop-blur-md">

                {/* Tiêu đề */}
                <h2 className="text-xl font-bold mb-4
                    text-[rgb(var(--accent-text))]">
                    {isEdit ? "Edit Task" : "Create Task"}
                </h2>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    {/* Input Title */}
                    <input
                        name="title"
                        placeholder="Task title"
                        className="
                            /* Input Styling */
                            bg-[rgb(var(--bg-primary-to)/30)] border border-[rgb(var(--accent-base)/30)] rounded-md px-4 py-2
                            text-[rgb(var(--text-base))] placeholder-[rgb(var(--text-base)/50)] focus:outline-none
                            focus:ring-2 focus:ring-[rgb(var(--accent-base)/50)] focus:border-[rgb(var(--accent-base)/50)]
                            transition-all"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />

                    {/* Textarea Description */}
                    <textarea
                        name="description"
                        placeholder="Description"
                        className="
                            /* Textarea Styling */
                            bg-[rgb(var(--bg-primary-to)/30)] border border-[rgb(var(--accent-base)/30)] rounded-md px-4 py-2
                            text-[rgb(var(--text-base))] placeholder-[rgb(var(--text-base)/50)] focus:outline-none
                            focus:ring-2 focus:ring-[rgb(var(--accent-base)/50)] focus:border-[rgb(var(--accent-base)/50)]
                            transition-all resize-none"
                        value={formData.description}
                        onChange={handleChange}
                        rows="3"
                    ></textarea>

                    {/* Status Select (chỉ Edit) */}
                    {isEdit && (
                        <div className="flex justify-between items-center gap-2">
                            <label className="text-[rgb(var(--accent-text))]">Status:</label>
                            <select
                                name="status"
                                className="
                                    /* Select Styling */
                                    bg-[rgb(var(--bg-primary-to)/30)] border border-[rgb(var(--accent-base)/30)] rounded-md px-3 py-2
                                    text-[rgb(var(--text-base))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent-base)/50)] focus:border-[rgb(var(--accent-base)/50)]
                                    transition-all"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="todo">To Do</option>
                                <option value="in_progress">In Progress</option>
                                <option value="done">Done</option>
                            </select>
                        </div>
                    )}

                    {/* Due Date Input */}
                    <div className="flex justify-between items-center gap-2">
                        <label className="text-[rgb(var(--accent-text))]">Due Date:</label>
                        <input
                            name="dueDate"
                            type="date"
                            className="
                                /* Date Input Styling */
                                bg-[rgb(var(--bg-primary-to)/30)] border border-[rgb(var(--accent-base)/30)] rounded-md px-3 py-2
                                text-[rgb(var(--text-base))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent-base)/50)] focus:border-[rgb(var(--accent-base)/50)]
                                transition-all"
                            value={formData.dueDate}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-2 mt-4">
                        {/* Cancel Button */}
                        <Button
                            type="button"
                            className="
                                /* Cancel Button Styling */
                                bg-[rgb(var(--accent-base)/20)] hover:bg-[rgb(var(--accent-base)/30)]
                                text-[rgb(var(--accent-text))] hover:text-[rgb(var(--accent-text-light))]
                                border border-[rgb(var(--accent-base)/30)] px-4 py-2 rounded-md transition-all duration-200 disabled:opacity-50"
                            onClick={onClose}
                            disabled={isLoading}
                            text="Cancel"
                        />

                        {/* Save/Update Button */}
                        <Button
                            type="submit"
                            className="
                                /* Submit Button Styling */
                                bg-[rgb(var(--accent-base)/30)] hover:bg-[rgb(var(--accent-base)/40)]
                                text-[rgb(var(--accent-text-light))] hover:text-[rgb(var(--accent-text))]
                                border border-[rgb(var(--accent-base)/50)] px-4 py-2 rounded-md transition-all duration-200 disabled:opacity-50 font-medium"
                            disabled={isLoading}
                            text={isEdit ? "Update" : "Add Task"}
                        />
                    </div>
                </form>

                {/* Close Button (X) */}
                <Button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-[rgb(var(--accent-text-light)/60)] hover:text-[rgb(var(--accent-text))] font-bold text-xl transition-colors disabled:opacity-50"
                    disabled={isLoading}
                    text="X"
                />
            </div>
            {isLoading ? <LoadingSpinner/> : null}
        </div>
    );
}