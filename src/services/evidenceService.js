import { api } from "./api";

export const evidenceService = {
  upload: async ({ declarationId, file, ...fields }) => {
    if (!declarationId) throw new Error("declarationId is required");
    if (!file?.uri) throw new Error("A file is required");

    const formData = new FormData();
    formData.append("declarationId", String(declarationId));
    Object.entries(fields).forEach(([key, value]) => {
      if (value !== undefined && value !== null) formData.append(key, String(value));
    });
    formData.append("file", {
      uri: file.uri,
      name: file.name || `evidence-${Date.now()}`,
      type: file.mimeType || "application/octet-stream",
    });
    return api.post("/uploads/evidence", formData);
  },
  getByDeclaration: (declarationId) =>
    api.get(`/uploads/evidence/${encodeURIComponent(declarationId)}`),
  // The backend authorizes this request and redirects to the Cloudinary URL.
  // Callers should open the `url` returned by getByDeclaration instead; a
  // fetch here would attempt to parse the redirected binary as JSON/text.
  getDownloadUrl: (file) => file?.url || null,
  delete: (fileId) =>
    api.delete(`/uploads/evidence/${encodeURIComponent(fileId)}`),
};
