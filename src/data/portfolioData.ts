export interface Project {
  id: string;
  number: string;
  title: string;
  status: 'LIVE' | 'LIVE PROTOTYPE';
  category: string;
  oneLiner: string;
  description: string;
  tags: string[];
  year: string;
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
  tagline: string;
  description: string;
}

export interface SkillCategory {
  category: string;
  tag: string;
  skills: { name: string; levelNote?: string }[];
}

export interface JourneyMilestone {
  period: string;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "UDAY SAHU",
    role: "CSE STUDENT · DEVELOPER · BUILDER · PROBLEM SOLVER",
    location: "RAIPUR, INDIA",
    coordinates: "21.2514° N, 81.6296° E",
    primaryTagline: "I BUILD THINGS THAT SHOULD EXIST.",
    supportingTagline: "I build practical software products, experiment with emerging technology, and turn real-world problems into working prototypes.",
    college: "SSIPMT Raipur",
    email: "udaysahu.in@gmail.com",
    github: "https://github.com/udaysahu-source",
    githubUser: "udaysahu-source",
    linkedin: "https://linkedin.com/in/udaysahu29",
    linkedinUser: "udaysahu29",
    year: "2026",
    buildNumber: "BUILD 001",
  },

  heroStatus: [
    {
      id: "building",
      symbol: "■",
      label: "BUILDING",
      target: "PRAVAH",
      detail: "Flood-aware route intelligence & accessibility platform",
    },
    {
      id: "learning",
      symbol: "□",
      label: "LEARNING",
      target: "DSA WITH C++",
      detail: "Core algorithmic patterns, time-space bounds, and consistent practice",
    },
    {
      id: "contributing",
      symbol: "□",
      label: "CONTRIBUTING",
      target: "OPEN SOURCE / GSOC",
      detail: "Exploring real-world distributed codebases & open-source preparation",
    },
  ],

  projects: [
    {
      id: "bunkd",
      number: "01",
      title: "BUNKD",
      status: "LIVE",
      category: "Attendance Management PWA",
      oneLiner: "Attendance management and bunk calculator PWA for college students.",
      description: "A progressive web app built for students to track attendance intelligently, calculate forward lecture margins, and simulate exactly how many lectures can be safely skipped while staying strictly above mandatory criteria thresholds.",
      tags: ["PWA", "Next.js", "React", "TypeScript", "Tailwind CSS"],
      year: "2026",
      domain: "bunk-d.vercel.app",
      liveUrl: "https://bunk-d.vercel.app/",
      image: "/assets/bunkd_real.png",
      secondaryImage: "/assets/bunkd_dashboard.png",
    },
    {
      id: "sanket",
      number: "02",
      title: "SANKET",
      status: "LIVE PROTOTYPE",
      category: "Smart Civic Hazard Reporting Platform",
      oneLiner: "Smart civic incident reporting and geotagged verification platform.",
      description: "A civic hazard platform connecting citizens with municipality action pipelines. Features geotagged reporting for potholes, dangerous road crossings, open electrical hazards, and severe waterlogging.",
      tags: ["Civic Tech", "React", "Geotagging", "Municipal Pipeline", "Tailwind CSS"],
      year: "2026",
      domain: "team-leaf-prototype.vercel.app",
      liveUrl: "https://team-leaf-prototype.vercel.app/feed",
      githubUrl: "https://github.com/udaysahu-source/Sanket",
      image: "/assets/sanket_real.png",
    },
    {
      id: "labelsure",
      number: "03",
      title: "LABELSURE",
      status: "LIVE PROTOTYPE",
      category: "Legal Metrology Compliance Platform",
      oneLiner: "Legal Metrology compliance screening platform for retail packaged goods.",
      description: "An automated compliance screening tool evaluating packaged commodity labels against mandatory declarations under the Indian Legal Metrology (Packaged Commodities) Rules, 2011.",
      tags: ["Legal Metrology", "Compliance OCR", "Python", "Regulatory Rules", "React"],
      year: "2026",
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
      status: "LIVE",
      category: "Interactive Social Deception Game",
      oneLiner: "Pass-the-phone multiplayer deception and trust party game.",
      description: "An interactive social web experience challenging groups of friends to spot the fraud through rapid questioning and deception detection across themed packs like College Life and Friend Group Lore.",
      tags: ["Social Web App", "Interactive UI", "React", "State Engine", "Multiplayer"],
      year: "2026",
      domain: "bro-or-fraud.vercel.app",
      liveUrl: "https://bro-or-fraud.vercel.app/",
      image: "/assets/bro_or_fraud_real.png",
    },
  ] as Project[],

  pravah: {
    number: "03",
    label: "CURRENT BUILD",
    title: "PRAVAH",
    subtitle: "Flood-aware route intelligence and accessibility platform.",
    status: "BUILD STATUS: ACTIVE · PROTOTYPE / MVP",
    tagline: "Recalculating safe urban corridors during monsoon inundations.",
    problem: "During severe monsoon rain in Raipur, standard navigation systems assume road networks are uniformly accessible. They route vehicles into submerged underpasses and low-lying river basin bottlenecks, creating emergency hazards.",
    idea: "PRAVAH integrates topographical elevation contours and flood inundation perimeters into dynamic graph-routing weights. Inundated segments are severed or cost-penalized, while higher-elevation arterials are prioritized.",
    routeIntelligence: "Instead of selecting purely the shortest distance path, PRAVAH applies depth-weighted Dijkstra / A* cost functions to guarantee traversable evacuation corridors to trauma centers like AIIMS Raipur.",
    architecture: [
      { step: "01", name: "GEOSPATIAL ELEVATION", desc: "Digital elevation model & contour line rasterization for Raipur basin." },
      { step: "02", name: "DYNAMIC GRAPH ENGINE", desc: "A* graph weighting dynamically modified by localized inundation thresholds." },
      { step: "03", name: "OFFLINE MESH RESILIENCE", desc: "Lightweight hazard delta payloads designed to function when cell towers suffer outages." },
      { step: "04", name: "CRITICAL NODE INDEXING", desc: "Persistent accessibility scoring for primary hospitals and relief depots." },
    ],
    technicalStack: ["React", "TypeScript", "Geospatial GIS", "Topology Contours", "A* Graph Routing", "Node.js"],
    currentStatusNote: "Active prototype focusing on corridor recalculation and simulation across the Raipur metropolitan sector.",
    nextSteps: "Validating against historical inundation logs, testing low-bandwidth offline vectors, and refining civic hazard alert hooks.",
  },

  learning: {
    label: "TECHNICAL NOTEBOOK",
    title: "WHAT I'M LEARNING",
    primary: "DSA WITH C++",
    supportingText: "Building stronger problem-solving fundamentals through DSA, competitive programming, and consistent practice.",
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

    profiles: [
      {
        platform: "LEETCODE",
        username: "@udaysahu_",
        url: "https://leetcode.com/u/udaysahu_/",
        description: "Algorithmic problem solving, array invariants, and data structure mechanics.",
      },
      {
        platform: "CODEFORCES",
        username: "@udaysahu",
        url: "https://codeforces.com/profile/udaysahu",
        description: "Competitive programming practice, time complexity bounds, and contest simulations in C++20.",
      },
      {
        platform: "GEEKSFORGEEKS",
        username: "@udaysahuuu",
        url: "https://www.geeksforgeeks.org/profile/udaysahuuu",
        description: "Core DSA fundamentals, Standard Template Library (STL), and implementation drills.",
      },
    ],
  },

  process: [
    {
      number: "01",
      title: "OBSERVE",
      tagline: "Understand the actual problem before touching the code.",
      description: "Analyze ground-level friction, identify the actual bottleneck, and determine whether software is the right solution before writing a single line.",
    },
    {
      number: "02",
      title: "EXPLORE",
      tagline: "Research constraints, users, existing solutions and technical possibilities.",
      description: "Examine architectural tradeoffs, assess offline feasibility, study edge-case failures, and understand real user constraints.",
    },
    {
      number: "03",
      title: "BUILD",
      tagline: "Turn the idea into a working prototype.",
      description: "Translate specifications into robust, functional code using TypeScript, C++, Python, or React—focusing on core mechanics first.",
    },
    {
      number: "04",
      title: "ITERATE",
      tagline: "Test, break, improve and repeat.",
      description: "Subject prototypes to weak networks, measure load footprints, refine ergonomics, and harden against real-world failure modes.",
    },
  ] as ProcessStep[],

  about: {
    label: "[05] ABOUT",
    heading: "WHO IS UDAY?",
    lead: "CSE student. Developer. Builder. Based in Raipur, India.",
    bio: [
      "I am an engineering student and builder focused on practical software products, hackathon prototypes, and open-source systems.",
      "My approach is grounded in real-world utility: understanding the actual problem, designing systems that handle edge cases cleanly, and shipping code that works reliably.",
    ],
    currentDirection: [
      "Building practical software",
      "Hackathons",
      "DSA with C++",
      "Open source",
      "GSoC preparation",
      "Exploring AI/software systems",
    ],
    longTermProject: {
      title: "Wildlife Animal Detection Using Camera Trap Images",
      type: "Academic Semester Research / B.Tech Track",
      description: "A multi-semester research initiative exploring computer vision models on nocturnal infrared camera-trap feeds. Focuses on real-world challenges: night-time motion blur, heavy vegetation camouflage, false positives from wind, and power-efficient edge inferencing.",
      image: "/assets/wildlife_preview.jpg",
    },
  },

  journey: [
    {
      period: "2026",
      tag: "HACKATHONS",
      title: "Rapid Prototyping & Real-World Problem Solving",
      subtitle: "Hackathons & Prototype Sprints",
      description: "Turning raw problem statements into fully functional prototypes within 24–48 hours, prioritizing offline resilience and core utility under pressure.",
    },
    {
      period: "2026",
      tag: "CURRENT BUILD",
      title: "PRAVAH — Flood-Aware Route Intelligence",
      subtitle: "Active Prototype / MVP",
      description: "Developing dynamic graph-routing models that recalculate safe transit corridors based on urban inundation boundaries and elevation contours in Raipur.",
    },
    {
      period: "2026",
      tag: "OPEN SOURCE",
      title: "Exploring Contribution & GSoC Preparation",
      subtitle: "Open Source Communities",
      description: "Reading large-scale distributed codebases, understanding production code review standards, and preparing for Google Summer of Code contributions.",
    },
    {
      period: "2026",
      tag: "DSA PRACTICE",
      title: "DSA with C++ Fundamentals",
      subtitle: "C++20 Problem Solving",
      description: "Systematic practice on arrays, two-pointers, hashing, prefix sums, binary search, and asymptotic time/space guarantees.",
    },
    {
      period: "LONG TERM",
      tag: "COMPUTER VISION",
      title: "Wildlife Camera-Trap Animal Detection",
      subtitle: "Ongoing Academic Semester Project",
      description: "Explaining and evaluating computer vision models on nocturnal infrared camera feeds from Central Indian wildlife reserves.",
    },
  ] as JourneyMilestone[],
};
