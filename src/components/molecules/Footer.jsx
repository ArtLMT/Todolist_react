export default function Footer() {
    return (
        <footer className="
            /* Thay thế nền gradient */
            bg-gradient-to-br from-[rgb(var(--bg-primary-from)/20)] to-[rgb(var(--bg-primary-to)/10)]

            /* Thay thế viền */
            border-t border-[rgb(var(--accent-base)/20)]"
        >
            <div className="px-6 py-4 flex items-center justify-between text-sm">
                <p className="text-[rgb(var(--accent-text)/70)] text-center content-center"> Lê Minh Thành GCS230428 </p>
            </div>
        </footer>
    );
}