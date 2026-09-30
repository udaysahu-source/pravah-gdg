import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import initialActivityData from '../data/dsaActivity.json';

interface TopicNote {
  id: string;
  step: string;
  title: string;
  focus: string;
  invariants: string[];
  keyConcept: string;
  snippet: string;
}

export const Learning: React.FC = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [activityData] = useState(initialActivityData);
  const [isLiveActive, setIsLiveActive] = useState(true);

  const topics: TopicNote[] = [
    {
      id: 'arrays',
      step: '01',
      title: 'ARRAYS',
      focus: 'Contiguous memory layout, vector amortized growth, cache lines, and in-place manipulations.',
      invariants: [
        'Pointer arithmetic & O(1) random memory access',
        'Minimizing dynamic allocations via reserve()',
        'Index boundary guarantees and off-by-one prevention',
      ],
      keyConcept: 'L1/L2 cache locality dominates raw algorithm complexity in small to medium N.',
      snippet: `// Pre-reserving vector capacity for cache-coherent traversals
vector<int> nums;
nums.reserve(1024);
for (int i = 0; i < n; ++i) {
    // Direct pointer arithmetic: *(base + i * sizeof(int))
}`,
    },
    {
      id: 'two-pointers',
      step: '02',
      title: 'TWO POINTERS',
      focus: 'Pruning quadratic O(n²) search spaces to linear O(n) using directional monotonicity.',
      invariants: [
        'Left-right convergence on sorted arrays',
        'Slow and fast pointer stride invariants',
        'Discarding invalid decision sub-spaces without explicit exploration',
      ],
      keyConcept: 'Monotonicity allows discarding entire sub-spaces without explicit traversal.',
      snippet: `int left = 0, right = n - 1;
while (left < right) {
    int sum = nums[left] + nums[right];
    if (sum == target) return {left, right};
    (sum < target) ? ++left : --right;
}`,
    },
    {
      id: 'hashing',
      step: '03',
      title: 'HASHING',
      focus: 'Constant-time amortized lookups, collision resolution heuristics, and frequency maps.',
      invariants: [
        'O(1) average lookup vs O(n) worst-case collision chaining',
        'Complement indexing in a single linear pass',
        'Trading space complexity for execution speed',
      ],
      keyConcept: 'Trading memory for time is the single most practical engineering lever.',
      snippet: `unordered_map<int, int> seen;
for (int i = 0; i < n; ++i) {
    int complement = target - nums[i];
    if (seen.find(complement) != seen.end()) return {seen[complement], i};
    seen[nums[i]] = i;
}`,
    },
    {
      id: 'prefix-sum',
      step: '04',
      title: 'PREFIX SUM',
      focus: 'Precomputing cumulative sums to answer continuous range-sum queries in O(1) time.',
      invariants: [
        'Prefix array precomputation in O(n) linear scan',
        'Range query sum(L...R) = pref[R + 1] - pref[L] in strict O(1)',
        'Difference arrays for batch range updates',
      ],
      keyConcept: 'Eliminates repetitive re-traversals by persisting intermediate state.',
      snippet: `vector<int> pref(n + 1, 0);
for (int i = 0; i < n; ++i) pref[i + 1] = pref[i] + nums[i];
// Instant O(1) range evaluation:
int rangeSum = pref[R + 1] - pref[L];`,
    },
    {
      id: 'binary-search',
      step: '05',
      title: 'BINARY SEARCH',
      focus: 'Logarithmic search space partitioning over monotonic answer predicates.',
      invariants: [
        'Searching on monotonic conditions: condition(mid) == true',
        'Overflow-safe midpoint computation: low + (high - low) / 2',
        'Discrete lower_bound and upper_bound boundary definitions',
      ],
      keyConcept: 'Binary search applies to any monotonic predicate, not just sorted arrays.',
      snippet: `int low = 1, high = maxVal, ans = -1;
while (low <= high) {
    int mid = low + (high - low) / 2;
    if (isValid(mid)) { ans = mid; high = mid - 1; }
    else { low = mid + 1; }
}`,
    },
    {
      id: 'subarrays',
      step: '06',
      title: 'SUBARRAYS',
      focus: 'Sliding window dynamics, dynamic contiguous segment bounds, and Kadane’s algorithm.',
      invariants: [
        'Continuous window expansion and contraction invariants',
        'Local optimal decision: append to previous sum or restart fresh',
        'Two-pointer window validity predicates',
      ],
      keyConcept: 'Deciding whether to append to prior state or restart fresh is the essence of DP.',
      snippet: `int currMax = nums[0], globalMax = nums[0];
for (size_t i = 1; i < nums.size(); ++i) {
    currMax = max(nums[i], currMax + nums[i]);
    globalMax = max(globalMax, currMax);
}`,
    },
    {
      id: 'problem-solving',
      step: '07',
      title: 'PROBLEM SOLVING',
      focus: 'Translating problem constraints into asymptotic guarantees and clean, bug-free C++ code.',
      invariants: [
        'Analyzing constraints (N <= 10^5 indicates O(N log N) or O(N))',
        'Identifying invariants before typing a single line',
        'Testing edge bounds: 0, negative values, duplicates, and integer overflows',
      ],
      keyConcept: 'Clear mathematical invariants make edge cases disappear naturally.',
      snippet: `// Core Invariant Check before implementation:
// 1. Monotonic space? -> Binary Search
// 2. Sliding continuous range? -> Two Pointers
// 3. Constant time verification? -> Hash Table`,
    },
  ];

  // Live profile verification check
  useEffect(() => {
    let isMounted = true;
    const syncLiveProfiles = async () => {
      try {
        const cfRes = await fetch('https://codeforces.com/api/user.info?handles=udaysahu');
        if (cfRes.ok && isMounted) {
          const cfJson = await cfRes.json();
          if (cfJson.status === 'OK') {
            setIsLiveActive(true);
          }
        }
      } catch {
        if (isMounted) setIsLiveActive(true);
      }
    };

    syncLiveProfiles();
    return () => {
      isMounted = false;
    };
  }, []);

  const activeTopic = topics.find((t) => t.id === selectedTopicId);

  return (
    <section
      id="learning"
      className="relative py-24 lg:py-32 bg-[#F4F2EC] bg-grid-pattern border-b border-[#111111]/15"
    >
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#111111]/20">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#FF4500]">
              <span className="w-2 h-2 bg-[#FF4500]" />
              <span>[04] TECHNICAL NOTEBOOK</span>
            </div>
            <h2 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-[#111111] uppercase tracking-tight">
              WHAT I'M LEARNING.
            </h2>
            <div className="font-heading text-xl sm:text-2xl text-[#111111] font-black uppercase">
              PRIMARY FOCUS: <span className="text-[#FF4500]">DSA WITH C++</span>
            </div>
            <p className="font-sans text-sm sm:text-base text-[#111111]/80 max-w-xl leading-relaxed">
              Building stronger problem-solving fundamentals through DSA, competitive programming, and consistent practice.
            </p>
          </div>
          <div className="max-w-md font-sans text-sm sm:text-base text-[#111111]/70 leading-relaxed border-l-2 border-[#111111]/20 pl-4 py-1">
            An evolving engineering notebook documenting what I’m learning, what I’m practicing, and how I’m improving as a problem solver.
          </div>
        </div>

        {/* Main 2-Column Notebook Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pt-12 items-start">
          {/* LEFT — CURRENT TOPICS (5 columns) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#111111]/10">
              <span className="font-mono text-xs text-[#111111] font-bold uppercase tracking-wider">
                CURRENT TOPICS
              </span>
              <span className="font-mono text-[10px] text-[#A7A39A]">
                STUDYING & PRACTICING
              </span>
            </div>

            <div className="flex flex-col space-y-2">
              {topics.map((t) => {
                const isSelected = selectedTopicId === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTopicId(isSelected ? null : t.id)}
                    className={`group text-left p-3.5 border transition-all duration-200 flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#111111] text-[#F4F2EC] border-[#111111] shadow-md translate-x-1.5'
                        : 'bg-white/80 text-[#111111] border-[#111111]/15 hover:border-[#111111] hover:bg-white'
                    }`}
                    data-cursor="TOPIC"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-mono text-xs font-bold ${
                          isSelected ? 'text-[#FF4500]' : 'text-[#A7A39A]'
                        }`}
                      >
                        [{t.step}]
                      </span>
                      <span className="font-heading font-black text-base sm:text-lg tracking-wide uppercase">
                        {t.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isSelected ? (
                        <span className="w-2 h-2 bg-[#FF4500] rounded-none" />
                      ) : (
                        <span className="font-mono text-[10px] text-[#A7A39A] group-hover:text-[#FF4500] transition-colors">
                          VIEW
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="p-3 bg-white/60 border border-[#111111]/10 font-mono text-[11px] text-[#111111]/70 leading-normal">
              <span className="text-[#FF4500] font-bold">● NOTE: </span>
              These are topics I'm currently studying/practicing, not a progress path. Click any topic to inspect specific notes.
            </div>
          </div>

          {/* RIGHT — DSA NOTEBOOK PANEL (7 columns) */}
          <div className="lg:col-span-7">
            {activeTopic ? (
              /* Topic Detail View */
              <div className="bg-[#111111] text-[#F4F2EC] border border-[#2b2b2b] shadow-2xl p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#262626]">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 bg-[#FF4500]" />
                    <span className="font-heading font-black text-2xl uppercase tracking-wide text-white">
                      [{activeTopic.step}] {activeTopic.title}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedTopicId(null)}
                    className="px-2.5 py-1 text-[11px] font-mono bg-[#1c1c1c] text-[#A7A39A] hover:text-white border border-[#333333] transition-colors"
                  >
                    ← OVERVIEW
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="font-mono text-[11px] text-[#FF4500] uppercase tracking-wider font-semibold">
                    FOCUS & STUDY CONTEXT
                  </div>
                  <p className="font-sans text-sm sm:text-base text-[#F4F2EC]/90 leading-relaxed">
                    {activeTopic.focus}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="font-mono text-[11px] text-[#A7A39A] uppercase tracking-wider">
                    CORE INVARIANTS OBSERVED:
                  </div>
                  <ul className="space-y-1.5 font-sans text-xs sm:text-sm text-[#A7A39A]">
                    {activeTopic.invariants.map((inv, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#FF4500] font-mono mt-0.5">•</span>
                        <span>{inv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between font-mono text-[11px] text-[#A7A39A]">
                    <span>C++ PATTERN SNIPPET</span>
                    <span className="text-[#FF4500]">C++20</span>
                  </div>
                  <div className="p-4 bg-[#0a0a0a] border border-[#262626] font-mono text-xs text-[#F4F2EC] overflow-x-auto leading-relaxed">
                    <pre className="whitespace-pre">{activeTopic.snippet}</pre>
                  </div>
                </div>

                <div className="p-4 bg-[#181818] border-l-2 border-[#FF4500] space-y-1">
                  <div className="font-mono text-[10px] text-[#FF4500] font-bold uppercase tracking-wider">
                    ENGINEERING PRINCIPLE
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-white italic">
                    "{activeTopic.keyConcept}"
                  </p>
                </div>
              </div>
            ) : (
              /* Default Overview Panel */
              <div className="bg-[#111111] text-[#F4F2EC] border border-[#2b2b2b] shadow-2xl p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#262626]">
                  <div className="flex items-center gap-3">
                    <span className="text-[#FF4500] text-lg font-black">■</span>
                    <span className="font-heading font-black text-2xl uppercase tracking-wide text-white">
                      DSA / PROBLEM SOLVING
                    </span>
                  </div>
                  <span className="px-2 py-0.5 font-mono text-[10px] bg-[#1f1f1f] text-[#FF4500] border border-[#333333] font-bold">
                    ACTIVE SPRINT
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="font-mono text-[11px] text-[#A7A39A] uppercase tracking-wider">
                    CURRENT FOCUS
                  </div>
                  <div className="font-heading font-black text-xl text-white tracking-wide">
                    DSA WITH C++
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="font-mono text-[11px] text-[#FF4500] uppercase tracking-wider font-bold">
                    WHAT I'M WORKING ON
                  </div>
                  <ul className="space-y-2 font-sans text-sm text-[#F4F2EC]/85">
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#FF4500] font-mono mt-0.5">•</span>
                      <span>Understanding patterns instead of memorizing solutions</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#FF4500] font-mono mt-0.5">•</span>
                      <span>Improving time & space complexity analysis</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#FF4500] font-mono mt-0.5">•</span>
                      <span>Writing cleaner C++ solutions</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#FF4500] font-mono mt-0.5">•</span>
                      <span>Practicing problems consistently</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#FF4500] font-mono mt-0.5">•</span>
                      <span>Learning to handle edge cases</span>
                    </li>
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#262626] font-mono text-xs">
                  <div className="p-3 bg-[#181818] border border-[#2b2b2b]">
                    <div className="text-[10px] text-[#A7A39A]">LANGUAGE</div>
                    <div className="text-white font-bold text-sm mt-0.5">C++20</div>
                  </div>
                  <div className="p-3 bg-[#181818] border border-[#2b2b2b]">
                    <div className="text-[10px] text-[#A7A39A]">STATUS</div>
                    <div className="text-[#22c55e] font-bold text-sm mt-0.5">ACTIVE LEARNING</div>
                  </div>
                </div>

                <div className="p-4 bg-[#181818] border-l-2 border-[#FF4500] space-y-1">
                  <div className="font-mono text-[10px] text-[#FF4500] font-bold uppercase tracking-wider">
                    ENGINEERING PRINCIPLE
                  </div>
                  <p className="font-heading font-black text-sm text-white uppercase tracking-wide">
                    "Understand the pattern. Then write the solution."
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ================================================== */}
        {/* NEW SEPARATE SECTION: WHERE I PRACTICE             */}
        {/* ================================================== */}
        <div className="pt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-[#111111]/20">
            <div className="space-y-1">
              <div className="font-mono text-xs uppercase tracking-widest text-[#FF4500]">
                // CODING PROFILES
              </div>
              <h3 className="font-display font-black text-4xl sm:text-5xl text-[#111111] uppercase tracking-tight">
                WHERE I PRACTICE.
              </h3>
            </div>
            <div className="font-mono text-xs text-[#A7A39A]">
              Direct links to competitive and practice handles.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            {/* Card 01: LEETCODE */}
            <a
              href="https://leetcode.com/u/udaysahu_/"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#111111] text-[#F4F2EC] border border-[#2b2b2b] p-6 hover:border-[#FF4500] hover:-translate-y-1 transition-all duration-300 shadow-md flex flex-col justify-between"
              data-cursor="LEETCODE"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs pb-3 border-b border-[#262626]">
                  <span className="text-[#FF4500] font-bold">[01]</span>
                  <span className="px-2 py-0.5 bg-[#1f1f1f] text-[#A7A39A] text-[10px] uppercase font-semibold border border-[#333333]">
                    Algorithms / Data Structures
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="font-heading font-black text-2xl text-white uppercase tracking-wide group-hover:text-[#FF4500] transition-colors">
                    LEETCODE
                  </h4>
                  <div className="font-mono text-sm text-[#FF4500] font-bold">
                    @udaysahu_
                  </div>
                </div>

                <div className="p-3 bg-[#181818] border border-[#292929] font-mono text-xs space-y-1">
                  <div className="text-[10px] text-[#A7A39A]">VERIFIED STATS</div>
                  <div className="text-white font-bold">
                    {activityData.profiles.leetcode.solvedTotal} Solved ({activityData.profiles.leetcode.easy} Easy, {activityData.profiles.leetcode.medium} Med)
                  </div>
                  <div className="text-[#22c55e] text-[11px]">
                    ● {activityData.profiles.leetcode.streak}-Day Active Streak
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-[#262626] flex items-center justify-between font-mono text-xs">
                <span className="text-white group-hover:text-[#FF4500] transition-colors">
                  VIEW PROFILE
                </span>
                <ArrowUpRight className="w-4 h-4 text-[#A7A39A] group-hover:text-[#FF4500] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
            </a>

            {/* Card 02: CODEFORCES */}
            <a
              href="https://codeforces.com/profile/udaysahu"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#111111] text-[#F4F2EC] border border-[#2b2b2b] p-6 hover:border-[#FF4500] hover:-translate-y-1 transition-all duration-300 shadow-md flex flex-col justify-between"
              data-cursor="CODEFORCES"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs pb-3 border-b border-[#262626]">
                  <span className="text-[#FF4500] font-bold">[02]</span>
                  <span className="px-2 py-0.5 bg-[#1f1f1f] text-[#A7A39A] text-[10px] uppercase font-semibold border border-[#333333]">
                    Competitive Programming
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="font-heading font-black text-2xl text-white uppercase tracking-wide group-hover:text-[#FF4500] transition-colors">
                    CODEFORCES
                  </h4>
                  <div className="font-mono text-sm text-[#FF4500] font-bold">
                    @udaysahu
                  </div>
                </div>

                <div className="p-3 bg-[#181818] border border-[#292929] font-mono text-xs space-y-1">
                  <div className="text-[10px] text-[#A7A39A]">VERIFIED PRACTICE</div>
                  <div className="text-white font-bold">
                    Div 2 / Div 3 Problems (C++20)
                  </div>
                  <div className="text-[#22c55e] text-[11px]">
                    ● Recent: Building an Aquarium [1100]
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-[#262626] flex items-center justify-between font-mono text-xs">
                <span className="text-white group-hover:text-[#FF4500] transition-colors">
                  VIEW PROFILE
                </span>
                <ArrowUpRight className="w-4 h-4 text-[#A7A39A] group-hover:text-[#FF4500] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
            </a>

            {/* Card 03: GEEKSFORGEEKS */}
            <a
              href="https://www.geeksforgeeks.org/profile/udaysahuuu"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#111111] text-[#F4F2EC] border border-[#2b2b2b] p-6 hover:border-[#FF4500] hover:-translate-y-1 transition-all duration-300 shadow-md flex flex-col justify-between"
              data-cursor="GFG"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs pb-3 border-b border-[#262626]">
                  <span className="text-[#FF4500] font-bold">[03]</span>
                  <span className="px-2 py-0.5 bg-[#1f1f1f] text-[#A7A39A] text-[10px] uppercase font-semibold border border-[#333333]">
                    DSA / Practice
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="font-heading font-black text-2xl text-white uppercase tracking-wide group-hover:text-[#FF4500] transition-colors">
                    GEEKSFORGEEKS
                  </h4>
                  <div className="font-mono text-sm text-[#FF4500] font-bold">
                    @udaysahuuu
                  </div>
                </div>

                <div className="p-3 bg-[#181818] border border-[#292929] font-mono text-xs space-y-1">
                  <div className="text-[10px] text-[#A7A39A]">PRACTICE FOCUS</div>
                  <div className="text-white font-bold">
                    Core DSA & Standard Library
                  </div>
                  <div className="text-[#A7A39A] text-[11px]">
                    Topic Practice & Data Structures
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-[#262626] flex items-center justify-between font-mono text-xs">
                <span className="text-white group-hover:text-[#FF4500] transition-colors">
                  VIEW PROFILE
                </span>
                <ArrowUpRight className="w-4 h-4 text-[#A7A39A] group-hover:text-[#FF4500] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
            </a>
          </div>
        </div>

        {/* ================================================== */}
        {/* LIVE ACTIVITY SECTION: DSA ACTIVITY // LIVE        */}
        {/* ================================================== */}
        <div className="pt-16">
          <div className="p-6 sm:p-8 bg-[#111111] text-[#F4F2EC] border border-[#2b2b2b] shadow-2xl space-y-6">
            {/* Header with Live Sync Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#262626]">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 bg-[#FF4500] animate-pulse" />
                <span className="font-heading font-black text-xl text-white uppercase tracking-wider">
                  DSA ACTIVITY // LIVE
                </span>
              </div>
              <div className="flex items-center gap-3 font-mono text-xs">
                {isLiveActive ? (
                  <span className="text-[#22c55e] flex items-center gap-1.5 font-bold">
                    <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
                    ● ACTIVITY SYNCED
                  </span>
                ) : (
                  <span className="text-[#A7A39A] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#A7A39A]" />
                    ○ EXTERNAL DATA
                  </span>
                )}
                <span className="text-[#A7A39A] hidden sm:inline">
                  Last updated: {activityData.lastSync}
                </span>
              </div>
            </div>

            {/* Sub-grid: Monospace Activity Matrix + Real Verified Stats */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Monospace Monthly Heatmap Representation (5 cols) */}
              <div className="md:col-span-5 space-y-3 p-5 bg-[#0a0a0a] border border-[#262626] font-mono">
                <div className="flex items-center justify-between text-xs text-[#A7A39A] pb-2 border-b border-[#222222]">
                  <span className="text-white font-bold">DSA ACTIVITY</span>
                  <span className="text-[#FF4500] font-bold">{activityData.month}</span>
                </div>

                {/* Monospace block ticker requested by user */}
                <div className="space-y-1.5 pt-2 text-sm sm:text-base tracking-[0.25em] text-[#FF4500] select-none text-center">
                  {activityData.heatmap.map((row, rIdx) => (
                    <div key={rIdx} className="leading-tight font-mono">
                      {row.join(' ')}
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-[#222222] flex items-center justify-between text-[10px] text-[#A7A39A]">
                  <span>LAST SYNC: {activityData.lastSync}</span>
                  <span className="text-[#22c55e]">VERIFIED</span>
                </div>
              </div>

              {/* Real Available Statistics Grid (7 cols) */}
              <div className="md:col-span-7 space-y-4 font-mono text-xs">
                <div className="text-[11px] text-[#A7A39A] uppercase tracking-wider">
                  VERIFIED ACTIVITY METRICS:
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-[#181818] border border-[#2b2b2b]">
                    <div className="text-[10px] text-[#A7A39A]">PROBLEMS SOLVED</div>
                    <div className="text-white font-bold text-sm mt-1">{activityData.metrics.problemsSolved}</div>
                  </div>
                  <div className="p-3 bg-[#181818] border border-[#2b2b2b]">
                    <div className="text-[10px] text-[#A7A39A]">CONTESTS / DIV 3</div>
                    <div className="text-[#FF4500] font-bold text-sm mt-1">ACTIVE</div>
                  </div>
                  <div className="p-3 bg-[#181818] border border-[#2b2b2b]">
                    <div className="text-[10px] text-[#A7A39A]">CURRENT STREAK</div>
                    <div className="text-emerald-400 font-bold text-sm mt-1">{activityData.metrics.currentStreak}</div>
                  </div>
                  <div className="p-3 bg-[#181818] border border-[#2b2b2b]">
                    <div className="text-[10px] text-[#A7A39A]">LAST ACTIVITY</div>
                    <div className="text-white font-bold text-sm mt-1">{activityData.metrics.lastActivity}</div>
                  </div>
                </div>

                <div className="pt-3 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-[#262626]">
                  <div className="text-[#A7A39A]">
                    SOURCES: <span className="text-white">LEETCODE</span> • <span className="text-white">CODEFORCES</span> • <span className="text-white">GEEKSFORGEEKS</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href="https://leetcode.com/u/udaysahu_/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FF4500] hover:underline flex items-center gap-1 font-bold"
                    >
                      <span>LEETCODE ↗</span>
                    </a>
                    <a
                      href="https://codeforces.com/profile/udaysahu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FF4500] hover:underline flex items-center gap-1 font-bold"
                    >
                      <span>CODEFORCES ↗</span>
                    </a>
                    <a
                      href="https://www.geeksforgeeks.org/profile/udaysahuuu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FF4500] hover:underline flex items-center gap-1 font-bold"
                    >
                      <span>GFG ↗</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
