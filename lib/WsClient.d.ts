/// <reference types="ws" />
import WebSocket from 'isomorphic-ws';
export declare class WSClient {
    private readonly url;
    protected ws: WebSocket | null;
    private shouldReconnect;
    constructor(url: string);
    connect(sid?: string): Promise<WSClient>;
    disconnect(): void;
    send(data: string): void;
}
