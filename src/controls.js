import React, {useEffect} from 'react';
import './controls.css';

export default function Controls({
  allianceList,
  currentAlliance,
  onAllianceChange,
  currentColor,
  onColorChange,
  allianceColors,
}) {

  useEffect(() => {
    if (
      currentAlliance &&
      allianceColors[currentAlliance]
    ) {
      onColorChange(allianceColors[currentAlliance]);
    }
  }, [currentAlliance, allianceColors, onColorChange]);

  return (
    <div className="controls">
      <label>
        Alliance:
        <select
          value={currentAlliance}
          onChange={e => onAllianceChange(e.target.value)}
        >
          <option value="">— select —</option>
          {allianceList.map(a => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </label>
      <label>
        Color:
        <input
          type="color"
          value={currentColor}
          onChange={e => onColorChange(e.target.value)}
        />
      </label>
    </div>
  );
}