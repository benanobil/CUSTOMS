import { api, buildQuery } from "./api";

export const notificationService = {
  getAll: (filters) => api.get(`/notifications${buildQuery(filters)}`),
  getUnreadCount: () => api.get("/notifications/unread-count"),
  markAsRead: (notificationId) =>
    api.put(`/notifications/${encodeURIComponent(notificationId)}/read`),
  markAllAsRead: () => api.put("/notifications/read-all"),
  deleteOne: (notificationId) =>
    api.delete(`/notifications/${encodeURIComponent(notificationId)}`),
  deleteAll: () => api.delete("/notifications/all"),
};

