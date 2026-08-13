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
  getDeclarationEventHistory: async (declarationId) => {
    try {
      return await blockchainService.getDeclarationEvents(declarationId);
    } catch (error) {
      if (error.status !== 400) throw error;

      const eventNames = ["GoodsDeclared", "DutyPaid", "GoodsReleased"];
      const responses = await Promise.all(
        eventNames.map((eventName) =>
          blockchainService.getEvents(eventName, { limit: 100 })
        )
      );
      const events = responses
        .flatMap((response, index) =>
          (response.events || []).map((event) => ({
            ...event,
            event: event.event || eventNames[index],
          }))
        )
        .filter((event) => {
          const args = event.args || event.details || {};
          return String(args.declarationId || args[0] || "") === String(declarationId);
        })
        .sort((a, b) => Number(a.blockNumber || 0) - Number(b.blockNumber || 0));

      return { success: true, declarationId, events, count: events.length };
    }
  },
};
