import { createSlice } from "@reduxjs/toolkit";
import { userRequest } from "../../requestMethod";

const initialState = {
  currentVoucherData: {},
  isLoading: false,
  error: null,
};

const partnerSlice = createSlice({
  name: "voucher",
  initialState,
  reducers: {
    getCurrentVoucherDataRequest: (state) => {
      state.isLoading = true;
    },
    getCurrentVoucherDataSuccess: (state, action) => {
      state.currentVoucherData = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    getCurrentVoucherDataFailure: (state, action) => {
      state.currentVoucherData = {};
      state.isLoading = false;
      state.error = action.payload;
    },
    createCurrentVoucherDataRequest: (state) => {
      state.isLoading = true;
    },
    createCurrentVoucherDataSuccess: (state, action) => {
      state.currentVoucherData = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    createCurrentVoucherDataFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateCurrentVoucherDataRequest: (state) => {
      state.isLoading = true;
    },
    updateCurrentVoucherDataSuccess: (state, action) => {
      state.currentVoucherData = [];
      state.isLoading = false;
      state.error = null;
    },
    updateCurrentVoucherDataFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getCurrentVoucherDataRequest,
  getCurrentVoucherDataSuccess,
  getCurrentVoucherDataFailure,
  createCurrentVoucherDataRequest,
  createCurrentVoucherDataSuccess,
  createCurrentVoucherDataFailure,
  updateCurrentVoucherDataRequest,
  updateCurrentVoucherDataSuccess,
  updateCurrentVoucherDataFailure,
} = partnerSlice.actions;

export default partnerSlice.reducer;

export const fetchCurrentVoucherData = (type, search="") => async (dispatch) => {
  try {
    dispatch(getCurrentVoucherDataRequest());
    const response = await userRequest.get(
      `/admin/voucher/getAllVoucher?type=${type}&search=${search}&userType=PARTNER`
    );
    dispatch(getCurrentVoucherDataSuccess(response.data));
    return response.data;
  } catch (error) {
    dispatch(getCurrentVoucherDataFailure(error.message));
    return error.message;
  }
};

export const createCurrentVoucherData = (data) => async (dispatch) => {
  try {
    dispatch(createCurrentVoucherDataRequest());
    const res = await userRequest.post("/admin/voucher/createVoucher", data);
    dispatch(createCurrentVoucherDataSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(createCurrentVoucherDataFailure(error.message));
    return error.message;
  }
};

export const updateCurrentVoucherData = (data) => async (dispatch) => {
  try {
    dispatch(updateCurrentVoucherDataRequest());
    const res = await userRequest.put(`/admin/voucher/updateVoucher`, data);
    dispatch(updateCurrentVoucherDataSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(updateCurrentVoucherDataFailure(error.message));
    return error.message;
  }
};
