import { getBoxToBoxArrow } from 'perfect-arrows';
import { getArrow } from 'perfect-arrows';

const PAD_END = 18;
const ARROW_OPTIONS = {
  bow: 0.2,
  stretch: 0.5,
  stretchMin: 40,
  stretchMax: 420,
  padStart: 0,
  padEnd: PAD_END,
  straights: true
};
const RADIANS_TO_DEGREES_RATIO = 180 / Math.PI;

function ArrowsWrapper({ children }) {
  return (
    <svg
      className="w-full h-full"
      stroke="#1F2937"
      fill="#1F2937"
      strokeWidth={3}
    >
      {children}
    </svg>
  );
}

function Arrow({ x1, y1, x2, y2, box, width, height, radius, flipArrow }) {
  const [sx, sy, cx, cy, ex, ey, ae] = box ? getBoxToBoxArrow(
    x1, y1, width, height, x2, y2, width, height, { ...ARROW_OPTIONS, flip: flipArrow }
  ) : getArrow(
    x1 + radius, y1 + radius, x2 + radius, y2 + radius, { ...ARROW_OPTIONS, padStart: radius, padEnd: PAD_END + radius, flip: flipArrow }
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

export { ArrowsWrapper, Arrow };