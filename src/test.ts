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

export const ethereum =
  typeof window !== "undefined" && (window as any)?.ethereum;

export async function connect() {
  if (!ethereum) return;
  await ethereum.enable();
}

export async function connectSnaps() {
  ethereum
    .request({
      method: "wallet_requestSnaps",
      params: {
        "npm:mina-portal": {},
      },
    })
    .then((res: Object) => console.log(res))
    .catch((err: Object) => console.log(err));
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

export async function getSnapAccInfo() {
  const res: Account = await ethereum.request({
    method: "wallet_invokeSnap",
    params: {
      snapId: "npm:mina-portal",
      request: {
        method: "mina_accountInfo",
      },
    },
  });
  return res;
}
