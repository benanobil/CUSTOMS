import { api } from "./api";
import { File } from "expo-file-system";

export const profileService = {
  getProfile: () => api.get("/profile/me"),
  getStats: () => api.get("/profile/stats"),
  updateProfile: (updates) => api.put("/profile/update", updates),
  uploadImage: (image) => {
    const formData = new FormData();
    formData.append("profileImage", new File(image.uri));
    return api.post("/profile/upload-image", formData);
  },
  removeImage: () => api.delete("/profile/remove-image"),
};
