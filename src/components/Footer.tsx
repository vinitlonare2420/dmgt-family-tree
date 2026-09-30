export default function Footer() {
  return (
    <footer className="border-t border-surface-700/40 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
            <span className="text-sm text-surface-300 font-medium">
              TAE-II | Tree Data Structure | Mathematics
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs text-surface-500">
            <span>Built with React + TypeScript + Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
