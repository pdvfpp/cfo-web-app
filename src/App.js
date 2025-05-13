import React, { useState } from 'react';
import './App.css';
import Login from './login';
import Controls   from './controls';
import Map        from './map';
import Legend     from './legend';
import SaveMap    from './savemap';
import SavedMaps  from './savedmaps';
import { loadMap } from './mapStorage';

export default function App() {
  const alliances = [
    'CFO','PAk','1FEC','FhL','TF1','LXE',
    'GEo','TaY','GmS','L7c','FGW','TdA'
  ];

  // UI state
  const [currentAlliance, setCurrentAlliance] = useState('');
  const [currentColor, setCurrentColor]       = useState('#ff0000');

  // Map data
  const [shapeAlliances, setShapeAlliances] = useState({});
  const [allianceColors, setAllianceColors] = useState({});
  const [shapeGroups, setShapeGroups]       = useState({}); // <- new

  // assign / toggle a tile
  const handleShapeClick = (id) => {
    if (!currentAlliance) {
      alert('Please select an alliance first!');
      return;
    }
    setShapeAlliances(prev => {
      const next = { ...prev };
      if (next[id] === currentAlliance) delete next[id];
      else                              next[id] = currentAlliance;
      return next;
    });
    setAllianceColors(prev => ({
      ...prev,
      [currentAlliance]: currentColor
    }));
  };

  // load a saved map
  const handleLoad = async (name) => {
    try {
    const m = await loadMap(name);
    if (!m) {
      alert(`Map "${name}" not found.`);
      return;
    }
    setShapeAlliances(m.shapeAlliances);
    setAllianceColors(m.allianceColors);
  } catch (err) {
    console.error(err);
    alert("Error loading map.");
  }
};

  return (
    <div className="App">
      {/* controls up top */}
      <Login />
      <Controls
        allianceList={alliances}
        currentAlliance={currentAlliance}
        onAllianceChange={setCurrentAlliance}
        currentColor={currentColor}
        onColorChange={setCurrentColor}
        allianceColors={allianceColors}
      />

      {/* map + legend + save/load all in one row */}
      <div className="main-content">
        <Map
          shapeAlliances={shapeAlliances}
          allianceColors={allianceColors}
          onShapeClick={handleShapeClick}
          onInitGroups={setShapeGroups}       // <-- new
        />

        <Legend
          shapeAlliances={shapeAlliances}
          allianceColors={allianceColors}
          shapeGroups={shapeGroups}           // <-- new
        />

        <div className="save-load">
          <SaveMap
            shapeAlliances={shapeAlliances}
            allianceColors={allianceColors}
          />
          <SavedMaps onLoad={handleLoad} />
        </div>
      </div>
    </div>
  );
}