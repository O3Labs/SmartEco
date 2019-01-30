import { NEOProviderEngine } from "./provider-engine";
import { getAccount, getBalance, getProvider, getNetworks } from "o3-dapi-neo"

export interface NEOProviderPayload {
    method: string,
    args: any
}

export interface NEOProviderAPI {
    getAccount?: getAccount
    getBalance?: getBalance
    getProvider?: getProvider
    getNetworks?: getNetworks
}

export class NEOProvider {
    engine: NEOProviderEngine
    api: NEOProviderAPI

    //maybe this will be split into submodules into the future
    constructor(api: NEOProviderAPI) {
       this.api = api
    }

    public async handleRequest(
        payload: NEOProviderPayload,
        next: () => Promise<any>,
        end: (error: any, args: any) => Promise<any>
    ) {
        if (!this.api[payload.method] || !this.api[payload.method](payload.args)) {
            return await next();
        } else {
            const result = await this.api[payload.method](payload.args);
            return await end(null, this.afterCall(result))
        }
    }

    public async afterCall(data: any) {
        return data
    } 
}