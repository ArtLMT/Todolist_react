export default function Footer() {
    return (
        <footer className=" bg-gradient-to-r from-green-800/50 to-green-700/40 border-t border-green-500/30 backdrop-blur-md">
            <div className="px-6 py-4 flex items-center justify-between text-sm">
                {/* Tăng nhẹ độ sáng của chữ */}
                <p className="text-green-300/70">© 2025 TaskBoard. All rights reserved.</p>
                <div className="flex gap-4">
                    {/* Tăng nhẹ độ sáng của link */}
                    <a href="#" className="text-green-400/80 hover:text-green-300 transition-colors">Privacy</a>
                    <a href="#" className="text-green-400/80 hover:text-green-300 transition-colors">Terms</a>
                    <a href="#" className="text-green-400/80 hover:text-green-300 transition-colors">Support</a>
                </div>
            </div>
        </footer>
    );
}