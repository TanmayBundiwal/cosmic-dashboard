import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './Neows.css';

const Neows = () => {
  const [closestNeos, setClosestNeos] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(); // Reference for the container div
  const svgRef = useRef(); // Reference for the SVG

  useEffect(() => {
    const fetchNeoData = async () => {
      try {
        const response = await fetch('http://localhost:3001/neows');
        const data = await response.json();
        const todayNeoData = Object.values(data.near_earth_objects)[0];

        const sortedNeos = todayNeoData.sort((a, b) => {
          return parseFloat(a.close_approach_data[0].miss_distance.kilometers) - 
                 parseFloat(b.close_approach_data[0].miss_distance.kilometers);
        });

        const threeClosestNeos = sortedNeos.slice(0, 3);
        setClosestNeos(threeClosestNeos);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching NEO data: ", error);
        setLoading(false);
      }
    };

    fetchNeoData();
  }, []);

  useEffect(() => {
    if (!loading && closestNeos.length > 0) {
      
      const containerWidth = containerRef.current.getBoundingClientRect().width;

      const Visualization_width = containerWidth;
      const Visualization_height = Visualization_width;

      const svg = d3.select(svgRef.current)
        .style("width", Visualization_width + 'px')
        .style("height", Visualization_height + 'px');
      
      svg.selectAll('*').remove();

      svg.append('clipPath')
        .attr('id', 'rounded-corner-clip')
        .append('rect')
        .attr('width', Visualization_width)
        .attr('height', Visualization_height)
        .attr('rx', 10)
        .attr('ry', 10); 

      svg.append('image')
        .attr('xlink:href', '/Plot_background.png')
        .attr('width', Visualization_width)
        .attr('height', Visualization_height)
        .attr('clip-path', 'url(#rounded-corner-clip)');

      const asteroidPositions = [
        { x: Visualization_width / 2 - 25, y: Visualization_height / 4 - 55 },
        { x: Visualization_width / 4 - 25, y: 3 * Visualization_height / 4 },
        { x: 3 * Visualization_width / 4 - 5, y: 3 * Visualization_height / 4 - 48 }
      ];
        
      closestNeos.forEach((neo, index) => {
        const asteroidGroup = svg.append('g')
          .attr('class', 'asteroid-group')
          .on('mouseover', function() {
            d3.select(this).select('rect').style('visibility', 'visible');
            d3.select(this).select('text').style('visibility', 'visible');
          })
          .on('mouseout', function() {
            d3.select(this).select('rect').style('visibility', 'hidden');
            d3.select(this).select('text').style('visibility', 'hidden');
          });
    
        const position = asteroidPositions[index];
    
        asteroidGroup.append('image')
          .attr('xlink:href', `/Asteroid_${index + 1}.png`)
          .attr('x', position.x)
          .attr('y', position.y)
          .attr('width', 50)
          .attr('height', 50);

        let tooltipX = position.x - 50;
        let tooltipY = index === 0 ? position.y + 60 : position.y - 80;
        if (index === 1) {
          tooltipX += 10;
        } else if (index === 2) {
          tooltipX -= 30;
        }
    
        asteroidGroup.append('rect')
          .attr('x', tooltipX)
          .attr('y', tooltipY)
          .attr('width', 150)
          .attr('height', 60)
          .attr('fill', 'rgba(255, 255, 255, 0.9)')
          .attr('rx', 5)
          .attr('ry', 5)
          .style('visibility', 'hidden');

        const textX = tooltipX + 5;
        const textY = tooltipY + 19;
        const lineHeight = 1.2;
        const tooltipText = asteroidGroup.append('text')
          .style('visibility', 'hidden')
          .attr('fill', 'black')
          .attr('font-size', '12px')
          .attr('font-family', 'Arial, sans-serif');

        tooltipText.append('tspan')
          .attr('x', textX)
          .attr('y', textY)
          .attr('font-weight', 'bold')
          .text('Name: ')
          .append('tspan')
          .attr('font-weight', 'normal')
          .text(neo.name);
    
        tooltipText.append('tspan')
          .attr('x', textX)
          .attr('dy', lineHeight + 'em')
          .attr('font-weight', 'bold')
          .text('Distance: ')
          .append('tspan')
          .attr('font-weight', 'normal')
          .text(`${Math.round(parseFloat(neo.close_approach_data[0].miss_distance.kilometers))} km`);

        const hazardousText = tooltipText.append('tspan')
          .attr('x', textX)
          .attr('dy', lineHeight + 'em')
          .attr('font-weight', 'bold')
          .text('Hazardous: ');

        hazardousText.append('tspan')
          .attr('font-weight', 'normal')
          .attr('fill', neo.is_potentially_hazardous_asteroid ? 'red' : 'black')
          .text(neo.is_potentially_hazardous_asteroid ? 'Yes' : 'No');
      });
    }
  }, [loading, closestNeos]);

  if (loading) {
    return <div>Loading NEO data...</div>;
  }

  return (
    <div>
      <h1 >Closest Asteroids to Earth</h1>
      <div className="separator"></div>
      <div ref={containerRef} className="neo-visualization">
        <svg ref={svgRef} />
      </div>
      <div className="separator"></div>
    </div>
  );
};

export default Neows;
