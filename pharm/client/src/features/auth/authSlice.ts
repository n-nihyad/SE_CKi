// import { createSlice } from "@reduxjs/toolkit";

// interface User {
//   id: number;
//   name: string;
//   role: "doctor" | "pharmacist" | "warehouse_manager" | "storekeeper";
// }

// interface AuthState {
//   user: User | null;
// }

// const initialState: AuthState = {
//   user: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     login: (state, action) => {
//       state.user = action.payload;
//     },
//     logout: (state) => {
//       state.user = null;
//     },
//   },
// });

// const fakeUsers = [
//   {
//     username: "admin",
//     password: "123456",
//     email: "admin@gmail.com",
//     role: "manager",
//   },
// ];

// export const { login, logout } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

interface User {
  id: number;
  name: string;
  role: "requestor" | "warehouse_manager" | "storekeeper";
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
    username: "doctor",
    password: "123456",
    name: "Bác sĩ",
    role: "requestor",
  },
  {
    id: 3,
    username: "mng",
    password: "123456",
    name: "Quản lí kho",
    role: "warehouse_manager",
  },
  {
    id: 4,
    username: "str",
    password: "123456",
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
