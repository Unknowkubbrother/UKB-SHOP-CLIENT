<template>
    <div id="Order">
        <div class="w-[60%] h-full m-auto pb-[5rem]">
            <div class="flex justify-start items-center my-10">
                <h1 class="font-bold text-2xl">ORDERS</h1>
            </div>
            <div class="w-full h-full" v-if="orders.length">
                <Accordion :accordion_data="orders" />
            </div>
            <div v-else class="w-full h-[300px] flex justify-center items-center">
                    <div class="text-[#3d7fa1] text-2xl">You do not own any orders. . .</div>
            </div>
        </div>
    </div>
</template>

<script>
import { config } from '../../config'
import axios from 'axios';
import Accordion from './Accordion.vue';
export default {
    name: "Order",
    components: {
        Accordion
    },
    data() {
        return {
            orders: [],
        };
    },
    methods: {
        getOrders() {
            const api = `${config.EndPoint}/payment/user`
            axios.get(api, { withCredentials: true })
                .then((response) => {
                    this.orders = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    },
    mounted() {
        this.getOrders();
    },
    created() {
        document.title = "Order | CodeKub Shop";
    }
}
</script>

<style></style>