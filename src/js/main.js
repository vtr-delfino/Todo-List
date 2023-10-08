const Main = {
    tasks: [],

    init: function() {
        this.cacheSelector( )
        this.bindEvents()
        this.getStoraged()
        this.buildTasks()
    },

    cacheSelector: function() {
        this.$list = document.querySelector('#list')
        this.$inputTask = document.querySelector('#inputTask')
        this.$checkButtons = document.querySelectorAll('.check')
        this.$removeButtons = document.querySelectorAll('.remove')
        this.$taskDescription = document.querySelectorAll('.task-description')
    },

    bindEvents: function() {
        const self = this

        this.$inputTask.onkeypress = self.Events.inputTask_keyPress.bind(this)
        
        this.$checkButtons.forEach(button => {
            button.onclick = self.Events.checkButton_click.bind(self)
        })

        this.$removeButtons.forEach(button => {
            button.onclick = self.Events.removeButton_click.bind(self)
        })

        this.$taskDescription.forEach(textarea => {
            textarea.onblur = self.Events.taskDescription_blur.bind(self)
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

    getTaskHtml: function(task, isDone, description) {
        let done = 'done'
        let disabled = 'disabled'
        if(!isDone){
            done = ''
            disabled = ''
        }
        
        return `
            <div>
                <li class="${done}">
                    <div class="check" data-task="${task}"></div>
                    <label class="task">${task}</label>
                    <button class="remove" data-task="${task}"></button>
                </li>
                <div class="task-description-div">
                    <textarea class="task-description scroll-hide" placeholder="Descrição da tarefa..." rows="3" wrap data-task="${task}" ${disabled}>${description}</textarea>
                </div>
            </div>
        `
    },

    buildTasks: function() {
        let html = ''
        
        this.tasks.forEach(item => {
            html += this.getTaskHtml(item.task, item.isDone, item.description)
        })

        this.$list.innerHTML = html

        this.cacheSelector()
        this.bindEvents()
    },

    Events: {
        inputTask_keyPress: function(e) {
            const key = e.key
            const value = e.target.value

            if(key === 'Enter'){
                this.$list.innerHTML += this.getTaskHtml(value, false, '')

                e.target.value = ''

                this.cacheSelector()
                this.bindEvents()

                const savedTasks = localStorage.getItem('tasks')
                const savedTasksArr = JSON.parse(savedTasks)
                const arrTasks = [
                    { task: value, isDone: false, description: ''},
                    ...savedTasksArr
                ]

                const jsonTasks = JSON.stringify(arrTasks)

                this.tasks = arrTasks
                localStorage.setItem('tasks', jsonTasks)
            }
        },
        
        checkButton_click: function(e) {
            const $li = e.target.parentElement
            const $textarea = $li.nextElementSibling.firstElementChild
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
                $textarea.setAttribute('disabled', true)

                return 
            } 
            $li.classList.remove('done')
            $textarea.removeAttribute('disabled')
        },

        removeButton_click: function(e) {
            const $li = e.target.parentElement.parentElement
            const value = e.target.dataset['task']
            const newTasksState = this.tasks.filter(item => item.task !== value)

            localStorage.setItem('tasks', JSON.stringify(newTasksState))
            this.tasks = newTasksState

            $li.classList.add('removed')

            setTimeout(() => {
                $li.classList.add('hidden')
            }, 300)
        },

        taskDescription_blur: function(e) {
            const value = e.target.value
            const task = e.target.dataset['task']

            this.tasks.forEach(item => {
                if(task === item.task) {
                    item.description = value
                    localStorage.setItem('tasks', JSON.stringify(this.tasks))

                    return
                }
            })
        }
    }
}

Main.init()