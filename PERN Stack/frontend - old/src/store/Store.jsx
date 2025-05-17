// src/context/Store.js
import { createContext, useReducer } from "react";

// Tạo Context
export const StoreContext = createContext();

// Định nghĩa initial state
const initialState = {
  user: null, // Ví dụ: trạng thái user
  cart: [], // Ví dụ: trạng thái giỏ hàng
};

// Định nghĩa reducer để xử lý các action
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

// Tạo Provider component
export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Giá trị cung cấp cho Context
  const value = { state, dispatch };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
