export default function Button({
                                   text = "Default label",
                                   onClick = () => {},
                                   className = ""
                               }) {

    return (
        <button
            onClick={onClick} // onClick={handleClick}
            className={`px-3 py-1 rounded ${className}`}
        >
            {text}
        </button>
    );
}
