import { WSClient } from './WsClient';
import WebSocket from 'ws';
import { Quote } from './responses/Quote';
import { OrderBook } from './responses/OrderBook';
import { Markets } from './responses/Markets';
import { Response } from './responses/Response';
import {Portfolio} from './responses/Portfolio';
import {Sessions} from './responses/Sessions';

type Ticker = string;
type Signal = 'counters' | 'alerts' | 'sms' | 'comment' | 'commentsList' | 'adminMessage';

const WS_TN_URL = 'wss://wss.tradernet.com';

export class TnWsClient extends WSClient {
    constructor(url?: string) {
        super(url || WS_TN_URL);
    }

    subscribeToQuotes(tickers: Ticker[], callback: (data: Quote) => void) {
        this.subscribe('quotes', tickers, 'q', callback);
    }

    subscribeToOrderBook(tickers: Ticker[], callback: (data: OrderBook) => void) {
        this.subscribe('orderBook', tickers, 'b', callback);
    }

    subscribeToMarkets(callback: (data: Markets) => void) {
        this.subscribe('markets', [], 'markets', callback);
    }

    subscribeToPortfolio(callback: (data: Portfolio) => void) {
        this.subscribe('portfolio', [], 'portfolio', callback);
    }

    subscribeToSessions(callback: (data: Sessions) => void) {
        this.subscribe('sessions', [], 'sessions', callback);
    }

    /* eslint-disable  @typescript-eslint/no-explicit-any */
    subscribeToSignals(signalType: Signal, callback: (data: any) => void) {
        this.subscribe(signalType, [], signalType, callback);
    }

    unsubscribe(events: string[]) {
        this.sendEvent('unsubscribe', events);
    }

    private subscribe(event: string, data: string[], responseEvent: string, callback: (data: Response) => void) {
        this.sendEvent(event, data);

        // TODO storing all current subscriptions and send them when reconnection happened

        if (!this.ws) {
            throw new Error('WebSocket is not connected.');
        }

        this.ws.onmessage = (messageEvent: WebSocket.MessageEvent) => {
            const [receivedEvent, responseData] = JSON.parse(messageEvent.data.toString());

            if (receivedEvent === responseEvent) {
                callback(responseData);
            }
        };
    }

    private sendEvent(event: string, data?: string[]) {
        this.send(JSON.stringify([event, data]));
    }
}
