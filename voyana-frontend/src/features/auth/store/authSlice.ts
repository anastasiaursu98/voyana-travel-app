import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ApiErrorInfo } from "../../../shared/types/api.types";
import { getApiErrorMessage } from "../../../shared/utils/apiError";
import { authApi } from "../api/authApi";
import type {
  AuthSession,
  AuthStatus,
  AuthUser,
  LoginPayload,
  RegisterPayload,
  ResendOtpPayload,
  VerifyOtpPayload,
} from "../types/auth.types";

export type AuthState = {
  user: AuthUser | null;
  userStatus: AuthStatus;
  userError: string | null;

  loginStatus: AuthStatus;
  loginError: string | null;

  registerStatus: AuthStatus;
  registerError: string | null;

  verifyOtpStatus: AuthStatus;
  verifyOtpError: string | null;

  resendOtpStatus: AuthStatus;
  resendOtpError: string | null;
};

const initialState: AuthState = {
  user: null,
  userStatus: "idle",
  userError: null,
  loginStatus: "idle",
  loginError: null,
  registerStatus: "idle",
  registerError: null,
  verifyOtpStatus: "idle",
  verifyOtpError: null,
  resendOtpStatus: "idle",
  resendOtpError: null,
};

type AuthThunkConfig = {
  rejectValue: ApiErrorInfo;
};

export const fetchCurrentUser = createAsyncThunk<
  AuthUser,
  void,
  AuthThunkConfig
>("auth/fetchCurrentUser", async (_, { rejectWithValue }) => {
  try {
    const response = await authApi.getCurrentUserApi();
    return response;
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const registerUser = createAsyncThunk<
  AuthUser,
  RegisterPayload,
  AuthThunkConfig
>("auth/registerUser", async (payload, { rejectWithValue }) => {
  try {
    const response = await authApi.registerApi(payload);

    return response;
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});
export const loginUser = createAsyncThunk<
  AuthSession,
  LoginPayload,
  AuthThunkConfig
>("auth/loginUser", async (payload, { rejectWithValue }) => {
  try {
    const response = await authApi.loginApi(payload);
    return response;
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const verifyOtp = createAsyncThunk<
  AuthUser,
  VerifyOtpPayload,
  AuthThunkConfig
>("auth/verifyOtp", async (payload, { rejectWithValue }) => {
  try {
    const response = await authApi.verifyOtpApi(payload);
    return response;
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});
export const resendOtp = createAsyncThunk<
  null,
  ResendOtpPayload,
  AuthThunkConfig
>("auth/resendOtp", async (payload, { rejectWithValue }) => {
  try {
    const response = await authApi.resendOtpApi(payload);
    return response;
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthErrors(state) {
      state.loginError = null;
      state.registerError = null;
      state.verifyOtpError = null;
      state.resendOtpError = null;
    },
    resetAuthStatuses(state) {
      state.loginStatus = "idle";
      state.registerStatus = "idle";
      state.verifyOtpStatus = "idle";
      state.resendOtpStatus = "idle";
    },
    logout(state) {
      state.user = null;
      state.loginStatus = "idle";
      state.loginError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.userStatus = "loading";
        state.userError = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.userStatus = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.userStatus = "failed";
        state.userError =
          action.payload?.message ?? "Fetching current user failed";
      })
      .addCase(loginUser.pending, (state) => {
        state.loginStatus = "loading";
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginStatus = "succeeded";
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginStatus = "failed";
        state.loginError = action.payload?.message ?? "Login failed";
      })
      .addCase(registerUser.pending, (state) => {
        state.registerStatus = "loading";
        state.registerError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerStatus = "succeeded";
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerStatus = "failed";
        state.registerError = action.payload?.message ?? "Registration failed";
      })
      .addCase(verifyOtp.pending, (state) => {
        state.verifyOtpStatus = "loading";
        state.verifyOtpError = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.verifyOtpStatus = "succeeded";
        state.user = action.payload;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.verifyOtpStatus = "failed";
        state.verifyOtpError =
          action.payload?.message ?? "OTP verification failed";
      })
      .addCase(resendOtp.pending, (state) => {
        state.resendOtpStatus = "loading";
        state.resendOtpError = null;
      })
      .addCase(resendOtp.fulfilled, (state) => {
        state.resendOtpStatus = "succeeded";
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.resendOtpStatus = "failed";
        state.resendOtpError =
          action.payload?.message ?? "Resending OTP failed";
      });
  },
});

export const { clearAuthErrors, logout, resetAuthStatuses } = authSlice.actions;

export const selectAuthUser = (state: { auth: AuthState }) => state.auth.user;

export const selectAuthStatusLogin = (state: { auth: AuthState }) =>
  state.auth.loginStatus;
export const selectAuthErrorLogin = (state: { auth: AuthState }) =>
  state.auth.loginError;
export const selectAuthStatusRegister = (state: { auth: AuthState }) =>
  state.auth.registerStatus;
export const selectAuthErrorRegister = (state: { auth: AuthState }) =>
  state.auth.registerError;
export const selectAuthStatusVerifyOtp = (state: { auth: AuthState }) =>
  state.auth.verifyOtpStatus;
export const selectAuthErrorVerifyOtp = (state: { auth: AuthState }) =>
  state.auth.verifyOtpError;
export const selectAuthStatusResendOtp = (state: { auth: AuthState }) =>
  state.auth.resendOtpStatus;
export const selectAuthErrorResendOtp = (state: { auth: AuthState }) =>
  state.auth.resendOtpError;
export default authSlice.reducer;
