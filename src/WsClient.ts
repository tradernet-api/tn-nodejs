import WebSocket, { CloseEvent, ErrorEvent } from 'isomorphic-ws';

export class WSClient {
    private readonly url: string;
    protected ws: WebSocket | null;
    private shouldReconnect = false;

    constructor(url: string) {
        this.url = url;
        this.ws = null;
    }

    connect(sid?: string): Promise<WSClient> {
        return new Promise((resolve, reject) => {
            this.ws = new WebSocket(this.url + (sid ? `?SID=${sid}` : ''));

            this.ws.onopen = () => {
                console.log(`Connected to ${this.url}`);
                this.shouldReconnect = true;
                resolve(this);
            };

            this.ws.onclose = ({ code, reason }: CloseEvent) => {
                console.log(`Connection closed, code: ${code}, reason: ${reason}`);
                this.ws = null;
                if (this.shouldReconnect) {
                    console.log('Reconnecting...');
                    this.connect();
                }
            };

            this.ws.onerror = (error: ErrorEvent) => {
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

    send(data: string) {
        if (!this.ws) {
            throw new Error('WebSocket is not connected.');
        }

        this.ws.send(data);
    }
}
