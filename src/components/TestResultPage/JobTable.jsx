import React, { useMemo } from "react";
import styled from "styled-components";

const JobTable = ({ partNames, info, title }) => {
  const parts = useMemo(() => {
    const obj = info.reduce((acc, e) => {
      if (e[2] in acc) {
        acc[e[2]].push(e);
      } else {
        acc[e[2]] = [e];
      }
      return acc;
    }, {});
    return Object.entries(obj);
  }, [info]);

  return (
    <SPartWrap>
      <h2>{title}</h2>
      <SText>
        * 직업명을 클릭하시면, 커리어넷 직업사전으로 이동하여 직업에 대한 더
        자세한 정보를 확인할 수 있습니다.
      </SText>
      <Stable>
        <thead>
          <tr>
            <th>분야</th>
            <th>직업명</th>
          </tr>
        </thead>
        <tbody>
          {parts.map(([part, items], i) => (
            <tr key={i}>
              <td>{partNames[part]}</td>
              <td>
                {items.map((e, i) => (
                  <SLink
                    key={i}
                    target="_blank"
                    href={`https://www.career.go.kr/cnet/front/base/job/jobView.do?SEQ=${e[0]}`}
                  >
                    {e[1]}
                  </SLink>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </Stable>
    </SPartWrap>
  );
};
const SPartWrap = styled.div`
  padding-bottom: 50px;
`;
const Stable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 2px solid #7d7d7d;
  font-size: 16px;
  line-height: 26px;
  > thead {
    border-bottom: 1px solid #d5d5d5;
    break-inside: auto;
    > tr {
      font-weight: bold;
      > th {
        border: 1px solid black;
        padding: 12px 0;
        background: #fbfbfb;
        border-right: 1px solid #d5d5d5;
        width: 80%;
        &:nth-child(1) {
          width: 20%;
        }
      }
    }
  }
  > tbody {
    > tr {
      font-size: 17px;
      > td {
        padding: 13px 10px;
        text-align: center;
        background: #ffffff;
        border: 1px solid #d5d5d5;
      }
    }
  }
`;
const SText = styled.p`
  margin: 0;
  padding-bottom: 6px;
  text-align: right;
  font-size: 12px;
`;
const SLink = styled.a`
  margin: 0 8px 3px 0;
  color: #6767a9;
  border-bottom: 1px solid #6767a9;
  cursor: pointer;
  text-decoration: none;
`;
export default JobTable;
