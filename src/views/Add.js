import React, { useState } from "react";
import timers from "../data/timers";
import Container from "../components/generic/Container";
import CountdownSettings from "../components/timerSettings/CountdownSettings";
import TabataSettings from "../components/timerSettings/TabataSettings";
import XYSettings from "../components/timerSettings/XYSettings";
import StopwatchSettings from "../components/timerSettings/StopwatchSettings";
import Dropdown from "../components/generic/Dropdown";
import Button from "../components/generic/Button";

function Add({ addToQueue }) {
  const [selectedTimer, setSelectedTimer] = useState("");
  const [settings, setSettings] = useState({
    timerName: "name",
    time: 0, 
    status: "notRunning",
    time: 0,
    limit: 0,
    rounds: 0,
    work: 0,
    rest: 0,
    description: ""
  });

  const handleDropdownChange = (event) => {
    setSelectedTimer(event.target.value);
  };

  const handleAddClick = () => {
    let timerObj = {
      ...settings,
      timerName: settings.timerName,
      status: "notRunning",
      time: settings.time,
      limit: settings.limit ? settings.limit : null,
      rounds: settings.rounds ? settings.rounds : null,
      work: settings.work ? settings.work : null,
      rest: settings.rest ? settings.rest : null,
      description: settings.description
    };
    console.log(settings);
    addToQueue(timerObj);
  };

  const handleChangeSettings = (newSettings) => {
    console.log(newSettings);
    setSettings((prevSettings) => ({ ...prevSettings, ...newSettings }));
    console.log(settings);
  };

  const renderSelectedTimer = () => {
    switch (selectedTimer) {
      case "Stopwatch":
        return (
          <StopwatchSettings
            onChangeSettings={handleChangeSettings}
          />
        );
      case "Countdown":
        return (
          <CountdownSettings
            onChangeSettings={handleChangeSettings}
          />
        );
      case "Tabata":
        return (
          <TabataSettings onChangeSettings={handleChangeSettings} />
        );
      case "XY":
        return <XYSettings onChangeSettings={handleChangeSettings} />;
      default:
        return null; 
    }
  };

  return (
    <Container style={{width: "500px"}}>
      <Dropdown
        options={timers}
        onChange={handleDropdownChange}
        value={selectedTimer}
      />

      <Container>{renderSelectedTimer()}</Container>

      <Button name="Confirm Addition" method={handleAddClick} /> 
    </Container>
  );
}

export default Add;
