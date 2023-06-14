export interface OrderBookUpdate {
    p: number;
    s?: string;
    q?: number;
    k: number;
}

export interface OrderBook {
    n: number;
    i: string;
    del: OrderBookUpdate[];
    ins: OrderBookUpdate[];
    upd: OrderBookUpdate[];
    cnt: number;
    x: number;
}
