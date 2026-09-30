import { useState, useMemo, useCallback } from "react";
import "./App.css";
import { buildTree, flattenTree, computeStats } from "./utils/treeUtils";
import Header from "./components/Header";
import Hero from "./components/Hero";
import SvgFamilyTree from "./components/SvgFamilyTree";
import NodeDetail from "./components/NodeDetail";
import TreeAnalysis from "./components/TreeAnalysis";
import Generations from "./components/Generations";
import MainBranch from "./components/MainBranch";
import Statistics from "./components/Statistics";
import Search from "./components/Search";
import Controls from "./components/Controls";
import Footer from "./components/Footer";
import type { TreeNode } from "./utils/treeUtils";

function App() {
  const root = useMemo(() => buildTree(), []);
  const allNodes = useMemo(() => flattenTree(root), [root]);
  const stats = useMemo(() => computeStats(root), [root]);

  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
  const [highlightedIds, setHighlightedIds] = useState<Set<string>>(new Set());
  const [showMainBranchHighlight, setShowMainBranchHighlight] = useState(true);
  const [showGenerationLabels, setShowGenerationLabels] = useState(true);

  const handleNodeClick = useCallback((node: TreeNode) => {
    setSelectedNode(node);
  }, []);

  const handleSearch = useCallback(
    (ids: string[]) => {
      setHighlightedIds(new Set(ids));
    },
    []
  );

  const handleToggleMainBranch = useCallback(() => {
    setShowMainBranchHighlight((prev) => !prev);
  }, []);

  const handleToggleGenerations = useCallback(() => {
    setShowGenerationLabels((prev) => !prev);
  }, []);

  const handleReset = useCallback(() => {
    setHighlightedIds(new Set());
    setShowMainBranchHighlight(true);
    setShowGenerationLabels(true);
    setSelectedNode(null);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />

        {/* Search & Controls */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <Search allNodes={allNodes} onSearch={handleSearch} />
            <Controls
              showMainBranch={showMainBranchHighlight}
              showGenerations={showGenerationLabels}
              onToggleMainBranch={handleToggleMainBranch}
              onToggleGenerations={handleToggleGenerations}
              onReset={handleReset}
            />
          </div>
        </section>

        {/* Interactive Family Tree */}
        <section id="tree" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-white">
            Tree Data Structure Visualization
          </h2>
          <p className="text-center text-surface-400 mb-8">
            Click on any node to view its mathematical properties
          </p>
          <SvgFamilyTree
            root={root}
            onNodeClick={handleNodeClick}
            highlightedIds={highlightedIds}
            showMainBranch={showMainBranchHighlight}
            showGenerations={showGenerationLabels}
          />
        </section>

        {/* My Path */}
        <MainBranch />

        {/* Tree Analysis (Mathematics) */}
        <TreeAnalysis root={root} stats={stats} />

        {/* Generations */}
        <Generations root={root} />

        {/* Statistics */}
        <Statistics stats={stats} />

        {/* Footer */}
        <Footer />
      </main>

      {/* Node Detail Modal */}
      {selectedNode && (
        <NodeDetail
          node={selectedNode}
          allNodes={allNodes}
          onClose={() => setSelectedNode(null)}
        />
      )}
    </div>
  );
}

export default App;
