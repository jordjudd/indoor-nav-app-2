import { connections } from '../data/locations';

// Calculate distance between two points
const calculateDistance = (point1, point2) => {
  const dx = point1.x - point2.x;
  const dy = point1.y - point2.y;
  return Math.sqrt(dx * dx + dy * dy);
};

// A* pathfinding algorithm
export const findPath = (start, end, locations) => {
  const locationMap = {};
  locations.forEach(loc => {
    locationMap[loc.id] = loc;
  });

  const openSet = [start.id];
  const closedSet = new Set();
  const gScore = { [start.id]: 0 };
  const fScore = { [start.id]: calculateDistance(start, end) };
  const cameFrom = {};

  while (openSet.length > 0) {
    // Find node with lowest fScore
    let current = openSet.reduce((lowest, node) => {
      return fScore[node] < fScore[lowest] ? node : lowest;
    });

    if (current === end.id) {
      // Reconstruct path
      const path = [];
      while (current) {
        path.unshift(locationMap[current]);
        current = cameFrom[current];
      }
      return path;
    }

    openSet.splice(openSet.indexOf(current), 1);
    closedSet.add(current);

    const neighbors = connections[current] || [];
    
    for (const neighbor of neighbors) {
      if (closedSet.has(neighbor)) continue;

      const tentativeGScore = gScore[current] + calculateDistance(
        locationMap[current], 
        locationMap[neighbor]
      );

      if (!openSet.includes(neighbor)) {
        openSet.push(neighbor);
      } else if (tentativeGScore >= (gScore[neighbor] || Infinity)) {
        continue;
      }

      cameFrom[neighbor] = current;
      gScore[neighbor] = tentativeGScore;
      fScore[neighbor] = gScore[neighbor] + calculateDistance(
        locationMap[neighbor], 
        end
      );
    }
  }

  // No path found, return direct line
  return [start, end];
};