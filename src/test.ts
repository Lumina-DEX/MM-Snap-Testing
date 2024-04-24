export type ResponseNetworkConfig = {
  name: string;
  gqlUrl: string;
  gqlTxUrl: string;
  explorerUrl: string;
  token: {
    name: string;
    coinType: number;
    symbol: string;
    decimals: number;
  };
};

export type Account = {
  name?: string;
  publicKey?: string;
  balance?: { total: string };
  inferredNonce?: string;
  nonce?: string;
};

export type AccountListResult = {
  name: string;
  address: string;
  index?: number;
  balance?: { total: string };
  isImported?: boolean;
}[];

export const ethereum =
  typeof window !== "undefined" && (window as any)?.ethereum;

export async function connect() {
  if (!ethereum) return 0;
  await ethereum.enable();
  return 1;
}

export async function connectSnaps() {
  await ethereum.request({
    method: "wallet_requestSnaps",
    params: {
      "npm:mina-portal": {},
    },
  });
}

export async function getSnapInfo() {
  const res = await ethereum.request({
    method: "wallet_invokeSnap",
    params: {
      snapId: "npm:mina-portal",
      request: {
        method: "mina_networkConfig",
      },
    },
  });
  return res;
}

export async function createSnapAcc(accountName: string) {
  const res = await ethereum.request({
    method: "wallet_invokeSnap",
    params: {
      snapId: "npm:mina-portal",
      request: {
        method: "mina_createAccount",
        params: {
          name: accountName,
        },
      },
    },
  });
  return res;
}

export async function getSnapAccList() {
  const res = await ethereum.request({
    method: "wallet_invokeSnap",
    params: {
      snapId: "npm:mina-portal",
      request: {
        method: "mina_accountList",
      },
    },
  });
  if (res.length < 2) return 0;
  return 1;
}
