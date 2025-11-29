export default function Header() {
    return (
        <header className="bg-gradient-to-r from-green-600/50 to-green-800/40 border-b border-green-500/30 backdrop-blur-md sticky top-0 z-40">
            <div className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500/40 to-green-600/30 border border-green-500/60 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-300">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-green-300">TaskBoard</h1>
                </div>
                <div className="text-green-300/70 text-sm">Welcome back!</div>
            </div>
        </header>
    );
}