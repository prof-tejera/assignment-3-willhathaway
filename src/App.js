import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

// Define global queue in app state. The queue will be in specific order, and each item in the queue will be running, completed, or not running
// When as item is completed, the next item in the queue is set to running.
// The queue will be passed the the Homepage, and each item will be rendered there with it's given status.

import Queue from "./views/Queue";
import Add from "./views/Add";
import Docs from "./views/Docs";
import Timers from "./views/Timers";

function App() {
  let [queue, setQueue] = useState([]);

  const addToQueue = (newTimer) => {
    console.log("new timer from queue: " + newTimer);
    setQueue((prevQueue) => [...prevQueue, { ...newTimer }]);
  };

  const deleteFromQueue = (index) => {
    setQueue((prevQueue) => prevQueue.filter((_, i) => i !== index));
  };

  const updateQueue = (index, newSettings) => {
    setQueue((prevQueue) =>
      prevQueue.map((item, i) => (i === index ? newSettings : item))
    );
  };

  const moveTimerUp = (index) => {
    if (index > 0) {
      setQueue((prevQueue) => {
        const newQueue = [...prevQueue];
        [newQueue[index], newQueue[index - 1]] = [
          newQueue[index - 1],
          newQueue[index],
        ];
        return newQueue;
      });
    }
  };

  const moveTimerDown = (index) => {
    setQueue((prevQueue) => {
      if (index < prevQueue.length - 1) {
        const newQueue = [...prevQueue];
        [newQueue[index], newQueue[index + 1]] = [
          newQueue[index + 1],
          newQueue[index],
        ];
        return newQueue;
      }
      return prevQueue;
    });
  };

  return (
    <Router>
      <div>
        <div className="App-header">
          <nav>
            <ul>
              <li>
                <Link to="/">Queue</Link>
              </li>
              <li>
                <Link to="/add">Add</Link>
              </li>
              <li>
                <Link to="/docs">Docs</Link>
              </li>
              <li>
                <Link to="/timers">Timers</Link>
              </li>
            </ul>
          </nav>
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <Queue
                queue={queue}
                updateQueue={updateQueue}
                deleteFromQueue={deleteFromQueue}
                moveTimerUp={moveTimerUp}
                moveTimerDown={moveTimerDown}
              />
            }
          />
          <Route
            path="/add"
            element={<Add queue={queue} addToQueue={addToQueue} />}
          />
          <Route path="/timers" element={<Timers />} />{" "}
          <Route path="/docs" element={<Docs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
