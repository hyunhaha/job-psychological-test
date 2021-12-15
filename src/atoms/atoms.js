import { atom, selector } from 'recoil';
import api from '../utils/api';

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
// const splitedReport = report.split(" ");
// splitedReport.pop();
// const resultScore = splitedReport.reduce((acc, item) => {
//   const [key, score] = item.split("=").map(e => Number(e));
//   acc.push({ key, score });
//   return acc;
// }, []);
export const sortedResultScore = selector({
  key: 'sortedResultScore',
  get: ({ get }) => {
    const list = get(resultScore);
    console.log(list)
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

// const no1 = sortedResultScore[0].key;
// const no2 = sortedResultScore[1].key;
// await api
//   .getMatchEduLevels(no1, no2)
//   .then(res => {
//     dispatch({ type: "SET_JOBS_EDU", data: res });
//   })
//   .catch(err => console.log(err));
// await api
//   .getMatchMajors(no1, no2)
//   .then(res => {
//     dispatch({ type: "SET_JOBS_MAJOR", data: res });
//   })
//   .catch(err => console.log(err));

// export const jobsByEduLevel = atom({
//   key: 'jobsByEduLevel',
//   default: [],
// })
export const jobsByEduLevel = selector({
  key: 'jobsByEduLevel',
  get: async ({ get }) => {
    const list = get(sortedResultScore);
    const no1 = list[0].key;
    const no2 = list[1].key;
    const response = await api.getMatchEduLevels(no1, no2)
    if (response.error) {
      throw response.error;
    }
    return response;
  },
})
// export const jobsByMajor = atom({
//   key: 'jobsByMajor',
//   default: [],
// })

export const jobsByMajor = selector({
  key: 'jobsByMajor',
  get: async ({ get }) => {
    const list = get(sortedResultScore);
    const no1 = list[0].key;
    const no2 = list[1].key;
    const response = await api.getMatchMajors(no1, no2)
    if (response.error) {
      throw response.error;
    }
    return response;
  },
})
