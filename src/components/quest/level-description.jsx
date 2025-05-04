import propTypes from "prop-types";
import parse from "html-react-parser";
import { CodeModal } from "./code-modal";

const Green = ({ children }) => (
  <span className="text-green-400">{children}</span>
);
Green.propTypes = {
  children: propTypes.node.isRequired,
};

const Red = ({ children }) => <span className="text-red-400">{children}</span>;
Red.propTypes = {
  children: propTypes.node.isRequired,
};

const Orange = ({ children }) => (
  <span className="text-orange-300">{children}</span>
);
Orange.propTypes = {
  children: propTypes.node.isRequired,
};

const Purple = ({ children }) => (
  <span className="text-purple-300">{children}</span>
);
Purple.propTypes = {
  children: propTypes.node.isRequired,
};

const Yellow = ({ children }) => (
  <span className="text-yellow-200">{children}</span>
);
Yellow.propTypes = {
  children: propTypes.node.isRequired,
};

const Blue = ({ children }) => (
  <span className="text-blue-300">{children}</span>
);
Blue.propTypes = {
  children: propTypes.node.isRequired,
};

const Pink = ({ children }) => (
  <span className="text-pink-300">{children}</span>
);
Pink.propTypes = {
  children: propTypes.node.isRequired,
};

const Brown = ({ children }) => (
  <span className="text-yellow-800">{children}</span>
);
Brown.propTypes = {
  children: propTypes.node.isRequired,
};

const Gray = ({ children }) => (
  <span className="text-gray-400">{children}</span>
);
Gray.propTypes = {
  children: propTypes.node.isRequired,
};

const colorComponents = {
  green: Green,
  red: Red,
  orange: Orange,
  purple: Purple,
  yellow: Yellow,
  blue: Blue,
  pink: Pink,
  brown: Brown,
  gray: Gray,
};

const renderColorComponent = (node, skipCode) => {
  const Component = colorComponents[node.name.trim().toLowerCase()];
  return (
    <Component>
      {node.children.map(
        (child) =>
          (skipCode
            ? replacePlaceholdersNoCode(child)
            : replacePlaceholders(child)) || child.data,
      )}
    </Component>
  );
};

const replacePlaceholders = (node) => {
  if (node.type === "tag") {
    if (colorComponents[node.name]) {
      return renderColorComponent(node);
    } else if (["codetrier", "codejudger"].includes(node.name)) {
      const { defaultpythoncode, testcases } = node.attribs;
      const testCases = JSON.parse(testcases ?? "[]");
      return (
        <CodeModal
          type={node.name}
          defaultPythonCode={defaultpythoncode}
          testCases={testCases}
        />
      );
    }
  }
};

const replacePlaceholdersNoCode = (node) => {
  if (["codetrier", "codejudger"].includes(node.name)) {
    return <></>;
  } else if (colorComponents[node.name]) {
    return renderColorComponent(node, true);
  }
};

const LevelDescription = ({ rawHtml, skipCode, className }) => {
  return (
    <main className={className}>
      {parse(rawHtml, {
        replace: skipCode ? replacePlaceholdersNoCode : replacePlaceholders,
      })}
    </main>
  );
};
LevelDescription.propTypes = {
  rawHtml: propTypes.string.isRequired,
  skipCode: propTypes.bool,
  className: propTypes.string,
};

export default LevelDescription;
