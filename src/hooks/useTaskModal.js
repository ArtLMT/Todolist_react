import { useState } from "react";

export function useTaskModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const openCreateModal = () => {
        setIsEditMode(false);
        setSelectedTask(null);
        setIsOpen(true);
    };

    const openEditModal = (task) => {
        setSelectedTask(task);
        setIsEditMode(true);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedTask(null);
        setIsEditMode(false);
    };

    const openDeleteConfirm = () => {
        setShowDeleteConfirm(true);
    };

    const closeDeleteConfirm = () => {
        setShowDeleteConfirm(false);
    };

    const closeAllModals = () => {
        closeModal();
        closeDeleteConfirm();
    };

    return {
        isOpen,
        isEditMode,
        selectedTask,
        showDeleteConfirm,
        openCreateModal,
        openEditModal,
        closeModal,
        openDeleteConfirm,
        closeDeleteConfirm,
        closeAllModals,
    };
}
