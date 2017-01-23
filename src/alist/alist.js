Polymer({
    is: 'a-list',
    behaviors: [ReduxBehavior],
    created() {
        console.log('a list was created', this.getState())
    },
    properties: {
        entries: {
            type: Array,
            statePath: 'entries',
            readOnly: true,
        },
        entriyString: {
            type: String,
            readOnly: true,
            computed: 'computeEntries(entries)',
        },
    },
    computeEntries(entries) {
        console.log('compute entries', entries)
        return entries.join(' -- ')
    },
    updateEntries(event) {
        this.dispatch('updateEntries', 42);
    },
    updateEntriesAsync(event) {
        setTimeout(() => {
            this.dispatch('updateEntries', 666);
        }, 1000);
    },
    actions: {
        updateEntries(value) {
            return {
                type: 'UPDATE_ENTRIES',
                value,
            };
        },
    },
});
