"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TnWs = void 0;
const TnWsClient_1 = require("./TnWsClient");
const Authenticator_1 = require("./Authenticator");
class TnWs extends TnWsClient_1.TnWsClient {
    constructor(options) {
        super(options === null || options === void 0 ? void 0 : options.url);
        if ((options === null || options === void 0 ? void 0 : options.login) && (options === null || options === void 0 ? void 0 : options.password)) {
            this.authenticator = new Authenticator_1.Authenticator(options.login, options.password);
        }
    }
    async connect() {
        var _a;
        if (this.authenticator) {
            await this.authenticator.authenticate();
        }
        await super.connect((_a = this.authenticator) === null || _a === void 0 ? void 0 : _a.getSessionID());
        return this;
    }
}
exports.TnWs = TnWs;
