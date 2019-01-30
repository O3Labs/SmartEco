import { NEOProviderEngine } from "./provider-engine";
import { getAccount, getBalance, getProvider, getNetworks } from "o3-dapi-neo";
export interface NEOProviderPayload {
    method: string;
    args: any;
}
export interface NEOProviderAPI {
    getAccount?: getAccount;
    getBalance?: getBalance;
    getProvider?: getProvider;
    getNetworks?: getNetworks;
}
export declare class NEOProvider {
    engine: NEOProviderEngine;
    api: NEOProviderAPI;
    constructor(api: NEOProviderAPI);
    handleRequest(payload: NEOProviderPayload, next: () => Promise<any>, end: (error: any, args: any) => Promise<any>): Promise<any>;
    afterCall(data: any): Promise<any>;
}
//# sourceMappingURL=provider.d.ts.map