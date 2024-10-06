import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { publicRequest } from "../requestMethod";

const initialState = {
  token: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.isLoading = false;
      state.error = null;
      document.cookie = `token=${action.payload.token}; path=/; SameSite=Strict; Secure`;
      localStorage.setItem(
        "permissions",
        JSON.stringify(action.payload?.user?.permissions)
      );
      localStorage.setItem("userId", JSON.stringify(action.payload?.user?._id));
      localStorage.setItem(
        "userName",
        JSON.stringify(action.payload?.user?.name)
      );
      localStorage.setItem("userEmail", action.payload?.user?.email);
      localStorage.setItem("userData", JSON.stringify(action.payload?.user));

      if (action.payload?.user?.permissions === "USER") {
        localStorage.setItem("user", JSON.stringify(true));
      } else {
        localStorage.setItem("user", JSON.stringify(false));
      }
    },
    loginFailure: (state, action) => {
      state.token = null;
      state.isLoggedIn = false;
      state.isLoading = false;
      state.error = action.payload;
      //   alert(action.payload);
    },
    logout: (state) => {
      state.token = null;
      state.isLoggedIn = false;
      state.isLoading = false;
      state.error = null;
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } =
  authSlice.actions;

export default authSlice.reducer;

export const loginUser = (credentials) => async (dispatch) => {
  try {
    console.log("123123");
    dispatch(loginRequest());

    publicRequest
      .post("/api/authAdmin/loginAdmin", JSON.stringify(credentials))
      .then((res) => {
        if (res.data) {
          dispatch(loginSuccess(res.data));
          message.success("Login Successfully");
          return res.data;
        }
      })
      .catch((err) => {
        dispatch(loginFailure(err.response.data.error));
        message.error(err.response.data.error);
        return err.response.data.error;
      });
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};
