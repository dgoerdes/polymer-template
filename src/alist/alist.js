Polymer({
    is: 'a-list',
    behaviors: [ReduxBehavior],
    created() {
        console.log('a list was created', this.getState());
        this.getState = null;
    },
    properties: {
        _entries: {
            type: Array,
            statePath: 'entries',
            readOnly: true,
        },
        entries: {
            type: Array,
            readOnly: true,
            computed: 'computeEntries(_entries)',
        },
        entriyString: {
            type: String,
            readOnly: true,
            computed: 'computeString(_entries)',
        },
    },
    /*
        Computed Functions
    */
    computeEntries(entries) {
        return R.sortBy(R.prop('prio'), entries)
            .map((item, index) => Object.assign(item, { index }));
    },
    computeString(entries) {
        return entries.map((entry) => `${entry.name}:${entry.friend || '|'}`).join(' -- ');
    },
    arrayItem(change, index, path) {
        // this.get(path, root) returns a value for a path
        // relative to a root object.
        return this.get(path, change.base[index]);
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
    incrementEntry(event) {
        this.dispatch('incrementID', { id: event.model.item.id });
    },
    handleKeypress(event) {
        if (event.charCode !== 13) { return; }
        this.dispatch('addEntry', { name: event.target.value });
    },
    handleSetFriendKeypress(event) {
        if (event.charCode !== 13) {
            event.model.item.temp = event.target.value + event.key;
        } else {
            this.setFriend(event);
        };
    },
    setFriend(event) {
        const cbID = `${Math.random().toString(36).substr(2, 16)}`;
        const cb = ({detail: {error}}) => {
            document.removeEventListener(cbID, cb);
            if (error) {
                console.error('set friend', error.message);
                alert('Name must be longer than 3 characters.');
                return;
            }
            event.target.value = '';
        };
        document.addEventListener(cbID, cb);
        this.dispatch('setFriend', { id: event.model.item.id, name: event.model.item.temp, cbID });
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
    },
});
