"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WSClient = void 0;
const isomorphic_ws_1 = __importDefault(require("isomorphic-ws"));
class WSClient {
    constructor(url) {
        this.shouldReconnect = false;
        this.url = url;
        this.ws = null;
    }
    connect(sid) {
        return new Promise((resolve, reject) => {
            this.ws = new isomorphic_ws_1.default(this.url + (sid ? `?SID=${sid}` : ''));
            this.ws.onopen = () => {
                console.log(`Connected to ${this.url}`);
                this.shouldReconnect = true;
                resolve(this);
            };
            this.ws.onclose = ({ code, reason }) => {
                console.log(`Connection closed, code: ${code}, reason: ${reason}`);
                this.ws = null;
                if (this.shouldReconnect) {
                    console.log('Reconnecting...');
                    this.connect();
                }
            };
            this.ws.onerror = (error) => {
                console.error('Error:', error);
                reject(error);
            };
        });
    }
    disconnect() {
        if (!this.ws) {
            throw new Error('WebSocket is not connected.');
        }
        this.shouldReconnect = false;
        this.ws.close();
    }
    send(data) {
        if (!this.ws) {
            throw new Error('WebSocket is not connected.');
        }
        this.ws.send(data);
    }
}
exports.WSClient = WSClient;
