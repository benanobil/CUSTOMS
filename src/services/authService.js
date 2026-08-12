import { api, tokenStorage } from "./api";

export const authService = {
  async login(credentials) {
    const response = await api.post("/auth/login", credentials, { auth: false });
    const token = response?.token || response?.data?.token;
    if (token) await tokenStorage.set(token);
    return response;
  },

  registerCustoms: (officerDetails) =>
    api.post("/auth/register/customs", officerDetails, { auth: false }),
  verifyRegistration: (payload) =>
    api.post("/auth/register/verify", payload, { auth: false }).then(async (response) => {
      const token = response?.token || response?.data?.token;
      if (token) await tokenStorage.set(token);
      return response;
    }),
  resendOtp: (payload) => api.post("/auth/resend-otp", payload, { auth: false }),
  forgotPassword: (payload) =>
    api.post("/auth/forgot-password", payload, { auth: false }),
  verifyResetOtp: (payload) =>
    api.post("/auth/verify-reset-otp", payload, { auth: false }),
  resetPassword: (payload) =>
    api.post("/auth/reset-password", payload, { auth: false }),
  changePassword: (payload) => api.post("/auth/change-password", payload),
  getCurrentUser: () => api.get("/auth/me"),

  async logout() {
    try {
      return await api.post("/auth/logout");
    } finally {
      await tokenStorage.clear();
    }
  },
};
