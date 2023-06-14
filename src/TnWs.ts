import { TnWsClient } from './TnWsClient';
import { Authenticator } from './Authenticator';

export interface TnWsOptions {
    login?: string
    password?: string
    url?: string
}

export class TnWs extends TnWsClient {
    private readonly authenticator?: Authenticator;
    constructor(options?: TnWsOptions) {
        super(options?.url);
        if (options?.login && options?.password) {
            this.authenticator = new Authenticator(options.login, options.password);
        }
    }

    async connect() {
        if (this.authenticator) {
            await this.authenticator.authenticate();
        }
        await super.connect(this.authenticator?.getSessionID());

        return this;
    }
}
