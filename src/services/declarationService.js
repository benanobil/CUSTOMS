import { api, buildQuery } from "./api";

export const declarationService = {
  getAll: (filters) => api.get(`/declarations${buildQuery(filters)}`),
  getById: (declarationId) =>
    api.get(`/declarations/${encodeURIComponent(declarationId)}`),
  getByUcr: (ucr) => api.get(`/declarations/ucr/${encodeURIComponent(ucr)}`),
  getTimeline: (declarationId) =>
    api.get(`/declarations/${encodeURIComponent(declarationId)}/timeline`),
  getReceipt: (declarationId) =>
    api.get(`/declarations/${encodeURIComponent(declarationId)}/receipt`),
  releaseGoods: (declarationId) =>
    api.post("/declarations/release", { declarationId }),
  flagDeclaration: ({ declarationId, reason, notes = "" }) =>
    api.post("/declarations/flag", { declarationId, reason, notes }),
};

