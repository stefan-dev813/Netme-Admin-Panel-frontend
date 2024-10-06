import { createSlice } from "@reduxjs/toolkit";
import { publicRequest, userRequest } from "../../requestMethod";

const initialState = {
  role: [], // Updated from "user" to "role"
  isLoading: false,
  error: null,
};

const roleSlice = createSlice({
  name: "role", // Updated from "user" to "role"
  initialState,
  reducers: {
    getRoleDataRequest: (state) => {
      state.isLoading = true;
    },
    getRoleDataSuccess: (state, action) => {
      state.role = action.payload; // Updated from "user" to "role"
      state.isLoading = false;
      state.error = null;
    },
    getRoleDataFailure: (state, action) => {
      state.role = []; // Updated from "user" to "role"
      state.isLoading = false;
      state.error = action.payload;
    },
    createRoleDataRequest: (state) => {
      state.isLoading = true;
    },
    createRoleDataSuccess: (state, action) => {
      state.role = action.payload; // Updated from "user" to "role"
      state.isLoading = false;
      state.error = null;
    },
    createRoleDataFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateRoleDataRequest: (state) => {
      state.isLoading = true;
    },
    updateRoleDataSuccess: (state, action) => {
      state.role = []; // Updated from "user" to "role"
      state.isLoading = false;
      state.error = null;
    },
    updateRoleDataFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getRoleDataRequest,
  getRoleDataSuccess,
  getRoleDataFailure,
  createRoleDataRequest,
  createRoleDataSuccess,
  createRoleDataFailure,
  updateRoleDataRequest,
  updateRoleDataSuccess,
  updateRoleDataFailure,
} = roleSlice.actions;

export default roleSlice.reducer;

export const fetchRoleData =
  (search = " ") =>
  async (dispatch) => {
    try {
      dispatch(getRoleDataRequest());
      const response = await userRequest.get(
        `/api/userAdmin/getAllSubAdmins?search=${search}`
      ); // Updated from "user" to "role"
      dispatch(getRoleDataSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(getRoleDataFailure(error.message));
      return error.message;
    }
  };

export const createRoleData = (data) => async (dispatch) => {
  try {
    dispatch(createRoleDataRequest());
    const res = await publicRequest.post("/api/authAdmin/register", data); // Updated from "user" to "role"
    dispatch(createRoleDataSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(createRoleDataFailure(error.message));
    return Promise.reject(error.message);
  }
};

export const updateRoleData = (data) => async (dispatch) => {
  try {
    dispatch(updateRoleDataRequest());
    const res = await userRequest.put(`/api/userAdmin/updateUser`, data); // Updated from "user" to "role"
    dispatch(updateRoleDataSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(updateRoleDataFailure(error.message));
    return Promise.reject(error.message);
  }
};
