import { axiosClient } from "../../../shared/services/axiosClient";
import type { ApiSuccessResponse } from "../../../shared/types/api.types";
import type {
  AuthSession,
  AuthUser,
  LoginPayload,
  RegisterPayload,
  ResendOtpPayload,
  VerifyOtpPayload,
} from "../types/auth.types";

export const authApi = {
  async getCurrentUserApi(): Promise<AuthUser> {
    const { data } =
      await axiosClient.get<ApiSuccessResponse<AuthUser>>("/auth/current-user");

    return data.data;
  },
  async registerApi(payload: RegisterPayload): Promise<AuthUser> {
    const { data } = await axiosClient.post<ApiSuccessResponse<AuthUser>>(
      "/auth/register",
      payload,
    );

    return data.data;
  },
  async loginApi(payload: LoginPayload): Promise<AuthSession> {
    const { data } = await axiosClient.post<ApiSuccessResponse<AuthSession>>(
      "/auth/login",
      payload,
    );
    return data.data;
  },
  async verifyOtpApi(payload: VerifyOtpPayload) {
    const response = await axiosClient.post<ApiSuccessResponse<AuthUser>>(
      "/auth/verify-otp",
      payload,
    );

    return response.data.data;
  },

  async resendOtpApi(payload: ResendOtpPayload) {
    const response = await axiosClient.post<ApiSuccessResponse<null>>(
      "/auth/resend-otp",
      payload,
    );

    return response.data.data;
  },
};
