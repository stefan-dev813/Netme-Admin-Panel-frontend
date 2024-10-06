import { createSlice } from "@reduxjs/toolkit";
import { userRequest } from "../../requestMethod";

const initialState = {
  user: [], // Updated from "partner" to "user"
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user", // Updated from "partner" to "user"
  initialState,
  reducers: {
    getUserDataRequest: (state) => {
      state.isLoading = true;
    },
    getUserDataSuccess: (state, action) => {
      state.user = action.payload; // Updated from "partner" to "user"
      state.isLoading = false;
      state.error = null;
    },
    getUserDataFailure: (state, action) => {
      state.user = []; // Updated from "partner" to "user"
      state.isLoading = false;
      state.error = action.payload;
    },
    createUserDataRequest: (state) => {
      state.isLoading = true;
    },
    createUserDataSuccess: (state, action) => {
      state.user = action.payload; // Updated from "partner" to "user"
      state.isLoading = false;
      state.error = null;
    },
    createUserDataFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateUserDataRequest: (state) => {
      state.isLoading = true;
    },
    updateUserDataSuccess: (state, action) => {
      state.user = []; // Updated from "partner" to "user"
      state.isLoading = false;
      state.error = null;
    },
    updateUserDataFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getUserDataRequest,
  getUserDataSuccess,
  getUserDataFailure,
  createUserDataRequest,
  createUserDataSuccess,
  createUserDataFailure,
  updateUserDataRequest,
  updateUserDataSuccess,
  updateUserDataFailure,
} = userSlice.actions;

export default userSlice.reducer;

export const fetchUserData = (type="", search="", page="", registerationStartDate="", registerationEndDate="", gender="", city="", ageRangeStart="", ageRangeEnd="") => async (dispatch) => {
  try {
    dispatch(getUserDataRequest());
    const response = await userRequest.get(
      `/admin/user/getAllUsers?page=${page}&limit=10&search=${search}&status=${type}&registerationStartDate=${registerationStartDate}&registerationEndDate=${registerationEndDate}&gender=${gender}&city=${city}&ageRangeStart=${ageRangeStart}&ageRangeEnd=${ageRangeEnd}`
    ); // Updated from "partner" to "user"
    dispatch(getUserDataSuccess(response.data));
    return response.data;
  } catch (error) {
    dispatch(getUserDataFailure(error.message));
    return error.message;
  }
};

export const createUserData = (data) => async (dispatch) => {
  try {
    dispatch(createUserDataRequest());
    const res = await userRequest.post("/user/createUser", data); // Updated from "partner" to "user"
    dispatch(createUserDataSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(createUserDataFailure(error.message));
    return error.message;
  }
};

export const updateUserData = (data) => async (dispatch) => {
  try {
    dispatch(updateUserDataRequest());
    const res = await userRequest.put(`/admin/user/updateCustomer`, data); // Updated from "partner" to "user"
    dispatch(updateUserDataSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(updateUserDataFailure(error.message));
    return error.message;
  }
};
