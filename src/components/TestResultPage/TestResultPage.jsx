import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import JobTable from "./JobTable";
import UserInfoTable from "./UserInfoTable";
import TestResultChart from "./TestResultChart";
import api from "../utils/api/test";
import styled from "styled-components";
import Button from "../Button";
import { educationLevelNames, genders, majorNames } from "../utils/contents";

const TestResultPage = ({ userInfo, resetTest }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [report, setReport] = useState({});
  const [matchEduLevel, setMatchEduLevel] = useState([]);
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
        setMatchEduLevel(res);
      });
      await api.getMatchMajors(no1, no2).then(res => {
        setMatchMajors(res);
      });
    }
  }, [sortedResultScore]);

  useEffect(() => {
    getMatchJob();
  }, [getMatchJob]);

  const userInfoArr = useMemo(() => {
    const obj = { ...userInfo };
    obj.startDtm = obj.startDtm.toLocaleDateString();
    obj.gender = genders[obj.gender];
    return [Object.values(obj)];
  }, [userInfo]);

  const gotoStart = () => {
    resetTest();
    navigate("/");
  };
  return (
    <STestResultPageBlock>
      <SWrap>
        <SPartWrap>
          <STitle>직업가치관검사 결과표</STitle>
          <SText>
            직업가치관이란 직업을 선택할 때 영향을 끼치는 자신만의 믿음과
            신념입니다. 따라서 여러분의 직업생활과 관련하여 포기하지 않는
            무게중심의 역할을 한다고 볼 수 있습니다. 직업가치관검사는 여러분이
            직업을 선택할 때 상대적으로 어떠한 가치를 중요하게 생각하는지를
            알려줍니다. 또한 본인이 가장 중요하게 생각하는 가치를 충족시켜줄 수
            있는 직업에 대해 생각해 볼 기회를 제공합니다.
          </SText>
          <UserInfoTable info={userInfoArr} />
        </SPartWrap>

        <SPartWrap>
          <h2>직업가치관 결과</h2>
          <TestResultChart data={resultScore} />
        </SPartWrap>

        <JobTable
          partNames={educationLevelNames}
          info={matchEduLevel}
          title={"종사자 평균 학력별"}
        />

        <JobTable
          partNames={majorNames}
          info={matchMajors}
          title={"종사자 평균 전공별"}
        />

        <Button onClick={gotoStart}>테스트 다시하기</Button>
      </SWrap>
    </STestResultPageBlock>
  );
};

const STestResultPageBlock = styled.div`
  height: 100%;
  padding: 0 10%;
  text-align: center;
  width: 600px;
  margin: 0 auto;
`;
const SWrap = styled.div`
  padding: 50px 0;
`;
const STitle = styled.h1`
  margin: 0;
  padding: 20px 0;
`;
const SText = styled.p`
  margin: 0;
  padding: 10px;
  text-align: left;
`;

const SPartWrap = styled.div`
  padding-bottom: 50px;
`;
export default TestResultPage;
