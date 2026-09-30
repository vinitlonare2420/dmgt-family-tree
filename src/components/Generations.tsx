import type { TreeNode } from "../utils/treeUtils";
import { getNodesByLevel, getGenerationLabel, isOnMainBranch } from "../utils/treeUtils";

interface GenerationsProps {
  root: TreeNode;
}

export default function Generations({ root }: GenerationsProps) {
  const nodesByLevel = getNodesByLevel(root);
  const levels = Array.from(nodesByLevel.keys()).sort((a, b) => a - b);

  const levelColors = [
    { bg: "bg-blue-500/15", border: "border-blue-500/30", dot: "bg-blue-400", text: "text-blue-300", badge: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
    { bg: "bg-purple-500/15", border: "border-purple-500/30", dot: "bg-purple-400", text: "text-purple-300", badge: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
    { bg: "bg-emerald-500/15", border: "border-emerald-500/30", dot: "bg-emerald-400", text: "text-emerald-300", badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
    { bg: "bg-amber-500/15", border: "border-amber-500/30", dot: "bg-amber-400", text: "text-amber-300", badge: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
    { bg: "bg-rose-500/15", border: "border-rose-500/30", dot: "bg-rose-400", text: "text-rose-300", badge: "bg-rose-500/20 text-rose-300 border-rose-500/30" },
  ];

  return (
    <section id="generations" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Family Generations
        </h2>
        <p className="text-surface-400">
          Each level of the tree represents a generation
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {levels.map((level) => {
          const nodes = nodesByLevel.get(level) || [];
          const colors = levelColors[level % levelColors.length];

          return (
            <div
              key={level}
              className={`rounded-2xl border ${colors.bg} ${colors.border} p-5 transition-all duration-300 hover:scale-[1.01]`}
            >
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <div className={`w-3 h-3 rounded-full ${colors.dot}`} />
                <h3 className={`text-lg font-bold ${colors.text}`}>
                  {getGenerationLabel(level)}
                </h3>
                <div className="flex items-center gap-2 ml-auto">
                  <span className={`text-xs font-mono px-2 py-0.5 rounded-md border ${colors.badge}`}>
                    Level {level}
                  </span>
                  <span className="text-xs text-surface-500">
                    {nodes.length} {nodes.length === 1 ? "member" : "members"}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {nodes.map((node) => {
                  const onMain = isOnMainBranch(node.id);
                  return (
                    <span
                      key={node.id}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium ${
                        node.isMe
                          ? "bg-gold-500/20 text-gold-300 border border-gold-500/30"
                          : onMain
                          ? "bg-primary-500/15 text-primary-300 border border-primary-500/25"
                          : "bg-surface-800/60 text-surface-200 border border-surface-700/30"
                      }`}
                    >
                      {node.name}
                      {node.isMe && (
                        <span className="text-[10px] font-bold uppercase bg-gold-500/30 px-1 py-0.5 rounded text-gold-200">
                          ME
                        </span>
                      )}
                      {onMain && !node.isMe && (
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
                      )}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
