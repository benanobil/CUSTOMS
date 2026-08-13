import { api, buildQuery } from "./api";

const STATUS_LABELS = {
  DECLARED: "Pending",
  PAID: "Paid",
  GOODS_RELEASED: "Released",
  FLAGGED: "Flagged",
  UNDER_INVESTIGATION: "Flagged",
  RESOLVED: "Resolved",
};

export const getDeclarationStatusLabel = (status) =>
  STATUS_LABELS[status] || status || "Pending";

export const formatUsd = (value) =>
  `$${Number(value || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

export const mapDeclarationForList = (declaration) => ({
  id: declaration.declarationId,
  name: declaration.productDescription,
  hsCode: declaration.hsCode,
  value: formatUsd(declaration.declaredValueUSD),
  duty: formatUsd(declaration.dutyCalculatedUSD),
  status: getDeclarationStatusLabel(declaration.status),
  declaredDate: declaration.createdAt?.slice(0, 10),
  releasedDate: declaration.releaseTime?.slice(0, 10),
  note: declaration.flagReason || "Under Investigation - Contact Auditor",
  raw: declaration,
});

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
