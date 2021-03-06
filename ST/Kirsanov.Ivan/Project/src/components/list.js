import { CatalogItem, BasketItem } from './items.js';

let classes = {
    'Catalog' : CatalogItem,
    'Basket' : BasketItem
}

export default class List {
    constructor(container, url){
        this.items = [];
        this.container = document.querySelector(container);
        this.url = url;
        this._init();
    }
    _init() {
        let url = 'https://raw.githubusercontent.com/kellolo/static/master/JSON' + this.url;
        this._get(url)
            .then(data => {
                this.items = this.basket ? data : data.content;
            })
            .finally(() => {
                this._render();
                this._handleActions();
            })
    }
           
    _get(url) {
        return fetch(url).then(d => d.json());
    }

    _render() {
        let htmlStr = '';
        this.items.forEach(item => {
            htmlStr += new classes[this.constructor.name](item).render(); 
        });
        if(this.constructor.name == 'Basket'){
            this.containerItems.innerHTML = htmlStr;
        } else {
            this.container.innerHTML = htmlStr;
        }
    }
}