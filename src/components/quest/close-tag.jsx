"use client";
import React from "react";
import PropTypes from "prop-types";
import { QuestContext } from "@/components/quest/context";
import { cn } from "@/lib/utils";

const CloseTag = ({ type, className }) => {
  const { closeLevel, closeWorld } = React.useContext(QuestContext);

  return (
    <button
      className={cn(
        "absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 cursor-pointer border-b-[30px] border-b-transparent border-t-[30px] border-t-transparent border-r-[30px] border-r-foreground h-[80px]",
        className,
      )}
      onClick={type === "world" ? closeWorld : closeLevel}
    />
  );
};

CloseTag.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default CloseTag;
