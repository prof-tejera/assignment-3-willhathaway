export const runXYTimer = (settings, currentTime, currentRound) => {
  const { time, rounds } = settings;

  if (currentTime > 0) {
    return { newTime: currentTime - 1000, incrementRound: false };
  } else {
    if (currentRound < rounds) {
      return { newTime: time, incrementRound: true };
    } else {
      return { newTime: -1, incrementRound: false };
    }
  }
};


export default runXYTimer;
