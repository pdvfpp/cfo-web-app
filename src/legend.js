import React from 'react';
import './legend.css';

export default function Legend({ shapeAlliances, allianceColors, shapeGroups }) {
  // 1) find which alliances are in use
  const usedAlliances = Array.from(
    new Set(Object.values(shapeAlliances))
  ).filter(a => a);

  if (usedAlliances.length === 0) {
    return null;
  }

  // 2) value tables
  const cityVals = {
    city_lv1: 100, city_lv2: 200, city_lv3: 300,
    city_lv4: 400, city_lv5: 500, city_lv6: 600
  };
  const strongVals = {
    stronghold_lv1: 100, stronghold_lv2: 120,
    stronghold_lv3: 140, stronghold_lv4: 160,
    stronghold_lv5: 180, stronghold_lv6: 200
  };

  // 3) build and sort the data array
  const legendData = usedAlliances.map(a => {
    let copper = 0, stone = 0;

    Object.entries(shapeAlliances).forEach(([shapeId, ally]) => {
      if (ally !== a) return;
      const grp = shapeGroups[shapeId];
      if (grp?.startsWith('city_lv')) {
        copper += cityVals[grp] || 0;
      } else if (grp?.startsWith('stronghold_lv')) {
        stone += strongVals[grp] || 0;
      }
    });

    return { alliance: a, copper, stone, color: allianceColors[a] };
  });

  // sort by copper desc, then stone desc
  legendData.sort((x, y) => {
    if (y.copper !== x.copper) return y.copper - x.copper;
    return y.stone - x.stone;
  });

  // 4) render
  return (
    <aside className="legend">
      <h3>Legend</h3>
      {legendData.map(({ alliance, copper, stone, color }) => (
        <div key={alliance} className="legend-item">
          <div
            className="legend-colorbox"
            style={{ backgroundColor: color }}
          />
          <span className="legend-alliance">{alliance}</span>
          <span className="legend-stats">
            Copper: {copper}/h  |  Stone: {stone}/h
          </span>
        </div>
      ))}
    </aside>
  );
}