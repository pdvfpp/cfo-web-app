import React from 'react';
import './legend.css';

export default function Legend({
  shapeAlliances,
  allianceColors,
  shapeGroups
}) {
  const used = Array.from(
    new Set(Object.values(shapeAlliances))
  ).filter(a => a);

  if (!used.length) return null;

  const cityVals = {
    city_lv1: 100, city_lv2: 200, city_lv3: 300,
    city_lv4: 400, city_lv5: 500, city_lv6: 600
  };
  const strongVals = {
    stronghold_lv1: 100, stronghold_lv2: 120,
    stronghold_lv3: 140, stronghold_lv4: 160,
    stronghold_lv5: 180, stronghold_lv6: 200
  };

  return (
    <aside className="legend">
      <h3>Legend</h3>
      {used.map(a => {
        let copper = 0, stone = 0;
        Object.entries(shapeAlliances).forEach(([id, ally]) => {
          if (ally !== a) return;
          const grp = shapeGroups[id];
          if (grp?.startsWith('city_lv')) copper += cityVals[grp] || 0;
          else if (grp?.startsWith('stronghold_lv')) stone += strongVals[grp] || 0;
        });

        return (
          <div key={a} className="legend-item">
            <div
              className="legend-colorbox"
              style={{ backgroundColor: allianceColors[a] }}
            />
            <span className="legend-alliance">{a}</span>
            <span className="legend-stats">
              Copper: {copper}/h  |  Stone: {stone}/h
            </span>
          </div>
        );
      })}
    </aside>
  );
}