import { createSlice } from "@reduxjs/toolkit";
import { userRequest } from "../../requestMethod";

const initialState = {
  partner: [],
  isLoading: false,
  error: null,
};

const partnerSlice = createSlice({
  name: "partner",
  initialState,
  reducers: {
    getActivePartnerDataRequest: (state) => {
      state.partner = [];

      state.isLoading = true;
    },
    getActivePartnerDataSuccess: (state, action) => {
      state.partner = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    getActivePartnerDataFailure: (state, action) => {
      state.partner = [];
      state.isLoading = false;
      state.error = action.payload;
    },
    createActivePartnerDataRequest: (state) => {
      state.isLoading = true;
    },
    createActivePartnerDataSuccess: (state, action) => {
      state.partner = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    createActivePartnerDataFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateActivePartnerDataRequest: (state) => {
      state.isLoading = true;
    },
    updateActivePartnerDataSuccess: (state, action) => {
      state.partner = [];
      state.isLoading = false;
      state.error = null;
    },
    updateActivePartnerDataFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getActivePartnerDataRequest,
  getActivePartnerDataSuccess,
  getActivePartnerDataFailure,
  createActivePartnerDataRequest,
  createActivePartnerDataSuccess,
  createActivePartnerDataFailure,
  updateActivePartnerDataRequest,
  updateActivePartnerDataSuccess,
  updateActivePartnerDataFailure,
} = partnerSlice.actions;

export default partnerSlice.reducer;

export const fetchActivePartnerData =
  (type, search, page) => async (dispatch) => {
    try {
      dispatch(getActivePartnerDataRequest());
      const response = await userRequest.get(
        `/admin/partner/getAllPartners?page=${page}&limit=10&search=${search}&status=${type}`
      );
      dispatch(getActivePartnerDataSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(getActivePartnerDataFailure(error.message));
      return error.message;
    }
  };

export const createActivePartnerData = (data) => async (dispatch) => {
  try {
    dispatch(createActivePartnerDataRequest());
    const res = await userRequest.post("/partner/createActivePartner", data);
    dispatch(createActivePartnerDataSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(createActivePartnerDataFailure(error.message));
    return error.message;
  }
};

export const updateActivePartnerData = (data) => async (dispatch) => {
  try {
    dispatch(updateActivePartnerDataRequest());
    const res = await userRequest.put(`/admin/partner/updatePartner`, data);
    dispatch(updateActivePartnerDataSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(updateActivePartnerDataFailure(error.message));
    return error.message;
  }
};
