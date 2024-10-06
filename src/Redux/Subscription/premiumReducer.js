import { createSlice } from "@reduxjs/toolkit";
import { userRequest } from "../../requestMethod";

const initialState = {
  premiumSubscriptionData: [],
  isLoading: false,
  error: null,
};

const premiumSubscriptionSlice = createSlice({
  name: "premiumSubscription",
  initialState,
  reducers: {
    getRequest: (state) => {
      state.isLoading = true;
    },
    getSuccess: (state, action) => {
      state.premiumSubscriptionData = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    getFailure: (state, action) => {
      state.premiumSubscriptionData = {};
      state.isLoading = false;
      state.error = action.payload;
    },
    createRequest: (state) => {
      state.isLoading = true;
    },
    createSuccess: (state, action) => {
      state.premiumSubscriptionData = action.payload;
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
      state.premiumSubscriptionData = [];
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
} = premiumSubscriptionSlice.actions;

export default premiumSubscriptionSlice.reducer;

export const fetchPremiumSubscriptionData =
  (search = "", userType) =>
  async (dispatch) => {
    try {
      dispatch(getRequest());
      const response = await userRequest.get(
        `/admin/subscription/getAllPremiumUsers?search=${search}&userType=${userType}`
      );
      dispatch(getSuccess(response?.data?.data));

      return response?.data?.data;
    } catch (error) {
      dispatch(getFailure(error.message));
      return error.message;
    }
  };




