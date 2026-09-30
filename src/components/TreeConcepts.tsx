export default function TreeConcepts() {
  const concepts = [
    {
      title: "Root Node",
      description: "The topmost node in a tree that has no parent. Every tree has exactly one root.",
      example: "Ganuji Lonare is the root of our family tree.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m0-18l-4 4m4-4l4 4" />
        </svg>
      ),
      color: "from-blue-500/20 to-blue-600/10 border-blue-500/30",
      iconBg: "bg-blue-500/20 text-blue-300",
    },
    {
      title: "Parent Node",
      description: "A node that has one or more child nodes directly connected below it.",
      example: "Mahenjaji Lonare is a parent node with children: Sahebrao, Shitaramji, Gulabrao, and Champakrao.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      ),
      color: "from-purple-500/20 to-purple-600/10 border-purple-500/30",
      iconBg: "bg-purple-500/20 text-purple-300",
    },
    {
      title: "Child Node",
      description: "A node that has a parent. Every node except the root is a child of exactly one parent.",
      example: "Vinit Lonare and Nidhi Lonare are children of Namdeo Lonare.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
      color: "from-cyan-500/20 to-cyan-600/10 border-cyan-500/30",
      iconBg: "bg-cyan-500/20 text-cyan-300",
    },
    {
      title: "Sibling Nodes",
      description: "Nodes that share the same parent are called siblings.",
      example: "Sahebrao, Shitaramji, Gulabrao, and Champakrao are siblings — they all share Mahenjaji as their parent.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
      color: "from-green-500/20 to-green-600/10 border-green-500/30",
      iconBg: "bg-green-500/20 text-green-300",
    },
    {
      title: "Leaf Node",
      description: "A node with no children. In a family tree, these are members with no recorded descendants.",
      example: "Vinit Lonare, Nidhi Lonare, Piyush Lonare, Ayush Lonare, Kushmit Lonare, Mirabai Lonare, Kusumtai Lonare, Parrmilatai Lonare, Gyanashvar Lonare, and Varshatai Lonare are leaf nodes.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
      color: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30",
      iconBg: "bg-emerald-500/20 text-emerald-300",
    },
    {
      title: "Internal Node",
      description: "A node that has at least one child. Internal nodes are neither root-only nor leaves.",
      example: "Mahenjaji Lonare (4 children), Gulabrao Lonare (3 children), and Namdeo Lonare (2 children) are internal nodes.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
        </svg>
      ),
      color: "from-orange-500/20 to-orange-600/10 border-orange-500/30",
      iconBg: "bg-orange-500/20 text-orange-300",
    },
    {
      title: "Level",
      description: "The distance from the root. Root is at Level 0, its children at Level 1, and so on.",
      example: "Ganuji (Level 0), Mahenjaji (Level 1), Gulabrao (Level 2), Namdeo (Level 3), Vinit (Level 4).",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5-4.5L16.5 7.5m0 0L12 12m4.5-4.5V21" />
        </svg>
      ),
      color: "from-indigo-500/20 to-indigo-600/10 border-indigo-500/30",
      iconBg: "bg-indigo-500/20 text-indigo-300",
    },
    {
      title: "Degree",
      description: "The number of children a node has. Leaf nodes have degree 0.",
      example: "Mahenjaji has degree 4 (four children). Namdeo has degree 2 (Vinit and Nidhi). Vinit has degree 0 (leaf).",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
        </svg>
      ),
      color: "from-rose-500/20 to-rose-600/10 border-rose-500/30",
      iconBg: "bg-rose-500/20 text-rose-300",
    },
    {
      title: "Height",
      description: "The length of the longest path from the root to any leaf, counted in edges.",
      example: "The longest path is Ganuji -> Mahenjaji -> Gulabrao -> Namdeo -> Vinit, giving a height of 4.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12" />
        </svg>
      ),
      color: "from-amber-500/20 to-amber-600/10 border-amber-500/30",
      iconBg: "bg-amber-500/20 text-amber-300",
    },
  ];

  return (
    <section id="concepts" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Tree Data Structure Concepts
        </h2>
        <p className="text-surface-400 max-w-2xl mx-auto">
          Understanding fundamental tree concepts through our family tree
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {concepts.map((concept) => (
          <div
            key={concept.title}
            className={`group rounded-2xl border bg-gradient-to-br ${concept.color} p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
          >
            <div className="flex items-start gap-3 mb-3">
              <div className={`p-2.5 rounded-xl ${concept.iconBg}`}>
                {concept.icon}
              </div>
              <h3 className="text-lg font-bold text-white mt-1">
                {concept.title}
              </h3>
            </div>
            <p className="text-sm text-surface-300 mb-3 leading-relaxed">
              {concept.description}
            </p>
            <div className="bg-surface-900/40 rounded-xl px-4 py-3">
              <p className="text-xs text-surface-400 font-medium uppercase tracking-wider mb-1">
                Example from our tree
              </p>
              <p className="text-sm text-surface-200">{concept.example}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
