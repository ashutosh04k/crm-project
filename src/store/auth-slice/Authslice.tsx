import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_API_PATHS } from "../../helpers/constants/backendApiPath.constant";
import { API_BACKEND_PATH } from "../../config/env";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  isAuthenticated: boolean;
  isloading: boolean;
  user: User | null;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isloading: true,
  user: null,
  error: null,
};

interface LoginUserPayload {
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk(
  `${BACKEND_API_PATHS.AUTH}/${BACKEND_API_PATHS.SIGNIN}`,
  async (formData: LoginUserPayload) => {
    const response = await axios.post(
      `${API_BACKEND_PATH}/${BACKEND_API_PATHS.AUTH}/${BACKEND_API_PATHS.SIGNIN}`,
      formData,
      { withCredentials: true }
    );
    console.log(response?.data)
    return response?.data;
  }
);

export const logOutUser = createAsyncThunk(
  `${BACKEND_API_PATHS.AUTH}/${BACKEND_API_PATHS.SIGNOUT}`,
  async () => {
    const response = await axios.get(
      `${API_BACKEND_PATH}/${BACKEND_API_PATHS.AUTH}/${BACKEND_API_PATHS.SIGNOUT}`,
      { withCredentials: true }
    );
    return response?.data;
  }
);

export const checkAuth = createAsyncThunk(
  `${BACKEND_API_PATHS.AUTH}/${BACKEND_API_PATHS.VERIFYTOKEN}`,
  async () => {
    const response = await axios.post(
      `${API_BACKEND_PATH}/${BACKEND_API_PATHS.AUTH}/${BACKEND_API_PATHS.VERIFYTOKEN}`,{},
      { withCredentials: true }
    );
    return response.data;
  }
);

const Authslice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isloading = true;
        state.error = null; // Reset error state when starting login
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action,"login actionS")
        state.isloading = false;
        state.user = action.payload.data;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isloading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.error.message || "Login failed";
      })
      .addCase(checkAuth.pending,(state) =>{
        state.isloading = true;
      })
      .addCase(checkAuth.fulfilled,(state,action) =>{
        console.log(action,"action")
        state.isloading = false;
        state.user = action.payload.status === 200 ? action.payload.data : null;
        state.isAuthenticated = true;
      })
      .addCase(checkAuth.rejected,(state,action) =>{
        state.isAuthenticated = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logOutUser.pending, (state) => {
        state.isloading = true;
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.isloading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logOutUser.rejected, (state) => {
        state.isloading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = "Logout failed";
      });
  },
});

export const { setUser } = Authslice.actions;
export default Authslice.reducer;
