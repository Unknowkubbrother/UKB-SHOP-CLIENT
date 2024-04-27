<template>
    <div class="cart fixed bottom-5 right-10">
        <button @click="NextToCart"
            class="flex justify-center items-center bg-[#3d7fa1] text-white rounded-full w-[60px] h-[60px] cursor-pointer">
            <i class="fa-solid fa-shopping-cart text-2xl"></i>
        </button>
        <div
            class="product-count bg-red-500 text-white rounded-full w-5 h-5 flex justify-center items-center absolute -top-1 -left-2 text-sm">
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
    mounted() {
        if (localStorage.getItem('cart')) {
            try {
                const decryptedData = this.$CryptoJS.AES.decrypt(localStorage.getItem('cart'), 'ukb-developer').toString(this.$CryptoJS.enc.Utf8);
                this.store = JSON.parse(decryptedData) || [];
            } catch (err) {
                console.log(err)
                this.store = []
                const encryptedData = this.$CryptoJS.AES.encrypt(JSON.stringify([]), 'ukb-developer').toString();
                localStorage.setItem('cart', encryptedData);
            }
        } else {
            this.store = []
        }
        this.count = this.store.length;
    },
    methods: {
        addToCart(data) {
            this.store.push(data);
            this.count = this.store.length;
            const encryptedData = this.$CryptoJS.AES.encrypt(JSON.stringify(this.store), 'ukb-developer').toString();
            localStorage.setItem('cart', encryptedData);
        },
        NextToCart() {
            if (this.$cookies.get('logged_in')) {
                this.$router.push('/cart');
            } else {
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

<style></style>