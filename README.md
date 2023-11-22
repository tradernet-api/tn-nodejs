# TnWs - Tradernet WebSocket Client

This package provides a set of utility classes to connect and interact with the Tradernet WebSocket server.


## Installation

You can install the package using npm:

```bash
npm i tn-ws-nodejs
```

## Usage
You can use the TnWs class to connect to the WebSocket server and subscribe to various events.

Here is a simple usage example:

```js
import { TnWs } from 'tn-ws-nodejs';
// OR
const { TnWs } = require('tn-ws-nodejs');

(async () => {
    const client = new TnWs({
        login: '<your_login>',
        password: '<your_password>',
    });

    await client.connect();

    client.subscribeToQuotes(['AAPL', 'GOOG'], (quote) => {
        console.log('Received quote:', quote);
    });

    client.subscribeToMarkets((markets) => {
        console.log('Received markets:', markets);
    });
})();

```


## API
The TnWs class provides the following methods:

- `connect()`: Connect to the WebSocket server. Returns a promise that resolves when the connection is successful.
- `subscribeToQuotes(tickers: string[], callback)`: Subscribe to quote events for the provided tickers.
- `subscribeToOrderBook(tickers: string[], callback)`: Subscribe to order book events for the provided tickers.
- `subscribeToMarkets(callback)`: Subscribe to market events.
- `subscribeToPortfolio(callback)`: Subscribe to portfolio events.
- `subscribeToSessions(callback)`: Subscribe to session events.
- `subscribeToSignals(signalType: string, callback)`: Subscribe to signal events of the specified type.
- `unsubscribe(events: string[])`: Unsubscribe from the specified events.


## TODO

- storing all current subscriptions and send them when reconnection happened
- auth by API keys

