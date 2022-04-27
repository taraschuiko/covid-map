import React from "react";
import "./Map.css";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import countries from "../../countries.json";

const Map = () => {
  const [covidData, setCovidData] = React.useState();

  const getCovidData = () => {
    fetch("https://disease.sh/v3/covid-19/countries?yesterday=true")
      .then((r) => r.json())
      .then((data) => setCovidData(data));
  };

  React.useEffect(getCovidData, []);

  const onEachCountry = (feature, layer) => {
    const countryIsoName = feature.properties.ISO_A3;
    const countryCovidData = covidData.find(
      (data) => data.countryInfo.iso3 === countryIsoName
    );
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

  return (
    <>
      <MapContainer
        className="map"
        center={[0, 13]}
        zoom={2}
        maxBounds={[
          [75, 180],
          [-50, -180],
        ]}
      >
        {covidData && (
          <GeoJSON
            style={{ fillOpacity: 1, color: "#495D63" }}
            data={countries.features}
            onEachFeature={onEachCountry}
          />
        )}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
      <div className="map-legend">
        <div style={{ background: '#B5BD89' }}>&lt; 1 000</div>
        <div style={{ background: '#DFBE99' }}>1 000 - 10 000</div>
        <div style={{ background: '#EC9192' }}>10 000 - 50 000</div>
        <div style={{ background: '#DB5375' }}>&gt; 50 000</div>
      </div>
    </>
  );
};

export default Map;
