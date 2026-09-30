import { useRef, useLayoutEffect, useState as useStateReact } from "react";
import type { TreeNode } from "../utils/treeUtils";
import { isOnMainBranch, getGenerationLabel } from "../utils/treeUtils";

interface FamilyTreeProps {
  root: TreeNode;
  onNodeClick: (node: TreeNode) => void;
  highlightedIds: Set<string>;
  showMainBranch: boolean;
  showGenerations: boolean;
}

/*
 * ChildrenRow renders the horizontal connector bar + vertical drops + child subtrees.
 *
 * To highlight the horizontal segment from the parent's center to the main-branch
 * child, we measure actual DOM positions with refs and draw an overlay segment.
 */
function ChildrenRow({
  parent,
  onNodeClick,
  highlightedIds,
  showMainBranch,
  showGenerations,
}: {
  parent: TreeNode;
  onNodeClick: (node: TreeNode) => void;
  highlightedIds: Set<string>;
  showMainBranch: boolean;
  showGenerations: boolean;
}) {
  const parentOnMain = isOnMainBranch(parent.id);
  const rowRef = useRef<HTMLDivElement>(null);
  const childRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [hlSegment, setHlSegment] = useStateReact<{ left: number; width: number } | null>(null);

  // Find which child (if any) is on the main branch
  const mainChildIndex = parent.children.findIndex((c) => isOnMainBranch(c.id));
  const shouldHighlightHBar = showMainBranch && parentOnMain && mainChildIndex !== -1;

  // Measure positions after layout to draw the highlighted horizontal segment
  useLayoutEffect(() => {
    if (!shouldHighlightHBar || !rowRef.current) {
      setHlSegment(null);
      return;
    }

    const rowRect = rowRef.current.getBoundingClientRect();
    const rowCenter = rowRect.left + rowRect.width / 2;

    const mainChild = parent.children[mainChildIndex];
    const mainChildEl = childRefs.current.get(mainChild.id);
    if (!mainChildEl) {
      setHlSegment(null);
      return;
    }

    const childRect = mainChildEl.getBoundingClientRect();
    const childCenter = childRect.left + childRect.width / 2;

    // Segment from row center to child center, in row-relative coords
    const newLeft = Math.min(rowCenter, childCenter) - rowRect.left;
    const newWidth = Math.max(Math.abs(childCenter - rowCenter), 2);

    // Only update state if values actually changed to avoid infinite loops
    setHlSegment((prev) => {
      if (prev && Math.abs(prev.left - newLeft) < 1 && Math.abs(prev.width - newWidth) < 1) {
        return prev;
      }
      return { left: newLeft, width: newWidth };
    });
  }, [shouldHighlightHBar, mainChildIndex, parent.children, setHlSegment]);

  return (
    <div className="flex flex-col items-center mt-0">
      {/* VERTICAL CONNECTOR: parent card down to the horizontal bar */}
      {shouldHighlightHBar ? (
        <GlowingVLine height={32} />
      ) : (
        <div className="w-0.5 h-8 bg-surface-500/40" />
      )}

      {/* HORIZONTAL CONNECTOR BAR with optional highlighted segment */}
      {parent.children.length > 1 && (
        <div ref={rowRef} className="relative self-stretch" style={{ height: "2px" }}>
          {/* Normal bar — always full visibility */}
          <div className="absolute inset-0 mx-[30px] bg-surface-500/40 rounded-full" />

          {/* Highlighted segment overlay — only the part from center to main-branch child */}
          {shouldHighlightHBar && hlSegment && (
            <>
              {/* Glow layer */}
              <div
                className="absolute rounded-full bg-amber-400/20 blur-sm"
                style={{
                  left: `${hlSegment.left - 2}px`,
                  width: `${hlSegment.width + 4}px`,
                  top: "-2px",
                  height: "6px",
                }}
              />
              {/* Core highlighted bar */}
              <div
                className="absolute rounded-full bg-gradient-to-r from-amber-400 to-amber-500 shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                style={{
                  left: `${hlSegment.left}px`,
                  width: `${hlSegment.width}px`,
                  top: "-1px",
                  height: "4px",
                }}
              />
            </>
          )}
        </div>
      )}

      {/* CHILDREN */}
      <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 md:gap-x-5">
        {parent.children.map((child) => {
          const childOnMain = isOnMainBranch(child.id);
          const edgeToChildOnPath = showMainBranch && parentOnMain && childOnMain;

          return (
            <div
              key={child.id}
              className="flex flex-col items-center"
              ref={(el) => {
                if (el) childRefs.current.set(child.id, el);
              }}
            >
              {/* VERTICAL CONNECTOR: bar down to this child */}
              {edgeToChildOnPath ? (
                <GlowingVLine height={24} />
              ) : (
                <div className="w-0.5 h-6 bg-surface-500/40" />
              )}
              <TreeNodeCard
                node={child}
                onNodeClick={onNodeClick}
                highlightedIds={highlightedIds}
                showMainBranch={showMainBranch}
                showGenerations={showGenerations}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Reusable glowing vertical line */
function GlowingVLine({ height }: { height: number }) {
  return (
    <div className="relative flex items-center justify-center" style={{ height: `${height}px` }}>
      <div className="absolute w-3 h-full rounded-full bg-amber-400/15 blur-sm" />
      <div className="w-1 h-full rounded-full bg-gradient-to-b from-amber-400 to-amber-500 shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
    </div>
  );
}

function TreeNodeCard({
  node,
  onNodeClick,
  highlightedIds,
  showMainBranch,
  showGenerations,
  isRoot,
}: {
  node: TreeNode;
  onNodeClick: (node: TreeNode) => void;
  highlightedIds: Set<string>;
  showMainBranch: boolean;
  showGenerations: boolean;
  isRoot?: boolean;
}) {
  const onMain = isOnMainBranch(node.id);
  const isHighlighted = highlightedIds.has(node.id);
  const isMe = node.isMe === true;
  const pathNode = showMainBranch && onMain;

  // Card styling — NEVER dim other nodes. Only ADD emphasis to path nodes.
  let cardClasses =
    "relative cursor-pointer rounded-xl px-4 py-3 text-center transition-all duration-300 border min-w-[120px] max-w-[180px] ";

  if (isMe) {
    cardClasses +=
      "bg-gradient-to-br from-gold-400/40 to-gold-600/25 border-gold-400 text-gold-100 shadow-[0_0_24px_rgba(250,204,21,0.4)] ring-2 ring-gold-400/60 scale-105 ";
  } else if (pathNode) {
    cardClasses +=
      "bg-gradient-to-br from-amber-400/25 to-amber-600/15 border-amber-400/60 text-amber-100 shadow-[0_0_18px_rgba(251,191,36,0.25)] ring-2 ring-amber-400/40 ";
  } else if (isHighlighted) {
    cardClasses +=
      "bg-gradient-to-br from-accent-500/25 to-accent-600/15 border-accent-400/50 text-accent-100 shadow-lg shadow-accent-500/15 ring-2 ring-accent-400/40 ";
  } else {
    // Normal — always full visibility
    cardClasses +=
      "bg-surface-800/70 border-surface-600/40 text-surface-200 hover:bg-surface-700/70 hover:border-surface-500/50 hover:shadow-md ";
  }

  return (
    <div className="flex flex-col items-center">
      <div
        className={cardClasses}
        onClick={() => onNodeClick(node)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onNodeClick(node);
        }}
      >
        {isRoot && (
          <div className={`absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full whitespace-nowrap ${
            pathNode ? "bg-amber-500 text-surface-900 shadow-[0_0_10px_rgba(251,191,36,0.5)]" : "bg-primary-500 text-white"
          }`}>
            Root
          </div>
        )}

        {isMe && (
          <div className="absolute -top-3 right-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gold-500 text-surface-900 whitespace-nowrap shadow-[0_0_12px_rgba(250,204,21,0.6)]">
            ME
          </div>
        )}

        {pathNode && !isMe && !isRoot && (
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-amber-400 ring-2 ring-amber-400/40 shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
        )}

        <p className="font-semibold text-sm leading-tight">{node.name}</p>
        {showGenerations && (
          <p className="text-[10px] mt-1 opacity-60">
            Level {node.level} &middot; {getGenerationLabel(node.level)}
          </p>
        )}
      </div>

      {/* Render children via ChildrenRow which handles horizontal segment highlighting */}
      {node.children.length > 0 && (
        <ChildrenRow
          parent={node}
          onNodeClick={onNodeClick}
          highlightedIds={highlightedIds}
          showMainBranch={showMainBranch}
          showGenerations={showGenerations}
        />
      )}
    </div>
  );
}

export default function FamilyTree({
  root,
  onNodeClick,
  highlightedIds,
  showMainBranch,
  showGenerations,
}: FamilyTreeProps) {
  return (
    <div className="relative overflow-x-auto pb-4">
      {/* Legend */}
      <div className="flex flex-wrap justify-center mb-6 gap-3">
        <div className="inline-flex items-center gap-4 px-5 py-2.5 rounded-full bg-surface-800/60 border border-surface-700/40">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.6)]" />
            <span className="text-xs font-semibold text-amber-300">My Direct Branch</span>
          </div>
          <div className="w-px h-4 bg-surface-600/50" />
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gold-400 shadow-[0_0_6px_rgba(250,204,21,0.6)] ring-1 ring-gold-400/50" />
            <span className="text-xs font-semibold text-gold-300">Vinit Lonare (ME)</span>
          </div>
          <div className="w-px h-4 bg-surface-600/50" />
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-surface-700 border border-surface-500/40" />
            <span className="text-xs text-surface-300">Family Members</span>
          </div>
        </div>
      </div>

      {/* Path label */}
      {showMainBranch && (
        <div className="flex justify-center mb-4">
          <div className="inline-flex flex-wrap items-center justify-center gap-2.5 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-400/25 shadow-[0_0_16px_rgba(251,191,36,0.08)]">
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.7)]" />
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-amber-300">
              My Direct Family Branch
            </span>
            <span className="text-[11px] text-amber-400/70 font-mono">
              Ganuji → Mahenjaji → Gulabrao → Namdeo → Vinit
            </span>
          </div>
        </div>
      )}

      <div className="flex justify-center min-w-fit py-4">
        <TreeNodeCard
          node={root}
          onNodeClick={onNodeClick}
          highlightedIds={highlightedIds}
          showMainBranch={showMainBranch}
          showGenerations={showGenerations}
          isRoot
        />
      </div>
    </div>
  );
}
