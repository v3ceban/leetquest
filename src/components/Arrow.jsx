import React from "react";
import PropTypes from "prop-types";
import { getBoxToBoxArrow } from "perfect-arrows";
import { getArrow } from "perfect-arrows";

const WORLD_WIDTH = 70;
const WORLD_HEIGHT = 25;
const LEVEL_RADIUS = 20;

const PAD_END = 18;
const ARROW_OPTIONS = {
  bow: 0.2,
  stretch: 0.5,
  stretchMin: 40,
  stretchMax: 420,
  padStart: 0,
  padEnd: PAD_END,
  straights: true,
};
const RADIANS_TO_DEGREES_RATIO = 180 / Math.PI;

function ArrowsWrapper({ children }) {
  return (
    <svg
      className="w-full h-full"
      stroke="#cdd6f4"
      fill="#cdd6f4"
      strokeWidth={3}
    >
      {children}
    </svg>
  );
}

ArrowsWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

function Arrow({ x1, y1, x2, y2, isAWorld, flipArrow }) {
  const [sx, sy, cx, cy, ex, ey, ae] = isAWorld
    ? getBoxToBoxArrow(
      x1,
      y1,
      WORLD_WIDTH,
      WORLD_HEIGHT,
      x2,
      y2,
      WORLD_WIDTH,
      WORLD_HEIGHT,
      { ...ARROW_OPTIONS, flip: flipArrow },
    )
    : getArrow(
      x1 + LEVEL_RADIUS,
      y1 + LEVEL_RADIUS,
      x2 + LEVEL_RADIUS,
      y2 + LEVEL_RADIUS,
      {
        ...ARROW_OPTIONS,
        padStart: LEVEL_RADIUS,
        padEnd: PAD_END + LEVEL_RADIUS,
        flip: flipArrow,
      },
    );
  const endAngleAsDegrees = ae * RADIANS_TO_DEGREES_RATIO;
  return (
    <g>
      <path d={`M${sx},${sy} Q${cx},${cy} ${ex},${ey}`} fill="none" />
      <polygon
        points="0,-6 12,0, 0,6"
        transform={`translate(${ex},${ey}) rotate(${endAngleAsDegrees})`}
      />
    </g>
  );
}

Arrow.propTypes = {
  x1: PropTypes.number.isRequired,
  y1: PropTypes.number.isRequired,
  x2: PropTypes.number.isRequired,
  y2: PropTypes.number.isRequired,
  isAWorld: PropTypes.bool,
  flipArrow: PropTypes.bool,
};

export { ArrowsWrapper, Arrow };
