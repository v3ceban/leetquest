import propTypes from "prop-types";
import parse from "html-react-parser";
import CodeTrier from "./code-trier";
import CodeJudger from "./code-judger";

const Green = ({ children }) => (
  <span style={{ color: "lightgreen" }}>{children}</span>
);
Green.propTypes = {
  children: propTypes.node.isRequired,
};

const Red = ({ children }) => (
  <span style={{ color: "lightcoral" }}>{children}</span>
);
Red.propTypes = {
  children: propTypes.node.isRequired,
};

const Orange = ({ children }) => (
  <span style={{ color: "rgb(255, 178, 102)" }}>{children}</span>
);
Orange.propTypes = {
  children: propTypes.node.isRequired,
};

const Purple = ({ children }) => (
  <span style={{ color: "rgb(200, 160, 238)" }}>{children}</span>
);
Purple.propTypes = {
  children: propTypes.node.isRequired,
};

const Yellow = ({ children }) => (
  <span style={{ color: "rgb(240, 240, 163)" }}>{children}</span>
);
Yellow.propTypes = {
  children: propTypes.node.isRequired,
};

const Blue = ({ children }) => (
  <span style={{ color: "rgb(151, 217, 238)" }}>{children}</span>
);

Blue.propTypes = {
  children: propTypes.node.isRequired,
};
const Pink = ({ children }) => (
  <span style={{ color: "rgb(255, 179, 217)" }}>{children}</span>
);
Pink.propTypes = {
  children: propTypes.node.isRequired,
};
const Brown = ({ children }) => (
  <span style={{ color: "rgb(217, 179, 160)" }}>{children}</span>
);
Brown.propTypes = {
  children: propTypes.node.isRequired,
};
const Gray = ({ children }) => (
  <span style={{ color: "rgb(179, 179, 179)" }}>{children}</span>
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
    } else if (node.name === "codetrier") {
      const defaultPythonCode = node.attribs.defaultpythoncode;
      return <CodeTrier defaultPythonCode={defaultPythonCode} />;
    } else if (node.name === "codejudger") {
      const defaultPythonCode = node.attribs.defaultpythoncode;
      const testCasesStr = node.attribs.testcases;
      const testCases = JSON.parse(testCasesStr);
      return (
        <CodeJudger
          defaultPythonCode={defaultPythonCode}
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
