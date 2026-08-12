import { api, buildQuery } from "./api";

export const reportService = {
  getDashboard: () => api.get("/reports/dashboard"),
  getActivity: (pagination) =>
    api.get(`/reports/activity${buildQuery(pagination)}`),
  getDeclarationStats: () => api.get("/reports/declaration-stats"),
};

