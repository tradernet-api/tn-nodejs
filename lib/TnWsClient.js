"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TnWsClient = void 0;
const WsClient_1 = require("./WsClient");
const WS_TN_URL = 'wss://wss.tradernet.com';
class TnWsClient extends WsClient_1.WSClient {
    constructor(url) {
        super(url || WS_TN_URL);
    }
    subscribeToQuotes(tickers, callback) {
        this.subscribe('quotes', tickers, 'q', callback);
    }
    subscribeToOrderBook(tickers, callback) {
        this.subscribe('orderBook', tickers, 'b', callback);
    }
    subscribeToMarkets(callback) {
        this.subscribe('markets', [], 'markets', callback);
    }
    subscribeToPortfolio(callback) {
        this.subscribe('portfolio', [], 'portfolio', callback);
    }
    subscribeToSessions(callback) {
        this.subscribe('sessions', [], 'sessions', callback);
    }
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    subscribeToSignals(signalType, callback) {
        this.subscribe(signalType, [], signalType, callback);
    }
    unsubscribe(events) {
        this.sendEvent('unsubscribe', events);
    }
    subscribe(event, data, responseEvent, callback) {
        this.sendEvent(event, data);
        // TODO storing all current subscriptions and send them when reconnection happened
        if (!this.ws) {
            throw new Error('WebSocket is not connected.');
        }
        this.ws.onmessage = (messageEvent) => {
            const [receivedEvent, responseData] = JSON.parse(messageEvent.data.toString());
            if (receivedEvent === responseEvent) {
                callback(responseData);
            }
        };
    }
    sendEvent(event, data) {
        this.send(JSON.stringify([event, data]));
    }
}
exports.TnWsClient = TnWsClient;
