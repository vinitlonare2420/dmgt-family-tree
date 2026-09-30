import type { TreeNode, TreeStats } from "../utils/treeUtils";
import { flattenTree, getNodeType, isOnMainBranch } from "../utils/treeUtils";

interface TreeAnalysisProps {
  root: TreeNode;
  stats: TreeStats;
}

export default function TreeAnalysis({ root, stats }: TreeAnalysisProps) {
  const allNodes = flattenTree(root);
  const leaves = allNodes.filter((n) => n.children.length === 0);
  const internals = allNodes.filter((n) => n.children.length > 0);

  // Siblings: group by parentId
  const siblingGroups: { parent: string; siblings: string[] }[] = [];
  const parentMap = new Map<string, TreeNode[]>();
  for (const n of allNodes) {
    if (n.parentId) {
      if (!parentMap.has(n.parentId)) parentMap.set(n.parentId, []);
      parentMap.get(n.parentId)!.push(n);
    }
  }
  for (const [parentId, children] of parentMap.entries()) {
    if (children.length > 1) {
      const parentNode = allNodes.find((n) => n.id === parentId);
      siblingGroups.push({
        parent: parentNode?.name || parentId,
        siblings: children.map((c) => c.name),
      });
    }
  }

  return (
    <section id="analysis" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Tree Analysis
        </h2>
        <p className="text-surface-400">
          Mathematical properties computed from the tree data structure
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Root Node */}
        <div className="rounded-2xl border bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/25 p-6">
          <h3 className="text-lg font-bold text-blue-300 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            Root Node
          </h3>
          <p className="text-surface-300 text-sm mb-2">
            The topmost node with no parent. Every tree has exactly one root.
          </p>
          <div className="bg-surface-900/50 rounded-xl px-4 py-3 font-mono text-sm text-blue-200">
            {root.name} (Level 0)
          </div>
        </div>

        {/* Height */}
        <div className="rounded-2xl border bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/25 p-6">
          <h3 className="text-lg font-bold text-purple-300 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-400" />
            Height of Tree
          </h3>
          <p className="text-surface-300 text-sm mb-2">
            The length of the longest root-to-leaf path, counted in edges.
          </p>
          <div className="bg-surface-900/50 rounded-xl px-4 py-3">
            <span className="font-mono text-2xl text-purple-200 font-bold">{stats.treeHeight}</span>
            <p className="text-xs text-surface-400 mt-1">
              Path: Ganuji → Mahenjaji → Gulabrao → Namdeo → Vinit = {stats.treeHeight} edges
            </p>
          </div>
        </div>

        {/* Levels */}
        <div className="rounded-2xl border bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border-cyan-500/25 p-6">
          <h3 className="text-lg font-bold text-cyan-300 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            Levels
          </h3>
          <p className="text-surface-300 text-sm mb-2">
            Distance from the root. Root = Level 0.
          </p>
          <div className="bg-surface-900/50 rounded-xl px-4 py-3 space-y-1">
            {[0, 1, 2, 3, 4].map((level) => {
              const nodesAtLevel = allNodes.filter((n) => n.level === level);
              return (
                <div key={level} className="flex items-start gap-2 text-sm">
                  <span className="font-mono text-cyan-300 w-16 shrink-0">Level {level}:</span>
                  <span className="text-surface-300">
                    {nodesAtLevel.map((n) => n.name).join(", ")}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Degree of Internal Nodes */}
        <div className="rounded-2xl border bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-500/25 p-6">
          <h3 className="text-lg font-bold text-orange-300 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-400" />
            Degree of Internal Nodes
          </h3>
          <p className="text-surface-300 text-sm mb-2">
            The number of children each internal node has. Max degree = {stats.maxDegree}.
          </p>
          <div className="bg-surface-900/50 rounded-xl px-4 py-3 space-y-1">
            {internals.map((n) => (
              <div key={n.id} className="flex items-center justify-between text-sm">
                <span className={`${isOnMainBranch(n.id) ? "text-amber-300" : "text-surface-300"}`}>
                  {n.name}
                </span>
                <span className="font-mono text-orange-300">
                  degree({n.children.length})
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Leaf Nodes */}
        <div className="rounded-2xl border bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/25 p-6">
          <h3 className="text-lg font-bold text-green-300 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            Leaf Nodes <span className="text-sm font-normal text-surface-400">(degree = 0)</span>
          </h3>
          <p className="text-surface-300 text-sm mb-2">
            Nodes with no children. Count: {stats.leafNodes}
          </p>
          <div className="bg-surface-900/50 rounded-xl px-4 py-3 flex flex-wrap gap-2">
            {leaves.map((n) => (
              <span
                key={n.id}
                className={`text-xs px-2.5 py-1 rounded-lg border ${
                  n.isMe
                    ? "bg-gold-500/15 text-gold-300 border-gold-500/30"
                    : "bg-surface-800/60 text-surface-300 border-surface-700/30"
                }`}
              >
                {n.name}{n.isMe ? " (ME)" : ""}
              </span>
            ))}
          </div>
        </div>

        {/* Internal Nodes */}
        <div className="rounded-2xl border bg-gradient-to-br from-rose-500/10 to-rose-600/5 border-rose-500/25 p-6">
          <h3 className="text-lg font-bold text-rose-300 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-400" />
            Internal Nodes <span className="text-sm font-normal text-surface-400">(degree &gt; 0)</span>
          </h3>
          <p className="text-surface-300 text-sm mb-2">
            Nodes with at least one child. Count: {stats.internalNodes}
          </p>
          <div className="bg-surface-900/50 rounded-xl px-4 py-3 flex flex-wrap gap-2">
            {internals.map((n) => (
              <span
                key={n.id}
                className={`text-xs px-2.5 py-1 rounded-lg border ${
                  isOnMainBranch(n.id)
                    ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                    : "bg-surface-800/60 text-surface-300 border-surface-700/30"
                }`}
              >
                {n.name} ({getNodeType(n)}, degree {n.children.length})
              </span>
            ))}
          </div>
        </div>

        {/* Siblings */}
        <div className="rounded-2xl border bg-gradient-to-br from-indigo-500/10 to-indigo-600/5 border-indigo-500/25 p-6">
          <h3 className="text-lg font-bold text-indigo-300 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-400" />
            Sibling Groups
          </h3>
          <p className="text-surface-300 text-sm mb-2">
            Nodes sharing the same parent are siblings.
          </p>
          <div className="bg-surface-900/50 rounded-xl px-4 py-3 space-y-2">
            {siblingGroups.map((group) => (
              <div key={group.parent} className="text-sm">
                <span className="text-surface-400">Parent: </span>
                <span className="text-indigo-300 font-medium">{group.parent}</span>
                <div className="text-surface-300 ml-4">
                  Siblings: {group.siblings.join(", ")}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Path */}
        <div className="rounded-2xl border bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-amber-500/25 p-6">
          <h3 className="text-lg font-bold text-amber-300 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            My Path (Root to ME)
          </h3>
          <p className="text-surface-300 text-sm mb-2">
            The unique path from the root to Vinit Lonare. Length = {stats.myLevel} edges.
          </p>
          <div className="bg-surface-900/50 rounded-xl px-4 py-3">
            <div className="flex items-center gap-2 font-mono text-sm text-amber-200">
              <span>Ganuji</span>
              <span className="text-amber-400">→</span>
              <span>Mahenjaji</span>
              <span className="text-amber-400">→</span>
              <span>Gulabrao</span>
              <span className="text-amber-400">→</span>
              <span>Namdeo</span>
              <span className="text-amber-400">→</span>
              <span className="text-gold-300 font-bold">Vinit</span>
            </div>
            <div className="mt-2 text-xs text-surface-400 space-y-0.5">
              <p>Edge 1: Ganuji → Mahenjaji</p>
              <p>Edge 2: Mahenjaji → Gulabrao</p>
              <p>Edge 3: Gulabrao → Namdeo</p>
              <p>Edge 4: Namdeo → Vinit</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
