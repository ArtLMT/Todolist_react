import TaskList from "../components/organisms/TaskList.jsx";

export default function TaskBoard({ onEditRequested, tasks ,onDeleteRequest, className}) {
    return (
        <div className={`${className} flex gap-4 p-4`} >

            <div className="flex flex-col flex-1 min-h-0 max-w-1/3 custom-scrollbar rounded-lg
            /* Thay thế nền cột */
            bg-[rgb(var(--overlay-bg))]
            p-4">
                <TaskList
                    status="todo"
                    title="To Do"
                    tasks={tasks?.filter((t) => t.status === "todo")}
                    onEditRequested={onEditRequested}
                    onDeleteRequest={onDeleteRequest}
                />
            </div>


            <div className="flex flex-col flex-1 min-h-0 max-w-1/3 custom-scrollbar rounded-lg
            bg-[rgb(var(--overlay-bg))]
            p-4">
                <TaskList
                    status="in_progress"
                    title="In Progress"
                    tasks={tasks?.filter((t) => t.status === "in_progress")}
                    onEditRequested={onEditRequested}
                    onDeleteRequest={onDeleteRequest}

                />
            </div>

            <div className="flex flex-col flex-1 min-h-0 max-w-1/3 custom-scrollbar rounded-lg
            bg-[rgb(var(--overlay-bg))]
            p-4">
                <TaskList
                    status="done"
                    title={<span className="text-red-500">Done</span>}
                    tasks={tasks?.filter((t) => t.status === "done")}
                    onEditRequested={onEditRequested}
                    onDeleteRequest={onDeleteRequest}

                />
            </div>
        </div>

    );
}