import React, { useEffect, useMemo } from "react";
import styled from "styled-components";

const JobTable = ({ partNames, info }) => {
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
    <Stable>
      <thead>
        <tr>
          <th>분야</th>
          <th>직업명</th>
        </tr>
      </thead>
      <tbody>
        {parts.map(([part, items]) => (
          <tr>
            <td>{partNames[part]}</td>
            <td>
              {items.map(e => (
                <span>{e[1]}</span>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </Stable>
  );
};

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
        border-right: 1px solid #d5d5d5;
      }
    }
  }
`;
export default JobTable;
