export default function Button({
                                   text = "Default label",
                                   onClick = () => {},
                                   className = "",
                                       ...props
                               }) {

    return (
        <button
            {...props}
            onClick={onClick}
            className={`px-3 py-1 rounded ${className}`}
        >
            {text}
        </button>
    );
}
