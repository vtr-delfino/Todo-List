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
        checkButton_click: function() {
            alert("ok")
        }
    }
}

Main.init()