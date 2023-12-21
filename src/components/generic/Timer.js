import React from "react";

import formatTime from "../../functions/formatTime";

const Timer = ({ time }) => {
  const timerStyle = {
    backgroundColor: "black",
    color: "white",
    padding: "10px",
    fontFamily: "monospace",
    textAlign: "center",
    border: "1px solid white",
    borderRadius: "4px",
  };


  return <p style={timerStyle}>{formatTime(time)}</p>;
};

export default Timer;
