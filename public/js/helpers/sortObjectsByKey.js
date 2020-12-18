import { propOr } from "./propOr.js";

const emptyCell = 0;

const sortObjectsByKey = (key, isDescend, arr) => {
  const flipIfDescend = isDescend ? -1 : 1;
  const sortedData = [...arr];
  return sortedData.sort((ele1, ele2) => {
    const sortA = propOr(emptyCell, key, ele1);
    const sortB = propOr(emptyCell, key, ele2);
    if (sortA < sortB) {
      return -1 * flipIfDescend;
    }
    if (sortA > sortB) {
      return 1 * flipIfDescend;
    } else {
      return 0;
    }
  });
};

export { sortObjectsByKey };
