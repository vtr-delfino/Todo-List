const Main = {
    init: function() {
        this.cacheSelector( )
        this.bindEvents()
    },

    cacheSelector: function() {
        this.$checkButtons = document.querySelectorAll('.check')
    },

    bindEvents: function() {
        const self = this
        
        this.$checkButtons.forEach(button => {
            button.onclick = self.Events.checkButton_click
        });
    },

    Events: {
        checkButton_click: function(e) {
            const $li = e.target.parentElement
            const isDOne = $li.classList.contains('done')

            if(!isDOne){
                
                return $li.classList.add('done')
            } 
            $li.classList.remove('done')
        }
    }
}

Main.init()