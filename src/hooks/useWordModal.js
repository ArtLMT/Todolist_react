import { useState } from "react";

export function useWordModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedWord, setSelectedWord] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const openCreateModal = () => {
        setIsEditMode(false);
        setSelectedWord(null);
        setIsOpen(true);
    };

    const openEditModal = (word) => {
        setSelectedWord(word);
        setIsEditMode(true);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedWord(null);
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
        selectedWord,
        showDeleteConfirm,
        openCreateModal,
        openEditModal,
        closeModal,
        openDeleteConfirm,
        closeDeleteConfirm,
        closeAllModals,
    };
}
