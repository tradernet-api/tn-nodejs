import { WebSocket, Server } from 'mock-socket';
import { TnWsClient } from '../src/TnWsClient';

jest.mock('ws', () => WebSocket);

const MOCK_URL = 'wss://websocket.server.tradernet.com';

describe('TnWsClient', () => {
    let server: Server;
    let client: TnWsClient;

    beforeEach(() => {
        server = new Server(MOCK_URL);
        client = new TnWsClient(MOCK_URL);
        client.connect();
    });

    test('should subscribe to quotes', (done) => {
        const tickers = ['AAPL', 'GOOGL'];
        const mockData = {
            c: 'AAPL',
            n: 10,
            type: 1,
            bbs: 250,
            bbf: 518785,
            bas: 6,
            baf: 741104,
        };

        client.subscribeToQuotes(tickers, (data) => {
            expect(data).toEqual(mockData);
            done();
        });

        server.on('connection', (socket) => {
            socket.on('message', (data) => {
                const [event, eventData] = JSON.parse(data as string);
                if (event === 'quotes') {
                    expect(eventData).toEqual(tickers);
                    socket.send(JSON.stringify(['q', mockData]));
                }
            });
        });
    });
});
