import './index.css'
import 'photoswipe/style.css';
import Alpine from 'alpinejs'
window.Alpine = Alpine
import '@splidejs/splide/dist/css/splide.min.css';
import Splide from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';

window.Splide = Splide;
window.AutoScroll = AutoScroll;
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import PhotoSwipe from 'photoswipe';
window.PhotoSwipeLightbox = PhotoSwipeLightbox
window.PhotoSwipe = PhotoSwipe

async function start_video_until_it_is_really_started_recursivly(video) {
    if (video && video.paused) {
        await video.play();
        setTimeout(function() {
            start_video_until_it_is_really_started_recursivly(video);
        }, 1500);
    }
}

document.addEventListener('alpine:init', () => {
    Alpine.store('cart', {
        count: 0,
        products: [],
        subtotal: 0,
        currency: '',
        init() {
            this.update();
        },
        update() {
            zid.store.cart.fetch().then((response) => {
                if (response.data.cart.products_count == 0) {
                    return;                    
                }
                this.count = response.data.cart.products_count;
                this.products = response.data.cart.products;
                this.subtotal = response.data.cart.products_subtotal;
                this.currency = response.data.cart.currency.cart_currency.code;
            });
        },
    })
    
    Alpine.store('all_products', {
      products: [],
      async init() {
        let page = 1;
        let perPage= 100;
        while (true) {
            const response = await window.zid.store.product.fetchAll(null, {page, per_page: perPage});
            this.products = this.products.concat(response.data.products.data);
            if (this.products.length >= response.data.products.total) {
              break;
            }
            page++;
        }
      },
      getProductBySku(sku) {
        return this.products.find(product => product.sku === sku);
      }
    })
});

Alpine.start()