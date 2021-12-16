import { atom, selector } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: {},
});

export const testDate = atom({
  key: 'testDate',
  default: '',
});

export const report = atom({
  key: 'report',
  default: '',
})

export const resultScore = selector({
  key: 'resultScore',
  get: ({ get }) => {
    const reportStr = get(report);
    const splitedReport = reportStr.split(" ");
    splitedReport.pop();
    const result = splitedReport.reduce((acc, item) => {
      const [key, score] = item.split("=").map(e => Number(e));
      acc.push({ key, score });
      return acc;
    }, []);
    return result
  }
})

export const sortedResultScore = selector({
  key: 'sortedResultScore',
  get: ({ get }) => {
    const list = get(resultScore);
    return [...list].sort((a, b) => {
      if (a.score > b.score) {
        return -1;
      } else if (a.score === b.score) {
        if (a.key > b.key) {
          return 1;
        } else if (a.key === b.key) {
          return 0;
        } else {
          return -1;
        }
      } else {
        return 1;
      }
    });
  }
})

export const jobsByEduLevel = atom({
  key: 'jobsByEduLevel',
  default: [],
})

export const jobsByMajor = atom({
  key: 'jobsByMajor',
  default: [],
})


