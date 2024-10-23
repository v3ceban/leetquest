import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from "@/lib/utils";

export const Icon = ({
  icon,
  width = 20,
  height = 20,
  className,
  ...props
}) => {
  return (
    <FontAwesomeIcon
      icon={icon}
      width={width}
      height={height}
      className={cn("mr-1 inline-block align-text-top", className)}
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
      {...props}
    />
  );
};

Icon.propTypes = {
  icon: PropTypes.object.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
};
