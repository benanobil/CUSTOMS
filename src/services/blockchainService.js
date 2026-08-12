import { api, buildQuery } from "./api";

export const blockchainService = {
  getContractInfo: () => api.get("/blockchain/contract/info"),
  getRoles: (walletAddress) =>
    api.get(`/blockchain/contract/roles/${encodeURIComponent(walletAddress)}`),
  getDeclaration: (declarationId) =>
    api.get(`/blockchain/declarations/${encodeURIComponent(declarationId)}`),
  getNftByTokenId: (tokenId) =>
    api.get(`/blockchain/nft/${encodeURIComponent(tokenId)}`),
  getNftByDeclaration: (declarationId) =>
    api.get(`/blockchain/nft/declaration/${encodeURIComponent(declarationId)}`),
  getTransaction: (transactionHash) =>
    api.get(`/blockchain/tx/${encodeURIComponent(transactionHash)}`),
  getTransactionReceipt: (transactionHash) =>
    api.get(`/blockchain/tx/${encodeURIComponent(transactionHash)}/receipt`),
  estimateGas: (payload) => api.post("/blockchain/gas/estimate", payload),
  getEvents: (eventName, filters) =>
    api.get(
      `/blockchain/events/${encodeURIComponent(eventName)}${buildQuery(filters)}`
    ),
  getDeclarationEvents: (declarationId) =>
    api.get(`/blockchain/events/declaration/${encodeURIComponent(declarationId)}`),
};

