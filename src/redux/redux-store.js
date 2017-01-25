let store;

let tickerTimer
let fullTickerTimer
function nextActionPredicate(state) {
    // Redux always requires async dispatch.
    if (state.ticker >= 3) {
        setImmediate(() => {
            store.dispatch({type: 'RESET_TICKER'});
        });
    }
    tickerTimer = tickerTimer || setTimeout(() => {
        tickerTimer = undefined;
        store.dispatch({type: 'TICK'});
    }, 1000);

    fullTickerTimer = fullTickerTimer || setTimeout(() => {
        fullTickerTimer = undefined;
        store.dispatch({type: 'FULL_TICK'});
    }, 1000);
}

const initialState = {
    ticker: 0,
    fullTicker: 0,
    entries: [
        { name: 'foo', id: 0, prio: 2, friend: null },
        { name: 'bar', id: 1, prio: 1, friend: undefined },
        { name: 'baz', id: 2, prio: 0 },
    ],
};

function reducer(state = initialState, {type, payload = {}}) {
    let error;

    switch (type) {
        case 'UPDATE_ENTRIES': {
            const index = Math.round(Math.random() * (state.entries.length - 1));
            const value = R.assocPath(['name'], `${parseFloat(`${Math.random()}`).toFixed(3)}`, state.entries[index]);
            state.entries = R.update(index, value, state.entries);
            break;
        }

        case 'INCREMENT_ID': {
            const id = payload.id;
            const index = state.entries.findIndex((entry) => entry.id === id);
            state.entries = R.pipe(
                R.assocPath(['prio'], R.pipe(R.prop('prio'), R.inc)(state.entries[index])),
                R.update(index, R.__, state.entries)
            )(state.entries[index])
            break;
        }

        case 'ADD_ENTRY': {
            const name = payload.name;
            state.entries = state.entries.concat({ name, id: state.entries.length + 1, prio: 0 });
            break;
        }

        case 'SET_FRIEND': {
            const index = state.entries.findIndex((entry) => entry.id === payload.id);
            if (!payload.name || payload.name.length <= 2) {
                state.entries = R.pipe(
                    R.assoc('error', new Error('Name must be at least three characters long.')),
                    R.update(index, R.__, state.entries)
                )(state.entries[index]);
            } else {
                state.entries = R.pipe(
                    R.assoc('friend', payload.name),
                    R.dissoc('temp'),
                    R.update(index, R.__, state.entries)
                )(state.entries[index]);
            }
            break;
        }

        case 'TICK': {
            state.ticker += 1;
            break;
        }

        case 'RESET_TICKER': {
            state.ticker = 0;
            break;
        }

        case 'FULL_TICK': {
            state.fullTicker += 1;
            break;
        }
    }

    nextActionPredicate(state);

    return state;
}

store = Redux.createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    Redux.applyMiddleware(ReduxThunk.default));

window.ReduxBehavior = PolymerRedux(store);
