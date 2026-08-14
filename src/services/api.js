import AsyncStorage from "@react-native-async-storage/async-storage";

export const API_BASE_URL = (
  process.env.EXPO_PUBLIC_API_URL || "https://trust-backend-2nt9.onrender.com/api"
).replace(/\/$/, "");

export const AUTH_TOKEN_KEY = "trust_customs_auth_token";

export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export const tokenStorage = {
  get: () => AsyncStorage.getItem(AUTH_TOKEN_KEY),
  set: (token) => AsyncStorage.setItem(AUTH_TOKEN_KEY, token),
  clear: () => AsyncStorage.removeItem(AUTH_TOKEN_KEY),
};

export function buildQuery(params = {}) {
  const query = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .flatMap(([key, value]) => {
      const values = Array.isArray(value) ? value : [value];
      return values.map(
        (item) => `${encodeURIComponent(key)}=${encodeURIComponent(String(item))}`
      );
    })
    .join("&");

  return query ? `?${query}` : "";
}

async function parseResponse(response) {
  if (response.status === 204) return null;

  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) return response.json();

  const text = await response.text();
  return text || null;
}

export async function apiRequest(
  path,
  { method = "GET", body, headers = {}, auth = true, signal } = {}
) {
  const requestHeaders = { Accept: "application/json", ...headers };

  if (auth) {
    const token = await tokenStorage.get();
    if (token) requestHeaders.Authorization = `Bearer ${token}`;
  }

  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;
  let requestBody = body;

  if (body !== undefined && body !== null && !isFormData) {
    requestHeaders["Content-Type"] = requestHeaders["Content-Type"] || "application/json";
    requestBody = requestHeaders["Content-Type"].includes("application/json")
      ? JSON.stringify(body)
      : body;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: requestHeaders,
    body: requestBody,
    signal,
  });
  const data = await parseResponse(response);

  if (!response.ok) {
    const message = data?.error || data?.message || `Request failed (${response.status})`;
    throw new ApiError(message, response.status, data);
  }

  return data;
}

export const api = {
  get: (path, options) => apiRequest(path, { ...options, method: "GET" }),
  post: (path, body, options) =>
    apiRequest(path, { ...options, method: "POST", body }),
  put: (path, body, options) =>
    apiRequest(path, { ...options, method: "PUT", body }),
  patch: (path, body, options) =>
    apiRequest(path, { ...options, method: "PATCH", body }),
  delete: (path, options) => apiRequest(path, { ...options, method: "DELETE" }),
};
