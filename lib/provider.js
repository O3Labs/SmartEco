var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class NEOProvider {
    //maybe this will be split into submodules into the future
    constructor(api) {
        this.api = api;
    }
    handleRequest(payload, next, end) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.api[payload.method] || !this.api[payload.method](payload.args)) {
                return yield next();
            }
            else {
                const result = yield this.api[payload.method](payload.args);
                return yield end(null, this.afterCall(result));
            }
        });
    }
    afterCall(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return data;
        });
    }
}
//# sourceMappingURL=provider.js.map