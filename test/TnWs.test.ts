import { TnWs, TnWsClient, Authenticator } from '../src';
jest.mock('../src/Authenticator');
jest.mock('../src/TnWsClient');

describe('TnWs', () => {

    beforeEach(() => {
        (Authenticator as jest.Mock).mockClear();
        (TnWsClient as jest.Mock).mockClear();
    });

    test('should connect to the WebSocket server with authentication', async () => {
        const tnWs = new TnWs({
            login: 'login',
            password: 'password',
            url: 'wss://tradernet.com',
        });

        await tnWs.connect();

        expect(Authenticator).toHaveBeenCalledWith('login', 'password');
        expect(TnWsClient).toHaveBeenCalledWith('wss://tradernet.com');
    });

    test('should connect to the WebSocket server without authentication', async () => {
        const tnWs = new TnWs();

        await tnWs.connect();

        expect(Authenticator).not.toHaveBeenCalled();
        expect(TnWsClient).toHaveBeenCalledWith(undefined);
    });
});
