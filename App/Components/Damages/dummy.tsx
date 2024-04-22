import React from 'react';
import Svg, { Path, G, Ellipse } from 'react-native-svg';

// Assuming `svgElements` is imported from where it's defined
import { svgElements } from './Interior';

const Interior = () => {
  const renderElement = (element, index) => {
    const { type, d, strokeMiterlimit, strokeWidth, stroke, fill, cx, cy, rx, ry } = element;

    switch (type) {
      case 'Path':
        return (
          <Path
            key={`path-${index}`}
            d={d}
            strokeMiterlimit={strokeMiterlimit}
            strokeWidth={strokeWidth}
            stroke={stroke || '#000'} // Default stroke color if none provided
            fill={fill || 'none'}     // Default fill if none provided
          />
        );
      case 'Ellipse':
        return (
          <Ellipse
            key={`ellipse-${index}`}
            cx={cx}
            cy={cy}
            rx={rx}
            ry={ry}
            strokeMiterlimit={strokeMiterlimit}
            strokeWidth={strokeWidth}
            stroke={stroke || '#000'} // Default stroke color
            fill={fill || 'none'}     // Default fill
          />
        );
      default:
        return null; // Properly handle unrecognized types
    }
  };

  const groups = [];
  let currentGroup = [];

  svgElements.forEach((element, index) => {
    if (element.type === 'G-1' || element.type === 'G-2') {
      if (currentGroup.length > 0) {
        groups.push(<G key={`group-${groups.length}`}>{currentGroup}</G>);
        currentGroup = [];
      }
      console.log(currentGroup)
    } else {
      currentGroup.push(renderElement(element, index));
    }
  });

  // Add the last group if it exists
  if (currentGroup.length > 0) {
    console.log(currentGroup)
    groups.push(<G key={`group-${groups.length}`}>{currentGroup}</G>);
  }

  return (
    <Svg height="380" width="238.4" viewBox="0 0 380 474.8">
      {groups}
    </Svg>
  );
};

export default Interior;
