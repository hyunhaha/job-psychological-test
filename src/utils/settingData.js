import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { resultScore, sortedResultScore, report, jobsByEduLevel, jobsByMajor } from '../atoms/atoms';
import { useTestState } from '../provider/testProvider';
import api from './api';
export const useSetData = () => {
  const { state, dispatch } = useTestState();
  const [reportt, setReport] = useRecoilState(report)
  // const setResultScore = useSetRecoilState(resultScore);
  const sortedScore = useRecoilValue(sortedResultScore);

  const setEdulevel = useSetRecoilState(jobsByEduLevel);
  const setMajor = useSetRecoilState(jobsByMajor)

  useEffect(() => {
    console.log('sorted', sortedScore)
    console.log('report', reportt)
  }, [sortedScore, reportt])
  return useQuery('setData', async () => {
    const rreport = await api
      .getTestResult(state.seq)
      .then(res => {
        // dispatch({ type: "SET_REPORT", data: res.result.wonScore });
        setReport(res.result.wonScore)
        console.log()
        return res.result.wonScore
      })
      .catch(err => console.log(err));

    // const splitedReport = report.split(" ");
    // splitedReport.pop();
    // const resultScore = splitedReport.reduce((acc, item) => {
    //   const [key, score] = item.split("=").map(e => Number(e));
    //   acc.push({ key, score });
    //   return acc;
    // }, []);
    // console.log(state)
    // setResultScore(resultScore)
    // dispatch({ type: "SET_REPORT_SCORE", data: resultScore });

    // const sortedResultScore = [...resultScore].sort((a, b) => {
    //   if (a.score > b.score) {
    //     return -1;
    //   } else if (a.score === b.score) {
    //     if (a.key > b.key) {
    //       return 1;
    //     } else if (a.key === b.key) {
    //       return 0;
    //     } else {
    //       return -1;
    //     }
    //   } else {
    //     return 1;
    //   }
    // });
    // dispatch({ type: "SET_SORTED_REPORT_SCORE", data: sortedResultScore });
    console.log(sortedScore)
    console.log(reportt)
    if (sortedScore.length !== 0) {
      console.log(sortedScore)
      const no1 = sortedScore[0].key;
      const no2 = sortedScore[1].key;
      await api
        .getMatchEduLevels(no1, no2)
        .then(res => {
          setEdulevel(res)
          dispatch({ type: "SET_JOBS_EDU", data: res });
        })
        .catch(err => console.log(err));
      await api
        .getMatchMajors(no1, no2)
        .then(res => {
          setMajor(res)
          dispatch({ type: "SET_JOBS_MAJOR", data: res });
        })
        .catch(err => console.log(err));
    }
  })
};
