export interface Project {
  id: string;
  number: string;
  title: string;
  oneLiner: string;
  description: string;
  tags: string[];
  year: string;
  status: string;
  domain: string;
  liveUrl: string;
  githubUrl?: string;
  image: string;
  secondaryImage?: string;
  notes?: string;
}

export interface LearningTopic {
  id: string;
  step: string;
  title: string;
  summary: string;
  codeSnippet: string;
  complexity: string;
  keyTakeaway: string;
}

export interface FocusArea {
  number: string;
  title: string;
  description: string;
  tag: string;
  details: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  details: string;
  quote: string;
}

export interface SkillCategory {
  category: string;
  tag: string;
  skills: { name: string; levelNote?: string }[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "UDAY SAHU",
    role: "CSE Student · Developer · Builder · Problem Solver",
    location: "Raipur, Chhattisgarh, India",
    coordinates: "21.2514° N, 81.6296° E",
    primaryTagline: "I BUILD THINGS THAT SHOULD EXIST.",
    supportingTagline: "I build practical software products and turn real-world problems into working technology.",
    subText: "Building software, exploring ideas, and turning problems into prototypes.",
    college: "SSIPMT Raipur",
    email: "udaysahu.in@gmail.com",
    github: "https://github.com/udaysahu-source",
    githubUser: "udaysahu-source",
    linkedin: "https://linkedin.com/in/udaysahu29",
    linkedinUser: "udaysahu29",
    year: "2026",
    systemStatus: "BUILDING / ONLINE",
  },

  heroStatus: [
    {
      id: "building",
      label: "BUILDING",
      value: "PRAVAH",
      detail: "Flood-aware route intelligence & accessibility platform",
      active: true,
    },
    {
      id: "learning",
      label: "LEARNING",
      value: "DSA WITH C++",
      detail: "Algorithmic patterns, memory models, time-complexity bounds",
      active: false,
    },
    {
      id: "contributing",
      label: "CONTRIBUTING",
      value: "OPEN SOURCE / GSOC",
      detail: "Exploring real-world distributed codebases & tooling",
      active: false,
    },
  ],

  projects: [
    {
      id: "bunkd",
      number: "01",
      title: "BUNKD",
      oneLiner: "Attendance management / bunk calculator PWA.",
      description: "A progressive web app built for college students to track attendance intelligently, simulate forward margins, and calculate exactly how many lectures can be safely skipped while staying strictly above curriculum target thresholds.",
      tags: ["PWA", "Next.js", "React", "Attendance Engine", "Offline-Ready"],
      year: "2026",
      status: "LIVE DEPLOYED",
      domain: "bunk-d.vercel.app",
      liveUrl: "https://bunk-d.vercel.app/",
      image: "/assets/bunkd_real.png",
      secondaryImage: "/assets/bunkd_dashboard.png",
    },
    {
      id: "sanket",
      number: "02",
      title: "SANKET",
      oneLiner: "Smart civic hazard reporting platform.",
      description: "A civic incident reporting and verification platform connecting local citizens with municipality action pipelines. Geotagged reporting for potholes, dangerous bridges, open electrical hazards, and waterlogging.",
      tags: ["Civic Tech", "React", "Geotagging", "Municipal Pipeline", "PWA"],
      year: "2026",
      status: "LIVE DEPLOYED",
      domain: "team-leaf-prototype.vercel.app",
      liveUrl: "https://team-leaf-prototype.vercel.app/feed",
      githubUrl: "https://github.com/udaysahu-source/Sanket",
      image: "/assets/sanket_real.png",
    },
    {
      id: "labelsure",
      number: "03",
      title: "LABELSURE",
      oneLiner: "Legal Metrology compliance screening platform.",
      description: "An automated compliance flagging platform for Indian packaged goods under the Legal Metrology (Packaged Commodities) Rules, 2011. Detects labeling non-compliance across retail packaging for inspectors and manufacturers.",
      tags: ["Legal Metrology", "Compliance OCR", "Python", "Regulatory Rules", "React"],
      year: "2026",
      status: "LIVE DEPLOYED",
      domain: "labelcheck-rho.vercel.app",
      liveUrl: "https://labelcheck-rho.vercel.app/",
      githubUrl: "https://github.com/udaysahu-source/LABELSURE",
      image: "/assets/labelsure_real.png",
      notes: "Deployed under labelcheck-rho.vercel.app (currently labeled LabelCheck).",
    },
    {
      id: "bro-or-fraud",
      number: "04",
      title: "BRO OR FRAUD",
      oneLiner: "A social trust / fraud-oriented interactive web experience.",
      description: "An interactive pass-the-phone multiplayer experience challenging players to detect deception and call out frauds among friends. Features themed packs across College Life, Relationships, and Gen Z pop culture.",
      tags: ["Social Web App", "Interactive UI", "React", "State Engine", "Multiplayer"],
      year: "2026",
      status: "LIVE DEPLOYED",
      domain: "bro-or-fraud.vercel.app",
      liveUrl: "https://bro-or-fraud.vercel.app/",
      image: "/assets/bro_or_fraud_real.png",
    },
  ] as Project[],

  pravah: {
    number: "01",
    label: "CURRENTLY BUILDING",
    title: "PRAVAH",
    subheading: "Flood-aware route and accessibility intelligence.",
    tagline: "Transforming raw geographic topography and flood extent data into lifelines for emergency navigation.",
    description: "PRAVAH explores how flood extent and geographic data can be transformed into useful route and accessibility information during severe monsoon inundations. Instead of relying on static road maps that send vehicles into submerged underpasses, PRAVAH recalculates safe traversable corridors dynamically.",
    status: "// ACTIVE SPRINT — BUILD 001",
    coordinates: "Raipur Metropolitan Area (21.2514° N, 81.6296° E)",
    elevationProfile: "260m - 320m above MSL",
    coreFeatures: [
      {
        title: "Dynamic Flood Boundary Rasterization",
        desc: "Ingesting regional topological contour lines and water basin sensor levels to compute real-time submerged roadway perimeters.",
      },
      {
        title: "Safe Corridor Graph Recalculation",
        desc: "Dijkstra/A* graph weights altered based on flood depth thresholds; isolating submerged bridges and rerouting to elevated arterials.",
      },
      {
        title: "Emergency Evacuation & Hospital Nodes",
        desc: "Continuous reachability indexing for critical trauma centers and isolated residential pockets across Raipur.",
      },
      {
        title: "Low-Bandwidth Offline Mesh Support",
        desc: "Packaging delta hazard vectors into tiny byte payloads that transmit over constrained 2G/SMS channels when towers fail.",
      },
    ],
    technicalStack: ["React", "TypeScript", "Geospatial GIS", "Topology Contours", "A* Graph Routing", "Node.js"],
    image: "/assets/pravah_preview.jpg",
  },

  learning: {
    title: "WHAT I'M LEARNING",
    primary: "DSA WITH C++",
    subheading: "An evolving engineering notebook tracking computational principles, memory mechanics, and problem solving.",
    topics: [
      {
        id: "arrays",
        step: "01",
        title: "ARRAYS",
        summary: "Contiguous memory layout, L1/L2 cache locality, and vector capacity growth mechanics.",
        codeSnippet: `// Vector amortized allocation & memory locality
vector<int> nums = {4, 1, 8, 3};
nums.reserve(1024); // Avoid frequent heap reallocations
// O(1) random access via pointer arithmetic: *(base + i * size)`,
        complexity: "Access: O(1) | Insertion: O(n)",
        keyTakeaway: "Cache friendliness beats linked structures almost every time in modern CPU architectures.",
      },
      {
        id: "two-pointers",
        step: "02",
        title: "TWO POINTERS",
        summary: "Shrinking search spaces from O(n²) to O(n) via directional monotonic invariants.",
        codeSnippet: `// Inward convergence on sorted arrays
int left = 0, right = n - 1;
while (left < right) {
    int sum = nums[left] + nums[right];
    if (sum == target) return {left, right};
    (sum < target) ? ++left : --right;
}`,
        complexity: "Time: O(n) | Space: O(1)",
        keyTakeaway: "Monotonicity allows discarding entire sub-spaces without explicit traversal.",
      },
      {
        id: "hashing",
        step: "03",
        title: "HASHING",
        summary: "Constant-time lookups, collision resolution via chaining/probing, and unordered_map internals.",
        codeSnippet: `// Hash table for complement verification in single pass
unordered_map<int, int> seen;
for (int i = 0; i < n; ++i) {
    int comp = target - nums[i];
    if (seen.count(comp)) return {seen[comp], i};
    seen[nums[i]] = i;
}`,
        complexity: "Average Lookup: O(1) | Space: O(n)",
        keyTakeaway: "Trading memory for time is the single most practical software engineering lever.",
      },
      {
        id: "prefix-sum",
        step: "04",
        title: "PREFIX SUM",
        summary: "Precomputing cumulative distributions for instant range-sum query resolution.",
        codeSnippet: `// O(1) range queries after O(n) precomputation
vector<int> pref(n + 1, 0);
for (int i = 0; i < n; ++i) pref[i + 1] = pref[i] + nums[i];
// Query sum(L...R) in exact constant time:
int rangeSum = pref[R + 1] - pref[L];`,
        complexity: "Precompute: O(n) | Query: O(1)",
        keyTakeaway: "Eliminates repetitive recalculation by structuring intermediate state.",
      },
      {
        id: "binary-search",
        step: "05",
        title: "BINARY SEARCH",
        summary: "Logarithmic partitioning over monotonic answer spaces and predicate functions.",
        codeSnippet: `// Binary search on answer space: condition(mid)
int low = 1, high = max_val, ans = -1;
while (low <= high) {
    int mid = low + (high - low) / 2;
    if (isValid(mid)) { ans = mid; high = mid - 1; }
    else { low = mid + 1; }
}`,
        complexity: "Time: O(log n) | Space: O(1)",
        keyTakeaway: "Binary search applies to any monotonic predicate, not merely sorted integer arrays.",
      },
      {
        id: "subarrays",
        step: "06",
        title: "SUBARRAYS",
        summary: "Sliding window dynamics, Kadane's maximum contiguous subarray sum, and bounds.",
        codeSnippet: `// Kadane's DP for maximum contiguous subarray
int currMax = nums[0], globalMax = nums[0];
for (size_t i = 1; i < nums.size(); ++i) {
    currMax = max(nums[i], currMax + nums[i]);
    globalMax = max(globalMax, currMax);
}`,
        complexity: "Time: O(n) | Space: O(1)",
        keyTakeaway: "Deciding locally whether to append to history or restart fresh defines DP.",
      },
      {
        id: "problem-solving",
        step: "07",
        title: "PROBLEM SOLVING",
        summary: "Synthesizing constraints into asymptotic guarantees and clean, bug-free C++ code.",
        codeSnippet: `// Production invariant: assert assumptions early
template<typename T>
void solveOptimal(const vector<T>& stream) {
    // 1. Analyze constraints (N <= 10^5 -> O(N log N))
    // 2. Identify invariant & space bounds
    // 3. Implement with zero auxiliary allocations
}`,
        complexity: "Focus: Space & Time Efficiency",
        keyTakeaway: "Clear mathematical invariants make edge cases disappear naturally.",
      },
    ] as LearningTopic[],
  },

  wildlife: {
    label: "LONG-TERM BUILD / SEMESTER PROJECT",
    title: "WILDLIFE ANIMAL DETECTION USING CAMERA TRAP IMAGES",
    subheading: "Automated fauna identification & nocturnal telemetry across Central Indian reserves.",
    narrative: "A semester project exploring wildlife animal detection using camera-trap imagery, intended to continue and evolve throughout the B.Tech program. Rather than claiming impossible breakthrough benchmarks, this project focuses on real-world edge challenges: nighttime infrared blur, animal camouflage, false positives triggered by moving leaves, and battery-efficient processing on low-power sensor stations.",
    contextTag: "Barnawapara Wildlife Sanctuary / Chhattisgarh Ecology",
    pipelineSteps: [
      {
        phase: "01 SENSOR CAPTURE",
        detail: "Passive Infrared (PIR) heat motion trigger initiates 3-shot nocturnal burst sequence under 850nm IR illumination.",
      },
      {
        phase: "02 PREPROCESSING",
        detail: "Dynamic histogram equalization and high-pass edge filtering to normalize deep shadows and vegetation occlusion.",
      },
      {
        phase: "03 BOUNDING BOX & DETECT",
        detail: "Lightweight computer vision model detects quadrupeds, bounding coordinates, and key skeletal anchor nodes.",
      },
      {
        phase: "04 SPECIES CLASSIFICATION",
        detail: "Confidence scoring across regional mammals (Leopard, Spotted Deer, Nilgai, Wild Boar) with unverified review queues.",
      },
    ],
    technicalHighlights: [
      { key: "Target Model", value: "Lightweight YOLO / CNN" },
      { key: "Environment", value: "Nocturnal Infrared (IR)" },
      { key: "Focus Species", value: "Central Indian Fauna" },
      { key: "Project Nature", value: "Ongoing B.Tech Project" },
    ],
    image: "/assets/wildlife_preview.jpg",
  },

  focusAreas: [
    {
      number: "01",
      title: "HACKATHONS",
      description: "Turning raw ideas into fully working prototypes in 24–48 hours.",
      tag: "SPEED & SHIP",
      details: "Rapid architecture scoping, offline resilience, and building products that actually solve tangible ground-level problems under pressure.",
    },
    {
      number: "02",
      title: "OPEN SOURCE",
      description: "Learning to read, debug, and contribute to real-world codebases.",
      tag: "COMMUNITY & CODE",
      details: "Understanding large-scale software structure, version control discipline, issue triage, and adhering to strict upstream standards.",
    },
    {
      number: "03",
      title: "GSOC",
      description: "Preparing for meaningful open-source contributions and Google Summer of Code.",
      tag: "GLOBAL IMPACT",
      details: "Studying mentor organization repositories, understanding contribution workflows, and building deep domain competency.",
    },
    {
      number: "04",
      title: "BUILDING",
      description: "Continuing to develop practical software projects that solve real problems.",
      tag: "PRODUCT DISCIPLINE",
      details: "Moving beyond toy tutorials to build software with persistent state, edge-case resilience, and authentic utility.",
    },
  ] as FocusArea[],

  process: [
    {
      number: "01",
      title: "OBSERVE",
      description: "Understand the problem.",
      details: "I look at friction points in daily life, college administration, transit gates, or civic issues. No software should be written until the actual root bottleneck is clear.",
      quote: "Software without a clear problem is just digital clutter.",
    },
    {
      number: "02",
      title: "EXPLORE",
      description: "Research possible approaches.",
      details: "Compare architectural tradeoffs: Can this run offline? Does it need a server or can local storage suffice? What are the edge failures?",
      quote: "The cheapest bug to fix is the one prevented in the architecture sketch.",
    },
    {
      number: "03",
      title: "BUILD",
      description: "Turn the idea into a working prototype.",
      details: "Writing clean, functional code with TypeScript, React, C++, or Python. Prioritizing core mechanics over decorative distractions.",
      quote: "A working prototype answers questions that ten meetings cannot.",
    },
    {
      number: "04",
      title: "ITERATE",
      description: "Test, improve and repeat.",
      details: "Testing on weak mobile networks, measuring bundle sizes, refining ergonomics, and hardening failure modes based on actual testing.",
      quote: "Great software is not built once; it is refined through relentless iteration.",
    },
  ] as ProcessStep[],

  skills: [
    {
      category: "LANGUAGES",
      tag: "CORE LOGIC",
      skills: [
        { name: "C", levelNote: "Memory & pointers" },
        { name: "C++", levelNote: "DSA & STL" },
        { name: "Python", levelNote: "Scripting & AI" },
        { name: "JavaScript", levelNote: "ESNext" },
        { name: "TypeScript", levelNote: "Type-safe apps" },
      ],
    },
    {
      category: "FRONTEND",
      tag: "UI & INTERACTION",
      skills: [
        { name: "React", levelNote: "State & Hooks" },
        { name: "Next.js", levelNote: "App router & SSR" },
        { name: "HTML5", levelNote: "Semantic markup" },
        { name: "CSS3", levelNote: "Modern layouts" },
        { name: "Tailwind CSS", levelNote: "Utility styling" },
      ],
    },
    {
      category: "BACKEND & DATA",
      tag: "STORAGE & APIS",
      skills: [
        { name: "Node.js", levelNote: "Server runtimes" },
        { name: "Supabase", levelNote: "Auth & DB" },
        { name: "PostgreSQL", levelNote: "Relational data" },
        { name: "SQLite", levelNote: "Offline persistence" },
      ],
    },
    {
      category: "TOOLS",
      tag: "WORKFLOW",
      skills: [
        { name: "Git", levelNote: "Branching & history" },
        { name: "GitHub", levelNote: "CI & collaborations" },
        { name: "VS Code", levelNote: "Primary IDE" },
        { name: "Linux / Bash", levelNote: "Shell scripting" },
      ],
    },
    {
      category: "AI & DOMAIN",
      tag: "SYSTEMS",
      skills: [
        { name: "AI APIs", levelNote: "LLM integration" },
        { name: "Computer Vision", levelNote: "Object detection" },
        { name: "Geospatial Data", levelNote: "Topography & GIS" },
      ],
    },
  ] as SkillCategory[],

  metrics: [
    {
      number: "04",
      label: "DEPLOYED PROJECTS",
      sub: "Real live web applications",
    },
    {
      number: "01",
      label: "CURRENT BUILD",
      sub: "PRAVAH Flood Intelligence",
    },
    {
      number: "01",
      label: "LONG-TERM PROJECT",
      sub: "Wildlife Camera Trap Detection",
    },
    {
      number: "2026",
      label: "BUILDING / LEARNING",
      sub: "SSIPMT Raipur · CSE",
    },
  ],

  journey: [
    {
      year: "2026",
      tag: "ACADEMICS",
      title: "B.Tech Computer Science & Engineering",
      institution: "SSIPMT Raipur, Chhattisgarh",
      description: "Focusing on data structures, computer networks, system design, and computer vision while building practical software products.",
    },
    {
      year: "2026",
      tag: "SHIPPED",
      title: "Deployed Web Applications",
      institution: "Bunkd · Sanket · LabelSure · Bro or Fraud",
      description: "Building and maintaining real deployed products serving college attendance tracking, civic hazard pipelines, legal metrology rules, and interactive multiplayer experiences.",
    },
    {
      year: "2026",
      tag: "CONTRIBUTING",
      title: "Open Source & GSoC Preparation",
      institution: "Community Development",
      description: "Diving into open-source repositories, understanding production review processes, and preparing for meaningful global contributions.",
    },
  ],

  faqs: [
    {
      question: "WHAT DO YOU BUILD?",
      answer: "Real, practical software products and deployed web applications—including Bunkd (attendance PWA), Sanket (civic hazards), LabelSure (legal metrology compliance), and Bro or Fraud (interactive social experience).",
    },
    {
      question: "WHAT ARE YOU CURRENTLY WORKING ON?",
      answer: "PRAVAH—a flood-aware route and accessibility intelligence system exploring how flood boundaries and elevation contours can be recalculated dynamically for safe navigation.",
    },
    {
      question: "WHAT ARE YOU LEARNING?",
      answer: "DSA with C++: systematically strengthening algorithmic reasoning from arrays, two-pointers, hashing, prefix sums, binary search, and subarrays to asymptotic problem solving.",
    },
    {
      question: "WHAT ARE YOU FOCUSED ON?",
      answer: "Participating in hackathons, learning to contribute to production open-source codebases, preparing for GSoC, and continuously developing practical software projects.",
    },
    {
      question: "WHAT IS YOUR LONG-TERM PROJECT?",
      answer: "Wildlife Animal Detection Using Camera Trap Images: a semester project exploring computer vision models on nocturnal infrared camera-trap feeds, intended to evolve across my B.Tech degree.",
    },
  ] as FaqItem[],
};
