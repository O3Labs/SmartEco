import { NEOProvider, NEOProviderPayload, NEOProviderAPI } from "./provider";
import o3dapi from 'o3-dapi-core';
import O3dapiNeo from "o3-dapi-neo";

export class SmartEcoRouter {
    protected _working: boolean;
    protected _providers: any[] = [];
    
    protected _o3Provider: NEOProvider

    constructor() {
        o3dapi.initPlugins([O3dapiNeo]);
        const o3API: NEOProviderAPI = {
            getNetworks: o3dapi.NEO.getNetworks,
            getProvider: o3dapi.NEO.getProvider,
            disconnect: o3dapi.NEO.disconnect,
            getAccount: o3dapi.NEO.getAccount,
            getBalance: o3dapi.NEO.getBalance,
            getStorage: o3dapi.NEO.getStorage,
            invokeRead: o3dapi.NEO.invokeRead,

            send: o3dapi.NEO.send,
            invoke: o3dapi.NEO.invoke,

            addEventListener: o3dapi.NEO.addEventListener,
            removeEventListener: o3dapi.NEO.removeEventListener
            

        }
        this._o3Provider = new NEOProvider(o3API);
        this._providers.push(this._o3Provider);
    }

    public start() {
        this._working = true;
    }

    public stop() {
        this._working = false;
    }

    //read methods
    public async getProvider(): Promise<any> {
        return this.sendAsync("getProvider")
    }

    public async getNetworks(): Promise<any>{
        return this.sendAsync("getNetworks")
    }

    public async getAccount(args?: any): Promise<any> {
        return this.sendAsync("getAccount", args)
    }

    public async getBalance(args?: any): Promise<any> {
        return this.sendAsync("getBalance", args)
    }

    public async getStorage(args?: any): Promise<any> {
        return this.sendAsync("getStorage", args)
    }

    public async invokeRead(args?: any): Promise<any> {
        return this.sendAsync("invokeRead", args)
    }

    //write methods
    public async send(args?: any): Promise<any> {
        return this.sendAsync("send", args)
    }

    public async invoke(args?: any): Promise<any> {
        return this.sendAsync("invoke", args)
    }

    private async sendAsync(method: string, args? :any): Promise<any> {
        if (!this._working) {
            return Promise.reject("Provider engine is not currently active");
        }

        //maybe this is uncessary since everything is in base package
        const [_method, ...surplus] = method.split('.');
        if (surplus.length > 0) {
            throw new Error('unsupported dapi method');
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

    // For now I add event listener to all providers
    // In future there is probably need to only trigger active provider
    public addEventListener(eventName: String, callback: () => void) {
        if (!this._working) {
            return 
        }

        for (let provider of this._providers) {
            provider.api.addEventListener(eventName, callback)
        }
    }

    public removeEventListener(eventName: String, callback: () => void) {
        if (!this._working) {
            return 
        }

        for (let provider of this._providers) {
            provider.api.removeEventListener(eventName, callback)
        }
    }
}
