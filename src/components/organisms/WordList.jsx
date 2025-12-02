import WordCard from "./WordCard.jsx";

export default function WordList({ title, words, onEditRequested, onDeleteRequest }) {
    return (
        <div className="flex flex-col flex-1 min-h-0">

            <h2 className="text-lg font-semibold text-[rgb(var(--accent-text))] mb-4 px-2">
                {title}
            </h2>

            <div className="flex flex-col gap-3 flex-1 min-h-0 custom-scrollbar
                overflow-y-auto divide-y divide-[rgba(var(--text-base)/10]">

                {words?.length > 0 ? (
                    words.map((word) => (
                        <WordCard
                            key={word._id}
                            word={word}
                            onEditRequested={onEditRequested}
                            onDeleteRequest={onDeleteRequest}
                        />
                    ))
                ) : (
                    <div className="flex items-center justify-center h-32 text-[rgb(var(--accent-text)/50)] text-sm">
                        No words found
                    </div>
                )}
            </div>
        </div>
    );
}
