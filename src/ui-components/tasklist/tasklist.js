Polymer({
    is: 'dg-tasklist',

    properties: {
        id: {
            type: Number,
            value: 0
        },
        taskname: {
            type: String
        },
        tasks: {
            type: Array,
            value: []
        }
    },

    ready: function() {
        this.addEventListener('taskList:removeTask', this.removeTask);
    },

    addTask: function() {
        const task = {
            id: this.id++,
            name: this.taskname,
            priority: 1,
            status: 'open'
        };

        this.push('tasks', task);
        this.taskname = '';
    },

    removeTask: function(event) {
        const itemIndex = _.findIndex(this.tasks, {id: parseInt(event.detail.taskId)});
        this.splice('tasks', itemIndex, 1);
    }
});
