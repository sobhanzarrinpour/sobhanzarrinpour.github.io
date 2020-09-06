new Vue({
    el: '#app',
    data:{
        screen_loaded: false,
        avatar: 'assets/avatar.jpg'
    },
    mounted(){
        setTimeout(() => this.loading_rem(), 3000);
    },
    methods:{
        loading_rem() {
            this.screen_loaded = true;
        }
    }
});