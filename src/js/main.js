const Main = {
    tasks: [],

    init: function() {
        this.cacheSelector( )
        this.bindEvents()
        this.getStoraged()
        this.buildTasks()
    },

    cacheSelector: function() {
        this.$checkButtons = document.querySelectorAll('.check')
        this.$inputTask = document.querySelector('#inputTask')
        this.$list = document.querySelector('#list')
        this.$removeButtons = document.querySelectorAll('.remove')
    },

    bindEvents: function() {
        const self = this
        
        this.$checkButtons.forEach(button => {
            button.onclick = self.Events.checkButton_click.bind(self)
        })

        this.$inputTask.onkeypress = self.Events.inputTask_keyPress.bind(this)

        this.$removeButtons.forEach(button => {
            button.onclick = self.Events.removeButton_click.bind(self)
        })
    },

    getStoraged: function() {
        const tasks = localStorage.getItem('tasks')

        if (tasks) {
            this.tasks = JSON.parse(tasks)
        } else {
            localStorage.setItem('tasks', JSON.stringify([]))
        }
    },

    getTaskHtml: function(task, isDone) {
        let done = 'done'
        if(!isDone){
            done = ''
        }
        
        return `
            <div>
                <li class="${done}">
                    <div class="check" data-task="${task}"></div>
                    <label class="task">${task}</label>
                    <button class="remove" data-task="${task}"></button>
                </li>
                <div class="task-description">
                    <textarea class="task-description-input scroll-hide" placeholder="Descrição da tarefa..." rows="3" wrap>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis, explicabo? Odit soluta hic quis voluptate, commodi nobis tempora doloribus illo nesciunt optio quo ipsum iure veniam quos totam odio velit.</textarea>
                </div>
            </div>
        `
    },

    buildTasks: function() {
        let html = ''
        
        this.tasks.forEach(item => {
            html += this.getTaskHtml(item.task, item.isDone)
        })

        this.$list.innerHTML = html

        this.cacheSelector()
        this.bindEvents()
    },

    Events: {
        checkButton_click: function(e) {
            const $li = e.target.parentElement
            const value = e.target.dataset['task']
            const isDone = $li.classList.contains('done')
            const self = this

            self.tasks.forEach(item => {
                if(value === item.task) {
                    item.isDone = !isDone
                    localStorage.setItem('tasks', JSON.stringify(self.tasks))

                    return
                }
            })
            
            if(!isDone) {
                $li.classList.add('done')

                return 
            } 
            $li.classList.remove('done')
        },

        inputTask_keyPress: function(e) {
            const key = e.key
            const value = e.target.value

            if(key === 'Enter'){
                this.$list.innerHTML += this.getTaskHtml(value)

                e.target.value = ''

                this.cacheSelector()
                this.bindEvents()

                const savedTasks = localStorage.getItem('tasks')
                const savedTasksArr = JSON.parse(savedTasks)
                const arrTasks = [
                    { task: value, isDone: false},
                    ...savedTasksArr
                ]

                const jsonTasks = JSON.stringify(arrTasks)

                this.tasks = arrTasks
                localStorage.setItem('tasks', jsonTasks)
            }
        },

        removeButton_click: function(e) {
            const $li = e.target.parentElement
            const value = e.target.dataset['task']
            const newTasksState = this.tasks.filter(item => item.task !== value)

            localStorage.setItem('tasks', JSON.stringify(newTasksState))
            this.tasks = newTasksState

            $li.classList.add('removed')

            setTimeout(() => {
                $li.classList.add('hidden')
            }, 300)
        }
    }
}

Main.init()