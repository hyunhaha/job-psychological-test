import React, { useEffect } from "react";
import styled from "styled-components";

const UserInfoTable = ({ info }) => {
  return (
    <Stable>
      <thead>
        <tr>
          <th>이름</th>
          <th>성별</th>
          <th>검사일</th>
        </tr>
      </thead>
      <tbody>
        {info.map((arr, i) => (
          <tr key={i}>
            {arr.map((e, i) => (
              <td key={i}>{e}</td>
            ))}
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

export default UserInfoTable;
