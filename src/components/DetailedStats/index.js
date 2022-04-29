import React from "react";
import "./DetailedStats.scss";
import earthIcon from "../../assets/earth-icon.png";

const DetailedStats = ({ activeCountryStats, globalStats }) => {
  const getStat = (stat) => {
    if (activeCountryStats) {
      return activeCountryStats[stat].toLocaleString();
    } else {
      return globalStats[stat].toLocaleString();
    }
  };

  return activeCountryStats || globalStats ? (
    <div className="detailed-stats">
      <div className="detailed-stats-header">
        <img
          src={activeCountryStats?.countryInfo.flag || earthIcon}
          alt="Global"
        />
        <h2>{activeCountryStats?.country || "Global"}</h2>
      </div>
      <div className="detailed-stats-content">
        <div>
          <h3>Yesterday</h3>
          <div className="detailed-stats-item">
            {getStat("todayCases")}
            <span>cases</span>
          </div>
          <div className="detailed-stats-item">
            {getStat("todayDeaths")}
            <span>deaths</span>
          </div>
          <div className="detailed-stats-item">
          {getStat("todayVaccinated")}
            <span>vaccine doses</span>
          </div>
          <div className="detailed-stats-item">
            {getStat("todayRecovered")}
            <span>recovered</span>
          </div>
        </div>
        <div>
          <h3>Total</h3>
          <div className="detailed-stats-item">
            {getStat("cases")}
            <span>cases</span>
          </div>
          <div className="detailed-stats-item">
            {getStat("deaths")}
            <span>deaths</span>
          </div>
          <div className="detailed-stats-item">
          {getStat("vaccinated")}
            <span>vaccine doses</span>
          </div>
          <div className="detailed-stats-item">
            {getStat("recovered")}
            <span>recovered</span>
          </div>
        </div>
      </div>
      Updated: 13.04.2022
    </div>
  ) : null;
};

export default DetailedStats;
