import React, { useState } from 'react';
import MapComponent from './components/MapComponent';
import LocationSelector from './components/LocationSelector';
import { findPath } from './utils/pathfinding';
import { locations } from './data/locations';
import './App.css';

function App() {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [currentPath, setCurrentPath] = useState([]);

  const handleFindRoute = () => {
    if (startLocation && endLocation && startLocation !== endLocation) {
      const start = locations.find(loc => loc.id === startLocation);
      const end = locations.find(loc => loc.id === endLocation);
      
      if (start && end) {
        const path = findPath(start, end, locations);
        setCurrentPath(path);
      }
    } else {
      setCurrentPath([]);
    }
  };

  const handleClearRoute = () => {
    setCurrentPath([]);
    setStartLocation('');
    setEndLocation('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Indoor Navigation</h1>
        <p>Select your starting point and destination to find the best route</p>
      </header>
      
      <div className="App-content">
        <div className="controls-panel">
          <LocationSelector
            startLocation={startLocation}
            endLocation={endLocation}
            onStartChange={setStartLocation}
            onEndChange={setEndLocation}
            locations={locations}
          />
          
          <div className="action-buttons">
            <button 
              onClick={handleFindRoute}
              disabled={!startLocation || !endLocation || startLocation === endLocation}
              className="find-route-btn"
            >
              Find Route
            </button>
            <button 
              onClick={handleClearRoute}
              className="clear-route-btn"
            >
              Clear Route
            </button>
          </div>
        </div>

        <div className="map-container">
          <MapComponent 
            path={currentPath}
            startLocation={startLocation}
            endLocation={endLocation}
            locations={locations}
          />
        </div>
      </div>
    </div>
  );
}

export default App;