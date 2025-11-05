# Indoor Navigation App

A React-based indoor navigation application that helps users find the best route between different locations in an office environment.

## Features

- Interactive office map display
- Location selection for start and end points
- Optimal pathfinding using A* algorithm
- Visual route display with directional arrows
- Responsive design for mobile and desktop
- Ready for AWS Amplify deployment

## Available Locations

- **Offices**: Office 1-6
- **Conference Rooms**: Conference Room A & B
- **Kitchen**: Main kitchen area
- **Restrooms**: North and South restrooms
- **Recreation**: Ping Pong Table
- **Reception**: Main entrance/reception area

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Deployment to AWS Amplify

### Option 1: Using Amplify Console (Recommended)

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
3. Click "New app" > "Host web app"
4. Connect your repository
5. Amplify will automatically detect the build settings from `amplify.yml`
6. Deploy!

### Option 2: Using Amplify CLI

1. Install Amplify CLI:
```bash
npm install -g @aws-amplify/cli
```

2. Configure Amplify:
```bash
amplify configure
```

3. Initialize your project:
```bash
amplify init
```

4. Add hosting:
```bash
amplify add hosting
```

5. Publish:
```bash
amplify publish
```

## Customization

### Adding New Locations

Edit `src/data/locations.js` to add new locations:

```javascript
{
  id: 'new-location',
  name: 'New Location Name',
  x: 100,  // X coordinate on the map
  y: 200,  // Y coordinate on the map
  type: 'office' // Location type
}
```

Don't forget to update the `connections` object to define how the new location connects to existing pathways.

### Updating the Map

Replace `public/map-blank-smaller-labled.jpg` with your new map image and adjust the coordinates in `locations.js` accordingly.

## Built With

- React 18
- HTML5 Canvas for map rendering
- A* pathfinding algorithm
- CSS3 for responsive design

## License

This project is licensed under the MIT License.