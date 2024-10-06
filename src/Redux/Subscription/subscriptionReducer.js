import { createSlice } from "@reduxjs/toolkit";
import { userRequest } from "../../requestMethod";

const initialState = {
  subscriptionData: [],
  isLoading: false,
  error: null,
};

const partnerSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    getRequest: (state) => {
      state.isLoading = true;
    },
    getSuccess: (state, action) => {
      state.subscriptionData = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    getFailure: (state, action) => {
      state.subscriptionData = {};
      state.isLoading = false;
      state.error = action.payload;
    },
    createRequest: (state) => {
      state.isLoading = true;
    },
    createSuccess: (state, action) => {
      state.subscriptionData = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    createFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateRequest: (state) => {
      state.isLoading = true;
    },
    updateSuccess: (state, action) => {
      state.subscriptionData = [];
      state.isLoading = false;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getRequest,
  getSuccess,
  getFailure,
  createRequest,
  createSuccess,
  createFailure,
  updateRequest,
  updateSuccess,
  updateFailure,
} = partnerSlice.actions;

export default partnerSlice.reducer;

export const fetchSubscriptionData =
  (search = "", userType) =>
  async (dispatch) => {
    try {
      dispatch(getRequest());
      const response = await userRequest.get(
        `/admin/subscription/getAllSubscription?search=${search}&userType=${userType}`
      );
      dispatch(getSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(getFailure(error.message));
      return error.message;
    }
  };

export const createSubscriptionData = (data) => async (dispatch) => {
  try {
    dispatch(createRequest());
    const res = await userRequest.post(
      "/admin/subscription/createSubscription",
      data
    );
    dispatch(createSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(createFailure(error.message));
    return error.message;
  }
};

export const updateSubscriptionData = (data) => async (dispatch) => {
  try {
    dispatch(updateRequest());
    const res = await userRequest.put(
      `/admin/subscription/updateSubscription`,
      data
    );
    dispatch(updateSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(updateFailure(error.message));
    return error.message;
  }
};
