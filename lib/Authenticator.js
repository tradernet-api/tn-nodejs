"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authenticator = void 0;
const axios_1 = __importDefault(require("axios"));
const querystring = __importStar(require("querystring"));
const API_HOST = 'https://tradernet.ru';
const API_PATH = '/api/check-login-password';
class Authenticator {
    constructor(login, password) {
        this.login = login;
        this.password = password;
    }
    async authenticate() {
        const response = await axios_1.default.post(API_HOST + API_PATH, querystring.stringify({
            login: this.login,
            password: this.password,
            rememberMe: 1
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            withCredentials: true
        });
        if (response.data.error) {
            throw new Error(`ERROR while auth: ${response.data.error}`);
        }
        if (!response.headers['set-cookie']) {
            throw new Error('No SID found in the response headers');
        }
        response.headers['set-cookie'].forEach((c) => {
            const cookieStrVal = c.split(';')[0] || c;
            const cookieName = cookieStrVal.split('=')[0];
            switch (cookieName) {
                case 'SID':
                    this.sessionID = cookieStrVal.split('=')[1];
                    break;
                case 'uid':
                    this.userID = cookieStrVal.split('=')[1];
                    break;
            }
        });
        return this;
    }
    getSessionID() {
        return this.sessionID;
    }
    getUserID() {
        return this.userID;
    }
}
exports.Authenticator = Authenticator;
