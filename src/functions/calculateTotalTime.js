const calculateTotalTime = (queue) => {
    return queue.reduce((totalTime, timer) => {
      switch (timer.timerName) {
        case "stopwatch":
          return totalTime + (timer.limit * 1000);
        case "countdown":
          return totalTime + timer.time;
        case "tabata":
          return totalTime + ((timer.work* 1000 + timer.rest* 1000)  * timer.rounds);
        case "xy":
          return totalTime + (timer.time * timer.rounds);
        default:
          return totalTime;
      }
    }, 0);
  };

  export default calculateTotalTime