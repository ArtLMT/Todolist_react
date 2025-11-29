import React, { useState, useEffect } from 'react';
import { updateTaskApi, createTaskApi, deleteTaskApi } from '../../api/taskApi.js';
import LoadingSpinner from "../molecules/LoadingSpinner.jsx";
import Button from "../atoms/Button.jsx"; // Import các hàm API

// Props:
// show: Boolean - Quyết định có hiển thị modal hay không
// isEdit: Boolean - Quyết định chế độ (true = Edit, false = Create)
// initialTask: Object - Task object hiện tại (chỉ có trong chế độ Edit)
// onSave: Function - Callback sau khi tạo/cập nhật thành công
// onDelete: Function - Callback sau khi xóa thành công
// onClose: Function - Đóng modal

export default function TaskModal({ show, isEdit, initialTask, onSave, onDelete, onClose }) {
    // Bỏ if (!show) return null; ở đây. Hãy để logic hiển thị/ẩn ở phần return
    // (Vì chúng ta đã dùng key để quản lý việc mount/unmount rồi)

    // Khởi tạo state bằng hàm khởi tạo, chỉ chạy 1 lần khi component mount
    // const initialFormState = () => {
    //     if (isEdit && initialTask) {
    //         const formattedDate = initialTask.dueDate ? new Date(initialTask.dueDate).toISOString().split('T')[0] : '';
    //         return {
    //             title: initialTask.title || '',
    //             description: initialTask.description || '',
    //             status: initialTask.status || 'todo',
    //             dueDate: formattedDate,
    //         };
    //     }
    //     // Chế độ Create
    //     return { title: '', description: '', status: 'todo', dueDate: '' };
    // };
    //
    // const [formData, setFormData] = useState(initialFormState); // Gọi hàm khởi tạo
    //
    // const [isLoading, setIsLoading] = useState(false);
    if (!show) return null; // Nếu gọi modal mà show là false thì trả về null

    // 1. Dùng state để quản lý dữ liệu form
    // Khởi tạo giá trị mặc định
    // State này đồng thời dùng để quản lý data của form
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'todo', // Giá trị mặc định
        dueDate: '',
    });

    const [isLoading, setIsLoading] = useState(false);

    // 2. Dùng useEffect để điền dữ liệu vào form khi ở chế độ Edit
    useEffect(() => {
        if (isEdit && initialTask) { // Nếu isEdit là true, và initialTask không phải null
            // Định dạng lại ngày tháng nếu cần thiết cho input type="date"
            const formattedDate = initialTask.dueDate ? new Date(initialTask.dueDate).toISOString().split('T')[0] : '';
            // Lấy data mới từ initialTask, nếu không có thì đặt là mặc định?
            setFormData({
                title: initialTask.title || '',
                description: initialTask.description || '',
                status: initialTask.status || 'todo',
                dueDate: formattedDate,
            });
        } else if (!isEdit) {
            // Reset form khi chuyển sang chế độ Create
            // Khi form ở chế độ create thì sẽ đặt mặc định
            setFormData({ title: '', description: '', status: 'todo', dueDate: '' });
        }
    }, [isEdit, initialTask]) // Mảng Dependencies của useEffect
    // Nó đãm bảo cho hook này chỉ thay đổi khi 1 trong 2 thằng này có sự thay đổi thôi

    // Hàm xử lý thay đổi input
    // Hàm này được gọi mỗi khi 1 field trong from thay đổi
    // khi thay đổi thì form sẽ thay đổi theo, phải có thằng này vì React sử dụng dom ảo đúng không?
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // 3. Hàm xử lý gửi form (Update hoặc Create)
    const handleSubmit = async (e) => {
        e.preventDefault(); // ngăn vụ reload trang khi submit form
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500));

        try {
            let result;
            if (isEdit) {
                result = await updateTaskApi(initialTask._id, formData);
            } else {
                result = await createTaskApi(formData);
            }
            // Gọi callback để cập nhật danh sách ở component cha
            onSave(result);
            onClose(); // Đóng modal
        } catch (error) {
            console.error("Lỗi khi lưu công việc:", error);
            alert(`Lỗi khi ${isEdit ? 'cập nhật' : 'tạo mới'} công việc.`);
        } finally {
            setIsLoading(false);
        }
    };

    // if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/50">
            <div className="bg-gradient-to-br from-green-900/40 to-green-950/40 rounded-lg w-full max-w-md p-6 relative shadow-2xl border border-green-500/30 backdrop-blur-md">
                <h2 className="text-xl font-bold mb-4 text-green-300">
                    {isEdit ? "Edit Task" : "Create Task"}
                </h2>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input
                        name="title" // Thêm name
                        placeholder="Task title"
                        className="bg-green-900/30 border border-green-500/30 rounded-md px-4 py-2 text-green-100 placeholder-green-400/50 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all"
                        value={formData.title} // Liên kết với state
                        onChange={handleChange} // Xử lý thay đổi
                        required
                    />

                    <textarea
                        name="description" // Thêm name
                        placeholder="Description"
                        className="bg-green-900/30 border border-green-500/30 rounded-md px-4 py-2 text-green-100 placeholder-green-400/50 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all resize-none"
                        value={formData.description} // Liên kết với state
                        onChange={handleChange}
                        rows="3"
                    ></textarea>
                    {isEdit && (
                        <div className="flex justify-between items-center gap-2">
                            <label className="text-green-300">Status:</label>
                            <select
                                name="status" // Thêm name
                                className="bg-green-900/30 border border-green-500/30 rounded-md px-3 py-2 text-green-100 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all"
                                value={formData.status} // Liên kết với state
                                onChange={handleChange}
                            >
                                <option value="todo">To Do</option>
                                <option value="in_progress">In Progress</option>
                                <option value="done">Done</option>
                            </select>
                        </div>
                    )}

                    <div className="flex justify-between items-center gap-2">
                        <label className="text-green-300">Due Date:</label>
                        <input
                            name="dueDate" // Thêm name
                            type="date"
                            className="bg-green-900/30 border border-green-500/30 rounded-md px-3 py-2 text-green-100 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all"
                            value={formData.dueDate} // Liên kết với state
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <Button
                            type="button"
                            className="bg-green-500/20 hover:bg-green-500/30 text-green-300 hover:text-green-200 border border-green-500/30 px-4 py-2 rounded-md transition-all duration-200 disabled:opacity-50"
                            onClick={onClose}
                            disabled={isLoading}
                            text="Cancel"
                        />

                        <Button
                            type="submit"
                            className="bg-green-500/30 hover:bg-green-500/40 text-green-200 hover:text-green-100 border border-green-500/50 px-4 py-2 rounded-md transition-all duration-200 disabled:opacity-50 font-medium"
                            disabled={isLoading} // Tắt nút khi đang tải
                            text={isEdit ? "Update" : "Add Task"}
                        />
                    </div>
                </form>

                <Button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-green-400/60 hover:text-green-300 font-bold text-xl transition-colors disabled:opacity-50"
                    disabled={isLoading}
                    text="X"
                >
                </Button>
            </div>
            {isLoading ? <LoadingSpinner/> : null}
        </div>
    );
}
