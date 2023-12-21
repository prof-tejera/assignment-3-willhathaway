import CountdownSettings from "../components/timerSettings/CountdownSettings";
import StopwatchSettings from "../components/timerSettings/StopwatchSettings";
import TabataSettings from "../components/timerSettings/TabataSettings";
import XYSettings from "../components/timerSettings/XYSettings";

let timers = [
  {
    name: "Stopwatch",
    component: <StopwatchSettings />,
    milliseconds: 0,
    status: "not running",
  },
  {
    name: "Countdown",
    component: <CountdownSettings />,
    milliseconds: 0,
    status: "not running",
  },
  {
    name: "Tabata",
    component: <TabataSettings />,
    milliseconds: 0,
    status: "not running",
  },
  {
    name: "XY",
    component: <XYSettings />,
    milliseconds: 0,
    status: "not running",
  },
];
export default timers;
