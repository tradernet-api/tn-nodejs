export interface Portfolio {
    loaded: boolean;
    acc: Array<{
        currval: number;
        forecast_in: number;
        forecast_out: number;
        t2_in: number;
        t2_out: number;
        curr: string;
        s: number;
    }>;
    pos: Array<{
        name: string;
        vm: number;
        go: number;
        i: string;
        currval: number;
        mkt_price: number;
        bal_price_a: number;
        price_a: number;
        base_currency: string;
        face_val_a: number;
        scheme_calc: string;
        instr_id: number;
        Yield: number;
        issue_nb: string;
        profit_price: number;
        market_value: number;
        close_price: number;
        curr: string;
        name2: string;
        open_bal: number;
        accruedint_a: number;
        acd: number;
        fv: number;
        profit_close: number;
        acc_pos_id: number;
        s: number;
        q: number;
        t: number;
        k: number;
        base_contract_code: string;
        maturity_d?: string;
    }>;
}
