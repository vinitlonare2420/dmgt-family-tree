import { mainBranchIds, familyMembers } from "../data/familyTree";

export default function MainBranch() {
  const branchMembers = mainBranchIds.map((id) => {
    const member = familyMembers.find((m) => m.id === id);
    return {
      id,
      name: member?.name || id,
      isMe: member?.isMe || false,
    };
  });

  return (
    <section id="path" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          My Path &mdash; Root to Vinit
        </h2>
        <p className="text-surface-400 max-w-2xl mx-auto">
          The unique path from the root node to me, traversing {branchMembers.length - 1} edges through {branchMembers.length} nodes
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <div className="relative">
          {branchMembers.map((member, index) => (
            <div key={member.id} className="flex flex-col items-center">
              {/* Edge connector */}
              {index > 0 && (
                <div className="flex flex-col items-center">
                  <div className="w-1 h-4 rounded-full bg-gradient-to-b from-amber-400 to-amber-500 shadow-[0_0_8px_rgba(251,191,36,0.4)]" />
                  <div className="text-xs font-mono text-amber-400/70 my-1">
                    Edge {index}
                  </div>
                  <div className="w-1 h-4 rounded-full bg-gradient-to-b from-amber-500 to-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.4)]" />
                </div>
              )}

              {/* Node */}
              <div
                className={`w-full max-w-xs rounded-2xl border p-4 text-center transition-all duration-300 ${
                  member.isMe
                    ? "bg-gradient-to-br from-gold-500/25 to-gold-600/15 border-gold-400/50 shadow-lg shadow-gold-500/15"
                    : "bg-gradient-to-br from-amber-500/15 to-amber-600/10 border-amber-500/30"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <span
                    className={`text-lg font-bold ${
                      member.isMe ? "text-gold-200" : "text-amber-200"
                    }`}
                  >
                    {member.name}
                  </span>
                  {member.isMe && (
                    <span className="text-xs font-bold uppercase px-2 py-0.5 rounded-full bg-gold-500/30 text-gold-200 border border-gold-400/30">
                      ME
                    </span>
                  )}
                </div>
                <p className="text-xs text-surface-400 mt-1 font-mono">
                  Level {index}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
