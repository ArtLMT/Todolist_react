import React, { useEffect, useState } from "react";
import {Footer, Header} from "../components/index.js";
import TaskBoard from "../pages/TaskBoard.jsx";
import TaskModal from "../components/organisms/TaskModal.jsx";
import {deleteTaskApi, fetchTasksApi} from '../api/taskApi';
import Button from "../components/atoms/Button.jsx";
import { useTaskModal } from "../hooks/useTaskModal.js";
import Sidebar from "../components/molecules/Sidebar.jsx";
import ConfirmDeleteModal from '../components/organisms/ConfirmDeleteModal.jsx';
import LoadingSpinner from "../components/molecules/LoadingSpinner.jsx";


export default function Layout() {
    // --- START: THEME LOGIC ---
    const [theme, setTheme] = useState(
        // Khởi tạo theme từ Local Storage, mặc định là 'dark'
        () => localStorage.getItem('theme') || 'dark'
    );

    const toggleTheme = () => {
        setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
    };

    // useEffect để đồng bộ theme state với DOM và Local Storage
    useEffect(() => {
        const root = window.document.documentElement; // Thẻ <html>

        // 1. Loại bỏ class theme cũ và thêm class theme mới
        // Nếu theme là 'dark', loại bỏ 'light' và thêm 'dark'
        root.classList.remove(theme === 'dark' ? 'light' : 'dark');
        root.classList.add(theme);

        // 2. Lưu trạng thái vào Local Storage
        localStorage.setItem('theme', theme);
    }, [theme]); // Chạy lại mỗi khi 'theme' thay đổi
    // --- END: THEME LOGIC ---


    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const modal = useTaskModal();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteTask, setDeleteTask] = useState(null);

    // ... (Các hàm handleDeleteClick, handleDeleteConfirm, handleDeleteCancel, fetchTasksApi logic)

    const handleDeleteClick = (task) => {
        setShowDeleteConfirm(true);
        setDeleteTask(task);
    };

    const handleDeleteConfirm = async () => {
        setIsLoading(true);
        try {
            const deletedId = await deleteTaskApi(deleteTask._id);
            await new Promise((resolve) => setTimeout(resolve, 500));
            modal.closeModal();
            setShowDeleteConfirm(false);
            handleTaskDeleted(deletedId);
        } catch (error) {
            console.error("Lỗi khi xóa công việc:", error);
            alert("Lỗi khi xóa công việc.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteCancel = () => {
        setShowDeleteConfirm(false);
    };

    // Fetch dữ liệu tasks khi component mount
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await fetchTasksApi();
                await new Promise((resolve) => setTimeout(resolve, 500));
                setTasks(response);
            } catch (err) {
                console.error("Lỗi khi tải tasks:", err);
                setError("Không thể tải dữ liệu. Vui lòng thử lại.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    // Xử lý CREATE/UPDATE task
    const handleTaskSaved = (savedTask) => {
        setTasks((prevTasks) =>
            modal.isEditMode
                ? prevTasks.map((t) => (t._id === savedTask._id ? savedTask : t))
                : [...prevTasks, savedTask]
        );
        modal.closeModal();
    };

    // Xử lý DELETE task
    const handleTaskDeleted = (deletedId) => {
        setTasks((prevTasks) => prevTasks.filter((t) => t._id !== deletedId));
        modal.closeModal();
    };


    return (
        <div className="h-screen min-h-screen min-w-screen flex flex-col
                    bg-gradient-to-br from-[rgb(var(--bg-primary-from))] to-[rgb(var(--bg-primary-to))]
        ">
            {/* Truyền theme state và toggleTheme xuống Header hoặc Sidebar */}
            <Header theme={theme} toggleTheme={toggleTheme} />

            <div className="flex flex-1 min-h-0">
                <Sidebar theme={theme} toggleTheme={toggleTheme} />
                <TaskBoard
                    className="flex-1 min-h-0"
                    tasks={tasks}
                    onEditRequested={modal.openEditModal}
                    onDeleteRequest={handleDeleteClick}
                />

            </div>
            <Footer className="shrink-0" />

            <TaskModal
                key={modal.isOpen ? modal.selectedTask?._id || 'create' : 'closed'}
                show={modal.isOpen}
                isEdit={modal.isEditMode}
                initialTask={modal.selectedTask}
                onSave={handleTaskSaved}
                onDelete={handleTaskDeleted}
                onClose={modal.closeModal}
            />

            <ConfirmDeleteModal
                show={showDeleteConfirm}
                taskTitle={ deleteTask?.title }
                onConfirm={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
                isLoading={isLoading}
            />

            {isLoading ? <LoadingSpinner /> : null}
        </div>
    );
}