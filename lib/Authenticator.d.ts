export declare class Authenticator {
    private login;
    private password;
    private userID?;
    private sessionID?;
    constructor(login: string, password: string);
    authenticate(): Promise<Authenticator>;
    getSessionID(): string | undefined;
    getUserID(): string | undefined;
}
