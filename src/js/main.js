const Main = {
    init: function() {
        this.cacheSelector( )
        this.bindEvents()
    },

    cacheSelector: function() {
        this.$checkButtons = document.querySelectorAll('.check')
        this.$inputTask = document.querySelector('#inputTask')
        this.$list = document.querySelector('#list')
    },

    bindEvents: function() {
        const self = this
        
        this.$checkButtons.forEach(button => {
            button.onclick = self.Events.checkButton_click
        })

        this.$inputTask.onkeypress = self.Events.inputTask_keyPress.bind(this)
    },

    Events: {
        checkButton_click: function(e) {
            const $li = e.target.parentElement
            const isDOne = $li.classList.contains('done')

            if(!isDOne){
                
                return $li.classList.add('done')
            } 
            $li.classList.remove('done')
        },

        inputTask_keyPress: function(e) {
            const key = e.key
            const value = e.target.value

            if(key === 'Enter'){
                this.$list.innerHTML += `
                    <li>
                        <div class="check"></div>
                        <label class="task">${value}</label>
                        <button class="remove"></button>
                    </li>
                `

                e.target.value = ''
            }
        }
    }
}

Main.init()