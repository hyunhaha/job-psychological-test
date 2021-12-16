import { useQuery } from "react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  sortedResultScore,
  jobsByEduLevel,
  jobsByMajor,
  report,
} from "../atoms/atoms";
import api from "./api";

export const useSetReport = (seq) => {
  const setReport = useSetRecoilState(report)
  return useQuery('setReport', async () => {
    await api
      .getTestResult(seq)
      .then(res => {
        setReport(res.result.wonScore);
        return res.result.wonScore;
      })
      .catch(err => console.log(err));
  })
}

export const useSetJobData = () => {
  const sortedScore = useRecoilValue(sortedResultScore);
  const setEdulevel = useSetRecoilState(jobsByEduLevel);
  const setMajor = useSetRecoilState(jobsByMajor);

  return useQuery(
    "setJobData",
    async () => {
      const no1 = sortedScore[0].key;
      const no2 = sortedScore[1].key;

      await api
        .getMatchEduLevels(no1, no2)
        .then((res) => {
          setEdulevel(res);
        })
        .catch((err) => console.log(err));
      await api
        .getMatchMajors(no1, no2)
        .then((res) => {
          setMajor(res);
        })
        .catch((err) => console.log(err));
    },
    {
      enabled: sortedScore.length > 0,
    }
  );
};
