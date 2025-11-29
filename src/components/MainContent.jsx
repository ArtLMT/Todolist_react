import React, { useState, useEffect, useRef } from "react";
import Button from "./atoms/Button.jsx";

export default function MainContent() {
    const [tasks, setTasks] = useState([]);        // (1) Store list of tasks
    const [inputValue, setInputValue] = useState(""); // (2) Store text user types

    const inputRef = useRef(null);                  // (3) Access the input element

    // (4) Load tasks from localStorage when page starts
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("tasks")) || [];
        setTasks(saved);
    }, []);

    // (5) Save tasks to localStorage every time tasks change
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (!inputValue.trim()) return;

        const newTask = { id: Date.now(), title: inputValue };
        setTasks([...tasks, newTask]);    // update state

        setInputValue("");         // reset input
        inputRef.current.focus();         // focus input again
    };

    return (
        <div className="p-4">
            <input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="border rounded px-2 py-1"
                placeholder="Add a new task..."
            />

            <Button
                text={"Add task"}
                onClick={addTask}
                className="ml-2 px-3 py-1 bg-red-50 text-white rounded"
            />

            <ul className="mt-4 bg-gray-50 p-4 rounded text-gray-700">
                {tasks.map((t) => (
                    <li key={t.id} className="py-1 border-b">
                        {t.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}

