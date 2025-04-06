import PropTypes from "prop-types";
import { getBoxToBoxArrow } from "perfect-arrows";
import { getArrow } from "perfect-arrows";

// also in src/components/quest/world.jsx
const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 40;
const LEVEL_RADIUS = 20;

const PAD_END = 18;
const ARROW_OPTIONS = {
  bow: 0.1,
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
      className="size-[300%] -translate-y-300" // increase if arrows cut off
      stroke="var(--surface-1)"
      fill="var(--surface-1)"
      strokeWidth={2}
    >
      {children}
    </svg>
  );
}

ArrowsWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

function Arrow({ x1, y1, x2, y2, isAWorld, flipArrow }) {
  const [sx, sy, cx, cy, ex, ey, ae] = !isAWorld
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

const QuestArrows = ({ data, isAWorld }) => {
  // console.log("arrow.jsx:87 QuestArrows", data, isAWorld);
  return (
    <ArrowsWrapper>
      {Object.values(data).flatMap(
        ({
          id,
          x_position,
          y_position,
          requiredBy = [],
          // flip_arrow: flipArrow, // not used now, commenting out to build without warnings
        }) =>
          requiredBy.map(({ id: requiredById }) => {
            // if needed, can implement a more efficient way to find the world e.g. by querying the database again or using a map
            const worldThatRequiresThis = Object.values(data).find(
              ({ id }) => id === requiredById,
            );
            if (!worldThatRequiresThis) {
              return null;
            }
            return (
              <Arrow
                key={`${id}-${requiredById}`}
                x1={x_position}
                y1={y_position}
                x2={worldThatRequiresThis.x_position}
                y2={worldThatRequiresThis.y_position}
                isAWorld={isAWorld}
                flipArrow={worldThatRequiresThis.flip_arrow || false}
              />
            );
          }),
      )}
    </ArrowsWrapper>
  );
};

QuestArrows.propTypes = {
  data: PropTypes.object.isRequired,
  isAWorld: PropTypes.bool,
};

export { ArrowsWrapper, Arrow, QuestArrows };
