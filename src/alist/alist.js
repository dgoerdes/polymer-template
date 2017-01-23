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
        return entries.map((entry) => `${entry.value}:${entry.friend || '|'}`).join(' -- ');
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
        this.dispatch('incrementID', event.model.item.id);
    },
    handleKeypress(event) {
        if (event.charCode !== 13) { return; }
        this.dispatch('addEntry', event.target.value);
    },
    handleSetFriendKeypress(event) {
        if (event.charCode === 13) {
            console.log('set friend button by keypress', event.model.item);
            this.dispatch('setFriend', event.model.item);
            return;
        }
        event.model.item.temp = event.target.value + event.key;
        console.log('setFriend keypress', event, event.target.value, event.model.item)
    },
    setFriend(event) {
        console.log('set friend button', event.model.item);
        this.dispatch('setFriend', event.model.item);
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
        incrementID(value) {
            return {
                type: 'INCREMENT_ID',
                value,
            };
        },
        addEntry(value) {
            return {
                type: 'ADD_ENTRY',
                value,
            };
        },
        setFriend(value) {
            return {
                type: 'SET_FRIEND',
                value,
            };
        },
    },
});
