import React, { useEffect, useMemo } from "react";

const TestResultChart = ({ data }) => {
  const interpretationNames = [
    "능력발휘",
    "자율성",
    "보수",
    "안정성",
    "사회적 인정",
    "사회봉사",
    "자기계발",
    "창의성",
  ];
  useEffect(() => {
    console.log(data);
  }, [data]);
  const maxScore = useMemo(() => {
    if (Array.isArray(data)) {
      return Math.max(...data.map(({ score }) => score));
    }
    return 1;
  }, [data]);

  const rows = useMemo(() => {
    if (Array.isArray(data)) {
      const row = (
        <tr>
          {data.map(() => (
            <td>&nbsp;</td>
          ))}
        </tr>
      );
      const result = new Array(10).fill(row);
      return result;
    }
    return [];
  }, [data]);
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "auto",
        marginBottom: 48,
      }}
    >
      <table className="table table-bordered m-0">{rows}</table>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          left: 0,
          bottom: 0,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        {Array.isArray(data) &&
          data.map(value => {
            return (
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <div
                  className="bg-primary"
                  style={{
                    position: "relative",
                    width: "80%",
                    height: `${(value?.score / maxScore) * 80}%`,
                    backgroundColor: "purple",
                  }}
                >
                  <div
                    className="text-secondary"
                    style={{
                      textAlign: "center",
                      position: "absolute",
                      bottom: "100%",
                      width: "100%",
                    }}
                  >
                    {value?.score}
                  </div>

                  <div
                    className="text-secondary"
                    style={{
                      textAlign: "center",
                      position: "absolute",
                      top: "100%",
                      width: "100%",
                      paddingTop: 8,
                    }}
                  >
                    {interpretationNames[value?.key - 1]}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default TestResultChart;
