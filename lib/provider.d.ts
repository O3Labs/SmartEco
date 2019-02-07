import { SmartEcoRouter } from "./provider-engine";
import { getAccount, getBalance, getProvider, getNetworks, getStorage, invokeRead, send, invoke, disconnect, addEventListener, removeEventListener } from "o3-dapi-neo";
export interface NEOProviderPayload {
    method: string;
    args: any;
}
export interface NEOProviderAPI {
    getProvider?: getProvider;
    getNetworks?: getNetworks;
    disconnect?: disconnect;
    getAccount?: getAccount;
    getBalance?: getBalance;
    getStorage?: getStorage;
    invokeRead?: invokeRead;
    send?: send;
    invoke?: invoke;
    addEventListener?: addEventListener;
    removeEventListener?: removeEventListener;
}
export declare class NEOProvider {
    engine: SmartEcoRouter;
    api: NEOProviderAPI;
    constructor(api: NEOProviderAPI);
    handleRequest(payload: NEOProviderPayload, next: () => Promise<any>, end: (error: any, args: any) => Promise<any>): Promise<any>;
    afterCall(data: any): Promise<any>;
}
//# sourceMappingURL=provider.d.ts.map