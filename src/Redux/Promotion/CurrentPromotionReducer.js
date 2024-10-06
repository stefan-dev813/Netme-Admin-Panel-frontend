import { createSlice } from "@reduxjs/toolkit";
import { userRequest } from "../../requestMethod";

const initialState = {
  currentPromotionData: [],
  isLoading: false,
  error: null,
};

const partnerSlice = createSlice({
  name: "promotion",
  initialState,
  reducers: {
    getcurrentPromotionDataRequest: (state) => {
      state.isLoading = true;
    },
    getcurrentPromotionDataSuccess: (state, action) => {
      state.currentPromotionData = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    getcurrentPromotionDataFailure: (state, action) => {
      state.currentPromotionData = [];
      state.isLoading = false;
      state.error = action.payload;
    },
    createcurrentPromotionDataRequest: (state) => {
      state.isLoading = true;
    },
    createcurrentPromotionDataSuccess: (state, action) => {
      state.currentPromotionData = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    createcurrentPromotionDataFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updatecurrentPromotionDataRequest: (state) => {
      state.isLoading = true;
    },
    updatecurrentPromotionDataSuccess: (state, action) => {
      state.currentPromotionData = [];
      state.isLoading = false;
      state.error = null;
    },
    updatecurrentPromotionDataFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getcurrentPromotionDataRequest,
  getcurrentPromotionDataSuccess,
  getcurrentPromotionDataFailure,
  createcurrentPromotionDataRequest,
  createcurrentPromotionDataSuccess,
  createcurrentPromotionDataFailure,
  updatecurrentPromotionDataRequest,
  updatecurrentPromotionDataSuccess,
  updatecurrentPromotionDataFailure,
} = partnerSlice.actions;

export default partnerSlice.reducer;

export const fetchcurrentPromotionData = (type, search="") => async (dispatch) => {
  try {
    dispatch(getcurrentPromotionDataRequest());
    const response = await userRequest.get(
      `/admin/voucher/getAllVoucher?type=${type}&search=${search}&userType=USER`
    );
    dispatch(getcurrentPromotionDataSuccess(response.data));
    return response.data;
  } catch (error) {
    dispatch(getcurrentPromotionDataFailure(error.message));
    return error.message;
  }
};

export const createcurrentPromotionData = (data) => async (dispatch) => {
  try {
    dispatch(createcurrentPromotionDataRequest());
    const res = await userRequest.post("/admin/voucher/createVoucher", data);
    dispatch(createcurrentPromotionDataSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(createcurrentPromotionDataFailure(error.message));
    return error.message;
  }
};

export const updatecurrentPromotionData = (data) => async (dispatch) => {
  try {
    dispatch(updatecurrentPromotionDataRequest());
    const res = await userRequest.put(`/admin/voucher/updateVoucher`, data);
    dispatch(updatecurrentPromotionDataSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(updatecurrentPromotionDataFailure(error.message));
    return error.message;
  }
};
