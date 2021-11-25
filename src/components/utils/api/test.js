import axios from 'axios';
const baseURL = 'http://www.career.go.kr/inspct/openapi/test';
const apikey = "5037c661501070d53c880f0f17d6f7fa"
const api = {
  submitTestAnswer: async ({ name, gender, startDtm, answers }) => {
    console.log(name, gender, startDtm, answers)
    let data = JSON.stringify({
      apikey: apikey,
      qestrnSeq: "6",
      trgetSe: "100209",
      name,
      gender,
      startDtm: startDtm.getTime(),
      answers,
    });

    let config = {
      method: "post",
      url: `${baseURL}/report?apikey=${apikey}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    return await axios(config)
      .then(res => {
        console.log(res.data.RESULT)
        return res.data.RESULT;
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  getTestResult: async (seq) => {
    const res = await axios.get(`https://www.career.go.kr/inspct/api/psycho/report?seq=${seq}`)
    console.log(res)
    if (res?.data.result) {
      return res.data;
    }
    throw new Error(res?.data?.ERROR_REASON || "");
  },

  getMatchEduLevels: async (no1, no2) => {
    const res = await axios.get(`https://inspct.career.go.kr/inspct/api/psycho/value/jobs?no1=${no1}&no2=${no2}`)
    if (Array.isArray(res?.data)) {
      return res.data;
    }
    throw new Error(res?.data?.ERROR_REASON || "");
  },

  getMatchMajors: async (no1, no2) => {
    const res = await axios.get(`https://inspct.career.go.kr/inspct/api/psycho/value/majors?no1=${no1}&no2=${no2}`)
    if (Array.isArray(res?.data)) {
      return res.data;
    }
    throw new Error(res?.data?.ERROR_REASON || "");
  }
}

export default api;
