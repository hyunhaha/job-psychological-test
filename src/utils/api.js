import axios from 'axios';

const baseURL = 'http://www.career.go.kr/inspct/openapi/test';
const apikey = "5037c661501070d53c880f0f17d6f7fa";

const api = {
  getTestQuestion: async (questionNumber) => {
    try {
      const res = await axios.get(`${baseURL}/questions?apikey=${apikey}&q=${questionNumber}`)
      if (res.data.ERROR_REASON) {
        throw new Error(res.data.ERROR_REASON)
      }
      return res.data.RESULT
    } catch (e) {
      console.error(e.message)
    }
  },

  submitTestAnswer: async ({ name, gender, startDtm, answers }) => {
    const data = JSON.stringify({
      apikey: apikey,
      qestrnSeq: "6",
      trgetSe: "100209",
      name,
      gender,
      startDtm: startDtm.getTime(),
      answers,
    });

    const config = {
      method: "post",
      url: `${baseURL}/report?apikey=${apikey}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      const res = await axios(config)
      if (res.data.ERROR_REASON) {
        throw new Error(res.data.ERROR_REASON)
      }
      return res.data.RESULT
    } catch (e) {
      console.error(e.message)
    }
  },

  getTestResult: async (seq) => {
    try {
      const res = await axios.get(`https://www.career.go.kr/inspct/api/psycho/report?seq=${seq}`)
      if (res?.data.ERROR_REASON) {
        throw new Error(res.data.ERROR_REASON)
      }
      return res.data;
    } catch (e) {
      console.error(e.message)
    }
  },

  getMatchEduLevels: async (no1, no2) => {

    try {
      const res = await axios.get(`https://inspct.career.go.kr/inspct/api/psycho/value/jobs?no1=${no1}&no2=${no2}`)
      if (Array.isArray(res?.data)) {
        return res.data;
      }
      if (res?.data.ERROR_REASON) {
        throw new Error(res.data.ERROR_REASON)
      }
    } catch (e) {
      console.error(e.message)
    }
  },

  getMatchMajors: async (no1, no2) => {
    try {
      const res = await axios.get(`https://inspct.career.go.kr/inspct/api/psycho/value/majors?no1=${no1}&no2=${no2}`)
      if (Array.isArray(res?.data)) {
        return res.data;
      }
      if (res?.data.ERROR_REASON) {
        throw new Error(res.data.ERROR_REASON)
      }
    } catch (e) {
      console.error(e.message)
    }
  }
}

export default api;
