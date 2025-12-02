import WordList from "../components/organisms/WordList.jsx";

export default function WordBoard({ onEditRequested, words ,onDeleteRequest, className}) {
    return (
        <div className={`${className} flex p-4`}>
            <div className="flex flex-col flex-1 min-h-0 custom-scrollbar rounded-lg
                        bg-[rgb(var(--bg-primary-board))]
 p-4">

                <WordList
                    title="Your Words"
                    className="text-[rgb(var(--text-base)/60)]"
                    words={words}
                    onEditRequested={onEditRequested}
                    onDeleteRequest={onDeleteRequest}
                />
            </div>
        </div>

    );
}