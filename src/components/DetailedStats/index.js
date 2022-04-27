import React from "react";
import "./DetailedStats.scss";
import earthIcon from "../../assets/earth-icon.png";

const DetailedStats = () => {
  const [globalStats, setGlobalStats] = React.useState();

  const getGlobalStats = () => {
    (async () => {
      let stats = await fetch(
        "https://disease.sh/v3/covid-19/all?yesterday=true"
      ).then((r) => r.json());

      stats = await fetch(
        "https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=2&fullData=false"
      )
        .then((r) => r.json())
        .then((data) => {
          const values = Object.values(data);
          return {
            ...stats,
            vaccinated: values[0],
            todayVaccinated: values[0] - values[1],
          };
        });

      setGlobalStats(stats);
    })();
  };

  React.useEffect(getGlobalStats, []);

  console.log(globalStats);

  return globalStats ? (
    <div className="detailed-stats">
      <div className="detailed-stats-header">
        <img src={earthIcon} alt="Global" />
        <h2>Global</h2>
      </div>
      <div className="detailed-stats-content">
        <div>
          <h3>Yesterday</h3>
          <div className="detailed-stats-item">
            {globalStats.todayCases.toLocaleString()}
            <span>cases</span>
          </div>
          <div className="detailed-stats-item">
            {globalStats.todayDeaths.toLocaleString()}
            <span>deaths</span>
          </div>
          <div className="detailed-stats-item">
            {globalStats.todayVaccinated.toLocaleString()}
            <span>vaccine doses</span>
          </div>
          <div className="detailed-stats-item">
            {globalStats.todayRecovered.toLocaleString()}
            <span>recovered</span>
          </div>
        </div>
        <div>
          <h3>Total</h3>
          <div className="detailed-stats-item">
            {globalStats.cases.toLocaleString()}
            <span>cases</span>
          </div>
          <div className="detailed-stats-item">
            {globalStats.deaths.toLocaleString()}
            <span>deaths</span>
          </div>
          <div className="detailed-stats-item">
            {globalStats.vaccinated.toLocaleString()}
            <span>vaccine doses</span>
          </div>
          <div className="detailed-stats-item">
            {globalStats.recovered.toLocaleString()}
            <span>recovered</span>
          </div>
        </div>
      </div>
      Updated: 13.04.2022
    </div>
  ) : null;
};

export default DetailedStats;
