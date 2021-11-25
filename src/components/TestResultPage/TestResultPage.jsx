import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import JobTable from "./JobTable";
import UserInfoTable from "./UserInfoTable";
import TestResultChart from "./TestResultChart";
import api from "../utils/api/test";

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
    const arr = Object.values(userInfo).map((e, i) => {
      if (i === 2) {
        return e.toLocaleDateString();
      } else {
        return e;
      }
    });
    return [arr];
  }, [userInfo]);

  const educationLevelNames = {
    1: "중졸이하",
    2: "고졸",
    3: "전문대졸",
    4: "대졸",
    5: "대학원졸",
  };
  const majorNames = {
    0: "계열무관",
    1: "인문",
    2: "사회",
    3: "교육",
    4: "공학",
    5: "자연",
    6: "의학",
    7: "예체능",
  };
  const gotoStart = () => {
    resetTest();
    navigate("/");
  };
  return (
    <div>
      <h1>직업가치관검사 결과표</h1>
      <p>
        직업가치관이란 직업을 선택할 때 영향을 끼치는 자신만의 믿음과
        신념입니다. 따라서 여러분의 직업생활과 관련하여 포기하지 않는 무게중심의
        역할을 한다고 볼 수 있습니다. 직업가치관검사는 여러분이 직업을 선택할 때
        상대적으로 어떠한 가치를 중요하게 생각하는지를 알려줍니다. 또한 본인이
        가장 중요하게 생각하는 가치를 충족시켜줄 수 있는 직업에 대해 생각해 볼
        기회를 제공합니다.
      </p>
      <UserInfoTable info={userInfoArr} />
      <TestResultChart data={resultScore} />

      <JobTable partNames={educationLevelNames} info={matchEduLevel} />
      <JobTable partNames={majorNames} info={matchMajors} />
      <button onClick={gotoStart}>테스트 다시하기</button>
    </div>
  );
};

export default TestResultPage;
