Polymer({
    is: 'a-list',
    behaviors: [ReduxBehavior],
    created() {
        console.log('a list was created', this.getState())
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
    computeEntries(entries) {
        return R.sortBy(R.prop('prio'), entries);
    },
    computeString(entries) {
        return entries.map(R.prop('value')).join(' -- ');
    },
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
    },
});
