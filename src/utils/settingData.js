import { useQuery } from 'react-query';
import { useTestState } from '../provider/testProvider';
import api from './api';
export const useSetData = () => {
  const { state, dispatch } = useTestState();
  return useQuery('setData', async () => {
    let report = "";
    await api
      .getTestResult(state.seq)
      .then(res => {
        report = res.result.wonScore;
        console.log(state)
        dispatch({ type: "SET_REPORT", data: res.result.wonScore });
        console.log(state)
      })
      .catch(err => console.log(err));

    const splitedReport = report.split(" ");
    splitedReport.pop();
    const resultScore = splitedReport.reduce((acc, item) => {
      const [key, score] = item.split("=").map(e => Number(e));
      acc.push({ key, score });
      return acc;
    }, []);
    console.log(state)
    dispatch({ type: "SET_REPORT_SCORE", data: resultScore });

    const sortedResultScore = [...resultScore].sort((a, b) => {
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
    dispatch({ type: "SET_SORTED_REPORT_SCORE", data: sortedResultScore });

    if (sortedResultScore.length !== 0) {
      const no1 = sortedResultScore[0].key;
      const no2 = sortedResultScore[1].key;
      await api
        .getMatchEduLevels(no1, no2)
        .then(res => {
          dispatch({ type: "SET_JOBS_EDU", data: res });
        })
        .catch(err => console.log(err));
      await api
        .getMatchMajors(no1, no2)
        .then(res => {
          dispatch({ type: "SET_JOBS_MAJOR", data: res });
        })
        .catch(err => console.log(err));
    }
  })
};
