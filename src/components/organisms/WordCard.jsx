export default function WordCard({ word, onEditRequested, onDeleteRequest }) {
    const primaryWord = word.translations?.[0]?.value ?? "(No word)";
    const description = word.description;

    return (
        <div
            className="
        p-4 rounded-xl border
        bg-[rgb(var(--bg-card-from))]
        border-[rgb(var(--accent-base)/30)]
        shadow-sm
        hover:shadow-md hover:-translate-y-1
        transition-all duration-300
        cursor-pointer
    "
            onClick={() => onEditRequested?.(word)}
        >
            <h3 className="text-xl font-bold text-[rgb(var(--text-base))]">
                {primaryWord}
            </h3>

            {description && (
                <p className="text-sm text-[rgb(var(--text-base)/70)] mt-1">
                    {description}
                </p>
            )}

            <div className="mt-3 space-y-1">
                {word.translations?.map((tr) => (
                    <div key={tr._id} className="text-sm text-[rgb(var(--text-base))]">
                <span className="font-semibold text-[rgb(var(--text-base)/80)]">
                    {tr.lang}:
                </span>{" "}
                        {tr.value}
                    </div>
                ))}
            </div>

            <div className="flex gap-3 mt-4">
                <button
                    onClick={(e) => { e.stopPropagation(); onEditRequested(word); }}
                    className="
                px-3 py-1.5 rounded-lg text-sm
                bg-[rgba(var(--accent-base)/10)] text-white
                border border-[rgba(var(--accent-base)/30)] hover:bg-[rgba(var(--accent-base)/15)]
                transition-all
            "
                >
                    Edit
                </button>

                <button
                    onClick={(e) => { e.stopPropagation(); onDeleteRequest(word); }}
                    className="
                px-3 py-1.5 rounded-lg text-sm
                bg-[rgba(var(--color-status-red)/10)]
                text-white
                border border-[rgba(var(--color-status-red)/30)]
                hover:bg-[rgba(var(--color-status-red)/15)]
                transition-all"
                >
                    Delete
                </button>
            </div>
        </div>

    );
}
