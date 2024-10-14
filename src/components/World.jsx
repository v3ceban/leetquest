import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const WORLD_WIDTH = 70;
const WORLD_HEIGHT = 25;
const LEVEL_RADIUS = 20;
const LEVEL_DIAMETER = LEVEL_RADIUS * 2;

function World({ children }) {
  return (
    <TransformWrapper>
      <TransformComponent>
        <div className="relative w-screen h-screen">
          {children}
        </div>
      </TransformComponent>
    </TransformWrapper>
  );
}

function WorldNode({ isAWorld, name, x, y, onClick }) {
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
      className="absolute text-white bg-gray-800 rounded flex justify-center items-center cursor-pointer rounded-full"
      style={{ left: x, top: y, width: LEVEL_DIAMETER, height: LEVEL_DIAMETER }}
    >
      {name}
    </div>
  );
}

export { World, WorldNode };