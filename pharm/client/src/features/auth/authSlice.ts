import { createSlice } from "@reduxjs/toolkit";

interface User {
  id: number;
  name: string;
  role: "requestor" | "manager" | "storekeeper";
}

interface AuthState {
  user: User | null;
}

const savedUser = localStorage.getItem("user");

const initialState: AuthState = {
  user: savedUser ? JSON.parse(savedUser) : null,
};

export const fakeUsers = [
  {
    id: 1,
    username: "a",
    password: "123",
    name: "Bác sĩ",
    role: "requestor",
  },
  {
    id: 3,
    username: "b",
    password: "123",
    name: "Quản lí kho",
    role: "manager",
  },
  {
    id: 4,
    username: "c",
    password: "123",
    name: "Thủ kho",
    role: "storekeeper",
  },
];

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;

      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    logout: (state) => {
      state.user = null;

      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
