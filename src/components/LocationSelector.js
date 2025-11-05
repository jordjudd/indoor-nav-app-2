import React from 'react';
import './LocationSelector.css';

const LocationSelector = ({ 
  startLocation, 
  endLocation, 
  onStartChange, 
  onEndChange, 
  locations 
}) => {
  return (
    <div className="location-selector">
      <div className="selector-group">
        <label htmlFor="start-select">Starting Location:</label>
        <select 
          id="start-select"
          value={startLocation} 
          onChange={(e) => onStartChange(e.target.value)}
          className="location-select"
        >
          <option value="">Select starting point...</option>
          {locations.map(location => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
      </div>

      <div className="selector-group">
        <label htmlFor="end-select">Destination:</label>
        <select 
          id="end-select"
          value={endLocation} 
          onChange={(e) => onEndChange(e.target.value)}
          className="location-select"
        >
          <option value="">Select destination...</option>
          {locations.map(location => (
            <option 
              key={location.id} 
              value={location.id}
              disabled={location.id === startLocation}
            >
              {location.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default LocationSelector;