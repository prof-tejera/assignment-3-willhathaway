const runCountdownTimer = (settings, currentTime) => {
  console.log(currentTime)
  const newTime = currentTime - 1000;
  console.log(newTime)
  return newTime > 0 ? newTime : 0;
};

export default runCountdownTimer;
