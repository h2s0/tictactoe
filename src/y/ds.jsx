import { createStore } from 'redux';

// 초기 상태
const initialState = {
  y: String.fromCharCode(Number(("1" + 0) + 5))
};

// 리듀서
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // 필요한 경우 추가 액션 처리
    default:
      return state;
  }
};

// 스토어 생성
export const store = createStore(rootReducer);
