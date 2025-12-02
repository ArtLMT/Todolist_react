import React, { useEffect, useState } from "react";
import {Footer, Header} from "../components/index.js";
import WordBoard from "../pages/WordBoard.jsx";
import WordModal from "../components/organisms/WordModal.jsx";
import {deleteWordApi, fetchWordsApi} from '../api/wordApi.js';
import Button from "../components/atoms/Button.jsx";
import { useWordModal } from "../hooks/useWordModal.js";
import Sidebar from "../components/molecules/Sidebar.jsx";
import ConfirmDeleteModal from '../components/organisms/ConfirmDeleteModal.jsx';
import LoadingSpinner from "../components/molecules/LoadingSpinner.jsx";

export default function Layout() {
    const [theme, setTheme] = useState(
        () => localStorage.getItem('theme') || 'dark'
    );

    const toggleTheme = () => {
        setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
    };

    useEffect(() => {
        const root = window.document.documentElement; // Thẻ <html>

        root.classList.remove(theme === 'dark' ? 'light' : 'dark');
        root.classList.add(theme);

        localStorage.setItem('theme', theme);
    }, [theme]);


    const [words, setWords] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const modal = useWordModal();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteWord, setDeleteWord] = useState(null);

    const handleDeleteClick = (word) => {
        setShowDeleteConfirm(true);
        setDeleteWord(word);
    };

    const handleDeleteConfirm = async () => {
        setIsLoading(true);
        try {
            const deletedId = await deleteWordApi(deleteWord._id);
            await new Promise((resolve) => setTimeout(resolve, 500));
            modal.closeModal();
            setShowDeleteConfirm(false);
            handleWordDeleted(deletedId);
        } catch (error) {
            console.error("An error happened", error);
            alert("An error happened");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteCancel = () => {
        setShowDeleteConfirm(false);
    };

    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await fetchWordsApi();
                await new Promise((resolve) => setTimeout(resolve, 500));
                setWords(response);
            } catch (err) {
                console.error("Error when fetching data:", err);
                setError("Error when fetching data.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
        console.log()
    }, []);

    const handleWordSaved = (savedWord) => {
        setWords((prevWords) =>
            modal.isEditMode
                ? prevWords.map((t) => (t._id === savedWord._id ? savedWord : t))
                : [...prevWords, savedWord]
        );
        modal.closeModal();
    };

    const handleWordDeleted = (deletedId) => {
        setWords((prevWords) => prevWords.filter((t) => t._id !== deletedId));
        modal.closeModal();
    };

    return (
        <div className="h-screen min-h-screen min-w-screen flex flex-col
                    bg-gradient-to-br from-[rgb(var(--bg-primary-from))] to-[rgb(var(--bg-primary-to))]
                            transition-all duration-300

        ">
            <Header
                theme={theme}
                toggleTheme={toggleTheme}
                openCreateModal={modal.openCreateModal}

            />

            <div className="flex flex-1 min-h-0">
                {/*<Sidebar*/}
                {/*    openCreateModal={modal.openCreateModal}*/}
                {/*/>*/}
                <WordBoard
                    className="flex-1 min-h-0 transition-all"
                    words={words}
                    onEditRequested={modal.openEditModal}
                    onDeleteRequest={handleDeleteClick}
                />

            </div>
            <Footer className="shrink-0" />

            <WordModal
                key={modal.isOpen ? modal.selectedWord?._id || 'create' : 'closed'}
                show={modal.isOpen}
                isEdit={modal.isEditMode}
                selectedWord={modal.selectedWord}
                onSave={handleWordSaved}
                onDelete={handleWordDeleted}
                onClose={modal.closeModal}
            />

            <ConfirmDeleteModal
                show={showDeleteConfirm}
                wordTitle={
                    deleteWord?.translations?.[0]?.value
                }
                onConfirm={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
                isLoading={isLoading}
            />

            {isLoading ? <LoadingSpinner /> : null}
        </div>
    );
}