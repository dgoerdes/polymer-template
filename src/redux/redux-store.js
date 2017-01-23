const initialState = {
  text: 'initial-value',
  entries: [
    {value: 'foo', id: 0, prio: 2},
    {value: 'bar', id: 1, prio: 1},
    {value: 'baz', id: 2, prio: 0},
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
      const value = R.assocPath(['prio'], R.pipe(R.prop('prio'), R.inc)(state.entries[index]), state.entries[index]);
      state.entries = R.update(index, value, state.entries);
      break;
    }

    case 'ADD_ENTRY': {
      const value = {value: action.value, id: state.entries.length + 1, prio: 0}
      state.entries = state.entries.concat(value);
      break;
    }
  }
  return state;
}

const store = Redux.createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

window.ReduxBehavior = PolymerRedux(store);

console.log('redux-store', window.ReduxBehavior);
