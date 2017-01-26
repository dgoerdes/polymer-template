Polymer({
    is: 'a-list',
    behaviors: [ReduxBehavior],
    created() {
        console.log('a list was created', this.getState());
    },
    properties: {
        _entries: {
            type: Array,
            statePath: 'entries',
            readOnly: true,
        },
        entries: {
            type: Array,
            computed: 'computeEntries(_entries)',
        },
        entriyString: {
            type: String,
            computed: 'computeString(_entries)',
        },
        _apiResult: {
            type: Number,
            statePath: 'apiResult',
            readOnly: true,
        },
        _apiPending: {
            type: Boolean,
            statePath: 'apiPending',
            readOnly: true,
        },
    },
    /*
        Computed Functions
    */
    arrayItem(change, index, path) {
        // this.get(path, root) returns a value for a path
        // relative to a root object.
        return this.get(path, change.base[index]);
    },
    computeEntries(entries) {
        let result = R.sortBy(R.prop('prio'), entries);
        result = result.map((item, index) => Object.assign(item, { index, isLast: false }));
        result[result.length - 1].isLast = true;
        return result;
    },
    friendInput({error, temp}) {
        return error ? temp : '';
    },
    computeString(entries) {
        return entries.map((entry) => `${entry.name}:${entry.friend || '|'}`).join(' -- ');
    },
    /*
        Event Handlers
    */
    updateEntries() {
        this.dispatch('updateEntries');
    },
    updateEntriesAsync() {
        setTimeout(() => {
            this.dispatch('updateEntries');
        }, 1000);
    },
    updateEntriesAsyncThunk() {
        this.dispatch('updateEntriesThunk');
    },
    incrementEntry(event) {
        this.dispatch('incrementID', { id: event.model.item.id });
    },
    addEntry(event) {
        const code = event.keyCode || event.which;
        if (code !== 13) { return; }
        event.target.value = event.target.value.toUpperCase()
        this.dispatch('addEntry', { name: event.target.value });
    },
    setFriendKeypress(event) {
        event.model.item.temp = event.target.value;
        const code = event.keyCode || event.which;
        if (code !== 13) {
            event.model.item.temp += event.key;
        } else {
            this.setFriend(event);
        };
    },
    setFriend(event) {
        const name = event.model.item.temp;
        if (name && name.length >= 6) {
            alert('Action error - Name must be less than seven characters long.');
            return;
        }
        this.dispatch('setFriend', { id: event.model.item.id, name });
    },
    apiGet(event) {
        this.dispatch('apiGet');
    },
    /*
        Actions
    */
    actions: {
        updateEntries() {
            return {
                type: 'UPDATE_ENTRIES',
            };
        },
        updateEntriesThunk() {
            return (dispatch) => {
                setTimeout(() => {
                    dispatch({
                        type: 'UPDATE_ENTRIES',
                    });
                }, 1000);
            };
        },
        incrementID(payload) {
            return {
                type: 'INCREMENT_ID',
                payload,
            };
        },
        addEntry(payload) {
            return {
                type: 'ADD_ENTRY',
                payload,
            };
        },
        setFriend(payload) {
            return {
                type: 'SET_FRIEND',
                payload,
            };
        },
        apiGet(payload) {
            return (dispatch) => {
                Rx.Observable.from([1])
                    // .do(() => { console.log('action calling validate API'); })
                    .delay(100)
                    .map((payload) => ({
                        type: 'API_GET',
                        payload: { request: Math.random() },
                    }))
                    .do(({payload: {request}}) => { console.log('action got result from validate API', request); })
                    .do(dispatch)
                    .subscribe();
            };
        }
    },
});
