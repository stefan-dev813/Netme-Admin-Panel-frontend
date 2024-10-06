import { createSlice } from "@reduxjs/toolkit";
import { userRequest } from "../../../requestMethod";

const initialState = {
  externalAd: [], // Replace "partnerAd" with "externalAd"
  isLoading: false,
  error: null,
};
const userSlice = createSlice({
  name: "externalAd", // Replace "partnerAd" with "externalAd"
  initialState,
  reducers: {
    getExternalAdDataRequest: (state) => { // Replace "partnerAd" with "externalAd"
      state.isLoading = true;
    },
    getExternalAdDataSuccess: (state, action) => { // Replace "partnerAd" with "externalAd"
      state.externalAd = action.payload; // Replace "partnerAd" with "externalAd"
      state.isLoading = false;
      state.error = null;
    },
    getExternalAdDataFailure: (state, action) => { // Replace "partnerAd" with "externalAd"
      state.externalAd = []; // Replace "partnerAd" with "externalAd"
      state.isLoading = false;
      state.error = action.payload;
    },
    createExternalAdDataRequest: (state) => { // Replace "partnerAd" with "externalAd"
      state.isLoading = true;
    },
    createExternalAdDataSuccess: (state, action) => { // Replace "partnerAd" with "externalAd"
      state.externalAd = action.payload; // Replace "partnerAd" with "externalAd"
      state.isLoading = false;
      state.error = null;
    },
    createExternalAdDataFailure: (state, action) => { // Replace "partnerAd" with "externalAd"
      state.isLoading = false;
      state.error = action.payload;
    },
    updateExternalAdDataRequest: (state) => { // Replace "partnerAd" with "externalAd"
      state.isLoading = true;
    },
    updateExternalAdDataSuccess: (state, action) => { // Replace "partnerAd" with "externalAd"
      state.externalAd = []; // Replace "partnerAd" with "externalAd"
      state.isLoading = false;
      state.error = null;
    },
    updateExternalAdDataFailure: (state, action) => { // Replace "partnerAd" with "externalAd"
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
export const {
  getExternalAdDataRequest, // Replace "partnerAd" with "externalAd"
  getExternalAdDataSuccess, // Replace "partnerAd" with "externalAd"
  getExternalAdDataFailure, // Replace "partnerAd" with "externalAd"
  createExternalAdDataRequest, // Replace "partnerAd" with "externalAd"
  createExternalAdDataSuccess, // Replace "partnerAd" with "externalAd"
  createExternalAdDataFailure, // Replace "partnerAd" with "externalAd"
  updateExternalAdDataRequest, // Replace "partnerAd" with "externalAd"
  updateExternalAdDataSuccess, // Replace "partnerAd" with "externalAd"
  updateExternalAdDataFailure, // Replace "partnerAd" with "externalAd"
} = userSlice.actions;

export default userSlice.reducer;
export const fetchExternalAdData = (type, search, page) => async (dispatch) => { // Replace "partnerAd" with "externalAd"
  try {
    dispatch(getExternalAdDataRequest()); // Replace "partnerAd" with "externalAd"
    const response = await userRequest.get(
      `/admin/partner/getAllExternalAds?page=${page}&limit=10&search=${search}&status=${type}`
    );
    dispatch(getExternalAdDataSuccess(response.data)); // Replace "partnerAd" with "externalAd"
    return response.data;
  } catch (error) {
    dispatch(getExternalAdDataFailure(error.message)); // Replace "partnerAd" with "externalAd"
    return error.message;
  }
};

export const createExternalAdData = (data) => async (dispatch) => { // Replace "partnerAd" with "externalAd"
  try {
    dispatch(createExternalAdDataRequest()); // Replace "partnerAd" with "externalAd"
    const res = await userRequest.post("/admin/partner/createExternalAds", data);
    dispatch(createExternalAdDataSuccess(res.data)); // Replace "partnerAd" with "externalAd"
    return res.data;
  } catch (error) {
    dispatch(createExternalAdDataFailure(error.message)); // Replace "partnerAd" with "externalAd"
    return error.message;
  }
};

export const updateExternalAdData = (data) => async (dispatch) => { // Replace "partnerAd" with "externalAd"
  try {
    dispatch(updateExternalAdDataRequest()); // Replace "partnerAd" with "externalAd"
    const res = await userRequest.put(`/admin/partner/updateExternalAds`, data);
    dispatch(updateExternalAdDataSuccess(res.data)); // Replace "partnerAd" with "externalAd"
    return res.data;
  } catch (error) {
    dispatch(updateExternalAdDataFailure(error.message)); // Replace "partnerAd" with "externalAd"
    return error.message;
  }
};
