import { NEOProvider } from "./provider";
export declare class NEOProviderEngine {
    protected _working: boolean;
    protected _providers: any[];
    protected _o3Provider: NEOProvider;
    constructor();
    start(): void;
    stop(): void;
    sendAsync(method: string, args?: any): Promise<any>;
}
//# sourceMappingURL=provider-engine.d.ts.map