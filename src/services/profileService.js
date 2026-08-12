import { api } from "./api";

export const profileService = {
  getProfile: () => api.get("/profile/me"),
  getStats: () => api.get("/profile/stats"),
  updateProfile: (updates) => api.put("/profile/update", updates),
  uploadImage: (image) => {
    const formData = new FormData();
    formData.append("profileImage", {
      uri: image.uri,
      name: image.fileName || `profile-${Date.now()}.jpg`,
      type: image.mimeType || "image/jpeg",
    });
    return api.post("/profile/upload-image", formData);
  },
  removeImage: () => api.delete("/profile/remove-image"),
};
