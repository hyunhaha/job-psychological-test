import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import styled from "styled-components";
import Button from "./Button";
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
    <STestCompletedBlock>
      <div>
        <h1>검사가 완료되었습니다</h1>
        <p>
          검사결과는 여러분이 직업을 선택할 때 상대적으로 어떠한 가치를 중요하게
          생각하는지를 알려주고, 중요 가치를 충족시켜줄 수 있는 직업에 대해
          생각해 볼 기회를 제공합니다.
        </p>
        <SResult>
          <SHighlight>{userName ? userName : "사용자"}</SHighlight>님는{" "}
          <SHighlight>
            {sortedResultScore.length !== 0 && part[sortedResultScore[0].key]}
          </SHighlight>
          을 중요시 여기는 성향이므로
        </SResult>
        <SResult>
          <SHighlight>{matchJobs[0] && matchJobs[0][1]}</SHighlight> 또는{" "}
          <SHighlight>{matchJobs[0] && matchJobs[1][1]}</SHighlight>에
          적합합니다.
        </SResult>
        <Button disabled={false} onClick={onClickResult}>
          결과보기
        </Button>
      </div>
    </STestCompletedBlock>
  );
};
const STestCompletedBlock = styled.div`
  padding: 20px 5%;
  text-align: center;
  width: 600px;
  margin: 0 auto;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`;

const SResult = styled.p`
  margin: 0;
  font-size: 24px;
  margin-bottom: 1rem;
`;

const SHighlight = styled.span`
  font-weight: bold;
`;
export default TestCompletedPage;
