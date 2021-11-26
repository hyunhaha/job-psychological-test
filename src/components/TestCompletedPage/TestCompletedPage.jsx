import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import styled from "styled-components";
import Button from "../Button";
import TestResultSummary from "./TestResultSummary";
import api from "../utils/api/test";

const TestCompletedPage = ({ userName }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [report, setReport] = useState({});
  const [matchJobs, setMatchJobs] = useState([]);
  const [matchMajors, setMatchMajors] = useState([]);

  useEffect(() => {
    if (location.state) {
      api.getTestResult(location.state.seq).then(res => {
        setReport(res);
      });
    }
  }, [location]);

  const resultScore = useMemo(() => {
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
    navigate("/result", { state: { seq: location.state.seq } });
  };

  return (
    <STestCompletedBlock>
      <div>
        <h1>검사가 완료되었습니다</h1>
        <p>
          검사결과는 여러분이 직업을 선택할 때 상대적으로 어떠한 가치를 중요하게
          생각하는지를 알려주고, 중요 가치를 충족시켜줄 수 있는 직업에 대해
          생각해 볼 기회를 제공합니다.
        </p>
        <TestResultSummary
          userName={userName}
          sortedResultScore={sortedResultScore}
          matchJobs1={matchJobs[0] && matchJobs[0][1]}
          matchJobs2={matchJobs[1] && matchJobs[1][1]}
        />
        <Button disabled={false} onClick={onClickResult}>
          결과보기
        </Button>
      </div>
    </STestCompletedBlock>
  );
};
const STestCompletedBlock = styled.div`
  text-align: center;
  width: 600px;
  margin: 0 auto;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`;

export default TestCompletedPage;
