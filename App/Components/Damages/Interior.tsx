import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Ellipse, G } from 'react-native-svg';
import {svgElements} from '../../Components/Damages/Interior'

const SvgComponent = () => {
  return (
    <View style={{ flex: 1 }}>
      <Svg height="100%" width="100%" viewBox="0 0 250 500">
        {svgElements
          .sort((a, b) => a.seq - b.seq)
          .map((element, index) => {
            switch (element.type) {
              case 'Path':
                return (
                  <Path
                    key={index}
                    d={element.d}
                    className={element.className}
                    dataId={element.dataId}
                    strokeMiterlimit={element.strokeMiterlimit}
                    strokeWidth={element.strokeWidth}
                    stroke={element.stroke}
                    fill={element.fill}
                  />
                );
              case 'Ellipse':
                return (
                  <Ellipse
                    key={index}
                    cx={element.cx}
                    cy={element.cy}
                    strokeMiterlimit={element.strokeMiterlimit}
                    className={element.className}
                    strokeWidth={element.strokeWidth}
                    dataId={element.dataId}
                    fill={element.fill}
                    stroke={element.stroke}
                    rx={element.rx}
                    ry={element.ry}
                  />
                );
              case 'G-1':
              case 'G-2':
                return (
                  <G
                    key={index}
                    fill={element.fill}
                    className={element.className}
                    strokeLinejoin={element.strokeLinejoin}
                    strokeLinecap={element.strokeLinecap}
                    strokeWidth={element.strokeWidth}
                    strokeMiterlimit={element.strokeMiterlimit}
                  />
                );
              default:
                return null;
            }
          })}
      </Svg>
    </View>
  );
};

export default SvgComponent;