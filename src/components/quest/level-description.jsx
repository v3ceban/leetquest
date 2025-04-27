import parse from "html-react-parser";
import CodeTrier from "./code-trier";
import CodeJudger from "./code-judger";

const Green = ({ children }) => (
  <span style={{ color: "lightgreen" }}>{children}</span>
);

const Red = ({ children }) => (
  <span style={{ color: "lightcoral" }}>{children}</span>
);

const Orange = ({ children }) => (
  <span style={{ color: "rgb(255, 178, 102)" }}>{children}</span>
);

const Purple = ({ children }) => (
  <span style={{ color: "rgb(200, 160, 238)" }}>{children}</span>
);

const Yellow = ({ children }) => (
  <span style={{ color: "rgb(240, 240, 163)" }}>{children}</span>
);

const Blue = ({ children }) => (
  <span style={{ color: "rgb(151, 217, 238)" }}>{children}</span>
);

const colorComponents = {
  green: Green,
  red: Red,
  orange: Orange,
  purple: Purple,
  yellow: Yellow,
  blue: Blue,
};

const replacePlaceholders = (node) => {
  if (node.type === "tag" && colorComponents[node.name]) {
    const Component = colorComponents[node.name.toLowerCase()];
    return <Component>{node.children.map((child) => replacePlaceholders(child) || child.data)}</Component>;
  } else if (node.type === "tag" && node.name === "codetrier") {
    const defaultPythonCode = node.attribs.defaultpythoncode;
    return <CodeTrier defaultPythonCode={defaultPythonCode} />;
  } else if (node.type === "tag" && node.name === "codejudger") {
    const defaultPythonCode = node.attribs.defaultpythoncode;
    const testCasesStr = node.attribs.testcases;
    const testCases = JSON.parse(testCasesStr);
    return <CodeJudger defaultPythonCode={defaultPythonCode} testCases={testCases} />;
  }
};

const LevelDescription = ({ rawHtml, className }) => {
  return (
    <div className={className}>
      {parse(rawHtml, { replace: replacePlaceholders })}
    </div>
  );
};

export default LevelDescription;