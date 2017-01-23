const initialState = {
    text: 'initial-value',
    entries: [
        { value: 'foo', id: 0, prio: 2, friend: null },
        { value: 'bar', id: 1, prio: 1, friend: undefined },
        { value: 'baz', id: 2, prio: 0 },
    ],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_ENTRIES': {
            const willUpdate = Math.random() >= 0.5;
            console.log('update entries in reducer?', willUpdate);
            if (willUpdate) {
                const index = Math.round(Math.random() * state.entries.length);
                const value = R.assocPath(['value'], `${parseFloat(`${Math.random()}`).toFixed(3)}`, state.entries[index]);
                state.entries = R.update(index, value, state.entries);
            }
            break;
        }

        case 'INCREMENT_ID': {
            const id = action.value
            console.log('increment ID in reducer?', id);
            const index = state.entries.findIndex((entry) => entry.id === id);
            state.entries = R.pipe(
                R.assocPath(['prio'], R.pipe(R.prop('prio'), R.inc)(state.entries[index])),
                R.update(index, R.__, state.entries)
            )(state.entries[index])
            break;
        }

        case 'ADD_ENTRY': {
            console.log('add entry in reducer?')
            state.entries = state.entries.concat({ value: action.value, id: state.entries.length + 1, prio: 0 });
            break;
        }

        case 'SET_FRIEND': {
            console.log('add friend in reducer?', action.value.id);
            const index = state.entries.findIndex((entry) => entry.id === action.value.id);
            state.entries = R.pipe(
                R.assoc('friend', action.value.temp),
                R.dissoc('temp'),
                R.update(index, R.__, state.entries)
            )(state.entries[index])
            break;
        }
    }
    return state;
}

const store = Redux.createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

window.ReduxBehavior = PolymerRedux(store);

console.log('redux-store', window.ReduxBehavior);
