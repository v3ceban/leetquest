import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const WORLD_WIDTH = 70;
const WORLD_HEIGHT = 25;
const LEVEL_RADIUS = 20;
const LEVEL_DIAMETER = LEVEL_RADIUS * 2;

function World({ children, title }) {
  return (
    <div>
      <h2 className="text-2xl font-bold p-4">{title}</h2>
      <TransformWrapper>
        <TransformComponent>
          <div className="relative w-screen h-screen">
            {children}
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}

function WorldNode({ isAWorld, name, levelColor, x, y, onClick }) {
  const getBackgroundColor = (levelColor) => {
    switch (levelColor) {
      case 'blue':
        return 'bg-blue-700';
      case 'green':
        return 'bg-green-600';
      case 'red':
        return 'bg-red-600';
      default:
        return 'bg-gray-800';
    }
  };
  return isAWorld ? (
    <div
      key={name}
      className="absolute text-white bg-gray-800 rounded flex justify-center items-center cursor-pointer"
      style={{ left: x, top: y, width: WORLD_WIDTH, height: WORLD_HEIGHT }}
      onClick={onClick}
    >
      {name}
    </div>
  ) : (
    <div
      key={name}
        className={`absolute text-white rounded flex justify-center items-center cursor-pointer rounded-full ${getBackgroundColor(levelColor)}`}
      style={{ left: x, top: y, width: LEVEL_DIAMETER, height: LEVEL_DIAMETER }}
    >
      {name}
    </div>
  );
}

export { World, WorldNode };