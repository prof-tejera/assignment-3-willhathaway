import React, { useState, useEffect, useRef } from "react";
import "../App.css";

import Timer from "../components/generic/Timer";
import Button from "../components/generic/Button";
import Container from "../components/generic/Container";

import TimerCard from "../components/generic/TimerCard";

import runCountdownTimer from "../functions/countdown";
import runStopwatchTimer from "../functions/stopwatch";
import runTabataTimer from "../functions/tabata";
import runXYTimer from "../functions/xy";
import calculateTotalTime from "../functions/calculateTotalTime";

export const Queue = ({
  queue,
  updateQueue,
  deleteFromQueue,
  moveTimerUp,
  moveTimerDown,
}) => {
  console.log("QUEUE: " + JSON.stringify(queue));
  const [currentTimerIndex, setCurrentTimerIndex] = useState(0);
  const currentTimer = queue[currentTimerIndex];

  const [displayTime, setDisplayTime] = useState(0);
  const timeRef = useRef(displayTime);

  const [isRunning, setIsRunning] = useState(false);

  // for tabata and xy:
  const [currentRound, setCurrentRound] = useState(1);
  const [isWorkPeriod, setIsWorkPeriod] = useState(true);

  const highlightedTimerStyle = {
    borderWidth: "4px solid",
    borderColor: "red",
  };

  useEffect(() => {
    initializeTimer(currentTimerIndex);
  }, [currentTimerIndex]);

  useEffect(() => {
    if (isRunning && currentTimerIndex < queue.length) {
      const interval = setInterval(() => {
        updateTimer();
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isRunning, currentTimerIndex, currentRound, isWorkPeriod]);

  let updateTimer = () => {
    console.log("isRunning: " + isRunning);

    let newTime;

    switch (currentTimer.timerName) {
      case "countdown":
        console.log("countdown time : " + currentTimer.time);
        console.log("timeRef: " + timeRef.current);
        newTime = runCountdownTimer(currentTimer, timeRef.current);
        setDisplayTime(newTime);
        timeRef.current = newTime;
        if (newTime <= 0) {
          handleTimerCompletion();
        }
        break;
      case "stopwatch":
        newTime = runStopwatchTimer(currentTimer, timeRef.current);
        setDisplayTime(newTime);
        timeRef.current = newTime;
        if (newTime >= currentTimer.limit * 1000) {
          handleTimerCompletion();
        }
        break;
      case "tabata":
        let result = runTabataTimer(currentTimer, timeRef.current);
        setDisplayTime(result.newTime);
        timeRef.current = result.newTime;

        if (result.periodCompleted) {
          if (isWorkPeriod) {
            console.log("Transitioning from Work to Rest");
            setIsWorkPeriod(false);
            setDisplayTime(currentTimer.rest * 1000);
            timeRef.current = currentTimer.rest * 1000;
          } else {
            console.log("Transitioning from Rest to Work or Next Round");
            if (currentRound < currentTimer.rounds) {
              setCurrentRound(currentRound + 1);
              setIsWorkPeriod(true);
              setDisplayTime(currentTimer.work * 1000);
              timeRef.current = currentTimer.work * 1000;
            } else {
              handleTimerCompletion();
            }
          }
        }
        break;

      case "xy":
        const xyResult = runXYTimer(
          currentTimer,
          timeRef.current,
          currentRound
        );
        setDisplayTime(xyResult.newTime);
        timeRef.current = xyResult.newTime;

        if (xyResult.incrementRound) {
          setCurrentRound(currentRound + 1);
        }

        if (xyResult.newTime === -1) {
          handleTimerCompletion();
        }
        break;

      default:
        setDisplayTime(0);
        break;
    }

    if (newTime !== undefined) {
      setDisplayTime(newTime);
      timeRef.current = newTime;
      if (newTime <= 0) {
        handleTimerCompletion();
      }
    }
  };

  const toggleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const initializeTimer = (index) => {
    if (index < queue.length) {
      const timerSettings = queue[index];
      console.log("initializing " + timerSettings.timerName);

      switch (timerSettings.timerName) {
        case "countdown":
          setDisplayTime(timerSettings.time);
          timeRef.current = timerSettings.time;

          break;
        case "stopwatch":
          setDisplayTime(0);
          timeRef.current = 0;

          break;
        case "tabata":
          setDisplayTime(timerSettings.work);
          timeRef.current = timerSettings.work * 1000;
          break;
        case "xy":
          setDisplayTime(timerSettings.time);
          timeRef.current = timerSettings.time;
          break;
        default:
          setDisplayTime(0);
      }
    }
  };

  const handleTimerCompletion = () => {
    console.log("handling timer completion");
    if (currentTimerIndex >= queue.length - 1) {
      setIsRunning(false);
    } else {
      const nextIndex =
        currentTimerIndex < queue.length - 1 ? currentTimerIndex + 1 : 0;

      setCurrentTimerIndex(nextIndex);
      initializeTimer(nextIndex);
    }
  };

  const reset = () => {
    setCurrentTimerIndex(0);
    initializeTimer(0);
  };
  const skip = () => {
    const nextIndex =
      currentTimerIndex < queue.length - 1 ? currentTimerIndex + 1 : 0;
    setCurrentTimerIndex(nextIndex);
    initializeTimer(nextIndex);
  };
  return (
    <div>
      <p className="body-text">TOTAL TIME</p>
      <Timer time={calculateTotalTime(queue)} />
      <p className="body-text">CURRENT TIMER</p>

      <Timer time={displayTime} />

      <div className="timer-controls">
        <Button name={isRunning ? "Stop" : "Start"} method={toggleStartStop} />
        <Button name="Skip" method={skip} />
        <Button name="Reset" method={reset} />
      </div>
      <div className="queue-container">
        {queue.map((timerSettings, index) => (
          <Container
            key={index}
            style={index === currentTimerIndex ? highlightedTimerStyle : {}}
          >
            <TimerCard
              timerSettings={timerSettings}
              currentRound={currentRound}
              isWorkPeriod={isWorkPeriod}
              onUpdate={(newSettings) => updateQueue(index, newSettings)}
              onDelete={() => deleteFromQueue(index)}
              onMoveUp={() => moveTimerUp(index)}
              onMoveDown={() => moveTimerDown(index)}
            />
            {/* <Button name="Reset" method={handleReset} />
          <Button name="Delete" method={handleDelete} />
          <Button name="Edit" method={handleEdit} /> */}
          </Container>
        ))}
      </div>
    </div>
  );
};

export default Queue;
