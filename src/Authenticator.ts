import axios from 'axios';
import * as querystring from 'querystring';

const API_HOST = 'https://tradernet.ru';
const API_PATH = '/api/check-login-password';

export class Authenticator {
    private userID?: string;
    private sessionID?: string;

    constructor(private login: string, private password: string) {}

    public async authenticate(): Promise<Authenticator> {
        const response = await axios.post(
            API_HOST + API_PATH,
            querystring.stringify({
                login: this.login,
                password: this.password,
                rememberMe: 1
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                withCredentials: true
            });

        if (response.data.error) {
            throw new Error(`ERROR while auth: ${response.data.error}`);
        }

        if (!response.headers['set-cookie']) {
            throw new Error('No SID found in the response headers');
        }
        response.headers['set-cookie'].forEach((c: string) => {
            const cookieStrVal = c.split(';')[0] || c;
            const cookieName = cookieStrVal.split('=')[0];
            switch (cookieName) {
            case 'SID':
                this.sessionID = cookieStrVal.split('=')[1];
                break;
            case 'uid':
                this.userID = cookieStrVal.split('=')[1];
                break;
            }
        });

        return this;
    }

    public getSessionID(): string | undefined {
        return this.sessionID;
    }

    public getUserID(): string | undefined {
        return this.userID;
    }
}
