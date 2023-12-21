import React, { useState, useEffect } from "react";
import Timer from "../generic/Timer";
import Button from "../generic/Button";
import Input from "../generic/Input";

const TabataSettings = ({  onChangeSettings }) => {
  const [description, setDescription] = useState("");

  const [workTime, setWorkTime] = useState("00");
  const [restTime, setRestTime] = useState("00");
  const [rounds, setRounds] = useState("00");
  const [currentRound, setCurrentRound] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(workTime * 1000);
  const [isWorkPeriod, setIsWorkPeriod] = useState(true);




  useEffect(() => {
    onChangeSettings({
      timerName: "tabata",
      work: workTime,
      rest: restTime,
      rounds: rounds,
    });
  }, [workTime, restTime, rounds]);

  const handleReset = () => {
    setDescription("");

    setIsActive(false);
    setCurrentRound(1);
    setTimeLeft(workTime * 1000);
    setIsWorkPeriod(true);
  };

  return (
    <div>
      <Timer time={timeLeft} />
      <label>
      <Input
          name="Description"
          value={description}
          onChange={(newValue) => setDescription(newValue)}
          inputLength={25}
        />
      </label>
      <label>
        <Input
          name="Work Time (s):"
          value={workTime}
          onChange={(newValue) => setWorkTime(newValue)}
          disabled={false}
        />
      </label>
      <div />
      <label>
        <Input
          name="Rest Time (s)"
          value={restTime}
          onChange={(newValue) => setRestTime(newValue)}
          disabled={false}
        />
      </label>
      <div />
      <label>
        <Input
          name="Rounds"
          value={rounds}
          onChange={(newValue) => setRounds(newValue)}
          disabled={false}
        />
      </label>
      <div />

      <div>
          <div>
            <div>
              Round: {currentRound} / {rounds}
            </div>
            <div>{isWorkPeriod ? "Work" : "Rest"} Period</div>
          </div>
        
        <Button name="Reset" method={handleReset} />
      </div>
    </div>
  );
};

export default TabataSettings;
