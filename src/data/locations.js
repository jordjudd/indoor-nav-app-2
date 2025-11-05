// Location coordinates based on the office map
// These coordinates are relative to the image dimensions and will be scaled
export const locations = [
  // Offices
  { id: 'office1', name: 'Office 1', x: 150, y: 100, type: 'office' },
  { id: 'office2', name: 'Office 2', x: 250, y: 100, type: 'office' },
  { id: 'office3', name: 'Office 3', x: 350, y: 100, type: 'office' },
  { id: 'office4', name: 'Office 4', x: 150, y: 200, type: 'office' },
  { id: 'office5', name: 'Office 5', x: 250, y: 200, type: 'office' },
  { id: 'office6', name: 'Office 6', x: 350, y: 200, type: 'office' },
  
  // Conference Rooms
  { id: 'conference1', name: 'Conference Room A', x: 450, y: 150, type: 'conference' },
  { id: 'conference2', name: 'Conference Room B', x: 450, y: 250, type: 'conference' },
  
  // Kitchen
  { id: 'kitchen', name: 'Kitchen', x: 100, y: 300, type: 'kitchen' },
  
  // Restrooms
  { id: 'restroom1', name: 'Restroom (North)', x: 500, y: 100, type: 'restroom' },
  { id: 'restroom2', name: 'Restroom (South)', x: 500, y: 300, type: 'restroom' },
  
  // Ping Pong Table
  { id: 'pingpong', name: 'Ping Pong Table', x: 300, y: 350, type: 'recreation' },
  
  // Reception/Entrance
  { id: 'reception', name: 'Reception', x: 250, y: 50, type: 'entrance' },
  
  // Hallway waypoints for pathfinding
  { id: 'hallway1', name: 'Hallway Junction 1', x: 200, y: 150, type: 'waypoint' },
  { id: 'hallway2', name: 'Hallway Junction 2', x: 300, y: 150, type: 'waypoint' },
  { id: 'hallway3', name: 'Hallway Junction 3', x: 400, y: 150, type: 'waypoint' },
  { id: 'hallway4', name: 'Hallway Junction 4', x: 200, y: 250, type: 'waypoint' },
  { id: 'hallway5', name: 'Hallway Junction 5', x: 300, y: 250, type: 'waypoint' },
  { id: 'hallway6', name: 'Hallway Junction 6', x: 400, y: 250, type: 'waypoint' },
  { id: 'hallway7', name: 'Main Hallway', x: 250, y: 300, type: 'waypoint' }
];

// Define connections between locations for pathfinding
export const connections = {
  'office1': ['hallway1'],
  'office2': ['hallway2'],
  'office3': ['hallway3'],
  'office4': ['hallway4'],
  'office5': ['hallway5'],
  'office6': ['hallway6'],
  'conference1': ['hallway3'],
  'conference2': ['hallway6'],
  'kitchen': ['hallway7'],
  'restroom1': ['hallway3'],
  'restroom2': ['hallway6'],
  'pingpong': ['hallway7'],
  'reception': ['hallway2'],
  
  // Hallway connections
  'hallway1': ['office1', 'hallway2', 'hallway4'],
  'hallway2': ['reception', 'office2', 'hallway1', 'hallway3', 'hallway5'],
  'hallway3': ['office3', 'conference1', 'restroom1', 'hallway2', 'hallway6'],
  'hallway4': ['office4', 'hallway1', 'hallway5', 'hallway7'],
  'hallway5': ['office5', 'hallway2', 'hallway4', 'hallway6', 'hallway7'],
  'hallway6': ['office6', 'conference2', 'restroom2', 'hallway3', 'hallway5'],
  'hallway7': ['kitchen', 'pingpong', 'hallway4', 'hallway5']
};