import React, { useState } from 'react';
import { Radio, Layers } from 'lucide-react';

interface PravahSimulationProps {
  compact?: boolean;
}

export const PravahSimulation: React.FC<PravahSimulationProps> = () => {
  const [floodScenario, setFloodScenario] = useState<'moderate' | 'severe' | 'cleared'>('moderate');
  const [selectedNode, setSelectedNode] = useState<string | null>('aiims');

  const nodes = [
    {
      id: 'aiims',
      name: 'AIIMS Raipur Corridor',
      type: 'hospital',
      status: 'ACCESSIBLE',
      depth: '0 cm',
      pos: { x: 74, y: 32 },
      note: 'Primary trauma center reachability verified via Ring Road 1.',
    },
    {
      id: 'kharun',
      name: 'Kharun River Bridge 02',
      type: 'blocked',
      status: 'SUBMERGED',
      depth: '94 cm',
      pos: { x: 38, y: 46 },
      note: 'Water level +1.8m above crest. Structural sensors indicate impassable.',
    },
    {
      id: 'telibandha',
      name: 'Telibandha Arterial',
      type: 'at-risk',
      status: 'AT RISK',
      depth: '28 cm',
      pos: { x: 62, y: 64 },
      note: 'Heavy surface accumulation; safe only for high-clearance emergency transport.',
    },
    {
      id: 'station',
      name: 'Raipur Junction Hub',
      type: 'usable',
      status: 'SAFE',
      depth: '4 cm',
      pos: { x: 44, y: 26 },
      note: 'North elevated railway underpass clear for transit.',
    },
  ];

  const scenarioStats = {
    moderate: {
      waterLevel: '14.2m MSL (+1.6m)',
      blockedRoads: '18 Segments',
      safeCorridors: '82%',
      routeStatus: 'DYNAMIC REROUTE ACTIVE',
    },
    severe: {
      waterLevel: '16.8m MSL (+4.2m)',
      blockedRoads: '42 Segments',
      safeCorridors: '49%',
      routeStatus: 'EVACUATION RESTRICTED',
    },
    cleared: {
      waterLevel: '11.5m MSL (BASELINE)',
      blockedRoads: '2 Segments',
      safeCorridors: '98%',
      routeStatus: 'NOMINAL FLOW',
    },
  }[floodScenario];

  return (
    <div
      className="relative bg-[#111111] text-[#F4F2EC] border border-[#2b2b2b] shadow-2xl overflow-hidden font-mono"
      data-cursor="INSPECT"
    >
      {/* Top HUD Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#262626] bg-[#161616]">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 bg-[#FF4500] animate-pulse" />
          <div className="flex items-baseline gap-2">
            <span className="font-heading font-black tracking-wider text-sm text-white">PRAVAH</span>
            <span className="text-[10px] text-[#A7A39A] hidden sm:inline">
              // FLOOD-AWARE ROUTE INTELLIGENCE
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-[10px]">
          <span className="px-2 py-0.5 bg-[#FF4500]/15 text-[#FF4500] border border-[#FF4500]/30 font-bold">
            STATUS: ACTIVE SPRINT
          </span>
          <span className="text-[#A7A39A] hidden md:inline">BUILD / 001</span>
        </div>
      </div>

      {/* Map & Visual Viewport */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#0c0c0c]">
        {/* Real GIS satellite/terrain base graphic */}
        <img
          src="/assets/pravah_preview.jpg"
          alt="PRAVAH Raipur Flood Intelligence Map Visual"
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity filter contrast-125 hover:opacity-75 transition-opacity duration-500"
          loading="eager"
        />

        {/* Technical Grid Overlay */}
        <div className="absolute inset-0 bg-grid-dark pointer-events-none opacity-40" />

        {/* Dynamic Vector Route Contours & Simulation Overlay */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Simulated Flood Extent Zone */}
          <path
            d={
              floodScenario === 'severe'
                ? 'M 20,40 Q 35,55 50,45 T 75,50 L 80,75 L 30,85 Z'
                : floodScenario === 'moderate'
                ? 'M 25,44 Q 35,50 48,46 T 65,52 L 68,68 L 32,74 Z'
                : 'M 28,48 Q 36,50 45,48 T 58,52 L 60,60 L 34,62 Z'
            }
            fill="#FF4500"
            fillOpacity={floodScenario === 'severe' ? '0.22' : '0.12'}
            stroke="#FF4500"
            strokeWidth="0.5"
            strokeDasharray="1,1"
            className="transition-all duration-700"
          />

          {/* Recalculated Safe Corridor Path */}
          <path
            d="M 15,80 L 40,70 L 44,26 L 62,35 L 74,32 L 90,25"
            fill="none"
            stroke={floodScenario === 'severe' ? '#eab308' : '#22c55e'}
            strokeWidth="0.8"
            strokeDasharray="2,1"
          />
        </svg>

        {/* Interactive Telemetry Nodes */}
        {nodes.map((node) => {
          const nodeColor =
            node.type === 'hospital'
              ? 'bg-[#22c55e] border-[#22c55e]'
              : node.type === 'blocked'
              ? 'bg-[#FF4500] border-[#FF4500]'
              : node.type === 'at-risk'
              ? 'bg-[#eab308] border-[#eab308]'
              : 'bg-[#38bdf8] border-[#38bdf8]';

          return (
            <button
              key={node.id}
              onClick={() => setSelectedNode(node.id)}
              className="absolute group z-10 -translate-x-1/2 -translate-y-1/2 focus:outline-none"
              style={{ left: `${node.pos.x}%`, top: `${node.pos.y}%` }}
              aria-label={`Inspect ${node.name}`}
            >
              <div className="relative flex items-center justify-center">
                <span className={`w-3 h-3 rounded-none ${nodeColor} shadow-md transition-transform group-hover:scale-150`} />
                <span className={`absolute w-6 h-6 border ${nodeColor} opacity-75 radar-ping`} />
              </div>
              <span className="absolute left-4 top-1/2 -translate-y-1/2 px-1.5 py-0.5 bg-[#111111]/90 border border-[#333333] text-[9px] text-[#F4F2EC] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {node.name} [{node.status}]
              </span>
            </button>
          );
        })}

        {/* Floating Telemetry Coordinates */}
        <div className="absolute top-3 left-3 bg-[#111111]/85 backdrop-blur-sm border border-[#2b2b2b] px-2.5 py-1.5 text-[9px] space-y-0.5 pointer-events-none">
          <div className="text-[#FF4500] font-bold">RAIPUR METRO SECTOR // 01</div>
          <div className="text-[#A7A39A]">COORD: 21.2514° N, 81.6296° E</div>
          <div className="text-[#A7A39A]">TOPOLOGY: KHARUN RIVER BASIN</div>
        </div>

        {/* Real-time Status Floating Box */}
        <div className="absolute bottom-3 right-3 bg-[#111111]/90 backdrop-blur-sm border border-[#2b2b2b] p-2.5 text-[9px] max-w-[210px] hidden sm:block">
          <div className="flex items-center gap-1.5 text-[#FF4500] font-semibold mb-1">
            <Radio className="w-3 h-3 animate-spin" />
            <span>GEO-ROUTING ENGINE</span>
          </div>
          <p className="text-[#A7A39A] leading-tight">
            Recalculating A* edge weightings based on live precipitation & depth telemetry.
          </p>
        </div>
      </div>

      {/* Selected Node Drawer / Info strip */}
      {selectedNode && (
        <div className="bg-[#181818] border-t border-[#262626] px-4 py-2.5 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[#FF4500] font-bold">NODE TELEMETRY:</span>
            <span className="text-white font-semibold">
              {nodes.find((n) => n.id === selectedNode)?.name}
            </span>
            <span className="px-1.5 py-0.2 bg-[#262626] text-[10px] text-[#A7A39A]">
              DEPTH: {nodes.find((n) => n.id === selectedNode)?.depth}
            </span>
          </div>
          <p className="text-[11px] text-[#A7A39A]">
            {nodes.find((n) => n.id === selectedNode)?.note}
          </p>
        </div>
      )}

      {/* Bottom Technical Telemetry & Scenario Selector */}
      <div className="p-4 bg-[#141414] border-t border-[#262626] space-y-3">
        {/* Scenario Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-[#A7A39A]">
            <Layers className="w-3.5 h-3.5 text-[#FF4500]" />
            <span>SIMULATION SCENARIO:</span>
          </div>
          <div className="flex items-center gap-1">
            {(['moderate', 'severe', 'cleared'] as const).map((sc) => (
              <button
                key={sc}
                onClick={() => setFloodScenario(sc)}
                className={`px-2.5 py-1 text-[11px] uppercase tracking-wider font-semibold border transition-all ${
                  floodScenario === sc
                    ? 'bg-[#FF4500] text-white border-[#FF4500]'
                    : 'bg-[#1c1c1c] text-[#A7A39A] border-[#333333] hover:text-white'
                }`}
              >
                {sc}
              </button>
            ))}
          </div>
        </div>

        {/* Telemetry Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-[#222222] text-[10px]">
          <div className="p-2 bg-[#191919] border border-[#262626]">
            <div className="text-[#A7A39A]">WATER LEVEL</div>
            <div className="text-white font-bold text-xs mt-0.5">{scenarioStats.waterLevel}</div>
          </div>
          <div className="p-2 bg-[#191919] border border-[#262626]">
            <div className="text-[#A7A39A]">BLOCKED SECTORS</div>
            <div className="text-[#FF4500] font-bold text-xs mt-0.5">{scenarioStats.blockedRoads}</div>
          </div>
          <div className="p-2 bg-[#191919] border border-[#262626]">
            <div className="text-[#A7A39A]">CORRIDOR ACCESS</div>
            <div className="text-emerald-400 font-bold text-xs mt-0.5">{scenarioStats.safeCorridors}</div>
          </div>
          <div className="p-2 bg-[#191919] border border-[#262626]">
            <div className="text-[#A7A39A]">SYSTEM DIRECTIVE</div>
            <div className="text-white font-bold text-xs mt-0.5 truncate">{scenarioStats.routeStatus}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
