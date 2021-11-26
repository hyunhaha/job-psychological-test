import { createContext, useContext, useReducer } from 'react';

const initialState = {
  questions: { 1: 'hello' },
  UserAnswer: {}
}

function testReducer(state, action) {
  switch (action.type) {
    case 'SET_QUESTIONS':
      return {
        ...state,
        questions: action.data
      };
    // case 'TOGGLE':
    //   return state.map(todo =>
    //     todo.id === action.id ? { ...todo, done: !todo.done } : todo
    //   );
    // case 'REMOVE':
    //   return state.filter(todo => todo.id !== action.id);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const TestQuestionContext = createContext(null);
const TestQuestionDispatchContext = createContext(null);
// const TodoNextIdContext = createContext();

export function TestProvider({ children }) {
  const [state, dispatch] = useReducer(testReducer, initialState);
  return (
    <TestQuestionContext.Provider value={state}>
      <TestQuestionDispatchContext.Provider value={dispatch}>
        {children}
      </TestQuestionDispatchContext.Provider>
    </TestQuestionContext.Provider>
  );
}

export function useTestState() {
  const state = useContext(TestQuestionContext);
  if (!state) {
    throw new Error('Cannot find TodoProvider');
  }
  return state;
}

export function useTestDispatch() {
  const dispatch = useContext(TestQuestionDispatchContext);
  if (!dispatch) {
    throw new Error('Cannot find TodoProvider');
  }
  return dispatch;
}

// export function useTodoNextId() {
//   const context = useContext(TodoNextIdContext);
//   if (!context) {
//     throw new Error('Cannot find TodoProvider');
//   }
//   return context;
// }
