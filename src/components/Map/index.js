import React from "react";
import "./Map.scss";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import countries from "../../countries.json";
import MapLegend from "../MapLegend";
import DetailedStats from "../DetailedStats";

const Map = () => {
  const [countriesStats, setCountriesStats] = React.useState();
  const [globalStats, setGlobalStats] = React.useState();
  const [activeCountryStats, setActiveCountryStats] = React.useState();

  const getCountriesStats = () => {
    (async () => {
      let stats = await fetch(
        "https://disease.sh/v3/covid-19/countries?yesterday=true"
      ).then((r) => r.json());

      stats = await fetch(
        "https://disease.sh/v3/covid-19/vaccine/coverage/countries?lastdays=5&fullData=false"
      )
        .then((r) => r.json())
        .then((vaccineData) => {
          const currentStats = [];

          vaccineData.forEach((item) => {
            const countryIndex = stats.findIndex(
              (stat) => stat.country === item.country
            );

            const values = Object.values(item.timeline);

            currentStats[countryIndex] = {
              ...stats[countryIndex],
              vaccinated: values[1],
              todayVaccinated: values[4] - values[3],
            };
          });

          return currentStats;
        });

      setCountriesStats(stats);
    })();
  };

  React.useEffect(getCountriesStats, []);

  const getGlobalStats = () => {
    (async () => {
      let stats = await fetch(
        "https://disease.sh/v3/covid-19/all?yesterday=true"
      ).then((r) => r.json());

      stats = await fetch(
        "https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=5&fullData=false"
      )
        .then((r) => r.json())
        .then((data) => {
          const values = Object.values(data);
          return {
            ...stats,
            vaccinated: values[0],
            todayVaccinated: values[4] - values[3],
          };
        });

      setGlobalStats(stats);
    })();
  };

  React.useEffect(getGlobalStats, []);

  const setCountryColor = (countryCovidData, layer) => {
    if (countryCovidData) {
      if (countryCovidData.todayCases < 1000) {
        layer.options.fillColor = "#B5BD89";
      } else if (countryCovidData.todayCases < 10000) {
        layer.options.fillColor = "#DFBE99";
      } else if (countryCovidData.todayCases < 50000) {
        layer.options.fillColor = "#EC9192";
      } else {
        layer.options.fillColor = "#DB5375";
      }
    }
  };

  const onEachCountry = (feature, layer) => {
    const countryIsoName = feature.properties.ISO_A3;
    const countryCovidData = countriesStats.find(
      (country) => country?.countryInfo.iso3 === countryIsoName
    );

    setCountryColor(countryCovidData, layer);
    layer.on("click", () => {
      setActiveCountryStats(countryCovidData);
    });
  };

  return countriesStats && globalStats ? (
    <>
      <MapContainer
        className="map"
        center={[30, 75]}
        zoom={2}
      >
        {countriesStats && (
          <GeoJSON
            style={{ fillOpacity: 1, color: "#495D63", weight: 1 }}
            data={countries.features}
            onEachFeature={onEachCountry}
          />
        )}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
      <DetailedStats
        activeCountryStats={activeCountryStats}
        setActiveCountryStats={setActiveCountryStats}
        globalStats={globalStats}
      />
      <MapLegend />
    </>
  ) : null;
};

export default Map;
