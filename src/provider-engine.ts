import {NEOProvider} from "./provider";

export class NEOProviderEngine {
    protected _working: boolean;
    protected _providers: any[] = [];

    public addProvider(provider: NEOProvider) {
        this._providers.push(provider)
        provider.engine = this
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
    }
}