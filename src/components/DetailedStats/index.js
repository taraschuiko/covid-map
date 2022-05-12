import React from "react";
import "./DetailedStats.scss";
import earthIcon from "../../assets/earth-icon.png";

const DetailedStats = ({
  activeCountryStats,
  globalStats,
  setActiveCountryStats,
}) => {
  const updatedDate = new Date(globalStats.updated);

  const getStat = (stat) => {
    if (activeCountryStats) {
      return activeCountryStats[stat].toLocaleString();
    } else {
      return globalStats[stat].toLocaleString();
    }
  };

  const closeCountryStats = () => setActiveCountryStats(null);

  console.log(activeCountryStats);

  return (
    <div className="detailed-stats">
      <div className="detailed-stats-header">
        <img
          src={activeCountryStats?.countryInfo.flag || earthIcon}
          alt="Global"
        />
        <h2>{activeCountryStats?.country || "Global"}</h2>
        {activeCountryStats && (
          <button
            className="detailed-stats-header-close"
            onClick={closeCountryStats}
          >
            &times;
          </button>
        )}
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
      <p className="detailed-stats-updated">
        Updated: {updatedDate.toLocaleString()}
      </p>
    </div>
  );
};

export default DetailedStats;
