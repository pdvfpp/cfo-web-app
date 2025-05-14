import React, { useState } from "react";
import { saveMap } from "./mapStorage";

export default function SaveMap({ shapeAlliances, allianceColors }) {
  const [name, setName] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await saveMap(name, shapeAlliances, allianceColors);
      alert(`Map "${name}" published!`);
      setName("");
    } catch (err) {
      console.error(err);
      alert("Error publishing map.");
    }
  };

  return (
    <form className="save-map" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <button type="submit">Publish Map</button>
    </form>
  );
}