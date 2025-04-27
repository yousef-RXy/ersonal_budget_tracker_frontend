import React from 'react';

const MultiColorCircle = ({
  sections,
  circleRadius = 45,
  width = 120,
  height = 120,
  strokeWidth = 8,
  children,
}) => {
  const circleCircumference = 2 * Math.PI * circleRadius;
  let offset = 0;

  return (
    <div style={{ position: 'relative', width, height }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <g transform={`rotate(-90 ${width / 2} ${height / 2})`}>
          {sections.map((section, index) => {
            const dashLength = (section.percent / 100) * circleCircumference;
            const dashOffset = circleCircumference - offset;

            const circle = (
              <circle
                key={index}
                r={circleRadius}
                cx={width / 2}
                cy={height / 2}
                fill="transparent"
                stroke={section.color}
                strokeWidth={strokeWidth}
                strokeDasharray={`${dashLength} ${
                  circleCircumference - dashLength
                }`}
                strokeDashoffset={dashOffset}
              />
            );

            offset += dashLength;
            return circle;
          })}
        </g>
      </svg>

      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default MultiColorCircle;
