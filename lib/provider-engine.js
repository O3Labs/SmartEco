var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { NEOProvider } from "./provider";
import o3dapi from 'o3-dapi-core';
export class NEOProviderEngine {
    constructor() {
        this._providers = [];
        const o3API = {
            getAccount: o3dapi.getAccount,
            getBalance: o3dapi.getBalance,
            getNetworks: o3dapi.getNetworks,
            getProvider: o3dapi.getProvider
        };
        this._o3Provider = new NEOProvider(o3API);
        this._providers.push(this._o3Provider);
    }
    start() {
        this._working = true;
    }
    stop() {
        this._working = false;
    }
    sendAsync(method, args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._working) {
                return Promise.reject("Provider engine is not currently active");
            }
            //maybe this is uncessary since everything is in base package
            const [_method, ...surplus] = method.split('.');
            if (surplus.length > 0) {
                throw new Error('unsupported dapi method');
            }
            let currentProviderIndex = -1;
            const payload = {
                method: _method,
                args
            };
            const end = (_err, _result) => __awaiter(this, void 0, void 0, function* () {
                if (_err)
                    return Promise.reject(_err);
                else
                    return Promise.resolve(_result);
            });
            const next = () => __awaiter(this, void 0, void 0, function* () {
                ++currentProviderIndex;
                if (this._providers.length <= currentProviderIndex) {
                    return yield end(new Error(`Requested method ${method} is not handled by any providers.`));
                }
                try {
                    return yield this._providers[currentProviderIndex].handleRequest(payload, next, end);
                }
                catch (e) {
                    return yield end(e);
                }
            });
            return yield next();
        });
    }
}
//# sourceMappingURL=provider-engine.js.map