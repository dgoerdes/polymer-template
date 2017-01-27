Polymer({
    is: 'dg-tasklist',

    behaviors: [ ReduxBehavior ],

    created: function () {
        console.log(this.getAttribute('component-id'));
        this.dispatch({
            type: 'TASKLIST_REGISTER',
            payload: {
                id: this.getAttribute('component-id')
            }
        });
    },

    properties: {
        componentId: {
            type: Number,
        },
        taskname: {
            type: String,
            value: ''
        },
        tasks: {
            type: Array,
            statePath: function (state) {
                console.log(state.tasklist.tasklists[this.componentId]);
                return state.tasklist.tasklists[this.componentId].tasks;
            }
        }
    },

    addTask: function (event) {
        event.preventDefault();

        this.dispatch({
            type: 'TASKLIST_TASK_ADD',
            payload: {
                componentId: this.componentId,
                task: {
                    id: _.uniqueId(),
                    name: this.taskname,
                    priority: 1,
                    status: 'open'
                }
            }
        });

        this.taskname = '';
    },

    removeTask: function (event) {
        const itemIndex = _.findIndex(this.tasks, {id: parseInt(event.detail.taskId)});
        this.splice('tasks', itemIndex, 1);
    }
});
