

let renderer = Vue.component('router' , {
    template: `
        <div id="router-render" class="router-render"><!----></div>
    `,

    data(){
        return {
            window_state: new WindowState(),
            cpage: '/home',
            ctitle: 'home page',
            props: null
        }
    },

    mounted(){
        let self = this;
        addEventListener('routing' , () => {
            this.cpage = currentPage;
        })
        this.cpage = currentPage;
        this.props = null;
    },

    watch: {
        render: function(newValue , oldValue){
            this.convertedMessage(newValue)
        }
    },

    methods: {
        convertedMessage(newValue){
            let el = Vue.compile(newValue)
            el = new Vue({
                render: el.render,
                staticRenderFns: el.staticRenderFns
            }).$mount()
            let d = null; 
            try{d = el.$el?.getAttribute('data-style');}
            catch(e){d = null;}
            if (d != null){
                setTimeout(()=>{
                    document.getElementById('router')?.setAttribute('style' , d);
                    let ind = [...router.map(r => r.path)].indexOf(this.cpage);
                    let a = router[ind];

                    setTimeout(()=>{
                            document.getElementById('router-render').innerHTML = '';
                            document.getElementById('router-render').appendChild(el.$el);
                        } , Number(a.outAnimation.animationDuration.replace('s','').replace('m',''))
                    );
                } , 100)
            }else{
                document.getElementById('router-render').innerHTML = '';
                document.getElementById('router-render').appendChild(el.$el);
            }
        }
    },

    computed: {
        render: function() {
            let ind = [...router.map(r => r.path)].indexOf(this.cpage);
            let a = router[ind];
            let render = '';
            a.params.sort((a,b) => a.order - b.order).forEach(p => {
                let ind2 = [...components.map(r => r.component)].indexOf(p.component);
                let b = components[ind2].markup
                let props = '';
                p.props?.forEach(e => {
                    props += ` :${e.name}=${e.type == 'const' ? '"\''+e.value+'\'"' : '"'+e.value+'"'} `;
                })
                p.emmiter?.forEach(e => {
                    props += ` @${e.name}="(e) => {${e.value} = e.${e.value}}" `;
                })
                render += `<${b} id="${p.id}" ${props}></${b}>`;
            })

            return `<div id="router" class="router"
            ${(a.inAnimation != null && a.inAnimation != undefined) ? 'style="animation: ' + a.inAnimation.animation + '; animation-duration: ' + a.inAnimation.animationDuration + '; animation-delay: ' + a.inAnimation.animationDelay + '; animation-timing-function: ' + a.inAnimation.mode + '"' : ''}
            ${(a.outAnimation != null && a.outAnimation != undefined) ? 'data-style="animation: ' + a.outAnimation.animation + '; animation-duration: ' + a.outAnimation.animationDuration + '; animation-delay: ' + a.outAnimation.animationDelay + '; animation-timing-function: ' + a.outAnimation.mode + '"' : ''}
            >${render}</div>`
        }
    }
});

function go_to_url(pathname){

    if([...router.map(r => r.path)].indexOf(pathname) < 0){
        setTimeout(() => go_to_url_('/404', -1) , 1);
        // console.error(`${window.location.hostname + ':' + window.location.port}${pathname} is not exists!`);
    } else {
        // window.location.pathname = pathname;
        currentPage = pathname;
        window.location.title = router[[...router.map(r => r.path)].indexOf(pathname)].title;
        document.getElementsByTagName('title')[0].innerText = router[[...router.map(r => r.path)].indexOf(pathname)].title;
        
        this.dispatchEvent(event);
    }
}

let currentPageIndex = 0
let currentPageIndexEvent; 
if(document.createEvent){
    currentPageIndexEvent = document.createEvent("HTMLEvents");
    currentPageIndexEvent.initEvent("currentPageIndex", true, true);
    currentPageIndexEvent.eventName = "currentPageIndex";
} else {
    currentPageIndexEvent = document.createEventObject();
    currentPageIndexEvent.eventName = "currentPageIndex";
    currentPageIndexEvent.eventType = "currentPageIndex";
}
function go_to_url_(pathname, cp_index){
    storage.store('active_url', pathname);
    storage.store('active_index', cp_index);
    go_to_url(pathname);
    currentPageIndex = cp_index;
    if(document.createEvent){
        document.dispatchEvent(currentPageIndexEvent);
    } else {
        document.fireEvent("on" + currentPageIndexEvent.eventType, currentPageIndexEvent);
    }
}

function isJsonString(str) {
    try {
        JSON.parse(str);
        debugger
    } catch (e) {
        return false;
    }
    return true;
}

let storage = new StateController();

let vue = new Vue({
    el: '#app',
    
    data: {
        name: 'my app'
    },
    
    computed: {
    }
});

