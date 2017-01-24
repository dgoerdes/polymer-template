Polymer({
    is: 'home-page',
    behaviors: [ReduxBehavior],
    created() {
        console.log('home was created', this.getState())
    },
    properties: {
        who: {
            type: String,
            value: 'World'
        },
        ticker: {
            type: Number,
            statePath: 'ticker',
            readOnly: true,
        },
        compState: {
            type: String,
            computed: 'tickerText(ticker)',
        },
        fullTicker: {
            type: Number,
            statePath: 'fullTicker',
            readOnly: true,
        },
    },
    tickerText(ticker) {
        return `foo::${ticker}||`
    },
});
