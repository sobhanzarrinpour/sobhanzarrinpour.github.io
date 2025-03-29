/* ZarrinSoft */
                
// const api_url = 'https://gorest.co.in';

// const api_list = [
//     {method: 'POST' , path: '/public/v2/users' , Description: 'Create a new user'},
//     {method: 'GET' , path: '/public/v2/posts/$' , Description: 'Get Post with post id'},
//     {method: 'GET' , path: '/public/v2/posts/' , Description: 'Get All posts'}
// ];


// const api_url = 'http://127.0.0.1:8000/api';



// const api_url = 'https://reqres.in/api';
// const api_list = [
//     {id: 'get_roducts', method: 'GET'  , path: '/users'  , Description: 'Get All posts'},
//     {id: 'get_roduct', method: 'GET'  , path: '/users/$' , Description: 'Get One product with productID'},
//     {id: 'login', method: 'POST' , path: '/users'        , Description: 'Get One product with productID', body:{"username": "sobhan", "password": "123"}},
//     {id: 'update', method: 'PUT' , path: '/users/$'      , Description: 'Get One product with productID', body:{"username": "sobhan", "password": "123"}},
//     {id: 'delete', method: 'DELETE' , path: '/users/$'   , Description: 'Get One product with productID', body:{"username": "sobhan", "password": "123"}}
// ];


const api_url = 'https://api.restful-api.dev/';

const api_list = [
    {id: 'get_roducts', method: 'GET'  , path: 'objects'  , Description: 'Get All posts'},
    {id: 'get_roduct', method: 'GET'  , path: 'objects?$' , Description: 'Get One product with productID'},
    {id: 'login', method: 'POST' , path: 'objects'        , Description: 'Get One product with productID', body:{"username": "sobhan", "password": "123"}},
    {id: 'update', method: 'PUT' , path: 'objects/$'        , Description: 'Get One product with productID', body:{"username": "sobhan", "password": "123"}},
    {id: 'delete', method: 'DELETE' , path: 'objects/$'        , Description: 'Get One product with productID', body:{"username": "sobhan", "password": "123"}}
];
                
class API{

    GET_DATA = function(path , params = null, header = null, body = null){
        return new Promise((res , rev) => {
            let api = JSON.parse(JSON.stringify(api_list.filter(e => e.path == path && e.method == 'GET')[0]));    
            this.#Fetch(api, params, header , body).then(result => res(result));
        })
    }
    
    POST_DATA = function(path , params = null, header = null, body = null){
        return new Promise((res , rev) => {
            let api = JSON.parse(JSON.stringify(api_list.filter(e => e.path == path && e.method == 'POST')[0]));    
            this.#Fetch(api, params, header , body).then(result => res(result));
        })
    }
    
    PUT_DATA = function(path , params = null, header = null, body = null){
        return new Promise((res , rev) => {
            let api = JSON.parse(JSON.stringify(api_list.filter(e => e.path == path && e.method == 'PUT')[0]));    
            this.#Fetch(api, params, header , body).then(result => res(result));
        })
    }
    
    DELETE_DATA = function(path , params = null, header = null, body = null){
        return new Promise((res , rev) => {
            let api = JSON.parse(JSON.stringify(api_list.filter(e => e.path == path && e.method == 'DELETE')[0]));                
            this.#Fetch(api, params, header , body).then(result => res(result));
        })
    }
    
    #Fetch = function(api, params, header , body){
        return new Promise((res , rej) => {
            if (params != null){
                let p = '';
                if (typeof(params) == 'object'){
                    Object.keys(params).forEach(key => {
                        p += `${key}=${params[key]}&`
                    });
                    p = p.substring(0, p.length - 1)
                }else
                    p = params
                api['path'] = api['path'].replace('$',p)
            }else
                api['path'] = api['path'].replace('$','')
            let fetchParams = {method: api.method};
            if(header != null)
                fetchParams.header = header;
            if(body != null)
                fetchParams.body = body;
            fetch(api_url + api.path , fetchParams)
            .then( j => j.json())
            .then( data => res(data))
        })
    }
}
                
const data_object = {
    data: {
        pages: [
            {
                page_id: 1001,
                page_title: 'MATLAB',
                page_html: `<div> this is matlab content </div>`,
                mian_image: './assets/media/laser4.jpg',

            }
        ]
    },
    metadata: {}
}
                

                
class WindowState {
    #refreshTime = 1800; // 3600 Second == 1 Hour
    // #state_controller = new StateController();
    #sessionStorageType = new SessionStorage()
    #time;
    #utils = new Utils();
    constructor(){
        this.#time = this.#utils.getCurrentTime()
        this.#refreshTime *= 1000; // current time is in unix timestamp in milisecond, so second must convert to milisecond

        this.rafresh_token()
    }

    api_call(currentPage , url , method , header , body){

    }

    api_track(currentPage , url , activeIndex){

    }

    rafresh_token(currentPage, url, activeIndex){
        let currentToken = Math.floor(this.#time / this.#refreshTime);
        if(currentToken <= storage.get('sessionToken')){
            currentToken = Math.floor((this.#time + this.#refreshTime) / this.#refreshTime);
            storage.store('sessionToken', currentToken);
            go_to_url_(storage.get('active_url'),storage.get('active_index'));
        }else{
            this.clear_window_state(currentToken);
        }
    }

    clear_window_state(currentToken){
        storage.resetAll();
        storage.store('sessionToken', currentToken);
        go_to_url_('/',0);
    }
}
                
class SessionStorage {
    #storageType = 'session';
    storage(){return this.#storageType}
}
class GlobalStorage {
    #storageType = 'global';
    storage(){return this.#storageType}
}
class StateController{
    
    #SessionStorage = new SessionStorage();
    #GlobalStorage = new GlobalStorage();

    store(field, value, storageType = this.#SessionStorage.storage()){
        if(storageType == this.#SessionStorage.storage()){
            if (typeof(value) == Object)
                sessionStorage.setItem(field, JSON.stringify(value));
            else
                sessionStorage.setItem(field, value);
        }else if(storageType == this.#GlobalStorage.storage()){
            if (typeof(value) == Object)
                localStorage.setItem(field, JSON.stringify(value));
            else
                localStorage.setItem(field, value);
        }
    }

    converter(value){
        if(value == 'null')
            return null;
        else if(isNaN(Number(value)) != true)
            return Number(value);
        else if(value == 'false')
            return false;
        else if(value == 'true')
            return true;
        else 
            return value.toString();
    }

    toArray(value, separator = ','){
            return value.split(separator);
    }

    get(field , storageType){
        let c1 = this.converter(sessionStorage.getItem(field));
        let c2 = this.converter(localStorage.getItem(field));

        if(storageType){
            if(storageType != null && (storageType == this.#SessionStorage.storage() || storageType == this.#GlobalStorage.storage())){
                if(storageType == this.#SessionStorage.storage())
                    return c1;
                else if(storageType == this.#GlobalStorage.storage())
                    return c2;
                else    
                    return null;
                
            }else{
                if (c1 != null && c1 !== undefined)
                    return c1;
                else if (c2 != null && c2 !== undefined)
                    return c2;
                else
                    return null;
            }
        }else{
            if (c1 != null && c1 !== undefined)
                return c1;
            else if (c2 != null && c2 !== undefined)
                return c2;
            else
                return null;
        }
    }

    exists(field , storageType = this.#SessionStorage.storage()){
        if(storageType == this.#SessionStorage.storage()){
            let d = sessionStorage.getItem(field);
            if (d != null && d != undefined)
                return true;
            else
                return false
        }else if(storageType == this.#GlobalStorage.storage()){
            let d = localStorage.getItem(field);
            if (d != null && d != undefined)
                return true;
            else
                return false
        } else{
            return false;
        }
    }

    storageType(field){
        let c1 = sessionStorage.getItem(field);
        let c2 = localStorage.getItem(field);
        if(c1 != null && c1 != undefined)
            return this.#SessionStorage.storage();
        else if(c2 != null && c2 != undefined)
            return this.#GlobalStorage.storage();
        else    
            return null;
    }

    async rename(field , newField){
        let c1 = await sessionStorage.getItem(field);
        let c2 = await localStorage.getItem(field);

        if (c1 != null && c1 !== undefined){
            await sessionStorage.setItem(newField , c1);
            await sessionStorage.removeItem(field);
        }
        else if (c2 != null && c2 !== undefined){
            await localStorage.setItem(newField , c2);
            await localStorage.removeItem(field);
        }
    }

    async copy(field , newField, storageType){
        let c1 = await sessionStorage.getItem(field);
        let c2 = await localStorage.getItem(field);
        if(storageType == null || storageType == undefined){
            if (c1 != null && c1 !== undefined){
                await sessionStorage.setItem(newField , c1);
            }
            else if (c2 != null && c2 !== undefined){
                await localStorage.setItem(newField , c2);
            }
        }else{
            if (c1 != null && c1 !== undefined){
                if (storageType == this.#SessionStorage.storage())
                    await sessionStorage.setItem(newField , c1);
                else
                    await localStorage.setItem(newField , c1);
            }
            else if (c2 != null && c2 !== undefined){
                if (storageType == this.#SessionStorage.storage())
                    await sessionStorage.setItem(newField , c2);
                else
                    await localStorage.setItem(newField , c2);
            }
        }
    }

    remove(field , storageType = this.#SessionStorage.storage()){
        if (storageType == this.#SessionStorage.storage())
            sessionStorage.removeItem(field);
        else
            localStorage.removeItem(field);
    }

    chain(field , value , chain_name , storageType = this.#SessionStorage.storage()){
        return new Promise((res , rej) => {
            this.store(field , value , storageType);
            chain_name = (chain_name != null && chain_name != undefined) ? chain_name : field + "_chain";
            if (this.exists(chain_name, storageType)){
                let h = [this.get(chain_name, storageType).split(',') , field];
                this.store(chain_name , h , storageType);
                if (Number(this.get(chain_name + "_active_index_default" , storageType)) == Number(this.get(chain_name + "_active_index" , storageType))){
                    this.store(chain_name + "_active_index_default" , h.length - 1 , storageType);
                    this.store(chain_name + "_active_index" , h.length - 1 , storageType);
                }else{
                    this.store(chain_name + "_active_index_default" , h.length - 1 , storageType);
                }
            }else{
                this.store(chain_name , [field] , storageType);
                this.store(chain_name + "_active_index_default" , 0 , storageType);
                this.store(chain_name + "_active_index" , 0 , storageType);
            }
            res(true);
        })
    }

    retriveChainValue(chain_name , storageType = this.#SessionStorage.storage()){
        return new Promise((res , rej) => {
            let result = [];
            let chain = this.get(chain_name , storageType);
            try{
                chain.split(',').forEach(field => {
                    result.push({field: field , value: this.get(field, storageType)});
                });
            }
            catch(e){
                result = null // {field: null , value: null}
            }
            res(result);
        });
    }

    popFromChain(chain_name , storageType = this.#SessionStorage.storage()){
        return new Promise((res , rej) => {
            this.retriveChainValue(chain_name , storageType)
            .then(h => {
                if (h != null && h != undefined && h != []){
                    let lastIndex = h.length - 1;
                    this.remove(h[lastIndex] , storageType);
                    h.pop();
                    if(h.length > 0)
                        this.store( chain_name , h.map(a => a.field));
                    else
                        this.remove(chain_name, storageType);
                    res(true);
                }else
                    this.remove(chain_name, storageType);
            })
        })
    }

    setActiveIndex(chain_name, activeIndex = 0, storageType = this.#SessionStorage.storage()){
        activeIndex = Number(activeIndex);
        if(isNaN(activeIndex) == true) 
            console.error("Invalide Index.");

        return new Promise((res , rej) => {
            this.retriveChainValue(chain_name , storageType)
            .then(h => {
                let lastIndex = h.length - 1;
                this.store(chain_name + "_active_index" , Math.min(Math.max(activeIndex , 0) , lastIndex) , storageType);
                res(true);
            })
        })
    }

    reset(storageType = this.#SessionStorage.storage()){
        if (storageType == this.#SessionStorage.storage())
            sessionStorage.clear();
        else
            localStorage.clear();
    }

    resetAll(){
        sessionStorage.clear();
        localStorage.clear();
    }

    scheduleReset(timer){
        if(this.get('current_time') == null || this.get('current_time') == undefined){
            this.timerReset();
        }
        if(timer != null && timer != undefined){
            this.store('reset_timer' , timer);
        }
        this.scheduleResetApply();
    }

    scheduleResetApply(){
        if(this.hasScheduledReset() == true){
            if(this.get('current_time') + this.get('reset_timer') >= Date.now()){
                this.resetAll();
            }
        }else{
            this.scheduleReset(3600);
        }
    }

    hasScheduledReset(){
        if(this.get('current_time') != null && this.get('current_time') != undefined && this.get('reset_timer') != null && this.get('reset_timer') != undefined)
            return true;
        else
            return false;
    }

    timerReset(){
        this.store('current_time',Date.now());
    }

    getChainActiveIndex(chain_name, storageType = this.#SessionStorage.storage()){
        return new Promise(async (res , rej) => {
            let activeIndex = await Number(this.get(chain_name + "_active_index" , storageType));
            this.retriveChainValue(chain_name , storageType)
            .then(h => {
                try{
                    res(this.get(h[activeIndex].field , storageType));
                }catch(e){
                    res(null);
                }
            })
        })
    }
}
                
class Utils{
    constructor(){}

    getCurrentTime(){ 
        if (!Date.now) {
            Date.now = function() { return new Date().getTime(); }
        }
        return Date.now();
    }
}