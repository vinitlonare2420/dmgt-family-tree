export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-accent-500/10 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-800/80 border border-surface-700/60 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-mono font-semibold tracking-wide text-primary-300">
              TAE-II DMGT
            </span>
          </div>

          <div className="inline-flex items-center gap-4 px-4 py-1.5 rounded-full bg-surface-800/80 border border-primary-500/30 shadow-lg shadow-primary-500/5">
            <div className="flex items-center gap-1.5">
              <span className="text-xs uppercase tracking-wider text-surface-400 font-medium">Name:</span>
              <span className="text-sm font-semibold text-white">Vinit Lonare</span>
            </div>
            <div className="w-px h-3.5 bg-surface-700/80" />
            <div className="flex items-center gap-1.5">
              <span className="text-xs uppercase tracking-wider text-surface-400 font-medium">USN:</span>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 border border-primary-500/30">
                CS25058
              </span>
            </div>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 tracking-tight">
          Family{" "}
          <span className="bg-gradient-to-r from-primary-400 via-accent-400 to-primary-400 bg-clip-text text-transparent">
            Tree
          </span>
        </h1>

        <p className="text-lg md:text-xl text-surface-300 max-w-2xl mx-auto mb-4">
          Family Tree &mdash; Tree Data Structure
        </p>
        <p className="text-sm text-surface-400 max-w-xl mx-auto mb-8">
          Demonstrating levels, generations, degree, height, parent-child relationships, 
          sibling nodes, leaf nodes, internal nodes, and paths using a real family tree
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="#tree"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-medium hover:from-primary-500 hover:to-primary-400 transition-all shadow-lg shadow-primary-500/25"
          >
            View Tree
          </a>
          <a
            href="#analysis"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-800/60 text-surface-200 font-medium border border-surface-700/50 hover:bg-surface-700/60 transition-all"
          >
            Tree Analysis
          </a>
        </div>
      </div>
    </section>
  );
}
