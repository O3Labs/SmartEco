import { NEOProvider } from "./provider";
export declare class NEOProviderEngine {
    protected _working: boolean;
    protected _providers: any[];
    protected _o3Provider: NEOProvider;
    constructor();
    start(): void;
    stop(): void;
    sendAsync(method: string, args?: any): Promise<any>;
    addEventListener(eventName: String, callback: () => void): void;
    removeEventListener(eventName: String, callback: () => void): void;
}
//# sourceMappingURL=provider-engine.d.ts.map