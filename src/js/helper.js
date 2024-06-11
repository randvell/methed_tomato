export const generateRandomID = (length) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

export const prepareTimeString = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  let timeString = '';

  if (hours !== 0) {
    timeString += hours + ' час ';
  }

  if (minutes !== 0) {
    timeString += 'и ' + minutes + ' мин';
  }

  return timeString.trim();
};
