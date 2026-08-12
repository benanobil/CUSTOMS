import { api } from "./api";

export const evidenceService = {
  upload: ({ declarationId, file, ...fields }) => {
    const formData = new FormData();
    formData.append("declarationId", declarationId);
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
  download: (fileId) =>
    api.get(`/uploads/evidence/download/${encodeURIComponent(fileId)}`),
  delete: (fileId) =>
    api.delete(`/uploads/evidence/${encodeURIComponent(fileId)}`),
};
