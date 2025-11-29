import TaskList from "../components/organisms/TaskList.jsx";

export default function TaskBoard({ onEditRequested, tasks ,onDeleteRequest, className}) {
    return (
        <div className={`${className} flex gap-4 p-4 bg-gradient-to-br from-green-950/30 via-green-900/20 to-green-950/30`} >
            <div className="flex flex-col flex-1 min-h-0 max-w-1/3 custom-scrollbar rounded-lg bg-gradient-to-br from-green-900/20 to-green-950/10 border border-green-500/20 p-4">
                <TaskList
                    status="todo"
                    title="To Do"
                    tasks={tasks?.filter((t) => t.status === "todo")}
                    onEditRequested={onEditRequested}
                    onDeleteRequest={onDeleteRequest}
                />
            </div>

            <div className="flex flex-col flex-1 min-h-0 max-w-1/3 custom-scrollbar rounded-lg bg-gradient-to-br from-green-900/20 to-green-950/10 border border-green-500/20 p-4">
                <TaskList
                    status="in_progress"
                    title="In Progress"
                    tasks={tasks?.filter((t) => t.status === "in_progress")}
                    onEditRequested={onEditRequested}
                    onDeleteRequest={onDeleteRequest}

                />
            </div>

            <div className="flex flex-col flex-1 min-h-0 max-w-1/3 custom-scrollbar rounded-lg bg-gradient-to-br from-green-900/20 to-green-950/10 border border-green-500/20 p-4">
                <TaskList
                    status="done"
                    title="Done"
                    tasks={tasks?.filter((t) => t.status === "done")}
                    onEditRequested={onEditRequested}
                    onDeleteRequest={onDeleteRequest}

                />
            </div>
        </div>

    );
}

