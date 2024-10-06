import { createSlice } from "@reduxjs/toolkit";
import { userRequest } from "../../../requestMethod";

const initialState = {
  partnerAd: {
    data: [],
    totalData: 0,
    overViewCount: 0,
    requestedCount: 0,
    historyCount: 0,
  },
  isLoading: false,
  error: null,
};
const userSlice = createSlice({
  name: "partnerAd",
  initialState,
  reducers: {
    getPartnerAdDataRequest: (state) => {
      state.isLoading = true;
    },
    getPartnerAdDataSuccess: (state, action) => {
      state.partnerAd = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    getPartnerAdDataFailure: (state, action) => {
      state.partnerAd = {
        data: [],
        totalData: 0,
        overViewCount: 0,
        requestedCount: 0,
        historyCount: 0,
      };
      state.isLoading = false;
      state.error = action.payload;
    },
    createPartnerAdDataRequest: (state) => {
      state.isLoading = true;
    },
    createPartnerAdDataSuccess: (state, action) => {
      state.partnerAd = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    createPartnerAdDataFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updatePartnerAdDataRequest: (state) => {
      state.isLoading = true;
    },
    updatePartnerAdDataSuccess: (state, action) => {
      const index = state.partnerAd.findIndex(
        (ad) => ad._id === action.payload._id
      );
      if (index !== -1) {
        state.partnerAd[index] = action.payload; // Update the ad in the list
      }
      state.isLoading = false;
      state.error = null;
    },
    updatePartnerAdDataFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
export const {
  getPartnerAdDataRequest,
  getPartnerAdDataSuccess,
  getPartnerAdDataFailure,
  createPartnerAdDataRequest,
  createPartnerAdDataSuccess,
  createPartnerAdDataFailure,
  updatePartnerAdDataRequest,
  updatePartnerAdDataSuccess,
  updatePartnerAdDataFailure,
} = userSlice.actions;

export default userSlice.reducer;
export const fetchPartnerAdData = (type, search, page) => async (dispatch) => {
  try {
    dispatch(getPartnerAdDataRequest());
    const response = await userRequest.get(
      `/admin/partner/getAllAds?page=${page}&limit=10&search=${search}&status=${type}`
    );
    dispatch(getPartnerAdDataSuccess(response.data));
    console.log('All Ad Response:', response.data);
    return response.data;
  } catch (error) {
    dispatch(getPartnerAdDataFailure(error.message));
    return error.message;
  }
};

export const createPartnerAdData = (data) => async (dispatch) => {
  try {
    dispatch(createPartnerAdDataRequest());
    const res = await userRequest.post("/admin/partner/createAds", data);
    console.log('Create Ad Response:', res.data);
    dispatch(createPartnerAdDataSuccess(res.data));
    dispatch(fetchPartnerAdData());
    return res.data;
  } catch (error) {
    dispatch(createPartnerAdDataFailure(error.message));
    return error.message;
  }
};

export const updatePartnerAdData = (data) => async (dispatch) => {
  try {
    dispatch(updatePartnerAdDataRequest());
    const res = await userRequest.put(`/admin/partner/updateAds`, data);
    dispatch(updatePartnerAdDataSuccess(res.data));
    dispatch(fetchPartnerAdData());
    return res.data;
  } catch (error) {
    dispatch(updatePartnerAdDataFailure(error.message));
    return error.message;
  }
};
