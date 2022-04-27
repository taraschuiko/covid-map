import React from "react";
import "./DetailedStats.scss";
import earthIcon from "../../assets/earth-icon.png";

const DetailedStats = () => {
  return (
    <div className="detailed-stats">
      <div className="detailed-stats-header">
        <img src={earthIcon} alt="Global" />
        <h2>Global</h2>
      </div>
      <div className="detailed-stats-content">
        <div>
          <h3>Yesterday</h3>
          <div className="detailed-stats-item">
            12313123
            <span>cases</span>
          </div>
          <div className="detailed-stats-item">
            12313123
            <span>deaths</span>
          </div>
          <div className="detailed-stats-item">
            12313123
            <span>vaccinated</span>
          </div>
          <div className="detailed-stats-item">
            12313123
            <span>recovered</span>
          </div>
        </div>
        <div>
          <h3>Total</h3>
          <div className="detailed-stats-item">
            12313123
            <span>cases</span>
          </div>
          <div className="detailed-stats-item">
            12313123
            <span>deaths</span>
          </div>
          <div className="detailed-stats-item">
            12313123
            <span>vaccinated</span>
          </div>
          <div className="detailed-stats-item">
            12313123
            <span>recovered</span>
          </div>
        </div>
      </div>
      Updated: 13.04.2022
    </div>
  );
};

export default DetailedStats;
