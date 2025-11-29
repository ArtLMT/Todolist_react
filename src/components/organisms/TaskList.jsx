import TaskCard from "./TaskCard";

export default function TaskList({ status, title, tasks, onEditRequested, onDeleteRequest }) {
    return (
        <div className="flex flex-col flex-1 min-h-0">
            <h2 className="text-lg font-semibold text-green-300 mb-4 px-2">
                {title}
            </h2>

            <div className="flex flex-col gap-3 flex-1 min-h-0 overflow-y-auto custom-scrollbar">
                {tasks?.length > 0 ? (
                    tasks.map((task) => (
                        <TaskCard
                            key={task._id}
                            task={task}
                            onEditRequested={onEditRequested}
                            onDeleteRequest={onDeleteRequest}
                        />
                    ))
                ) : (
                    <div className="flex items-center justify-center h-32 text-green-300/50 text-sm">
                        No tasks
                    </div>
                )}
            </div>
        </div>
    );
}

