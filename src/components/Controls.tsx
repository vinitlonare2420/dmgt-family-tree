interface ControlsProps {
  showMainBranch: boolean;
  showGenerations: boolean;
  onToggleMainBranch: () => void;
  onToggleGenerations: () => void;
  onReset: () => void;
}

export default function Controls({
  showMainBranch,
  showGenerations,
  onToggleMainBranch,
  onToggleGenerations,
  onReset,
}: ControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={onToggleMainBranch}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
          showMainBranch
            ? "bg-primary-500/20 text-primary-300 border border-primary-500/40"
            : "bg-surface-800/60 text-surface-300 border border-surface-600/40 hover:bg-surface-700/60"
        }`}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        {showMainBranch ? "Main Branch On" : "Highlight My Branch"}
      </button>

      <button
        onClick={onToggleGenerations}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
          showGenerations
            ? "bg-accent-500/20 text-accent-300 border border-accent-500/40"
            : "bg-surface-800/60 text-surface-300 border border-surface-600/40 hover:bg-surface-700/60"
        }`}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        {showGenerations ? "Generations On" : "Show Generations"}
      </button>

      <button
        onClick={onReset}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-surface-800/60 text-surface-300 border border-surface-600/40 hover:bg-surface-700/60 transition-all"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182"
          />
        </svg>
        Reset
      </button>
    </div>
  );
}
