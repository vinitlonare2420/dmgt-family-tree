import { useState, useCallback } from "react";
import type { TreeNode } from "../utils/treeUtils";
import { searchNodes } from "../utils/treeUtils";

interface SearchProps {
  allNodes: TreeNode[];
  onSearch: (ids: string[]) => void;
}

export default function Search({ allNodes, onSearch }: SearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<TreeNode[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = useCallback(
    (value: string) => {
      setQuery(value);
      if (value.trim()) {
        const found = searchNodes(value, allNodes);
        setResults(found);
        setShowResults(true);
        onSearch(found.map((n) => n.id));
      } else {
        setResults([]);
        setShowResults(false);
        onSearch([]);
      }
    },
    [allNodes, onSearch]
  );

  const handleClear = useCallback(() => {
    setQuery("");
    setResults([]);
    setShowResults(false);
    onSearch([]);
  }, [onSearch]);

  return (
    <div className="relative flex-1 max-w-md">
      <div className="relative">
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-surface-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search family members..."
          className="w-full pl-11 pr-10 py-2.5 rounded-xl bg-surface-800/70 border border-surface-600/40 text-surface-200 placeholder:text-surface-500 focus:outline-none focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 transition-all text-sm"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-md hover:bg-surface-700 text-surface-400 hover:text-surface-200 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Search results dropdown */}
      {showResults && query.trim() && (
        <div className="absolute left-0 right-0 mt-2 p-2 rounded-xl bg-surface-800 border border-surface-600/50 shadow-xl z-20 max-h-60 overflow-y-auto">
          {results.length === 0 ? (
            <p className="text-sm text-surface-400 px-3 py-2">No results found</p>
          ) : (
            results.map((node) => (
              <div
                key={node.id}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface-700/50 text-sm text-surface-200"
              >
                <span className="w-2 h-2 rounded-full bg-accent-400" />
                <span className="font-medium">{node.name}</span>
                <span className="text-surface-500 text-xs ml-auto">
                  Level {node.level}
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
