import React, { useRef, useEffect } from 'react';
import './MapComponent.css';

const MapComponent = ({ path, startLocation, endLocation, locations }) => {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = imageRef.current;

    const drawMap = () => {
      if (!img.complete) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw the map image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Draw locations
      locations.forEach(location => {
        const isStart = location.id === startLocation;
        const isEnd = location.id === endLocation;
        
        if (isStart || isEnd) {
          ctx.fillStyle = isStart ? '#28a745' : '#dc3545';
          ctx.beginPath();
          ctx.arc(location.x, location.y, 8, 0, 2 * Math.PI);
          ctx.fill();
          
          // Add label
          ctx.fillStyle = 'white';
          ctx.font = 'bold 12px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(isStart ? 'START' : 'END', location.x, location.y + 4);
        } else {
          // Draw regular location markers
          ctx.fillStyle = '#007bff';
          ctx.beginPath();
          ctx.arc(location.x, location.y, 4, 0, 2 * Math.PI);
          ctx.fill();
        }
      });
      
      // Draw path
      if (path.length > 1) {
        ctx.strokeStyle = '#ff6b35';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        ctx.beginPath();
        ctx.moveTo(path[0].x, path[0].y);
        
        for (let i = 1; i < path.length; i++) {
          ctx.lineTo(path[i].x, path[i].y);
        }
        
        ctx.stroke();
        
        // Add direction arrows
        for (let i = 1; i < path.length; i++) {
          const prev = path[i - 1];
          const curr = path[i];
          drawArrow(ctx, prev.x, prev.y, curr.x, curr.y);
        }
      }
    };

    const drawArrow = (ctx, fromX, fromY, toX, toY) => {
      const headLength = 10;
      const angle = Math.atan2(toY - fromY, toX - fromX);
      
      // Calculate midpoint for arrow
      const midX = (fromX + toX) / 2;
      const midY = (fromY + toY) / 2;
      
      ctx.save();
      ctx.strokeStyle = '#ff6b35';
      ctx.fillStyle = '#ff6b35';
      ctx.lineWidth = 2;
      
      // Draw arrow head
      ctx.beginPath();
      ctx.moveTo(midX, midY);
      ctx.lineTo(
        midX - headLength * Math.cos(angle - Math.PI / 6),
        midY - headLength * Math.sin(angle - Math.PI / 6)
      );
      ctx.moveTo(midX, midY);
      ctx.lineTo(
        midX - headLength * Math.cos(angle + Math.PI / 6),
        midY - headLength * Math.sin(angle + Math.PI / 6)
      );
      ctx.stroke();
      ctx.restore();
    };

    // Set canvas size to match image
    const resizeCanvas = () => {
      if (img.complete) {
        const container = canvas.parentElement;
        const containerWidth = container.clientWidth;
        const aspectRatio = img.naturalHeight / img.naturalWidth;
        
        canvas.width = containerWidth;
        canvas.height = containerWidth * aspectRatio;
        
        drawMap();
      }
    };

    img.onload = resizeCanvas;
    window.addEventListener('resize', resizeCanvas);
    
    if (img.complete) {
      resizeCanvas();
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [path, startLocation, endLocation, locations]);

  return (
    <div className="map-component">
      <img 
        ref={imageRef}
        src="/map-blank-smaller-labled.jpg" 
        alt="Office Map" 
        style={{ display: 'none' }}
      />
      <canvas 
        ref={canvasRef}
        className="map-canvas"
      />
    </div>
  );
};

export default MapComponent;