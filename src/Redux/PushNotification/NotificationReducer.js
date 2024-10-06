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
    getNotificationDataRequest: (state) => {
      // Change 'getPartnerAdDataRequest' to 'getNotificationDataRequest'
      state.isLoading = true;
    },
    getNotificationDataSuccess: (state, action) => {
      // Change 'getPartnerAdDataSuccess' to 'getNotificationDataSuccess'
      state.Notification = action.payload; // Change 'partnerAd' to 'Notification'
      state.isLoading = false;
      state.error = null;
    },
    getNotificationDataFailure: (state, action) => {
      // Change 'getPartnerAdDataFailure' to 'getNotificationDataFailure'
      state.Notification = []; // Change 'partnerAd' to 'Notification'
      state.isLoading = false;
      state.error = action.payload;
    },
    createNotificationDataRequest: (state) => {
      // Change 'createPartnerAdDataRequest' to 'createNotificationDataRequest'
      state.isLoading = true;
    },
    createNotificationDataSuccess: (state, action) => {
      // Change 'createPartnerAdDataSuccess' to 'createNotificationDataSuccess'
      state.Notification = action.payload; // Change 'partnerAd' to 'Notification'
      state.isLoading = false;
      state.error = null;
    },
    createNotificationDataFailure: (state, action) => {
      // Change 'createPartnerAdDataFailure' to 'createNotificationDataFailure'
      state.isLoading = false;
      state.error = action.payload;
    },
    updateNotificationDataRequest: (state) => {
      // Change 'updatePartnerAdDataRequest' to 'updateNotificationDataRequest'
      state.isLoading = true;
    },
    updateNotificationDataSuccess: (state, action) => {
      // Change 'updatePartnerAdDataSuccess' to 'updateNotificationDataSuccess'
      state.Notification = []; // Change 'partnerAd' to 'Notification'
      state.isLoading = false;
      state.error = null;
    },
    updateNotificationDataFailure: (state, action) => {
      // Change 'updatePartnerAdDataFailure' to 'updateNotificationDataFailure'
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getNotificationDataRequest,
  getNotificationDataSuccess,
  getNotificationDataFailure,
  createNotificationDataRequest,
  createNotificationDataSuccess,
  createNotificationDataFailure,
  updateNotificationDataRequest,
  updateNotificationDataSuccess,
  updateNotificationDataFailure,
} = userSlice.actions;

export default userSlice.reducer;

export const fetchNotificationData =
  (type, search = "", page) =>
  async (dispatch) => {
    try {
      dispatch(getNotificationDataRequest());
      const response = await userRequest.get(
        `/api/notification/getAllNotifications?page=${page}&limit=10&search=${search}&status=${type}&userType=PARTNER`
      );
      dispatch(getNotificationDataSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(getNotificationDataFailure(error.message));
  
    }
  };

export const createNotificationData = (data) => async (dispatch) => {
  try {
    dispatch(createNotificationDataRequest());
    const res = await userRequest.post(
      "/api/notification/createNotifications",
      data
    );
    // dispatch(createNotificationDataSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(createNotificationDataFailure(error.message));
    return Promise.reject(error.message);
  }
};

export const updateNotificationData = (data) => async (dispatch) => {
  try {
    dispatch(updateNotificationDataRequest());
    const res = await userRequest.put(
      `/api/notification/updateNotification`,
      data
    );
    dispatch(updateNotificationDataSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(updateNotificationDataFailure(error.message));
    return Promise.reject(error.message);
  }
};
