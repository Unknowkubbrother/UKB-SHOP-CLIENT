<template>
  <div class="cart fixed bottom-5 right-10">
            <button @click="NextToCart" class="flex justify-center items-center bg-[#3d7fa1] text-white rounded-full w-[60px] h-[60px] cursor-pointer">
            <i class="fa-solid fa-shopping-cart text-2xl"></i>
            </button>
            <div class="product-count bg-red-500 text-white rounded-full w-5 h-5 flex justify-center items-center absolute -top-1 -left-2 text-sm">
            {{ count }}
            </div>
        </div>
</template>

<script>
import { toast } from 'vue3-toastify';
export default {
    name: "ButtonCart",
    data() {
        return {
            store: [],
            count: 0
        };
    },
    mounted(){
        this.store = JSON.parse(localStorage.getItem('cart')) || [];
        this.count = this.store.length;
    },
    methods: {
        addToCart(data){
            this.store.push(data);
            this.count = this.store.length;
            localStorage.setItem('cart', JSON.stringify(this.store));
        },
        NextToCart(){
            if(this.$cookies.get('logged_in')){
                this.$router.push('/cart');
            }else{
                toast('กรุณาเข้าสู่ระบบก่อน', {
                    "theme": "dark",
                    "type": "error",
                    "position": "top-center",
                    "pauseOnHover": false,
                    "dangerouslyHTMLString": true
                });
                setTimeout(() => {
                    this.$router.push('/login');
                }, 3000);
            }
        }
    }
};
</script>

<style>

</style>