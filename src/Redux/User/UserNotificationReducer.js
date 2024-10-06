import { createSlice } from "@reduxjs/toolkit";
import { userRequest } from "../../requestMethod";

const initialState = {
  Notification: [], 
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "Notification", 
  initialState,
  reducers: {
    getUserNotificationDataRequest: (state) => {
      state.isLoading = true;
    },
    getUserNotificationDataSuccess: (state, action) => {
      state.Notification = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    getUserNotificationDataFailure: (state, action) => {
      state.Notification = [];
      state.isLoading = false;
      state.error = action.payload;
    },
    createUserNotificationDataRequest: (state) => {
      state.isLoading = true;
    },
    createUserNotificationDataSuccess: (state, action) => {
      state.Notification = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    createUserNotificationDataFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateUserNotificationDataRequest: (state) => {
      state.isLoading = true;
    },
    updateUserNotificationDataSuccess: (state, action) => {
      state.Notification = [];
      state.isLoading = false;
      state.error = null;
    },
    updateUserNotificationDataFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getUserNotificationDataRequest,
  getUserNotificationDataSuccess,
  getUserNotificationDataFailure,
  createUserNotificationDataRequest,
  createUserNotificationDataSuccess,
  createUserNotificationDataFailure,
  updateUserNotificationDataRequest,
  updateUserNotificationDataSuccess,
  updateUserNotificationDataFailure,
} = userSlice.actions;

export default userSlice.reducer;

export const fetchUserNotificationData =
  (type, search = "", page) =>
  async (dispatch) => {
    try {
      dispatch(getUserNotificationDataRequest());
      const response = await userRequest.get(
        `/api/notification/getAllNotifications?page=${page}&limit=10&search=${search}&status=${type}&userType=USER`
      );
      dispatch(getUserNotificationDataSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(getUserNotificationDataFailure(error.message));
      
    }
  };

export const createUserNotificationData = (data) => async (dispatch) => {
  try {
    dispatch(createUserNotificationDataRequest());
    const res = await userRequest.post(
      "/api/notification/createNotifications",
      data
    );
    // dispatch(createNotificationDataSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(createUserNotificationDataFailure(error.message));
    return Promise.reject(error.message);
  }
};

export const updateUserNotificationData = (data) => async (dispatch) => {
  try {
    dispatch(updateUserNotificationDataRequest());
    const res = await userRequest.put(`/api/notification/updateNotification`, data);
    dispatch(updateUserNotificationDataSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(updateUserNotificationDataFailure(error.message));
    return Promise.reject(error.message);
  }
};
