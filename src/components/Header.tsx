export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-surface-900/80 border-b border-surface-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
            <span className="text-lg font-semibold text-white">
              Family Tree &mdash; Tree Data Structure
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#tree" className="text-sm text-surface-300 hover:text-white transition-colors">
              Tree
            </a>
            <a href="#path" className="text-sm text-surface-300 hover:text-white transition-colors">
              Path
            </a>
            <a href="#analysis" className="text-sm text-surface-300 hover:text-white transition-colors">
              Analysis
            </a>
            <a href="#generations" className="text-sm text-surface-300 hover:text-white transition-colors">
              Generations
            </a>
            <a href="#stats" className="text-sm text-surface-300 hover:text-white transition-colors">
              Statistics
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2.5 px-3 py-1 rounded-lg bg-surface-800/70 border border-surface-700/60 text-xs">
              <span className="text-surface-400 font-medium">Name:</span>
              <span className="text-surface-100 font-semibold">Vinit Lonare</span>
              <span className="text-surface-600">|</span>
              <span className="text-surface-400 font-medium">USN:</span>
              <span className="font-mono text-primary-300 font-semibold">CS25058</span>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-primary-500/20 text-primary-300 border border-primary-500/30">
              TAE-II DMGT
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
