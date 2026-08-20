export type Paginated<T> = {
  data: T[];
  total: number;
  limit: number;
  page: number;
  totalPages: number;
};

export type MergedTransaction = {
  id: string;
  type: string;
  idType: string;
  createdAt: string;
  sourceChainId: string;
  sourceAddress: string;
};

export type FlatTransaction = {
  messageId: string;
  transactionId?: string;
  sharedId?: string;
  sourceTransactionHash: string;
  sourceTransactionRevertHash?: string;
  sourceChainId: string;
  sourceTimestamp: string;
  sourceAddress: string;
  sourceRevertTimestamp?: string;
  type: string;
  destinationTransactionHash: string;
  status?: string;
  destinationChainId: string;
  destinationAddress: string;
  amount: number;
  resourceId: string;
  messageType: string;
  tokenSymbol?: string;
  ercId?: string;
  destinationTimestamp: string;
  tokenMetadataImageUrl?: string;
  tokenMetadataName?: string;
  tokenMetadataDescription?: string;
  hubHash?: string;
  hubTimestamp?: string;
  hubBlockNumber?: number;
  payload?: string;
  protocol: string;
};

export type BaseBatchTransaction = {
  messageId: string;
  createdAt: string;
  sourceChainId: string;
  sourceAddress: string;
  destinationChainId: string;
  destinationAddress: string;
  amount: string;
  tokenSymbol: string;
};

export type EnygmaTransaction = BaseBatchTransaction & {
  batchId: string;
};

export type SwapTransaction = BaseBatchTransaction & {
  transactionId: string;
  sharedId: string;
  tokenName: string;
  sourceTransactionHash: string;
  destinationTransactionHash: string;
  hubTimestamp?: string;
  resourceId: string;
  messageType: string;
  protocol: string;
  status: string;
  ercId?: string;
  payload?: string;
  hubTxHash?: string;
}

export type BatchTransaction = BaseBatchTransaction;

export enum AtomicTeleportStatus {
  pending = "pending",
  executed = "executed",
  rejected = "rejected",
  reverted = "reverted",
  credit_memo = "credit_memo",
  in_progress = "in_progress"
}

export enum DvpSwapStatus {
  completed = "completed",
  failed = "failed",
  cancelled = "cancelled",
  expired = "expired",
  pending = "pending"
}

export type PaginationParams = {
  page: number;
  limit: number;
};

export enum TransactionMessageType {
  erc20 = "erc20",
  erc1155 = "erc1155",
  erc721 = "erc721",
  enygma = "enygma",
  custom = "custom"
}

export enum MessageType {
  transaction = "transaction",
  enygma_batch = "enygma_batch",
  regular_batch = "regular_batch",
  dvp_swap = "dvp_swap"
}

export enum ProtocolType {
  custom = "CUSTOM",
  vanilla = "VANILLA",
  atomic = "ATOMIC",
  enygma = "ENYGMA",
  dvp_deposit = "DVP_DEPOSIT",
  dvp_withdraw = "DVP_WITHDRAW",
  dvp_swap = "DVP_SWAP"
}