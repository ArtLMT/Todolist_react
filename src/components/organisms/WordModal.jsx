import React, { useState, useEffect } from "react";
import { updateWordApi, createWordApi } from "../../api/wordApi.js";
import LoadingSpinner from "../molecules/LoadingSpinner.jsx";
import Button from "../atoms/Button.jsx";

export default function WordModal({ show, isEdit, selectedWord, onSave, onDelete, onClose }) {
    if (!show) return null;

    const emptyTranslation = () => ({ lang: "", value: "" });

    const [formData, setFormData] = useState({
        description: "",
        translations: [emptyTranslation()],
    });

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (isEdit && selectedWord) {
            setFormData({
                description: selectedWord.description || "",
                translations: Array.isArray(selectedWord.translations) && selectedWord.translations.length > 0
                    ? selectedWord.translations.map(t => ({ lang: t.lang || "", value: t.value || "", _id: t._id }))
                    : [emptyTranslation()]
            });
        } else if (!isEdit) {
            setFormData({ description: "", translations: [emptyTranslation()] });
        }
    }, [isEdit, selectedWord]);

    const updateTranslation = (index, field, value) => {
        setFormData(prev => {
            const translations = prev.translations.slice();
            translations[index] = { ...translations[index], [field]: value };
            return { ...prev, translations };
        });
    };

    const addTranslation = () => {
        setFormData(prev => ({ ...prev, translations: [...prev.translations, emptyTranslation()] }));
    };

    const removeTranslation = (index) => {
        setFormData(prev => {
            const translations = prev.translations.slice();
            translations.splice(index, 1);
            return { ...prev, translations: translations.length ? translations : [emptyTranslation()] };
        });
    };

    const validate = () => {
        for (const t of formData.translations) {
            if (!t.lang || !t.value) return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            alert("Each translation must have both a language code and a value.");
            return;
        }

        setIsLoading(true);
        try {
            const payload = {
                description: formData.description,
                translations: formData.translations.map(({ lang, value, _id }) =>
                    _id ? { lang, value, _id } : { lang, value }
                )
            };

            let result;
            if (isEdit) {
                result = await updateWordApi(selectedWord._id, payload);
            } else {
                result = await createWordApi(payload);
            }

            onSave?.(result);
            onClose?.();
        } catch (err) {
            console.error(err);
            alert(`Error ${isEdit ? "updating" : "creating"} item.`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm
            bg-[rgb(var(--overlay-bg-rgb)/10)] text-[rgb(var(--text-base)/60)]
        ">

            <div className="relative bg-gradient-to-br from-[rgb(var(--bg-primary-to)/40)] to-[rgb(var(--bg-primary-from)/40)] rounded-lg w-full max-w-lg p-6 shadow-2xl border border-[rgb(var(--accent-base)/30)]">
                <h2 className="text-xl font-bold mb-4 text-[rgb(var(--accent-text))]">
                    {isEdit ? "Edit Word" : "Create Word"}
                </h2>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm">Description (meaning / note)</label>
                        <input
                            name="description"
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            className="bg-[rgb(var(--bg-primary-to)/30)] border border-[rgb(var(--accent-base)/30)] rounded-md px-3 py-2"
                            placeholder="e.g. Greeting, Animal, Food..."
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm">Translations</label>

                        <div className="flex flex-col gap-2">
                            {formData.translations.map((t, idx) => (
                                <div key={t._id ?? idx} className="flex gap-2 items-center">
                                    <input
                                        value={t.lang}
                                        onChange={(e) => updateTranslation(idx, "lang", e.target.value)}
                                        placeholder="lang (en, vi, jp...)"
                                        className="w-28 bg-[rgb(var(--bg-primary-to)/30)] border border-[rgb(var(--accent-base)/30)] rounded-md px-2 py-1"
                                    />

                                    <input
                                        value={t.value}
                                        onChange={(e) => updateTranslation(idx, "value", e.target.value)}
                                        placeholder="Word"
                                        className="flex-1 bg-[rgb(var(--bg-primary-to)/30)] border border-[rgb(var(--accent-base)/30)] rounded-md px-2 py-1"
                                    />

                                    <Button
                                        type="button"
                                        onClick={() => removeTranslation(idx)}
                                        className="px-2 py-1 rounded-md text-sm bg-[rgb(var(--color-status-red)/10)] hover:bg-[rgb(var(--color-status-red)/20)]"
                                        text="✕"
                                        title="Remove"
                                    />
                                </div>
                            ))}
                        </div>

                        <div>
                            <Button
                                type="button"
                                onClick={addTranslation}
                                className="mt-2 inline-block text-sm px-3 py-1 rounded-md bg-[rgb(var(--accent-base)/20)] hover:bg-[rgb(var(--accent-base)/30)] text-white"
                                text="+ Add language"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        {isEdit}

                        <Button
                            type="button"
                            onClick={onClose}
                            className="bg-red-500 hover:bg-red-500/40 text-white hover:text-red-100 border border-red-500/50
                            px-4 py-2 rounded-md
                            transition-all duration-200 disabled:opacity-50 font-medium"
                            text="Cancel"

                        />
                        <Button
                            type="submit"
                            text={isEdit ? "Update" : "Create"}
                            className="bg-green-500 hover:bg-green-500/30 text-white font-medium hover:text-green-200 border border-green-500/30
                            px-4 py-2 rounded-md
                            transition-all duration-200 disabled:opacity-50"
                            disabled={isLoading}
                        />
                    </div>
                </form>

                <Button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-[rgb(var(--accent-text-light)/60)] hover:text-[rgb(var(--accent-text))] font-bold text-lg"
                    text="✕"
                    disabled={isLoading}
                />
            </div>

            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <LoadingSpinner />
                </div>
            )}
        </div>
    );
}
