import React, { useState } from 'react';
import { Compass, Navigation2 } from 'lucide-react';

interface PravahSimulationProps {
  compact?: boolean;
}

export const PravahSimulation: React.FC<PravahSimulationProps> = () => {
  const [simulationState, setSimulationState] = useState<'normal' | 'monsoon_flood'>('monsoon_flood');
  const [selectedNodeId, setSelectedNodeId] = useState<string>('aiims');

  const nodes = [
    {
      id: 'aiims',
      name: 'AIIMS Raipur Emergency Center',
      type: 'critical',
      elevation: 'Higher Elevation Corridor',
      normalStatus: 'Direct Arterial Reachable',
      floodStatus: 'Safe Corridors Maintained via Ring Road 1',
      coords: { x: 74, y: 32 },
      note: 'Primary trauma center reachability is prioritized by the routing algorithm.',
    },
    {
      id: 'kharun',
      name: 'Kharun River Basin Bridge',
      type: 'hazard',
      elevation: 'Low-Lying River Crest Basin',
      normalStatus: 'Traversable',
      floodStatus: 'Submerged / Impassable (Severed from Graph)',
      coords: { x: 38, y: 48 },
      note: 'Inundation threshold exceeded. Routing engine marks segment cost as infinite to divert traffic.',
    },
    {
      id: 'telibandha',
      name: 'Telibandha Arterial Sector',
      type: 'warning',
      elevation: 'Mid-Elevation Transition',
      normalStatus: 'Traversable',
      floodStatus: 'Waterlogged / Caution (High Clearance Only)',
      coords: { x: 62, y: 64 },
      note: 'Segment weight heavily penalized in A* cost function.',
    },
    {
      id: 'station',
      name: 'Raipur Junction Transit Hub',
      type: 'transit',
      elevation: 'Elevated Overpass Route',
      normalStatus: 'Traversable',
      floodStatus: 'Clear Elevated Overpass Corridor',
      coords: { x: 44, y: 26 },
      note: 'Elevated railway overpass remains accessible for emergency dispatch.',
    },
  ];

  const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];
  const isFlood = simulationState === 'monsoon_flood';

  return (
    <div
      className="relative bg-[#111111] text-[#F4F2EC] border border-[#2b2b2b] shadow-2xl overflow-hidden font-mono"
    >
      {/* Top Console Bar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-3 border-b border-[#262626] bg-[#161616] gap-2">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 bg-[#FF4500] animate-pulse" />
          <div className="flex items-baseline gap-2">
            <span className="font-heading font-black tracking-wider text-sm text-white">PRAVAH CONSOLE</span>
            <span className="text-[10px] text-[#A7A39A] hidden sm:inline">
              // EXPERIMENTAL GIS PROTOTYPE
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-[10px]">
          <span className="px-2 py-0.5 bg-[#FF4500]/15 text-[#FF4500] border border-[#FF4500]/30 font-bold">
            PROTOTYPE / MVP
          </span>
          <span className="text-[#A7A39A]">RAIPUR METRO SECTOR</span>
        </div>
      </div>

      {/* Map Viewport */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#0c0c0c]">
        {/* Real GIS satellite/terrain base graphic */}
        <img
          src="/assets/pravah_preview.jpg"
          alt="Topological and GIS satellite representation of Raipur sector"
          className="absolute inset-0 w-full h-full object-cover opacity-55 mix-blend-luminosity filter contrast-125"
          loading="lazy"
          width={1280}
          height={720}
        />

        {/* Technical Grid Overlay */}
        <div className="absolute inset-0 bg-grid-dark pointer-events-none opacity-40" />

        {/* Dynamic Route Contours & Simulation Overlay */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Simulated Flood Extent Zone (Shown only during flood state) */}
          {isFlood && (
            <path
              d="M 22,42 Q 35,52 48,46 T 66,54 L 68,72 L 28,78 Z"
              fill="#FF4500"
              fillOpacity="0.18"
              stroke="#FF4500"
              strokeWidth="0.6"
              strokeDasharray="1,1"
              className="transition-all duration-700"
            />
          )}

          {/* Normal Direct Route vs Recalculated Safe Corridor Route */}
          {isFlood ? (
            // Recalculated Safe Corridor bypassing the submerged bridge
            <path
              d="M 15,80 L 32,74 L 44,26 L 62,35 L 74,32 L 90,25"
              fill="none"
              stroke="#22c55e"
              strokeWidth="1.2"
              strokeDasharray="2,1"
            />
          ) : (
            // Normal baseline direct path across river
            <path
              d="M 15,80 L 38,48 L 62,64 L 74,32"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="1"
            />
          )}
        </svg>

        {/* Interactive Telemetry Nodes */}
        {nodes.map((node) => {
          const isSelected = selectedNodeId === node.id;
          const nodeColor =
            node.type === 'critical'
              ? 'bg-[#22c55e] border-[#22c55e]'
              : node.type === 'hazard' && isFlood
              ? 'bg-[#FF4500] border-[#FF4500]'
              : node.type === 'warning' && isFlood
              ? 'bg-[#eab308] border-[#eab308]'
              : 'bg-[#38bdf8] border-[#38bdf8]';

          return (
            <button
              key={node.id}
              type="button"
              onClick={() => setSelectedNodeId(node.id)}
              className="absolute group z-20 -translate-x-1/2 -translate-y-1/2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4500]"
              style={{ left: `${node.coords.x}%`, top: `${node.coords.y}%` }}
              aria-label={`Inspect ${node.name}`}
            >
              <div className="relative flex items-center justify-center p-1">
                <span className={`w-3.5 h-3.5 ${nodeColor} shadow-md transition-transform group-hover:scale-125 ${isSelected ? 'ring-2 ring-white scale-125' : ''}`} />
                <span className={`absolute w-6 h-6 border ${nodeColor} opacity-75 radar-ping`} />
              </div>

              {/* Tooltip on hover */}
              <span className="absolute left-5 top-1/2 -translate-y-1/2 px-2 py-1 bg-[#111111]/95 border border-[#333333] text-[10px] text-[#F4F2EC] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                {node.name}
              </span>
            </button>
          );
        })}

        {/* Sector Metadata Stamp */}
        <div className="absolute top-3 left-3 bg-[#111111]/90 backdrop-blur-sm border border-[#2b2b2b] px-3 py-1.5 text-[9px] space-y-0.5 pointer-events-none hidden sm:block">
          <div className="text-[#FF4500] font-bold">RAIPUR FLOOD CONTOUR SECTOR</div>
          <div className="text-[#A7A39A]">KHARUN BASIN · 21.2514° N, 81.6296° E</div>
        </div>

        {/* Route Behavior Legend */}
        <div className="absolute bottom-3 right-3 bg-[#111111]/90 backdrop-blur-sm border border-[#2b2b2b] p-2.5 text-[9px] max-w-[240px] space-y-1 hidden sm:block">
          <div className="text-white font-bold flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[#FF4500]" />
            <span>ALGORITHM BEHAVIOR</span>
          </div>
          <p className="text-[#A7A39A] leading-tight">
            {isFlood
              ? 'Submerged basin links severed. Traversable corridors rerouted along higher-elevation arterials.'
              : 'Standard baseline connectivity active without weather constraints.'}
          </p>
        </div>
      </div>

      {/* Selected Node Inspector Drawer */}
      <div className="bg-[#181818] border-t border-[#262626] p-4 text-xs space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[#FF4500] font-bold">CORRIDOR NODE:</span>
            <span className="text-white font-bold text-sm">{activeNode.name}</span>
          </div>
          <span className="text-[#A7A39A] text-[11px] font-mono">
            ELEVATION PROFILE: {activeNode.elevation}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs pt-1 border-t border-[#222222]">
          <div className="flex items-center gap-2">
            <span className="text-[#A7A39A]">CURRENT BEHAVIOR:</span>
            <span className={isFlood ? (activeNode.type === 'hazard' ? 'text-[#FF4500]' : 'text-emerald-400') : 'text-sky-400'}>
              {isFlood ? activeNode.floodStatus : activeNode.normalStatus}
            </span>
          </div>
          <p className="text-[11px] text-[#A7A39A] font-sans italic">
            {activeNode.note}
          </p>
        </div>
      </div>

      {/* Interactive Simulation Controls */}
      <div className="p-4 bg-[#141414] border-t border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-[#A7A39A]">
          <Navigation2 className="w-3.5 h-3.5 text-[#FF4500]" />
          <span>SIMULATE FLOOD INUNDATION:</span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setSimulationState('normal')}
            className={`flex-1 sm:flex-initial px-3 py-1.5 text-xs font-semibold border transition-all ${
              !isFlood
                ? 'bg-[#38bdf8] text-black border-[#38bdf8]'
                : 'bg-[#1c1c1c] text-[#A7A39A] border-[#333333] hover:text-white'
            }`}
          >
            DRY / BASELINE CONDITIONS
          </button>

          <button
            type="button"
            onClick={() => setSimulationState('monsoon_flood')}
            className={`flex-1 sm:flex-initial px-3 py-1.5 text-xs font-semibold border transition-all ${
              isFlood
                ? 'bg-[#FF4500] text-white border-[#FF4500]'
                : 'bg-[#1c1c1c] text-[#A7A39A] border-[#333333] hover:text-white'
            }`}
          >
            MONSOON SURGE (REROUTE ACTIVE)
          </button>
        </div>
      </div>
    </div>
  );
};
