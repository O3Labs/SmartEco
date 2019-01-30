import { NEOProvider, NEOProviderPayload, NEOProviderAPI } from "./provider";
import { getAccount, getBalance, getProvider, getNetworks } from "o3-dapi-neo";
import o3dapi from 'o3-dapi-core';

export class NEOProviderEngine {
    protected _working: boolean;
    protected _providers: any[] = [];

    protected _o3Provider: NEOProvider

    constructor() {
        const o3API: NEOProviderAPI = {
            getAccount: o3dapi.getAccount,
            getBalance: o3dapi.getBalance,
            getNetworks: o3dapi.getNetworks,
            getProvider: o3dapi.getProvider
        }

        this._o3Provider = new NEOProvider(o3API)
        this._providers.push(this._o3Provider)
    }

    public start() {
        this._working = true
    }

    public stop() {
        this._working = false
    }

    public async sendAsync(method: string, args? :any): Promise<any> {
        if (!this._working) {
            return Promise.reject("Provider engine is not currently active")
        }

        //maybe this is uncessary since everything is in base package
        const [_method, ...surplus] = method.split('.');
        if (surplus.length > 0) {
            throw new Error('unsupported dapi method')
        }

        let currentProviderIndex = -1;
        const payload: NEOProviderPayload = {
            method: _method,
            args
        };

        const end = async (_err: any, _result?: any) => {
            if (_err) return Promise.reject(_err);
            else return Promise.resolve(_result);
        };

        const next = async () => {
            ++currentProviderIndex;

            if (this._providers.length <= currentProviderIndex) {
              return await end(new Error(`Requested method ${method} is not handled by any providers.`));
            }

            try {
              return await this._providers[currentProviderIndex].handleRequest(payload, next, end);
            } catch (e) {
              return await end(e);
            }
        }

        return await next();
    }
}
