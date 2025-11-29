// export default function TaskCard({ task, onEditRequested }) {
//     return (
//         <div
//             className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-lg p-4 shadow-sm transition-all duration-200 cursor-pointer hover:shadow-md hover:-translate-y-[2px] active:translate-y-[0px] flex flex-col gap-2"
//             // className="task"
//             onClick={() => onEditRequested?.(task)}
//         >
//             <h3 className="text-base font-semibold text-gray-800 leading-tight line-clamp-1">
//                 {task.title}
//             </h3>
//
//             {task.description && (
//                 <p className="text-sm text-gray-500 line-clamp-2">
//                     {task.description}
//                 </p>
//             )}
//
//             <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
//         <span className="flex items-center gap-1">
//           <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="w-3.5 h-3.5 text-gray-400"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth="2"
//           >
//             <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M12 8v4l3 3m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//             />
//           </svg>
//
//             {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}
//         </span>
//
//                 <span
//                     className={[
//                         "px-2 py-0.5 rounded-full text-xs font-medium",
//                         task.status === "todo" && "bg-yellow-100 text-yellow-700",
//                         task.status === "in_progress" && "bg-orange-100 text-orange-700",
//                         task.status === "done" && "bg-green-100 text-green-700",
//                     ]
//                         .filter(Boolean)
//                         .join(" ")}
//                 >
//           {task.status.replace("_", " ").toUpperCase()}
//         </span>
//             </div>
//         </div>
//     );
// }
import {deleteTaskApi} from '../../api/taskApi.js'
import { useState } from 'react';

export default function TaskCard({ task, onEditRequested ,onDeleteRequest }) {

    const handleEditToggle = () => {
        onEditRequested({...task, completed: !task.completed});
    }
    // e.stopPropagation();

    const deleteClicked = (task) => {
        console.log('delete clicked');
        onDeleteRequest(task);
    }

    return (
        <div
            className="group flex gap-3 items-start rounded-lg p-3 transition-all duration-200 cursor-pointer
            bg-gradient-to-br from-green-950/20 to-green-900/10 border border-green-500/20 hover:border-green-500/40 hover:shadow-lg hover:shadow-green-500/10 hover:-translate-y-1"
        >
            <div className="flex-1 min-w-0">
                <h3 className={`text-base font-semibold leading-tight transition-colors duration-200 line-clamp-1 ${
                    task.completed
                        ? 'text-green-300/60 line-through'
                        : 'text-green-100'
                }`}>
                    {task.title}
                </h3>

                {task.description && (
                    <p className="text-sm text-green-200/60 line-clamp-1 mt-1">
                        {task.description}
                    </p>
                )}

                <div className="flex flex-wrap gap-3 items-center mt-2 text-xs">
                    <span className="flex items-center gap-1 text-green-300/70">
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
                    <span className={`px-2.5 py-1 rounded-full font-medium transition-colors duration-200 ${
                        task.status === "todo" && "bg-green-500/20 text-green-300 border border-green-500/30"
                    } ${
                        task.status === "in_progress" && "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    } ${
                        task.status === "done" && "bg-lime-500/20 text-lime-300 border border-lime-500/30"
                    }`}>
                        {task.status.replace("_", " ").toUpperCase()}
                    </span>
                </div>
            </div>

            <div className="flex gap-2 items-center flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button className="grid place-items-center w-8 h-8 rounded-md
                bg-green-500/10 hover:bg-green-500/20 text-green-400 hover:text-green-300
                transition-all duration-200 hover:-translate-y-0.5"
                        onClick={handleEditToggle}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M5 13l4 4L19 7" />
                    </svg>
                </button>
                <button className="grid place-items-center w-8 h-8 rounded-md
                bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300
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

