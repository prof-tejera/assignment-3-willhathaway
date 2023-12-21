import React, { useState, useEffect } from "react";
import Timer from "../generic/Timer";
import Button from "../generic/Button";
import Input from "../generic/Input";

const StopwatchSettings = ({ onChangeSettings }) => {
  const [description, setDescription] = useState("");

  const [time, setTime] = useState(0);
  const [limit, setLimit] = useState(0);

  const [isRunning, setIsRunning] = useState(false);



  const handleChange = (value) => {
    onChangeSettings({ timerName: "stopwatch", limit: value });
    setLimit(value);
  };

  const toggleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setTime(0);
  };

  return (
    <div>
      <Input
        name="Description"
        value={description}
        onChange={(newValue) => handleChange("desc", newValue)}
        inputLength={25}
      />
      <Timer time={time} />
      <Input
        name={"Limit (seconds)"}
        value={limit}
        onChange={(newValue) => handleChange(newValue)}
      />
      <div>
        <Button name="Reset" method={reset} />
      </div>
    </div>
  );
};

export default StopwatchSettings;
