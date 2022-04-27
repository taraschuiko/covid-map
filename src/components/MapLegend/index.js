import React from "react";
import "./MapLegend.css";

const MapLegend = () => (
  <div className="map-legend">
    <div style={{ background: "#B5BD89" }}>&lt; 1 000</div>
    <div style={{ background: "#DFBE99" }}>1 000 - 10 000</div>
    <div style={{ background: "#EC9192" }}>10 000 - 50 000</div>
    <div style={{ background: "#DB5375" }}>&gt; 50 000</div>
  </div>
);

export default MapLegend;
