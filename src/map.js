import React, { useState, useEffect, useRef } from 'react';
import './map.css';

export default function Map({
  shapeAlliances,
  allianceColors,
  onShapeClick,
  onInitGroups
}) {
  const containerRef     = useRef(null);
  const handlerRef       = useRef(onShapeClick);
  const [nodes, setNodes] = useState([]);

  // keep the ref up-to-date with the latest callback
  useEffect(() => {
    handlerRef.current = onShapeClick;
  }, [onShapeClick]);

  // inject SVG & wire up click listener **only once**
  useEffect(() => {
    fetch('/season4map.svg')
      .then(r => r.text())
      .then(svgText => {
        const c   = containerRef.current;
        c.innerHTML = svgText;
        const svg = c.querySelector('svg');
        const sel = ['path','rect','circle','polygon','ellipse','line','polyline']
          .map(t => `${t}[id]`).join(',');
        const list = Array.from(svg.querySelectorAll(sel));

        // capture each shape’s group
        const groups = {};
        list.forEach(node => {
          const grpEl = node.closest('g');
          groups[node.id] = grpEl?.getAttribute('class') || null;
          node.dataset.orig = window.getComputedStyle(node).fill;
          node.style.cursor  = 'pointer';
        });
        onInitGroups(groups);

        // single event listener using the ref
        svg.addEventListener('click', e => {
          const id = e.target.id;
          if (id) handlerRef.current(id);
        });

        setNodes(list);
      })
      .catch(console.error);
  }, [onInitGroups]);

  // repaint on state changes
  useEffect(() => {
    nodes.forEach(node => {
      const alliance = shapeAlliances[node.id];
      const color    = alliance && allianceColors[alliance];
      node.style.fill = color != null ? color : node.dataset.orig;
    });
  }, [nodes, shapeAlliances, allianceColors]);

  return <div className="map-container" ref={containerRef} />;
}