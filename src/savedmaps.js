import React, { useState, useEffect } from "react";
import { listMaps, deleteMap } from "./mapStorage";

export default function SavedMaps({ onLoad }) {
  const [maps, setMaps] = useState([]);

  // load list on mount (and after deletes)
  const fetchList = async () => {
    try {
      const names = await listMaps();
      setMaps(names);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  if (maps.length === 0) return <p>No saved maps</p>;

  return (
    <div className="saved-maps">
      <h3>Saved maps</h3>
      <ul>
        {maps.map(name => (
          <li key={name}>
            <button
              onClick={() => onLoad(name)}
            >
              {name}
            </button>
            <button
              onClick={async () => {
                await deleteMap(name);
                fetchList();
              }}
            >
              🗑
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}