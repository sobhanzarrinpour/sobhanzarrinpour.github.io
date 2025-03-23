const components= [{"src":"./components/","component":"mainMenu","markup":"main-menu"},{"src":"./components/","component":"homePage","markup":"home-page"},{"src":"./components/","component":"blogPage","markup":"blog-page"},{"src":"./components/","component":"404","markup":"not-found-page"},{"src":"./components/","component":"products","markup":"products"},{"src":"./components/dashboard","component":"dashboard","markup":"v-dashboard"},{"src":"./components/dashboard","component":"starRating","markup":"v-star-rating"},{"src":"./components/dashboard","component":"chart","markup":"v-chart"},{"src":"./components/dashboard/chart","component":"SZBarChart","markup":"vsb-chart"},{"src":"./components/dashboard/chart/SZBarChart","component":"scomponent","markup":"vsbc-chart"},{"src":"./components/products","component":"product","markup":"product"},{"src":"./components/","component":"gallery","markup":"gallery"},{"src":"./components/gallery","component":"carousel","markup":"carousel"},{"src":"./components/gallery/carousel","component":"carousel_box","markup":"carousel-box"},{"src":"./components/","component":"main_svg","markup":"main-svg"}];

        const event = document.createEvent('Event');
event.initEvent('routing', true, true);

let currentPage = '/';

const router = [
    {
        title: 'home page' , 
        path: '/' , 
        inAnimation: {mode:"ease-in" , animation:"go_top_page", animationDuration: '150ms', animationDelay: '0ms'},
        outAnimation: {mode:"ease-out" , animation:"go_down_page", animationDuration: '150ms', animationDelay: '0ms'},
        params: [{order:1 , component: 'homePage', id:'hss', props:[{name: 'name' , value: 'parsa zarrin pour' , type: 'const'}] , emmiter:[{name:'hp' , value:'name', func:'setName'}] }]
    },
    {
        title: 'home page' , 
        path: '/home' , 
        inAnimation: null,
        outAnimation: null,
        params: [{order:1 , component: 'homePage', id:'hps', props:[{name: 'name' , value: 'name' , type: ''}] , emmiter:[{name:'hp' , value:'name', func:'setName'}] }]
    },
    {
        title: 'blog page' , 
        path: '/blog' , 
        inAnimation: {mode:"ease-in" , animation:"go_to_page", animationDuration: '150ms', animationDelay: '0ms'},
        outAnimation: {mode:"ease-out" , animation:"go_down_page", animationDuration: '150ms', animationDelay: '0ms'},
        params: [
                    // {order:1 , component: 'homePage', id:'hds', props:[{name: 'name' , value: 'name' , type: ''}] , emmiter:[{name:'hp' , value:'name', func:'setName'}] } , 
                    {order:2 , component: 'blogPage', id:'abc'}
                ]
    },
    {
        title: 'resume' , 
        path: '/products' , 
        inAnimation: {mode:"ease-in" , animation:"go_to_page", animationDuration: '150ms', animationDelay: '0ms'},
        outAnimation: {mode:"ease-out" , animation:"go_out_page", animationDuration: '150ms', animationDelay: '0ms'},
        params: [
                    {order:1 , component: 'products', id:'products-page'} , 
                ]
    },
    {
        title: 'prodcut' , 
        path: '/product' , 
        inAnimation: {mode:"ease-in" , animation:"go_to_page", animationDuration: '150ms', animationDelay: '0ms'},
        outAnimation: {mode:"ease-out" , animation:"go_out_page", animationDuration: '150ms', animationDelay: '0ms'},
        params: [
                    {order:1 , component: 'product', id:'product-page'} , 
                ]
    },
    {
        title: 'dashboard' , 
        path: '/dashboard' , 
        inAnimation: {mode:"ease-in" , animation:"go_to_page", animationDuration: '150ms', animationDelay: '0ms'},
        outAnimation: {mode:"ease-out" , animation:"go_out_page", animationDuration: '150ms', animationDelay: '0ms'},
        params: [
                    {order:1 , component: 'dashboard', id:'dashboard-page' } , 
                ]
    },
    {
        title: 'blog' , 
        path: '/blog' , 
        inAnimation: {mode:"ease-in" , animation:"go_to_page", animationDuration: '150ms', animationDelay: '0ms'},
        outAnimation: {mode:"ease-out" , animation:"go_out_page", animationDuration: '150ms', animationDelay: '0ms'},
        params: [
                    {order:1 , component: 'products', id:'blog-page' } , 
                ]
    },
    {
        title: '404 page not found' , 
        path: '/404' , 
        inAnimation: {mode:"ease-in" , animation:"go_to_page", animationDuration: '150ms', animationDelay: '0ms'},
        outAnimation: {mode:"ease-out" , animation:"go_out_page", animationDuration: '150ms', animationDelay: '0ms'},
        params: [
                    {order:1 , component: '404', id:'not-found-page' } , 
                ]
    },
    {
        title: 'resume' , 
        path: '/resume' , 
        inAnimation: {mode:"ease-in" , animation:"go_to_page", animationDuration: '150ms', animationDelay: '0ms'},
        outAnimation: {mode:"ease-out" , animation:"go_out_page", animationDuration: '150ms', animationDelay: '0ms'},
        params: [
                    {order:1 , component: 'products', id:'resume-page'} , 
                ]
    }
];  


document.getElementsByTagName('title')[0].innerText = router[[...router.map(r => r.path)].indexOf(currentPage)].title;

                                    