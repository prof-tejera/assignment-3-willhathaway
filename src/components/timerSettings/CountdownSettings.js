import React, { useState, useEffect } from "react";
import Button from "../generic/Button";
import Timer from "../generic/Timer";
import Input from "../generic/Input";

const CountdownSettings = ({ onChangeSettings }) => {
  const [description, setDescription] = useState("");
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [time, setTime] = useState("0");
  const [isRunning, setIsRunning] = useState(false);



  const handleReset = () => {
    setDescription("");
    setHours("00");
    setMinutes("00");
    setSeconds("00");
    setTime(0);
    setIsRunning(false);
  };

  const handleChange = (increment, value) => {
    switch (increment) {
      case "hour":
        setHours(value);
        break;
      case "minute":
        setMinutes(value);
        break;
      case "second":
        setSeconds(value);
        break;
      case "desc":
        setDescription(value);
        break;
      default:
        console.log("Invalid");
    }
  };

  useEffect(() => {
    let timeStr = hours + ":" + minutes + ":" + seconds;

    let a = timeStr.split(":");
    let milliseconds =
      +a[0] * 60 * 60 * 1000 + +a[1] * 60 * 1000 + +a[2] * 1000;
    onChangeSettings({ timerName: "countdown", time: milliseconds });
    setTime(milliseconds);
  }, [hours, minutes, seconds]);

  return (
    <div>
      <Timer time={time} />

      <div>
        <Input
          name="Description"
          value={description}
          onChange={(newValue) => handleChange("desc", newValue)}
          inputLength={25}
        />
        <Input
          name={"Hours"}
          value={hours}
          onChange={(newValue) => handleChange("hour", newValue)}
        />
        <Input
          name={"Minutes"}
          value={minutes}
          onChange={(newValue) => handleChange("minute", newValue)}
        />
        <Input
          name={"Seconds"}
          value={seconds}
          onChange={(newValue) => handleChange("second", newValue)}
        />
      </div>
      <Button name="Reset" method={handleReset} />
    </div>
  );
};

export default CountdownSettings;
