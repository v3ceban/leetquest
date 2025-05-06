"use client";

import propTypes from "prop-types";
import parse from "html-react-parser";
import { CodeModal } from "./code-modal";
import { useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { AiReview } from "./ai-review";

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
          className="order-2 bg-foreground text-background"
        />
      );
    } else if (node.name === "aireview") {
      const { title, description, only_ai_button } = node.attribs;
      return (
        <AiReview
          title={title}
          description={description}
          className={cn(
            "bg-foreground text-background",
            only_ai_button === "true" ? "w-full mt-8" : "order-1",
          )}
        >
          AI Review
        </AiReview>
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

function escapeHtml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/`/g, "&#96;")
    .replace(/\\/g, "&#92;")
    .replace(/\$/g, "&#36;")
    .replace(/\?/g, "&#63;");
}

const LevelDescription = ({ rawHtml, title, skipCode, className }) => {
  const onlyAiButton = !(
    rawHtml.includes("codetrier") || rawHtml.includes("codejudger")
  );
  const descriptionText = escapeHtml(rawHtml.replace(/<[^>]+>/g, ""));
  const html = skipCode
    ? rawHtml
    : rawHtml +
      `<aireview title="${title}" description="${descriptionText}" only_ai_button="${onlyAiButton}" />`;

  const parsed = useMemo(
    () =>
      parse(html, {
        replace: skipCode ? replacePlaceholdersNoCode : replacePlaceholders,
      }),
    [html, skipCode],
  );
  const children = Array.isArray(parsed) ? parsed : [parsed];
  const lastTwo = children.slice(-2);

  useEffect(() => {
    const lastTwoGrouped = !skipCode && !onlyAiButton && lastTwo.length === 2;
    if (lastTwoGrouped) {
      children.splice(-2, 2);
      children.push(
        <div
          key="last-two-grouped"
          className="grid grid-cols-1 gap-4 mt-8 w-full sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2"
        >
          {lastTwo}
        </div>,
      );
    }
  }, []);

  return (
    <main className={cn("level-description", className)} aria-label={title}>
      {children}
    </main>
  );
};
LevelDescription.propTypes = {
  rawHtml: propTypes.string.isRequired,
  title: propTypes.string,
  skipCode: propTypes.bool,
  className: propTypes.string,
};

export default LevelDescription;
