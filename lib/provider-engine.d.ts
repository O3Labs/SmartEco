import { NEOProvider } from "./provider";
export declare class SmartEcoRouter {
    protected _working: boolean;
    protected _providers: any[];
    protected _o3Provider: NEOProvider;
    constructor();
    start(): void;
    stop(): void;
    getProvider(): Promise<any>;
    getNetworks(): Promise<any>;
    getAccount(args?: any): Promise<any>;
    getBalance(args?: any): Promise<any>;
    getStorage(args?: any): Promise<any>;
    invokeRead(args?: any): Promise<any>;
    send(args?: any): Promise<any>;
    invoke(args?: any): Promise<any>;
    private sendAsync;
    addEventListener(eventName: String, callback: () => void): void;
    removeEventListener(eventName: String, callback: () => void): void;
}
//# sourceMappingURL=provider-engine.d.ts.map