export interface Event {
    from: string | number;
    to: string | number;
    dayoff: number;
    desc: string;
}
export interface Market {
    p?: string;
    post?: string;
    n: string;
    n2?: string;
    s?: string;
    o?: string;
    c?: string;
    dt?: number;
    tz?: string;
    date?: Event[];
    ev?: Event[];
}
export interface Markets {
    t: string;
    m: Market[];
}
