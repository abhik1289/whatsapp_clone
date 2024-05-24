import { createSlice } from "@reduxjs/toolkit";

export interface userState {
  staus: string;
  error: string;
  user: {
    id: string;
    name: string;
    email: string;
    picture: string;
    token: string;
    status: string;
  };
}
const initialState: userState = {
  staus: "",
  error: "",
  user: {
    id: "",
    name: "",
    email: "",
    picture: "",
    token: "",
    status: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.error = "";
      state.staus = "";
      state.user = {
        id: "",
        name: "",
        email: "",
        picture: "",
        token: "",
        status: "",
      };
    },
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
