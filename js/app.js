/* ZarrinSoft */
                
let mainMenu = Vue.component('main-menu',{
    template: `
        <header class="main-menu-container roboto-medium">
            <ul>
                <li v-for="(menuItem,i) in menuItems" :key="i" @click="changePage(menuItem)" :class="{active: activeIndex == menuItem.activeIndex ? true : false , 'roboto-bold': activeIndex == menuItem.activeIndex ? true : false}"> {{menuItem.text}} </li>
                <li class="action-menu-item">
                   <input type="checkbox" class="dark-light-switch" id="switch"  @click="changeColor"> 
                   <label for="switch" class="dark-light-switch-label">Toggle</label>
                </li>
            </ul>
        </header>
    `,

    data(){
        return {
            menuItems: [
                {text: " Home " , url: "/" , activeIndex: 0},
                // {text: " Blog " , url: "/blog" , activeIndex: 1},
                {text: " My Resume" , url: "/products" , activeIndex: 2},
                // {text: " Contact Me " , url: "/dashboard" , activeIndex: 3}
            ],
            activeIndex: 0,
            light_theme: true
        }
    },
    mounted(){
        this.activeIndex = this.menuItems.filter(a => a.url == currentPage).map(b => b.activeIndex);
        document.addEventListener('currentPageIndex', this.changePageIndex);
        // this.rahavard_control();
    },

    methods: {
        changePage(menuItem){
            go_to_url(menuItem.url); 
            this.activeIndex = menuItem.activeIndex;

            // this.rahavard_control();
        } ,

        changePageIndex(){
            this.activeIndex = currentPageIndex;
        },

        changeColor(){
            if (this.light_theme == true){
                document.body.style = `--main-bg: var(--dark-color-60); --main-color: var(--light-color-60); --sun-moon-color: white; --sun-moon-center-x: 495; --menu-active-color: var(--light-menu-active-color); --menu-color-hover: var(--dark-menu-color-hover);`;
                this.light_theme = false;
            }else{
                document.body.style = `--main-bg: var(--light-color-60); --main-color: var(--dark-color-60); --sun-moon-color: gold; --sun-moon-center-x: 395; --menu-active-color: var(--dark-menu-active-color); --menu-color-hover: var(--light-menu-color-hover);`;
                this.light_theme = true;
            }
        } ,

        // rahavard_control(){
        //     let rahavardWidget = document.getElementsByTagName('a');
        //     for (let i = 0; i < rahavardWidget.length; i++){
        //         console.log(rahavardWidget[i].getAttribute('href').substring(0,23))
        //         if(rahavardWidget[i].getAttribute('href').substring(0,23) == "https://rahavard365.com"){
        //             rahavardWidget[i].setAttribute('style' , '');
        //             if (this.activeIndex == 2){
        //                 rahavardWidget[i].classList = "rahavard-365-show";
        //             }else{
        //                 rahavardWidget[i].classList = "rahavard-365-hide";
        //             }
        //         }
        //     }
        // }
    }
})
                
let homePage = Vue.component('home-page' , {
    props: ['name' , 'id'],

    template: `
        <div :id="id" class="hero-section">
            <div class="artboard"></div>
            <div class="hero-area">
                <div class="left-area">
                    <div class="left-area-content">
                        <h1 class="roboto-bold"> Me <span class="roboto-italic">  {{fancyLoader}} </span></h1>
                        <p> 
                            My name is Sobhan Zarrinpour, I'm a full stack web developer and have 5+ years experience in Data Analysis and Data Sciece. 
                            I have Msc degree in Applied Mathematics and real life expreince in using optimization modelling and algorithms to solve problems specially in scheduling problems.
                        </p>
                        <div class="call-to-action-btn">
                            <!--button @click="go_to_blog"> Go To Blog </button-->
                            <button @click="go_to_resume"> My Resume </button>
                        </div>
                    </div>
                </div>
                <main-svg></main-svg>
            </div>
            <!--gallery :name="gallery" :id="gallery"></gallery-->
        </div>
    `,

    data: ()=>{
        return {
            fancyLoader: '',
            main_bg: 'default'
        }
    },

    mounted() {
        let self = this;
        setInterval(()=>{
            if(self.fancyLoader.length < 3)
                self.fancyLoader += '.';
            else
                self.fancyLoader = '';
        },300);
        storage.resetAll();
    },

    // mounted(){
    //     storage.remove('chain_test');
    //     console.log(storage.exists('test') , storage.storageType('test'));
    //     storage.chain('homePage', this.name , 'chain_test')
    //     .then(f => storage.retriveChainValue('chain_test').then(t => console.log(t)));
    // },

    // watch:{
    //     name: function(newValue , oldValue){
    //         this.$emit('hp', {name: newValue});
    //         vue.name = newValue
    //     }
    // },

    methods: {
        go_to_blog(){
            go_to_url_('/blog', 1);
        },

        go_to_resume(){
            go_to_url_('/resume', 2);

            // this.api_test_1();
            this.api_test_2();
        },

        api_test_1(){
            a = new API()
            
            // test get request
            a.GET_DATA(path='/users' ,params = null, header = null , body = null).then(result => console.log(result))

            // test get request
            a.GET_DATA(path='/users/$' ,params = '2', header = null , body = null).then(result => console.log(result))

            // test post request
            a.POST_DATA(path='/users', params = null, header=null, body = {
                "name": "morpheus",
                "job": "leader"
            }).then(res => console.log(res))

            // test put request
            a.PUT_DATA(path='/users/$', params = 2, header=null, body = {
                "name": "morpheuses",
                "job": "team lead"
            }).then(res => console.log(res))


            // test delete request
            a.DELETE_DATA(path='/users/$', params = 2, header={"mode": "no-cors"}, body = null).then(res => console.log(res))
        },

        api_test_2(){
            a = new API()
            
            // test get request
            a.GET_DATA(path='objects' ,params = null, header = null , body = null).then(result => console.log(result))

            // test get request
            a.GET_DATA(path='objects?$' ,params = {'id': 3}, header = null , body = null).then(result => console.log(result))

            // test post request
            a.POST_DATA(path='objects', params = null, header={"Content-Type": "application/json", "User-Agent": "Mozilla/5.0"}, body = String.toString({
                "name": "Apple MacBook Pro 16",
                "data": {
                   "year": 2019,
                   "price": 1849.99,
                   "CPU model": "Intel Core i9",
                   "Hard disk size": "1 TB"
                }
             })).then(res => console.log(res))

            // test put request
            a.PUT_DATA(path='objects/$', params = 7, header=null, body = {
                "name": "Apple MacBook Pro 16",
                "data": {
                   "year": 2019,
                   "price": 2049.99,
                   "CPU model": "Intel Core i9",
                   "Hard disk size": "1 TB",
                   "color": "silver"
                }
             }).then(res => console.log(res))


            // test delete request
            a.DELETE_DATA(path='objects/$', params = 6, header=null, body = null).then(res => console.log(res))
        }
    },
    computed:{}
})
                
let blogPage = Vue.component('blog-page' , {
    template: `
        <div>
            <h1>  this is about page renderer </h1>
            <img src="./assets/media/Endless-shapes.jpg"/>
        </div>
    `,
    data: ()=>{
        return {
            
        }
    },
    computed:{}
})
                
let notFoundPage = Vue.component('not-found-page' , {
    template: `
        <div class='center-grid'>
            <h1>  404 page not found! </h1>
        </div>
    `,
    data: ()=>{
        return {
            
        }
    },
    computed:{}
})
                
let products = Vue.component('products' , {
    template:  `
        <div class="product-container">

            <div class="product-card" v-for="(product , id) in productsList" :key="id" :id="product.productID">
                <div class="product-body">
                    <div class="product-image">
                        <img :src="product.productImage" alt="there is no image exists for this product" v-if="product.productImage && product.productImage != null && product.productImage != undefined  && product.productImage != '' " />
                        <img src="./assets/media/image-not-found-scaled.png" alt="there is no image exists for this product" v-if="!product.productImage || product.productImage == null || product.productImage == undefined  || product.productImage == '' " />
                    </div>
                    <div class="product-header">
                        <h3 class="product-Tile"> {{ product.productName }} </h3>
                    </div>
                    <div class="product-desc">
                        <p> {{ product.productDescription }} </p>
                    </div>
                </div>
                <div class="product-footer">
                    <div class="product-manual" v-show="product.productUserManualUrl && product.productUserManualUrl != null && product.productUserManualUrl != undefined && product.productUserManualUrl != '' "> 
                        <button @click="gotoProduct(product.productID)" class="product-user-manual-link"> See More </button> 
                    </div>
                    <div>
                        <span class="product-cost"> {{ product.productCost }} </span>
                        <span class="product-cost-unit"> {{ product.CostUnit }} </span>
                    </div>
                </div>
            </div>

        </div>
    `,

    data(){
        return {
            // productsList: [],
            productID: null,
            productsList: [
                {
                    productID: 1001,
                    productName: 'MATLAB',
                    productImage: './assets/media/matlab-page.jpg',
                    productDescription: '16+ years’ experience in coding with MATLAB and Simulink in a variety of scientific projects e.g. simulation and optimization algorithms.',
                    productUserManualUrl: 'https://google.com',
                    productCost: '16+',
                    CostUnit: 'year'
                },
                {
                    productID: 1002,
                    productName: 'Python',
                    productImage: './assets/media/1716044581199.png',
                    productDescription: '3+ years’ experience in coding with python on optimization problems, API (Flask) and Data analysis projects.',
                    productUserManualUrl: 'https://google.com',
                    productCost: '3+',
                    CostUnit: 'year'
                },
                {
                    productID: 1003,
                    productName: 'RDS',
                    productImage: './assets/media/1681108183400.png',
                    productDescription: '5+ years’ experience in Mysql and MSSql (Relational Databases) in four large-scale projects (High Performance Queries, Data flow management and ER Design for Data Driven Applications.',
                    productUserManualUrl: 'https://google.com',
                    productCost: '5+',
                    CostUnit: 'year'
                },
                {
                    productID: 1004,
                    productName: 'JAVA (Spring Boot)',
                    productImage: './assets/media/programming-software-java.jpg',
                    productDescription: '3+ years’ experience in three large scale projects (Clean Code).',
                    productUserManualUrl: 'https://google.com',
                    productCost: '3+',
                    CostUnit: 'year'
                },
                {
                    productID: 1005,
                    productName: 'C# / C++',
                    productImage: './assets/media/Untitled-design.png',
                    productDescription: '2+ years’ experience in C# and C++ for some projects and High performance computations (hybrid with MATLAB).',
                    productUserManualUrl: 'https://google.com',
                    productCost: '2+',
                    CostUnit: 'year'
                },
                {
                    productID: 1006,
                    productName: 'R',
                    productImage: './assets/media/images (2).jpg',
                    productDescription: 'About a year of experience, using R for Data Analysis projects.',
                    productUserManualUrl: 'https://google.com',
                    productCost: '1',
                    CostUnit: 'year'
                },
                {
                    productID: 1007,
                    productName: 'LP / MILP',
                    productImage: './assets/media/Optimization-Problem-1024x576.jpg',
                    productDescription: '8+ years’ experience in structural design optimization standard and canonical problems, coding, and solving them using relevant tools in MATLAB, Python and C++.',
                    productUserManualUrl: 'https://google.com',
                    productCost: '8+',
                    CostUnit: 'year'
                },
                {
                    productID: 1008,
                    productName: 'Simulation',
                    productImage: './assets/media/1000_F_190193472_B26rbKFtgrF13DFawWJlbwB94QSkjlOl.jpg',
                    productDescription: '10+ years’ experience of working in scientific concepts especially simulations of physical phenomena and finance.',
                    productUserManualUrl: 'https://google.com',
                    productCost: '10+',
                    CostUnit: 'year'
                },
                {
                    productID: 1009,
                    productName: 'Data Analysis',
                    productImage: './assets/media/Supply-Chain-Optimization-Scenario-modeling-AIMMS.webp',
                    productDescription: '4+ years’ experience in DA position in Tavana System Group (TIPS) in partnership with Dynamic Ideas Corporation (Boston, USA). Meaningful consultant have no meaning without analyzing business data. ',
                    productUserManualUrl: 'https://google.com',
                    productCost: '4+' ,
                    CostUnit: 'year'
                },
                {
                    productID: 1010,
                    productName: 'UI/UX Design',
                    productImage: './assets/media/images (3).jpg',
                    productDescription: '7+ years’ experience in UI/UX designing and coding (vue is my wepon of choice).',
                    productUserManualUrl: 'https://google.com',
                    productCost: '7+' ,
                    CostUnit: 'year'
                }
            ] , 
            testData: null,
            loadedData: false ,
            api: new API()
        }
    },

    mounted(){
        // this.getAllProducts();
        
        storage.chain('productPage', this.loadedData , 'chain_test').then(f => storage.retriveChainValue('chain_test').then(t => console.log(t)));
        console.log(storage.get('productPage'));

        storage.setActiveIndex('chain_test' , 0);
    } ,

    methods: {
        async getAllProducts(){ 
            let self = this;
            await this.api.GET_DATA('/get_products' , null).then(async data => {
                self.productsList = await data.productsList; 
                self.loadedData = true;
            })
        } ,
        gotoProduct(id){
            sessionStorage.setItem('productID' , id);
            go_to_url('/product');
        }
    },
})
                
let v_dashboard = Vue.component('v-dashboard' , {
    template:  `
        <div>
            <v-chart :data="dataList"></v-chart>
        </div>
    `,

    data(){
        return {
            dataList: [
                {
                    id: 1,
                    value: 2965
                },
                {
                    id: 2,
                    value: 6669
                },
                {
                    id: 3,
                    value: 2366
                },
                {
                    id: 4,
                    value: 251
                },
                {
                    id: 5,
                    value: 9955
                },
                {
                    id: 6,
                    value: 365
                },
                {
                    id: 7,
                    value: 5566
                },
                {
                    id: 8,
                    value: 5552
                },
                {
                    id: 9,
                    value: 5536
                },
                {
                    id: 10,
                    value: 5546
                }
            ] 
        }
    } , 

    mounted(){
        storage.popFromChain('chain_test')
        .then(t => storage.retriveChainValue('chain_test').then(h => console.log(h)));

        
        storage.chain('dashboardPage', 325.5 , 'chain_test')
        .then(f => storage.retriveChainValue('chain_test').then(t => console.log(t)));

        storage.getChainActiveIndex('chain_test')
        .then(t => console.log(t));
    }
})
                
let v_star_ratings = Vue.component('v-star-rating' , {
    props: ['data'],
    template:  `
        <div>
            <template>
                <div class="star-data">
                    {{ data.rating }}
                </div>
            </template>
        </div>
    `,

    data(){
        return {
            loader: null,
            loading: false,
            selection: 1,
            ratingvar: 4
        }
    } 

    
})
                
let v_charts = Vue.component('v-chart' , {
    props: ['data'],
    template:  `
        <div>
            <div v-for="(d,i) in data" :key="i"> {{d.value}} </div>

            <vsb-chart :data="{data: [{title: 'category 1'} , {title: 'category 2'}]}" :options="{id: 'ch101', style:'--sb-height: 100px; --sb-width: 300px;'}"></vsb-chart>

            <canvas id="myChart"></canvas>   
        </div>
    `,

    data(){
        return {
        }
    } ,

    mounted(){
        setTimeout(()=>{
            const ctx = document.getElementById('myChart').getContext('2d'); // 2d context
    
            const labels = [...this.data.map(d => d.id)]
            const _data = [...this.data.map(d => d.value)]
    
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels , //['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    datasets: [{
                        label: '# of Votes',
                        data: _data , //[12, 19, 3, 5, 2, 3],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }, 500);
    } ,

    methods: {
    },

    watch: {
    }
})
                
let sb_charts = Vue.component('vsb-chart' , {
    props: ['data' , 'options'],
    template:  `
        <div>
            <div :id="sb_id" class="sb-chart" :style="sb_style"> 
                <vsbc-chart :data="data"></vsbc-chart>
            </div>
        </div>
    `,

    data(){
        return {
            sb_id: 0
        }
    } ,

    created(){
        if(this.options){
            if(this.options.id){
                this.sb_id = this.options.id;
            }
        }
    },

    mounted(){} ,

    methods: {
    },

    watch: {
    },

    computed: {
        sb_style(){
            return this.options.style;
        }
    }
})
                
let sbc_charts = Vue.component('vsbc-chart' , {
    props: ['data'],
    template:  `
        <div class="sb-chart-bar">
            <div class="sb-chart-bar-item" v-for="(d , i) in data.data" :key="i">  
                <div> {{d.title}} </div>
            </div>
        </div>
    `,

    data(){
        return {
        }
    } ,

    mounted(){
    } ,

    methods: {
    },

    watch: {
    }
})
                
let product = Vue.component('product' , {
    template:  `
        <div class="product-container single-card-in-page">
            <div class="product-card " :id="productID" v-if="productID != null">
                <div class="product-body">
                    <div class="product-image">
                        <img :src="product.mian_image" alt="there is no image exists for this product" v-if="product.productImage && product.productImage != null && product.productImage != undefined  && product.productImage != '' " />
                        <img src="./assets/media/image-not-found-scaled.png" alt="there is no image exists for this product" v-if="!product.productImage || product.productImage == null || product.productImage == undefined  || product.productImage == '' " />
                    </div>
                    <div class="product-header">
                        <h3 class="product-Tile"> {{ product.page_title }} </h3>
                    </div>
                    <div class="product-desc" id="page_content"></div>
                </div>
                <div class="product-footer">
                    <div class="product-manual" v-show="product.productUserManualUrl && product.productUserManualUrl != null && product.productUserManualUrl != undefined && product.productUserManualUrl != '' "> 
                        <button @click="go_to_url('/products');" class="product-user-manual-link"> Back </button> 
                    </div>
                </div>
            </div>
        </div>
    `,

    data(){
        return {
            product: {
                productID : null,
                productName : null,
                productImage : null,
                productDescription : null,
                productUserManualUrl : null,
                productCost : null,
                CostUnit : null
            },
            api: new API(),
            productID: sessionStorage.getItem('productID')
        }
    },

    mounted(){
        let self = this;
        setTimeout(() => self.getProduct() , 1000);
    },

    methods: {
        getPageData(page_id){
            return new Promise((res, rej) => {
                res(data_object.data.pages.filter(a => a.page_id == page_id)[0]);
            })
        },

        async getProduct(){
        // async getProduct(){
            // let self = this;
            // await this.api.GET_DATA('/get_product/$' , this.productID).then(async data => {
            //     self.product = await data; 
            // });
            
            this.getPageData(this.productID)
            .then(t => {
                this.product = t;
                this.render_page_();
            })
        },

        render_page_(){
            document.getElementById('page_content').innerHTML = this.product.page_html;
        }
    },
})
                
let gallery = Vue.component('gallery' , {
    props: ['name' , 'id'],

    template: `
        <div :id="id" class="gallery-section">
            <carousel :items="items" :id="gallery_carousel" :auto_change="auto_change" :auto_change_time="auto_change_time" :active_slide="active_slide"></carousel>
        </div>
    `,

    data: ()=>{
        return {
            fancyLoader: '',
            main_bg: 'default',
            gallery_carousel: "car_box_4455a",
            auto_change: true,
            auto_change_time: 10000,
            active_slide: 1,
            items: [
                {
                  src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
                  type: 'image',
                  text: '',
                  button_action: ()=>{alert('hello card 1')},
                  button_text: 'click me',
                  button_color: '--btn-custom-red-primary'
                },
                {
                  src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
                  type: 'box',
                  text: '',
                  button_action: ()=>{alert('hello card 2')},
                  button_text: 'click me',
                  button_color: '--btn-custom-red-primary'
                },
                {
                  src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
                  type: 'box',
                  text: '',
                  button_action: ()=>{
                    go_to_url_('/products', 2); 
                  },
                  button_text: 'click me',
                  button_color: '--btn-custom-red-primary'
                },
                {
                  src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
                  type: 'box',
                  text: '',
                  button_action: null,
                  button_text: null,
                  button_color: null
                },
                {
                  src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
                  type: 'box',
                  text: '',
                  button_action: null,
                  button_text: null,
                  button_color: null
                },
              ]
        }
    },

    mounted() {
        let self = this;
        setInterval(()=>{
            if(self.fancyLoader.length < 3)
                self.fancyLoader += '.';
            else
                self.fancyLoader = '';
        },300);
    },

    // mounted(){
    //     storage.remove('chain_test');
    //     console.log(storage.exists('test') , storage.storageType('test'));
    //     storage.chain('homePage', this.name , 'chain_test')
    //     .then(f => storage.retriveChainValue('chain_test').then(t => console.log(t)));
    // },

    // watch:{
    //     name: function(newValue , oldValue){
    //         this.$emit('hp', {name: newValue});
    //         vue.name = newValue
    //     }
    // },

    methods: {
        
    },
    computed:{}
})
                
let carousel = Vue.component('carousel' , {
    props: ['items' , 'id', 'auto_change', 'auto_change_time', 'active_slide'],

    template: `
        <div :id="car_box_id" class="carousel-container">
            <Transition>
                <div v-for="(item, i) in items" :key="i" v-if="i==active_slide">
                    <carousel-box :content="item" :id="carousel_id(id + i , 'adffdf')" v-if="item.type === 'box'"></carousel-box>
                    <span v-if="item.type==='image'">this content is an image</span>
                </div>
            </Transition>
            <ul class="carousel-allocator">
                <div v-for="(item, i) in items" :key="i+number_of_slides+1" @click="change_active_slide(i)" class="carousel_btn">
                    <li v-if="i==active_slide" style="font-weight: bolder; opacity: 1;">.</li>
                    <li v-if="i!=active_slide">.</li>
                </div>
            </ul>
        </div>
    `,

    data: ()=>{
        return {
            main_bg: 'default',
            car_box_id: 'car_box_' + this.id,
            number_of_slides: 0,
            interval: null
        }
    },

    mounted() {
        this.init();
    },

    // mounted(){
    //     storage.remove('chain_test');
    //     console.log(storage.exists('test') , storage.storageType('test'));
    //     storage.chain('homePage', this.name , 'chain_test')
    //     .then(f => storage.retriveChainValue('chain_test').then(t => console.log(t)));
    // },

    // watch:{
    //     name: function(newValue , oldValue){
    //         this.$emit('hp', {name: newValue});
    //         vue.name = newValue
    //     }
    // },

    methods: {
        init(){
            this.number_of_slides = this.items.length;
            if (this.auto_change == true){
                if (this.auto_change_time == undefined || this.auto_change_time == null || this.auto_change_time == 0)
                    this.auto_change_time = 150;
                this.interval = setInterval(this.change_slide, this.auto_change_time);
            }
        },

        carousel_id(index, posix){
            return index + '_' + posix;
        },

        change_slide(){
            this.active_slide = (this.active_slide + 1) % this.number_of_slides;
            // if (this.active_slide == 0)
            //     this.active_slide = this.number_of_slides;
            clearInterval(this.interval);
            this.interval = setInterval(this.change_slide, this.auto_change_time);
        },

        change_active_slide(index){
            this.active_slide = index;
        }
    },
    computed:{}
})
                
let carousel_box = Vue.component('carousel-box', {
    props: ['content', 'id'],
    template: `
        <div :id="id">
            <img :src="content.src" />
            <button v-if="content.button_action != null" @click="content.button_action" class="carousel_action_box_btn"> {{content.button_text}} </button>
        </div>
    `,
    mounted(){
        
    },
    data: ()=>{
        return {

        }
    },
    methods: {}
})
                
let mainSVG = Vue.component('main-svg' , {
    template: `
                <div class="right-area">
                    <div class="animate-hero">
                        <svg xmlns="http://www.w3.org/2000/svg" 
                            data-name="Layer 1" 
                            width="804.47287" height="781.84651" style="scale: 0.85;"
                            viewBox="0 0 804.47287 781.84651" 
                            xmlns:xlink="http://www.w3.org/1999/xlink" style="position: relative;">
                                <path d="M954.61888,274.86912a380.70363,380.70363,0,0,0-25.02112-39.26532q-9.60012-13.2237-20.28784-25.56482h-.01782a383.41775,383.41775,0,0,0-41.93951-41.51166q-4.61289-3.91763-9.35059-7.67474a380.92618,380.92618,0,0,0-93.88159-54.85706l.2995,49.32727L767.65,717.62528H487.686L471.941,156.38371l1.173-48.53949C335.85637,165.57182,239.48119,301.2996,239.48119,459.54557a381.68685,381.68685,0,0,0,12.39917,96.79517,375.13877,375.13877,0,0,0,12.64868,39.408q2.67415,7.01961,5.64239,13.91449c.9538,2.23736,1.92542,4.4569,2.93268,6.66754,1.29248,2.88806,2.63849,5.76721,4.02014,8.61071q1.60446,3.35606,3.2981,6.66755,2.17941,4.34555,4.50152,8.61969c1.1944,2.23736,2.4245,4.45691,3.67249,6.66748a382.93446,382.93446,0,0,0,76.1507,95.24414q12.95627,11.75289,26.96429,22.28454a381.44949,381.44949,0,0,0,458.29492,0q7.62131-5.72268,14.93067-11.82861,4.85356-4.038,9.54669-8.22748c.829-.73981,1.658-1.47967,2.47809-2.22845a382.97849,382.97849,0,0,0,71.364-87.00769,374.25762,374.25762,0,0,0,19.32513-36.68933q2.28636-4.97388,4.43012-10.037a376.13239,376.13239,0,0,0,16.56189-47.59088q1.0296-3.75714,1.98779-7.541v-.00891c.10694-.43677.22284-.88251.32978-1.31927.65966-2.65632,1.29254-5.33045,1.89868-8.00464v-.00885q2.94159-12.92953,4.965-26.171c.16938-1.132.33875-2.2641.49921-3.39612.06238-.41.12482-.82007.16937-1.23017v-.00891q1.44407-10.22854,2.3443-20.6087,1.39059-16.299,1.39948-32.97223A379.627,379.627,0,0,0,954.61888,274.86912Z" transform="translate(-197.76356 -59.07674)" fill="#f2f2f2"/>
                                <path d="M917.16512,689.76186c22.57343-30.50085,31.25487-73.4632,13.6955-107.10092a174.82952,174.82952,0,0,1-82.77343,86.927c-14.28918,7.00556-30.91166,13.3096-37.52571,27.78427-4.1156,9.0064-3.33187,19.64115-.02357,28.974,3.3087,9.33322,8.93578,17.63762,14.50346,25.82651l.29327,2.4545C860.38673,740.09412,894.59169,720.2627,917.16512,689.76186Z" transform="translate(-197.76356 -59.07674)" fill="#e6e6e6"/>
                                <path d="M930.11157,582.93088a149.43215,149.43215,0,0,1-31.0859,86.52491,64.35041,64.35041,0,0,1-14.42368,14.0881,36.90789,36.90789,0,0,1-18.45223,6.06852c-6.131.43935-12.45317.17877-18.37058,2.10082a22.59884,22.59884,0,0,0-13.52083,12.6002c-3.27617,7.23152-3.75856,15.20895-3.95919,23.02661-.22276,8.68-.31661,17.69937-4.41086,25.58989-.49607.95605,1.0164,1.66989,1.51172.71528,7.12328-13.72815,2.49794-29.782,6.743-44.21354,1.98081-6.734,6.003-12.91193,12.7258-15.61049,5.8788-2.35978,12.39853-2.09664,18.61012-2.48784a39.38351,39.38351,0,0,0,18.26339-5.26147,59.49058,59.49058,0,0,0,14.91211-13.48158,144.97586,144.97586,0,0,0,22.71061-39.2091,152.08212,152.08212,0,0,0,10.41289-50.59568c.03424-1.073-1.63232-.9206-1.66634.14537Z" transform="translate(-197.76356 -59.07674)" fill="#fff"/>
                                <path d="M905.67833,661.81545a22.41959,22.41959,0,0,0,28.55391-5.24167c.67792-.83562-.58874-1.92834-1.26757-1.0916a20.76006,20.76006,0,0,1-26.57106,4.82155c-.92989-.54164-1.63985.97318-.71528,1.51172Z" transform="translate(-197.76356 -59.07674)" fill="#fff"/>
                                <path d="M869.28775,689.79907a43.21193,43.21193,0,0,1,3.185-31.33014c.49267-.95777-1.01964-1.67189-1.51172-.71528a44.947,44.947,0,0,0-3.248,32.60858c.29233,1.03787,1.86547.46907,1.57473-.56316Z" transform="translate(-197.76356 -59.07674)" fill="#fff"/>
                                <path d="M925.47961,617.31069a12.6906,12.6906,0,0,1-8.2891-8.73483c-.279-1.04106-1.85194-.47111-1.57473.56316a14.22082,14.22082,0,0,0,9.14855,9.68338.8643.8643,0,0,0,1.1135-.39821.84042.84042,0,0,0-.39822-1.1135Z" transform="translate(-197.76356 -59.07674)" fill="#fff"/>
                                <path d="M805.2047,555.89147c.15574.655.31148,1.31.458,1.97574a167.12737,167.12737,0,0,1,3.9726,26.81792c.05716.69758.10457,1.4054.14157,2.10317a176.18982,176.18982,0,0,1-8.40485,64.321,171.10163,171.10163,0,0,1-9.93282,24.025c-5.40795,10.69563-12.12255,21.86213-13.63677,33.38058a29.35187,29.35187,0,0,0-.29037,3.62132l44.80548,42.6584c.15047.04585.29177.10234.44274.14866l1.71107,1.785c.22983-.38533.45993-.78992.68976-1.17525.13425-.223.25852-.45544.39277-.67841.08634-.15165.17224-.30384.25882-.43576.02893-.05037.05735-.10122.0766-.14142.08658-.13192.153-.26365.22983-.38533q1.9386-3.387,3.83632-6.813c.00974-.01024.00974-.01024.0095-.03,9.59541-17.42768,17.82018-35.80954,22.99348-54.85539.15545-.57307.32115-1.1559.45613-1.74846a163.26888,163.26888,0,0,0,4.71735-26.22312,144.33881,144.33881,0,0,0,.62013-14.59135,120.027,120.027,0,0,0-6.23946-37.00566c-7.99194-23.78467-23.50168-44.74862-45.61032-55.917C806.33646,556.44288,805.78022,556.16654,805.2047,555.89147Z" transform="translate(-197.76356 -59.07674)" fill="#e6e6e6"/>
                                <path d="M804.764,556.55605a149.43222,149.43222,0,0,1,27.27362,87.80115,64.35074,64.35074,0,0,1-3.03449,19.93262,36.90791,36.90791,0,0,1-11.07941,15.95488c-4.63071,4.04207-9.83552,7.64041-13.403,12.73774a22.59883,22.59883,0,0,0-3.20943,18.201c1.738,7.74645,6.15584,14.40642,10.70242,20.76917,5.0481,7.06462,10.40344,14.32258,11.88506,23.08773.17951,1.062,1.81691.72137,1.63767-.339-2.57776-15.24987-15.93635-25.28318-21.23573-39.36178-2.47279-6.56933-2.98081-13.92367.76225-20.12591,3.27314-5.42359,8.63721-9.13882,13.36129-13.191a39.38372,39.38372,0,0,0,11.41452-15.19681,59.49081,59.49081,0,0,0,3.78964-19.74241,144.97592,144.97592,0,0,0-5.47343-44.97963,152.08179,152.08179,0,0,0-22.148-46.66709c-.61866-.87733-1.85758.24772-1.243,1.11932Z" transform="translate(-197.76356 -59.07674)" fill="#fff"/>
                                <path d="M832.74939,634.25145a22.41957,22.41957,0,0,0,19.64285-21.3766c.03819-1.07535-1.63107-1.1852-1.6693-.10842a20.76,20.76,0,0,1-18.31259,19.84735c-1.06857.12739-.72342,1.76433.339,1.63767Z" transform="translate(-197.76356 -59.07674)" fill="#fff"/>
                                <path d="M820.54162,678.50445a43.212,43.212,0,0,1-16.3199-26.93292c-.18327-1.06135-1.82072-.721-1.63767.339a44.94692,44.94692,0,0,0,17.0393,27.99162c.85828.65268,1.77188-.74862.91827-1.39775Z" transform="translate(-197.76356 -59.07674)" fill="#fff"/>
                                <path d="M821.76466,586.79515a12.69056,12.69056,0,0,1-11.87735-1.98366c-.84957-.66322-1.76231.73884-.91826,1.39776a14.22084,14.22084,0,0,0,13.13466,2.22358.86429.86429,0,0,0,.64931-.98836.84042.84042,0,0,0-.98836-.64932Z" transform="translate(-197.76356 -59.07674)" fill="#fff"/>
                                <path d="M215.56773,518.93477c-20.02-32.23445-25.18128-75.76021-4.94633-107.85966a174.82956,174.82956,0,0,0,75.43526,93.3663c13.67259,8.14364,29.72777,15.7777,35.14361,30.742,3.37006,9.31108,1.72466,19.847-2.33116,28.88008-4.05624,9.03346-10.33959,16.85309-16.55436,24.56242l-.49177,2.42254C268.06792,573.71482,235.58775,551.16923,215.56773,518.93477Z" transform="translate(-197.76356 -59.07674)" fill="#e6e6e6"/>
                                <path d="M211.346,411.405a149.43214,149.43214,0,0,0,23.95137,88.765,64.35054,64.35054,0,0,0,13.23107,15.21369,36.908,36.908,0,0,0,17.898,7.548c6.075.93615,12.39745,1.19022,18.13908,3.58681a22.5988,22.5988,0,0,1,12.45212,13.65733c2.67765,7.47385,2.51013,15.4641,2.07477,23.2722-.48339,8.66941-1.12283,17.66656,2.31663,25.86371.41673.9932-1.14874,1.58176-1.56485.59006-5.98406-14.26164-.06936-29.88648-3.12752-44.61529-1.427-6.87273-4.93382-13.35706-11.41508-16.59305-5.66758-2.82973-12.18713-3.09731-18.34638-3.992a39.38368,39.38368,0,0,1-17.77538-6.7283,59.49058,59.49058,0,0,1-13.76717-14.64887,144.97582,144.97582,0,0,1-19.449-40.925,152.08183,152.08183,0,0,1-6.26663-51.27455c.05306-1.07221,1.70173-.7849,1.649.28031Z" transform="translate(-197.76356 -59.07674)" fill="#fff"/>
                                <path d="M229.28767,492.01431a22.41958,22.41958,0,0,1-28.03348-7.54484c-.60777-.88795.74351-1.87412,1.35209-.985a20.76005,20.76005,0,0,0,26.09133,6.965c.97083-.46428,1.55534,1.10322.59006,1.56484Z" transform="translate(-197.76356 -59.07674)" fill="#fff"/>
                                <path d="M263.28371,522.86276a43.212,43.212,0,0,0-.62828-31.48534c-.4132-.99464,1.15214-1.5835,1.56485-.59006a44.94691,44.94691,0,0,1,.58718,32.76468c-.3757,1.01067-1.89741.31591-1.52375-.68928Z" transform="translate(-197.76356 -59.07674)" fill="#fff"/>
                                <path d="M213.1687,446.04755a12.69057,12.69057,0,0,0,8.97154-8.0323c.36271-1.01493,1.8841-.31905,1.52375.68928a14.22079,14.22079,0,0,1-9.90523,8.90787.86429.86429,0,0,1-1.07745-.48739.84043.84043,0,0,1,.48739-1.07746Z" transform="translate(-197.76356 -59.07674)" fill="#fff"/>
                                <path d="M338.03719,394.606c-.20846.64019-.41692,1.28037-.617,1.932a167.128,167.128,0,0,0-6.1389,26.40637c-.11366.69063-.21844,1.39225-.312,2.08471a176.19013,176.19013,0,0,0,3.1498,64.79134,171.10129,171.10129,0,0,0,7.94752,24.7527c4.52085,11.09975,10.30576,22.775,10.87889,34.37841a29.352,29.352,0,0,1-.00489,3.63293l-48.124,38.876c-.15371.03347-.29913.07829-.45337.11219l-1.85047,1.64006c-.19776-.40274-.39421-.82469-.592-1.22742-.11568-.23314-.22065-.47494-.33634-.70808-.07372-.15817-.147-.31684-.22254-.45536-.02474-.05256-.04894-.10555-.06486-.14718-.07557-.13852-.13106-.2752-.19775-.40273q-1.65693-3.53334-3.26995-7.10225c-.00888-.011-.00888-.011-.007-.03064-8.14736-18.14983-14.85107-37.1393-18.45943-56.54257-.10837-.58381-.22615-1.17818-.31254-1.77975a163.27112,163.27112,0,0,1-2.57065-26.51975,144.34235,144.34235,0,0,1,.56774-14.59348,120.02708,120.02708,0,0,1,9.22619-36.37619c9.89844-23.05651,27.06058-42.69067,50.00372-52.02535C336.86436,395.0636,337.44122,394.83338,338.03719,394.606Z" transform="translate(-197.76356 -59.07674)" fill="#e6e6e6"/>
                                <path d="M338.42242,395.30418a149.4322,149.4322,0,0,0-34.31884,85.29426,64.35053,64.35053,0,0,0,1.40458,20.11329,36.908,36.908,0,0,0,9.74613,16.80252c4.28691,4.405,9.18207,8.41444,12.32354,13.78484a22.59883,22.59883,0,0,1,1.71966,18.40165c-2.36182,7.57958-7.30626,13.85849-12.35488,19.83071-5.60554,6.631-11.533,13.42973-13.72205,22.04549-.26523,1.04392-1.86953.57133-1.6047-.471,3.80856-14.98994,17.93835-23.90443,24.36434-37.50579,2.99848-6.34664,4.1025-13.63537.87586-20.12129-2.82155-5.67165-7.86595-9.81052-12.24509-14.23318a39.38376,39.38376,0,0,1-10.14175-16.07418,59.49061,59.49061,0,0,1-2.17268-19.98509,144.9755,144.9755,0,0,1,9.11073-44.386,152.08211,152.08211,0,0,1,25.86726-44.71281c.68792-.82415,1.83131.39787,1.14789,1.21663Z" transform="translate(-197.76356 -59.07674)" fill="#fff"/>
                                <path d="M304.21545,470.46828a22.41961,22.41961,0,0,1-17.84065-22.90223.83693.83693,0,0,1,1.6726.0276,20.76005,20.76005,0,0,0,16.63906,21.26993c1.05469.21381.57764,1.81728-.471,1.6047Z" transform="translate(-197.76356 -59.07674)" fill="#fff"/>
                                <path d="M312.78649,515.567a43.21191,43.21191,0,0,0,18.4547-25.51755c.26892-1.04294,1.8733-.57067,1.6047.471a44.94693,44.94693,0,0,1-19.25776,26.51428c-.90848.58077-1.70518-.89014-.80164-1.46775Z" transform="translate(-197.76356 -59.07674)" fill="#fff"/>
                                <path d="M319.02052,424.06166a12.69058,12.69058,0,0,0,11.99927-1.01185c.90067-.592,1.69644.87961.80164,1.46775a14.22082,14.22082,0,0,1-13.27192,1.1488.8643.8643,0,0,1-.56685-1.03786.84042.84042,0,0,1,1.03786-.56684Z" transform="translate(-197.76356 -59.07674)" fill="#fff"/>
                                <circle cx="389.43908" cy="77.83311" r="52.98539" fill="rgb(251, 255, 0)" class="sun-moon"/>
                                <path class="move-cloud-1" d="M749.43232,134.14486a194.72746,194.72746,0,0,0-15.1-14.33343c-10.32216-8.75332-21.74968-16.19639-34.48756-20.88507A79.52764,79.52764,0,0,0,685.04784,95.031c-.60613-.098-1.20334-.19608-1.80953-.27633a.66947.66947,0,0,0-.13368,0,1.60874,1.60874,0,0,0-.28524-.05348c-1.239-.16044-2.47807-.28525-3.726-.37436a64.56723,64.56723,0,0,0-20.00261,1.80061,66.52042,66.52042,0,0,0-11.05315,3.85072,98.94821,98.94821,0,0,0-10.36677,5.87422,62.28526,62.28526,0,0,1-5.52653,2.98611,68.93083,68.93083,0,0,1-17.38194,5.56227,78.04106,78.04106,0,0,1-12.30111,1.21226c-3.58332.07133-6.96169.19608-10.35785,1.4886a24.82174,24.82174,0,0,0-15.12672,16.38359,1.59657,1.59657,0,0,0,.7131,1.756c.91809.65967,1.80947,1.4084,2.7811,1.99674a8.72679,8.72679,0,0,0,2.70978.73981q2.29982.48141,4.60849.936,8.49037,1.68465,17.05213,2.98611,17.2215,2.6073,34.63908,3.67249a1.72945,1.72945,0,0,0,.21392.01784,389.85446,389.85446,0,0,0,39.39908.38329c1.98776-.08025,3.96666-.17829,5.95442-.29417q12.42138-.69531,24.7804-2.19282,11.43195-1.39053,22.77479-3.44964,8.10266-1.47075,16.143-3.28028A1.5786,1.5786,0,0,0,749.43232,134.14486Z" transform="translate(-197.76356 -59.07674)" fill="#e6e6e6"/>
                                <path d="M639.30213,204.79577a173.06819,173.06819,0,0,0-25.235-22.21321c-3.0218-2.12149-6.13271-4.11818-9.33274-5.94556a98.90557,98.90557,0,0,0-12.19415-5.96334c-.93594-.38329-1.8808-.74873-2.82566-1.09638a78.98582,78.98582,0,0,0-16.60645-4.17166c-.04456-.00892-.08911,0-.13367-.00892-.08917-.0178-.18721-.03564-.27633-.05349a61.346,61.346,0,0,0-8.28989-.50809c-1.98777,0-3.98445.107-5.96335.30309a65.94589,65.94589,0,0,0-9.48426,1.64012c-1.54212.38334-3.07527.829-4.58171,1.33707a65.44149,65.44149,0,0,0-6.46252,2.5137c-.03563.01785-.0624.02677-.098.04456a96.29,96.29,0,0,0-10.26873,5.82967c-.07133.04456-.15152.08912-.22285.13367a64.77405,64.77405,0,0,1-11.83757,5.54443,72.09357,72.09357,0,0,1-10.857,2.87022,76.88018,76.88018,0,0,1-12.30106,1.2034c-3.58337.07132-6.96168.19607-10.34892,1.49751a24.83453,24.83453,0,0,0-15.13565,16.3836,1.60706,1.60706,0,0,0,.7131,1.756c.91809.65961,1.8184,1.39947,2.7811,1.98781a8.55268,8.55268,0,0,0,2.70979.73981c1.5332.32094,3.06635.64182,4.60842.94486q8.49047,1.68473,17.06106,2.97724,11.75292,1.77832,23.60382,2.84351,5.61564.52147,11.24031.85575,14.427.869,28.88073.6774,2.98173-.04007,5.96335-.13367,17.70291-.52148,35.29874-2.65636a388.25605,388.25605,0,0,0,38.90878-6.72992A1.57187,1.57187,0,0,0,639.30213,204.79577Z" transform="translate(-197.76356 -59.07674)" fill="#e6e6e6"/>
                                <path d="M507.23172,62.59455l46.67889,645.05617L460.55283,715.937V70.80149C471.67732,62.11189,487.6462,60.75238,507.23172,62.59455Z" transform="translate(-197.76356 -59.07674)" fill="#ccc"/>
                                <path d="M737.64666,62.59455,690.96777,707.65072l93.35778,8.28625V70.80149C773.20106,62.11189,757.23217,60.75238,737.64666,62.59455Z" transform="translate(-197.76356 -59.07674)" fill="#ccc"/>
                                <path d="M786.5221,71.083c-2.897-7.10277-9.05641-12.00629-16.17859-12.00629H473.5402c-9.90324,0-17.95244,9.5019-17.95244,21.19252V721.40237a22.90919,22.90919,0,0,0,6.18619,15.9944,17.00935,17.00935,0,0,0,7.77287,4.66152,14.83732,14.83732,0,0,0,3.99338.53666H770.34351a14.83729,14.83729,0,0,0,3.99342-.53666c7.98675-2.14666,13.959-10.58576,13.959-20.65592V80.26926A24.34186,24.34186,0,0,0,786.5221,71.083Zm-4.18058,650.31934c0,7.80777-5.38392,14.16341-11.998,14.16341H473.5402c-5.482,0-10.12609-4.36685-11.54341-10.31216a16.45068,16.45068,0,0,1-.45461-3.85125V80.26926c0-7.80777,5.384-14.15288,11.998-14.15288H770.34351a10.17929,10.17929,0,0,1,3.56552.64187c4.87589,1.78886,8.43249,7.1659,8.43249,13.511Z" transform="translate(-197.76356 -59.07674)" fill="#ccc"/>
                                <rect x="260.80293" y="194.88219" width="326.75223" height="5.95901" fill="#ccc"/>
                                <rect x="260.80293" y="71.87153" width="326.75223" height="5.95901" fill="#ccc"/>
                                <rect x="260.80293" y="294.19898" width="326.75223" height="5.95901" fill="#ccc"/>
                                <rect x="360.87817" y="2.67414" width="5.95901" height="375.9441" fill="#ccc"/>
                                <rect x="481.52091" y="2.67414" width="5.95901" height="375.9441" fill="#ccc"/>
                                <path d="M822.56066,705.353H431.25305a26.84446,26.84446,0,0,0-26.81277,26.81278,26.5428,26.5428,0,0,0,1.93433,9.97456,26.81491,26.81491,0,0,0,24.87844,16.84708H822.56066a26.81492,26.81492,0,0,0,23.14028-13.28155,25.895,25.895,0,0,0,1.74708-3.56553,26.5428,26.5428,0,0,0,1.93433-9.97456A26.85209,26.85209,0,0,0,822.56066,705.353Z" transform="translate(-197.76356 -59.07674)" fill="#ccc"/>
                                <rect x="262.78926" y="364.71389" width="324.76589" height="19.86336" fill="#ccc"/>
                                <path d="M422.19269,358.75489h5.959a10.92484,10.92484,0,0,1,10.92484,10.92484v0a0,0,0,0,1,0,0h-27.8087a0,0,0,0,1,0,0v0A10.92484,10.92484,0,0,1,422.19269,358.75489Z" fill="#ccc"/>
                                <circle id="b6ad44ff-295b-418b-9346-03b76e49c34f" data-name="ab6171fa-7d69-4734-b81c-8dff60f9761b" cx="430.90136" cy="359.18541" r="61.54786" fill="#ffb8b8"/>
                                <path id="e8f77054-5a04-4fda-83df-6cd2e0c3cac3-172" data-name="bf427902-b9bf-4946-b5d7-5c1c7e04535e" d="M560.00644,359.05263c.46535-7.06792,5.13947-14.30051,19.98981-18.07989,0,0,25.4858-32.58965,60.11807-15.4992,0,0,16.78957-2.88853,29.23943,14.53128,0,0,12.34335-7.27988,17.5511,5.62372,0,0,14.4767,26.32034,9.147,53.1671s-8.05769,30.19715-8.05769,30.19715,6.79346-55.532-32.335-51.68136-70.63065-9.90956-79.49168,20.218c-7.35786,25.0167-6.431,38.00921-6.431,38.00921s-24.605-24.95631-16.23922-44.60756C557.77606,380.88021,559.28879,369.9527,560.00644,359.05263Z" transform="translate(-197.76356 -59.07674)" fill="#2f2e41"/>
                                <path d="M461.29216,754.61968H801.73027c-2.27524-25.96852-3.7624-125.23509-3.7624-131.76855,0-28.81577-23.57885-60.26272-23.57885-60.26272l-8.44011-4.665-70.4824-21.99-18.24022-23.69329a20.28268,20.28268,0,0,0-16.24467-7.93164l-57.61889.43221a20.34414,20.34414,0,0,0-13.66431,5.41489L554.01877,543.255l-52.33116,24.98975-.089-.0889-.54657.40668-7.76639,5.59286-4.9954,3.61s-13.105,15.72348-23.57885,62.88118C463.13527,647.73925,462.02934,739.55712,461.29216,754.61968Z" transform="translate(-197.76356 -59.07674)" fill="#f50057"/>
                                <path d="M880.52723,742.14034c-.82011.74873-1.64909,1.48859-2.47807,2.22845q-4.70652,4.185-9.54671,8.22744-7.31376,6.097-14.93065,11.82865H395.2769q-13.99918-10.50938-26.96429-22.28454Z" transform="translate(-197.76356 -59.07674)" fill="#ccc"/>
                                <polygon points="514.774 688.412 346.303 688.412 349.868 671.476 511.208 671.476 514.774 688.412" fill="#2f2e41"/>
                                <path d="M864.95476,674.39534H821.11662a6.77113,6.77113,0,0,0-5.19677,2.40674,9.82887,9.82887,0,0,0-1.854-.17829,10.39795,10.39795,0,1,0,0,20.79589,10.28084,10.28084,0,0,0,4.52818-1.05182l.73094,8.98514,2.90591,35.51267a6.48256,6.48256,0,0,0,.55265,1.27467,6.83429,6.83429,0,0,0,5.999,3.56553H857.2889a6.85893,6.85893,0,0,0,6.00791-3.56553,7.02917,7.02917,0,0,0,.54373-1.27467l7.66591-57.60108A6.85442,6.85442,0,0,0,864.95476,674.39534Zm-50.88894,20.05608a7.42969,7.42969,0,0,1,0-14.85937c.13367,0,.25848.03569.39221.04461a6.80645,6.80645,0,0,0,.107,3.62793l3.13763,10.19741A7.30755,7.30755,0,0,1,814.06582,694.45142Z" transform="translate(-197.76356 -59.07674)" fill="#3f3d56"/>
                                <path d="M765.94008,485.93053H488.4352a9.0084,9.0084,0,0,0-8.99406,8.994V682.186a9.00266,9.00266,0,0,0,8.99406,8.994H765.94008a9.00266,9.00266,0,0,0,8.99406-8.994V494.92454A9.0084,9.0084,0,0,0,765.94008,485.93053Z" transform="translate(-197.76356 -59.07674)" fill="#3f3d56"/><path d="M658.43948,635.97676H593.52014a3.4638,3.4638,0,0,0-3.45856,3.46748V741.99769H661.907V639.44424A3.46567,3.46567,0,0,0,658.43948,635.97676Zm-32.24126,58.26961a7.70188,7.70188,0,0,1-7.66591-7.66586V674.75186a7.66589,7.66589,0,0,1,15.33177,0v11.82865a7.70176,7.70176,0,0,1-7.66586,7.66586Z" transform="translate(-197.76356 -59.07674)" fill="#2f2e41"/>
                                <path d="M589.83873,738.71741v9.89437a1.93827,1.93827,0,0,0,1.93434,1.93428h68.42246a1.944,1.944,0,0,0,1.93428-1.93428v-9.89437Z" transform="translate(-197.76356 -59.07674)" fill="#3f3d56"/>
                                <circle cx="562.27545" cy="616.77064" r="4.38092" fill="#2f2e41"/>
                                <path d="M523.46649,669.49274a1.53308,1.53308,0,0,0-1.5332,1.53315v7.88876a1.53318,1.53318,0,0,0,3.06635,0v-7.88876A1.533,1.533,0,0,0,523.46649,669.49274Z" transform="translate(-197.76356 -59.07674)" fill="#2f2e41"/>
                                <path d="M531.792,669.49274a1.53307,1.53307,0,0,0-1.53315,1.53315v7.88876a1.53318,1.53318,0,0,0,3.06636,0v-7.88876A1.53308,1.53308,0,0,0,531.792,669.49274Z" transform="translate(-197.76356 -59.07674)" fill="#2f2e41"/>
                                <path d="M540.11749,669.49274a1.53308,1.53308,0,0,0-1.5332,1.53315v7.88876a1.53318,1.53318,0,0,0,3.06635,0v-7.88876A1.533,1.533,0,0,0,540.11749,669.49274Z" transform="translate(-197.76356 -59.07674)" fill="#2f2e41"/>
                                <path d="M548.443,669.49274a1.53307,1.53307,0,0,0-1.53315,1.53315v7.88876a1.53318,1.53318,0,0,0,3.06635,0v-7.88876A1.53308,1.53308,0,0,0,548.443,669.49274Z" transform="translate(-197.76356 -59.07674)" fill="#2f2e41"/>
                                <circle cx="357.32206" cy="660.77906" r="23.17592" fill="#ffb8b8"/>
                                <circle cx="519.23077" cy="665.23596" r="23.17592" fill="#ffb8b8"/>
                                <path d="M956.21158,444.57229c-2.29019-3.78778-5.004-7.832-9.254-9.06882-4.9218-1.43231-9.97771,1.413-14.26629,4.22079a415.72177,415.72177,0,0,0-36.99652,27.25858l.01293.147c9.20246-.63462,16.8398,23.83462,26.04224,23.2,6.64877-.45851,15.09107-26.08411,20.96674-29.2294,2.22962-1.19351,4.403-2.78781,6.92955-2.89891,3.139-.138,5.876,2.05425,8.02685,4.34466,12.72322,13.54849,16.40507,34.26738,30.67924,46.17075A452.99913,452.99913,0,0,0,956.21158,444.57229Z" transform="translate(-197.76356 -59.07674)" fill="#3f3d56"/>
                                <path d="M980.7007,477.48019q10.06811,18.18425,21.35747,35.64635v.00892c-.04456.41005-.107.82011-.16937,1.23011q-1.36375-2.08583-2.70085-4.18951-10.135-15.89772-19.2628-32.4017-4.33211-7.8486-8.45028-15.822-3.18225-6.17727-6.23075-12.42586c-.57942-1.19442-1.141-2.3889-1.70252-3.59224-1.31928-2.8168-2.62066-5.65138-4.01121-8.43249-1.58669-3.17332-3.521-6.48928-6.43581-8.61964a8.78069,8.78069,0,0,0-4.57279-1.765,12.77118,12.77118,0,0,0-6.623,1.89865,213.14576,213.14576,0,0,0-41.92165,28.9075,218.44645,218.44645,0,0,0-34.05079,37.80352c-.30309.42785-1.01618.01779-.71309-.419,1.20334-1.6936,2.41561-3.36048,3.66357-5.01849a219.48392,219.48392,0,0,1,56.02331-52.25278q5.4419-3.52981,11.09771-6.72992c1.89865-1.07859,3.80622-2.13929,5.74942-3.13768a14.01982,14.01982,0,0,1,6.097-1.88973c7.39851-.11588,11.23144,8.26313,13.861,13.89666q1.23009,2.66078,2.50478,5.31266,4.8,10.028,9.97456,19.89559Q977.36686,471.46789,980.7007,477.48019Z" transform="translate(-197.76356 -59.07674)" fill="#3f3d56"/>
                                <path d="M899.24953,453.78486c-.42974-.47907-.85681-.95813-1.28935-1.43719-3.41092-3.77229-7.07087-7.50077-11.75483-9.66341a17.054,17.054,0,0,0-7.14492-1.65619,20.39007,20.39007,0,0,0-7.41853,1.61788c-1.11693.44621-2.20925.95264-3.285,1.49192-1.2292.61868-2.43649,1.27843-3.63815,1.94364q-3.38365,1.87245-6.67949,3.90915-6.55777,4.05288-12.7048,8.72443-3.18657,2.4227-6.2416,5.00417-2.84149,2.398-5.568,4.92477c-.3887.35861-.96909-.22174-.58038-.58035.47906-.44622.9636-.88969,1.44815-1.32769q2.05313-1.856,4.172-3.64089,3.86385-3.26037,7.9278-6.26888,6.31959-4.68114,13.07427-8.72717,3.37542-2.02026,6.84376-3.87083c.69814-.3723,1.40444-.73639,2.11889-1.08132a33.77784,33.77784,0,0,1,5.037-2.05039,17.91885,17.91885,0,0,1,7.60753-.74733,19.80629,19.80629,0,0,1,7.019,2.42816c4.599,2.57052,8.16587,6.54537,11.63707,10.42443C900.18039,453.596,899.60268,454.17906,899.24953,453.78486Z" transform="translate(-197.76356 -59.07674)" fill="#3f3d56"/>
                                <path d="M865.59554,471.93469a5.29671,5.29671,0,0,1-3.28523-.941c-2.54532-1.92814-2.47829-6.55914.20369-14.15852a15.98328,15.98328,0,0,1,8.6518-9.299,14.81054,14.81054,0,0,1,11.92832-.07094q.49358.21414.97321.46048h0a35.12828,35.12828,0,0,1,6.09952,4.32765,40.29836,40.29836,0,0,0,5.08018,3.75224l.59716.34994-.56582.39868C880.83868,466.91979,871.04915,471.93469,865.59554,471.93469Z" transform="translate(-197.76356 -59.07674)" fill="#3f3d56"/>
                                <path d="M921.12073,411.43776a20.506,20.506,0,0,1-20.114-16.53093,20.5022,20.5022,0,1,0,24.18308,16.12561A20.59223,20.59223,0,0,1,921.12073,411.43776Z" transform="translate(-197.76356 -59.07674)" fill="#3f3d56"/>
                                <circle cx="174.55363" cy="354.74762" r="30.59452" fill="#3f3d56" opacity="0.74"/>
                                <circle cx="205.14815" cy="354.74762" r="30.59452" fill="#f50057" opacity="0.74"/>
                                <circle cx="190.10968" cy="330.36402" r="30.59452" fill="#ff6584" opacity="0.74"/>
                                <rect x="387.66159" y="392.9762" width="82.37184" height="1.78276" transform="matrix(0.95403, -0.29972, 0.29972, 0.95403, -296.09811, 87.56435)" fill="#3f3d56"/>
                                <circle cx="270.61099" cy="322.16216" r="3.56553" fill="#3f3d56"/>
                                <path d="M978.54352,541.67752c5.22353,3.68141,10.242,7.43414,15.98246,10.26873-.107.43677-.22284.88246-.3298,1.31923-.70418-.32981-1.39056-.67746-2.07688-1.034-5.82075-3.04857-10.83031-7.19346-16.29449-10.79468a35.15678,35.15678,0,0,0-8.789-4.40342,28.99538,28.99538,0,0,0-10.04588-1.17663c-14.14623.6953-26.269,9.13666-39.41687,13.38857-6.43581,2.08585-13.28161,3.20008-19.99369,1.88972-6.71213-1.3103-12.67547-4.87583-18.60318-8.10263-5.84746-3.19116-12.22081-6.40011-19.04882-6.40011-5.56221.00887-11.40967,2.23732-14.38686,7.15777a.66761.66761,0,0,1-1.14992-.67746,14.03039,14.03039,0,0,1,2.43351-3.03959c3.88641-3.68141,9.60015-5.13437,14.8504-4.70652,6.79232.55265,12.98743,3.76166,18.86161,6.98845,6.2308,3.42288,12.61307,7.10429,19.81545,7.85307,7.11321.74873,14.15514-1.11422,20.75133-3.619,12.77352-4.858,25.37767-12.9518,39.58629-12.0515C967.39232,534.96539,973.13282,537.8713,978.54352,541.67752Z" transform="translate(-197.76356 -59.07674)" fill="#3f3d56"/>
                                <path d="M419.43332,283.881v1.80953a9.38751,9.38751,0,0,0-1.8184-.17829h-9.32387v20.02045a11.18437,11.18437,0,0,1-11.1779,11.17791H383.33237v3.0842a9.34116,9.34116,0,0,0,.722,3.60116h-1.90757a10.979,10.979,0,0,1-.59721-3.60116v-3.0842h-7.57674v-1.78276h7.57674V294.90741a11.18437,11.18437,0,0,1,11.17791-11.17791h13.78078v-3.11984h1.78276v3.11984h9.32387A11.125,11.125,0,0,1,419.43332,283.881Z" transform="translate(-197.76356 -59.07674)" fill="#f50057"/>
                                <path d="M397.11315,269.46739H372.22573a11.18437,11.18437,0,0,0-11.1779,11.17791v24.88741a11.18437,11.18437,0,0,0,11.1779,11.17791h24.88742a11.18437,11.18437,0,0,0,11.1779-11.17791v-24.923A11.18257,11.18257,0,0,0,397.11315,269.46739Zm9.39514,36.06532a9.40781,9.40781,0,0,1-9.39514,9.39515H372.22573a9.40781,9.40781,0,0,1-9.39514-9.39515V280.6453a9.4078,9.4078,0,0,1,9.39514-9.39514h24.88742a9.4061,9.4061,0,0,1,9.39514,9.3595Z" transform="translate(-197.76356 -59.07674)" fill="#3f3d56"/>
                                <path d="M381.5496,314.92786v1.78276h1.78277v-1.78276Zm0,0v1.78276h1.78277v-1.78276ZM419.43332,283.881a11.125,11.125,0,0,0-1.8184-.15152H392.72751a11.18437,11.18437,0,0,0-11.17791,11.17791v24.88741a10.979,10.979,0,0,0,.59721,3.60116,11.18194,11.18194,0,0,0,10.5807,7.57674h24.88741a11.18437,11.18437,0,0,0,11.17791-11.1779V294.90741A11.17845,11.17845,0,0,0,419.43332,283.881Zm7.57675,35.9138a9.40781,9.40781,0,0,1-9.39515,9.39514H392.72751a9.40854,9.40854,0,0,1-9.39514-9.39514V294.90741a9.4078,9.4078,0,0,1,9.39514-9.39515h24.88741a9.39873,9.39873,0,0,1,9.39515,9.39515Zm-45.46047-4.867v1.78276h1.78277v-1.78276Z" transform="translate(-197.76356 -59.07674)" fill="#3f3d56"/>
                                <path d="M363.94482,547.30213H258.227a2.7828,2.7828,0,0,0-2.78111,2.77218v6.26644a375.13957,375.13957,0,0,0,12.64871,39.408h95.85024a2.76941,2.76941,0,0,0,2.77218-2.77218V550.07431A2.77516,2.77516,0,0,0,363.94482,547.30213Z" transform="translate(-197.76356 -59.07674)" fill="#f50057"/>
                                <path d="M353.87222,609.66321H273.737c.95378,2.23737,1.92541,4.45691,2.93268,6.66752h77.20255C358.22216,616.39313,358.1776,609.6008,353.87222,609.66321Z" transform="translate(-197.76356 -59.07674)" fill="#e4e4e4"/>
                                <path d="M353.87222,624.94145H280.68981q1.60441,3.35605,3.29806,6.66757h69.88435C358.22216,631.67142,358.1776,624.888,353.87222,624.94145Z" transform="translate(-197.76356 -59.07674)" fill="#e4e4e4"/>
                                <path d="M353.87222,640.22866H288.4894c1.19442,2.23738,2.42453,4.45691,3.67248,6.66752h61.71034C358.22216,646.95858,358.1776,640.16626,353.87222,640.22866Z" transform="translate(-197.76356 -59.07674)" fill="#e4e4e4"/>
                                <path d="M901.93959,229.3327h-.50793a10.2063,10.2063,0,0,1,4.55441,1.07712h-2.31159a9.4054,9.4054,0,0,0-9.39476,9.39476v24.88818a9.4054,9.4054,0,0,0,9.39476,9.39476h1.47363a10.21587,10.21587,0,0,1-3.71645.70564h.50793A10.298,10.298,0,0,0,912.22574,264.507V239.61884A10.298,10.298,0,0,0,901.93959,229.3327Z" transform="translate(-197.76356 -59.07674)" fill="#3f3d56"/>
                                <path d="M901.93959,229.3327h-.50793a10.2063,10.2063,0,0,1,4.55441,1.07712h-2.31159a9.4054,9.4054,0,0,0-9.39476,9.39476v24.88818a9.4054,9.4054,0,0,0,9.39476,9.39476h1.47363a10.21587,10.21587,0,0,1-3.71645.70564h.50793A10.298,10.298,0,0,0,912.22574,264.507V239.61884A10.298,10.298,0,0,0,901.93959,229.3327Z" transform="translate(-197.76356 -59.07674)" opacity="0.21"/>
                                <path d="M835.97735,229.3327h-.50793a10.2063,10.2063,0,0,1,4.55441,1.07712h-2.31159a9.40541,9.40541,0,0,0-9.39476,9.39476v24.88818a9.40541,9.40541,0,0,0,9.39476,9.39476h1.47363a10.21587,10.21587,0,0,1-3.71645.70564h.50793A10.298,10.298,0,0,0,846.2635,264.507V239.61884A10.298,10.298,0,0,0,835.97735,229.3327Z" transform="translate(-197.76356 -59.07674)" fill="#f50057"/>
                                <path d="M835.97735,229.3327h-.50793a10.2063,10.2063,0,0,1,4.55441,1.07712h-2.31159a9.40541,9.40541,0,0,0-9.39476,9.39476v24.88818a9.40541,9.40541,0,0,0,9.39476,9.39476h1.47363a10.21587,10.21587,0,0,1-3.71645.70564h.50793A10.298,10.298,0,0,0,846.2635,264.507V239.61884A10.298,10.298,0,0,0,835.97735,229.3327Z" transform="translate(-197.76356 -59.07674)" opacity="0.21"/>
                                <path d="M837.8118,274.165a9.4054,9.4054,0,0,1-9.39476-9.39476V239.88205a9.40541,9.40541,0,0,1,9.39476-9.39476h2.31159a10.20645,10.20645,0,0,0-4.5544-1.07712H810.68081a10.298,10.298,0,0,0-10.28614,10.28614v24.88818a10.29794,10.29794,0,0,0,10.28614,10.28614H835.569a10.21578,10.21578,0,0,0,3.71644-.70564Z" transform="translate(-197.76356 -59.07674)" fill="#f50057"
                                <path d="M903.774,274.165a9.4054,9.4054,0,0,1-9.39476-9.39476V239.88205a9.40541,9.40541,0,0,1,9.39476-9.39476h2.31159a10.20646,10.20646,0,0,0-4.55441-1.07712H876.64305a10.298,10.298,0,0,0-10.28614,10.28614v24.88818a10.29794,10.29794,0,0,0,10.28614,10.28614h24.88817a10.21579,10.21579,0,0,0,3.71645-.70564Z" transform="translate(-197.76356 -59.07674)" fill="#3f3d56"/>
                                <path d="M933.1633,235.60381a380.7001,380.7001,0,0,1,25.02109,39.26535H942.603a10.30182,10.30182,0,0,1-10.28652-10.28652V239.69523A10.2748,10.2748,0,0,1,933.1633,235.60381Z" transform="translate(-197.76356 -59.07674)" fill="#ff6584"/>
                                <path d="M901.92039,287.92793l-8.71774-13.05877-6.37335-9.54671a3.54624,3.54624,0,0,0-6.33776.91815l-2.68307,8.62856-5.40177,17.33739a3.55312,3.55312,0,0,0,5.25917,4.07362l1.9165-1.18556a2.66123,2.66123,0,0,1,4.04685,2.02346l1.756,19.1647a3.55839,3.55839,0,0,0,3.52989,3.2268c.107,0,.21392-.00892.3298-.01784l2.692-.2407a3.54466,3.54466,0,0,0,3.209-3.85964l-1.80948-19.78868a2.65748,2.65748,0,0,1,3.7616-2.6563l.39221.17823a3.54715,3.54715,0,0,0,4.4302-5.19671Z" transform="translate(-197.76356 -59.07674)" fill="#ccc"/>
                        </svg>
                    </div>
                </div>
    `
})