<template>
    <div id="Order">
        <div class="w-[60%] h-full m-auto pb-[5rem]">
            <div class="flex justify-start items-center my-10">
                <h1 class="font-bold text-2xl">ORDERS</h1>
            </div>
            <TabGroup>
                <TabList class="flex space-x-1 rounded-xl bg-base-100 p-1">
                    <Tab as="template" v-slot="{ selected }">
                        <button dir="ltr" :class="[
                            'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                            'focus:outline-none',
                            selected
                                ? 'border-b-4 border-b-green-400 text-white shadow'
                                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                        ]">
                            <span class="text-sm font-semibold"> <i :class="[
                                'fa-solid fa-circle-check mr-2',
                                selected
                                    ? 'text-green-400'
                                    : 'text-white',
                            ]"></i>COMPLETED</span>
                        </button>
                    </Tab>
                    <Tab as="template" v-slot="{ selected }">
                        <button dir="ltr" :class="[
                            'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                            'focus:outline-none',
                            selected
                                ? 'border-b-4 border-b-green-400 text-white shadow'
                                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                        ]">
                            <span class="text-sm font-semibold"> <i :class="[
                                'fa-solid fa-circle-check mr-2',
                                selected
                                    ? 'text-green-400'
                                    : 'text-white',
                            ]"></i>COMPLETED</span>
                        </button>
                    </Tab>
                </TabList>

                <TabPanels class="mt-2">
                    <TabPanel class="rounded-xl bg-[#262626] p-3 overflow-auto">
                        <div class="w-full h-full">
                             <Accordion :accordion_data="orders" />   
                        </div>
                    </TabPanel>
                    <TabPanel class="rounded-xl bg-[#262626] p-3">

                        test2

                    </TabPanel>
                </TabPanels>
            </TabGroup>
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
            const api = `${config.EndPoint}/payment`
            axios.get(api, { withCredentials: true })
                .then((response) => {
                    this.orders = response.data;
                    console.log(this.orders);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    },
    mounted() {
        this.getOrders();
    }
}
</script>

<style></style>