import { WSClient } from './WsClient';
import { Quote } from './responses/Quote';
import { OrderBook } from './responses/OrderBook';
import { Markets } from './responses/Markets';
import { Portfolio } from './responses/Portfolio';
import { Sessions } from './responses/Sessions';
type Ticker = string;
type Signal = 'counters' | 'alerts' | 'sms' | 'comment' | 'commentsList' | 'adminMessage';
export declare class TnWsClient extends WSClient {
    constructor(url?: string);
    subscribeToQuotes(tickers: Ticker[], callback: (data: Quote) => void): void;
    subscribeToOrderBook(tickers: Ticker[], callback: (data: OrderBook) => void): void;
    subscribeToMarkets(callback: (data: Markets) => void): void;
    subscribeToPortfolio(callback: (data: Portfolio) => void): void;
    subscribeToSessions(callback: (data: Sessions) => void): void;
    subscribeToSignals(signalType: Signal, callback: (data: any) => void): void;
    unsubscribe(events: string[]): void;
    private subscribe;
    private sendEvent;
}
export {};
