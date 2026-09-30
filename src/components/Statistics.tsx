import type { TreeStats } from "../utils/treeUtils";

interface StatisticsProps {
  stats: TreeStats;
}

export default function Statistics({ stats }: StatisticsProps) {
  const items = [
    {
      label: "Total Nodes",
      value: stats.totalNodes,
      description: "Family members in the tree",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
      color: "text-blue-400",
      bg: "bg-blue-500/15 border-blue-500/30",
    },
    {
      label: "Leaf Nodes",
      value: stats.leafNodes,
      description: "Members with no children",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
      color: "text-emerald-400",
      bg: "bg-emerald-500/15 border-emerald-500/30",
    },
    {
      label: "Internal Nodes",
      value: stats.internalNodes,
      description: "Members with children",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
        </svg>
      ),
      color: "text-orange-400",
      bg: "bg-orange-500/15 border-orange-500/30",
    },
    {
      label: "Tree Height",
      value: stats.treeHeight,
      description: "Longest root-to-leaf path (edges)",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12" />
        </svg>
      ),
      color: "text-purple-400",
      bg: "bg-purple-500/15 border-purple-500/30",
    },
    {
      label: "Generations",
      value: stats.generations,
      description: "Total depth levels (Level 0 to Level " + (stats.generations - 1) + ")",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      ),
      color: "text-cyan-400",
      bg: "bg-cyan-500/15 border-cyan-500/30",
    },
    {
      label: "Max Degree",
      value: stats.maxDegree,
      description: "Most children any node has",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
        </svg>
      ),
      color: "text-rose-400",
      bg: "bg-rose-500/15 border-rose-500/30",
    },
    {
      label: "My Level",
      value: stats.myLevel,
      description: "Vinit Lonare's level in the tree",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      ),
      color: "text-amber-400",
      bg: "bg-amber-500/15 border-amber-500/30",
    },
  ];

  return (
    <section id="stats" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Family Statistics
        </h2>
        <p className="text-surface-400">
          Auto-calculated metrics from the family tree data structure
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.label}
            className={`rounded-2xl border ${item.bg} p-5 text-center transition-all duration-300 hover:scale-[1.03]`}
          >
            <div className={`flex justify-center mb-3 ${item.color}`}>
              {item.icon}
            </div>
            <div className={`text-3xl font-bold ${item.color} mb-1`}>
              {item.value}
            </div>
            <div className="text-sm font-semibold text-white mb-1">
              {item.label}
            </div>
            <div className="text-xs text-surface-400">{item.description}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
