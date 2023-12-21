export const runTabataTimer = (settings, currentTime) => {
  console.log(`[runTabataTimer] Current Time: ${currentTime}`);

  const newTime = currentTime - 1000;
  return { newTime: newTime, periodCompleted: newTime <= 0 };
};

export default runTabataTimer;


