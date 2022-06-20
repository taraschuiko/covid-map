import "./App.scss";
import Map from "../Map";
import Div100vh from "react-div-100vh";

function App() {
  return (
    <Div100vh>
      <div className="App">
        <header className="header">
          <h1>COVID-19 Map</h1>
        </header>
        <Map />
      </div>
    </Div100vh>
  );
}

export default App;
