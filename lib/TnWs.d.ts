import { TnWsClient } from './TnWsClient';
export interface TnWsOptions {
    login?: string;
    password?: string;
    url?: string;
}
export declare class TnWs extends TnWsClient {
    private readonly authenticator?;
    constructor(options?: TnWsOptions);
    connect(): Promise<this>;
}
