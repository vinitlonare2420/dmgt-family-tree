import type { TreeNode } from "../utils/treeUtils";
import {
  getNodeType,
  getParentName,
  getChildrenNames,
  getSiblings,
  isOnMainBranch,
  getGenerationLabel,
} from "../utils/treeUtils";

interface NodeDetailProps {
  node: TreeNode;
  allNodes: TreeNode[];
  onClose: () => void;
}

export default function NodeDetail({ node, allNodes, onClose }: NodeDetailProps) {
  const nodeType = getNodeType(node);
  const parentName = getParentName(node.id);
  const childrenNames = getChildrenNames(node);
  const siblings = getSiblings(node.id, allNodes);
  const onMain = isOnMainBranch(node.id);
  const degree = node.children.length;
  const isMe = node.isMe === true;

  const rows: { label: string; value: string }[] = [
    { label: "Name", value: node.name },
    ...(isMe ? [{ label: "Relationship", value: "Me" }] : []),
    { label: "Generation", value: getGenerationLabel(node.level) },
    { label: "Level", value: `${node.level}` },
    { label: "Node Type", value: nodeType },
    { label: "Parent", value: parentName },
    {
      label: "Children",
      value: childrenNames.length > 0 ? childrenNames.join(", ") : "None (Leaf)",
    },
    {
      label: "Siblings",
      value:
        siblings.length > 0
          ? siblings.map((s) => s.name).join(", ")
          : "None",
    },
    { label: "Degree", value: `${degree}` },
    { label: "Main Branch", value: onMain ? "Yes" : "No" },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-surface-900 border border-surface-700/60 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-surface-700/40">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold ${
                isMe
                  ? "bg-gold-500/20 text-gold-300"
                  : onMain
                  ? "bg-primary-500/20 text-primary-300"
                  : "bg-surface-700 text-surface-300"
              }`}
            >
              {node.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{node.name}</h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    nodeType === "Root"
                      ? "bg-primary-500/20 text-primary-300"
                      : nodeType === "Leaf Node"
                      ? "bg-green-500/20 text-green-300"
                      : "bg-accent-500/20 text-accent-300"
                  }`}
                >
                  {nodeType}
                </span>
                {isMe && (
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-gold-500/20 text-gold-300">
                    ME
                  </span>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-surface-700/50 text-surface-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Details */}
        <div className="p-5 space-y-3">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-start justify-between py-2 border-b border-surface-800/60 last:border-0"
            >
              <span className="text-sm text-surface-400 font-medium">
                {row.label}
              </span>
              <span
                className={`text-sm text-right max-w-[60%] ${
                  row.label === "Main Branch" && row.value === "Yes"
                    ? "text-primary-300 font-semibold"
                    : "text-surface-200"
                }`}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
