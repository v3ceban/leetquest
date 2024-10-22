import React from "react";
import PropTypes from "prop-types";
import { Button } from "./button";
import "./wave-button.css";

const WaveButton = ({ children }) => {
  return (
    <Button variant="outline" className="wrapper px-0 py-0">
      <span className="wave-btn w-full h-full"></span>
      {children}
    </Button>
  );
};

WaveButton.propTypes = {
  children: PropTypes.node.isRequired,
};

export default WaveButton;
