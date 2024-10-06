import { createSlice } from "@reduxjs/toolkit";
import { userRequest } from "../../requestMethod";

const initialState = {
  historyVoucherData: {},
  isLoading: false,
  error: null,
};

const partnerSlice = createSlice({
  name: "voucher",
  initialState,
  reducers: {
    getHistoryVoucherDataRequest: (state) => {
      state.isLoading = true;
    },
    getHistoryVoucherDataSuccess: (state, action) => {
      state.historyVoucherData = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    getHistoryVoucherDataFailure: (state, action) => {
      state.historyVoucherData = {};
      state.isLoading = false;
      state.error = action.payload;
    },
    createHistoryVoucherDataRequest: (state) => {
      state.isLoading = true;
    },
    createHistoryVoucherDataSuccess: (state, action) => {
      state.historyVoucherData = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    createHistoryVoucherDataFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateHistoryVoucherDataRequest: (state) => {
      state.isLoading = true;
    },
    updateHistoryVoucherDataSuccess: (state, action) => {
      state.historyVoucherData = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    updateHistoryVoucherDataFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getHistoryVoucherDataRequest,
  getHistoryVoucherDataSuccess,
  getHistoryVoucherDataFailure,
  createHistoryVoucherDataRequest,
  createHistoryVoucherDataSuccess,
  createHistoryVoucherDataFailure,
  updateHistoryVoucherDataRequest,
  updateHistoryVoucherDataSuccess,
  updateHistoryVoucherDataFailure,
} = partnerSlice.actions;

export default partnerSlice.reducer;

export const fetchHistoryVoucherData = () => async (dispatch) => {
  try {
    dispatch(getHistoryVoucherDataRequest());
    const response = await userRequest.get("/admin/voucher/getAllVoucher?type=History&search");
    dispatch(getHistoryVoucherDataSuccess(response.data));
    return response.data;
  } catch (error) {
    dispatch(getHistoryVoucherDataFailure(error.message));
    return error.message;
  }
};

export const createHistoryVoucherData = (data) => async (dispatch) => {
  try {
    dispatch(createHistoryVoucherDataRequest());
    const res = await userRequest.post("/partner/createHistoryVoucherData", data);
    dispatch(createHistoryVoucherDataSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(createHistoryVoucherDataFailure(error.message));
    return error.message;
  }
};

export const updateHistoryVoucherData = (id, data) => async (dispatch) => {
  try {
    dispatch(updateHistoryVoucherDataRequest());
    const res = await userRequest.put(`/partner/updateHistoryVoucherData?id=${id}`, data);
    dispatch(updateHistoryVoucherDataSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(updateHistoryVoucherDataFailure(error.message));
    return error.message;
  }
};
