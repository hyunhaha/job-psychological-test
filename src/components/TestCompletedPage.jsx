import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import api from "./utils/api/test";

const TestCompletedPage = ({ userName }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [report, setReport] = useState({});
  const [matchJobs, setMatchJobs] = useState([]);
  const [matchMajors, setMatchMajors] = useState([]);
  const part = [
    "능력발휘",
    "자율성",
    "보수",
    "안정성",
    "사회적 안정",
    "사회봉사",
    "자기계발",
    "창의성",
  ];
  useEffect(() => {
    if (location.state) {
      api.getTestResult(location.state.seq).then(res => {
        setReport(res);
      });
    }
  }, [location]);

  const resultScore = useMemo(() => {
    console.log(report);
    if (report?.result) {
      const temp = report?.result.wonScore.split(" ");
      temp.pop();
      const score = temp.reduce((acc, item) => {
        const [key, score] = item.split("=").map(e => Number(e));
        acc.push({ key, score });
        return acc;
      }, []);

      return score;
    }
    return [];
  }, [report]);

  const sortedResultScore = useMemo(() => {
    return [...resultScore].sort((a, b) => {
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
  }, [resultScore]);

  const getMatchJob = useCallback(async () => {
    if (sortedResultScore.length !== 0) {
      const no1 = sortedResultScore[0].key;
      const no2 = sortedResultScore[1].key;
      await api.getMatchEduLevels(no1, no2).then(res => {
        setMatchJobs(res);
      });
      await api.getMatchMajors(no1, no2).then(res => {
        setMatchMajors(res);
      });
    }
  }, [sortedResultScore]);

  useEffect(() => {
    getMatchJob();
  }, [getMatchJob]);

  const onClickResult = () => {
    console.log(location.state);
    navigate("/result", { state: { seq: location.state.seq } });
  };

  return (
    <div>
      <h1>검사가 완료되었습니다</h1>
      <p>
        검사결과는 여러분이 직업을 선택할 때 상대적으로 어떠한 가치를 중요하게
        생각하는지를 알려주고, 중요 가치를 충족시켜줄 수 있는 직업에 대해 생각해
        볼 기회를 제공합니다.
      </p>
      <h2>
        {userName ? userName : "사용자"}님는{" "}
        {sortedResultScore.length !== 0 && part[sortedResultScore[0].key]}을
        중요시 여기는 성향이므로 {matchJobs[0] && matchJobs[0][1]} 또는{" "}
        {matchJobs[0] && matchJobs[1][1]}에 적합합니다.
      </h2>
      <button onClick={onClickResult}>결과보기</button>
    </div>
  );
};

export default TestCompletedPage;
