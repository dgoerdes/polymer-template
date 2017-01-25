Polymer({
    is: 'dg-tasklist',

    properties: {
        id: {
            type: Number,
            value: 0
        },
        taskname: {
            type: String,
            value: ''
        },
        tasks: {
            type: Array,
            value: []
        }
    },

    ready: function () {
        this.addEventListener('task:removed', this.removeTask);
    },

    addTask: function (event) {

        const task = {
            id: this.id++,
            name: this.taskname,
            priority: 1,
            status: 'open'
        };

        this.push('tasks', task);
        this.taskname = '';
        event.preventDefault();
    },

    removeTask: function (event) {
        const itemIndex = _.findIndex(this.tasks, {id: parseInt(event.detail.taskId)});
        this.splice('tasks', itemIndex, 1);
    }
});
