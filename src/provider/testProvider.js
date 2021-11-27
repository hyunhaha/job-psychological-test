import { createContext, useContext, useReducer } from 'react';

const initialState = {
  questions: {},
  userAnswers: { 1: 'hello' },
  user: {},
  date: '',
  seq: '',
  report: {},
  reportScore: [],
  sortedReportScore: [],
  jobsByEduLevel: [],
  jobsByMajor: [],
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.data
      };
    case 'SET_DATE':
      return {
        ...state,
        date: action.data
      };
    case 'SET_SEQ':
      return {
        ...state,
        seq: action.data
      }
    case 'SET_QUESTIONS':
      return {
        ...state,
        questions: action.data
      };
    case 'SET_REPORT':
      return {
        ...state,
        report: action.data
      };
    case 'SET_REPORT_SCORE':
      return {
        ...state,
        reportScore: action.data
      };
    case 'SET_SORTED_REPORT_SCORE':
      return {
        ...state,
        sortedReportScore: action.data
      };
    case 'SET_JOBS_EDU':
      return {
        ...state,
        jobsByEduLevel: action.data
      };
    case 'SET_JOBS_MAJOR':
      return {
        ...state,
        jobsByMajor: action.data
      };
    case 'RESET':
      return initialState;

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const TestQuestionContext = createContext(null);

export function TestProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <TestQuestionContext.Provider value={{ state, dispatch }}>
      {children}
    </TestQuestionContext.Provider>
  );
}

export function useTestState() {
  const context = useContext(TestQuestionContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}



