import TaskCard from "./TaskCard";

export default function TaskList({ status, title, tasks, onEditRequested, onDeleteRequest }) {
    return (
        <div className="flex flex-col flex-1 min-h-0">
            {/* Thay thế màu tiêu đề */}
            <h2 className="text-lg font-semibold text-[rgb(var(--accent-text))] mb-4 px-2">
                {title}
            </h2>

            <div className="flex flex-col gap-3 flex-1 min-h-0 custom-scrollbar
            overflow-y-auto divide-y divide-[var(--accent-base)]">
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
                    <div className="flex items-center justify-center h-32 text-[rgb(var(--accent-text)/50)] text-sm">
                        No tasks
                    </div>
                )}
            </div>
        </div>
    );
}