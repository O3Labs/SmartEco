import { NEOProviderEngine } from "./provider-engine";
import { getAccount } from "o3-dapi-neo"

export interface NEOProviderPayload {
    component: string,
    method: String,
    args: any
}

export interface NEOProviderAPI {
    getAccount?: getAccount
}

export class NEOProvider {
    engine: NEOProviderEngine
    api: NEOProviderAPI

    //maybe this will be split into submodules into the future
    constructor() {
       
    }

    public async handleRequest(
        payload: NEOProviderPayload,
        next: () => Promise<any>,
        end: (error: any, args: any) => Promise<any>
    ) {
        if (!this.api[payload.component] || !this.api[payload.component][payload.method](payload.args)) {
            return await next();
        } else {
            const result = await this.api[payload.component][payload.method](payload.args);
            return await end(null, this.afterCall(result))
        }
    }

    public async afterCall(data: any) {
        return data
    } 
}