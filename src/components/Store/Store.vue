<template>
    <div id="store" class="relative">
        <div class="w-[80%] h-full m-auto">
            <div class="flex justify-start items-center my-10">
                <h1 class="font-bold text-2xl">SCRIPT STORE</h1>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <!-- <---->
                <div v-for="(data, idx) in script.data" :key="idx">
                    <div @click="NextStoreChildern(data.id)"
                        class="w-[90%] h-[300px] rounded-lg overflow-hidden bg-[#262626] flex hover:bg-[#363636] hover:w-[92%] hover:h-[310px] duration-300 cursor-pointer" v-if="data.status == 'active'">
                        <img :src="data.promote.image[0]" class="w-[40%] h-full object-cover rounded-lg drop-shadow-lg">
                        <div class="w-[60%] h-full flex flex-col p-5 justify-between">
                            <div>
                                <h1 class="text-xl font-semibold">{{ data.nameScript }}</h1>
                                <p class="text-[13px] text-[#d8d8d8] my-2">{{ data.description }}</p>
                            </div>
                            <div>
                                <div v-if="data.trade.permanently.status">
                                    <span class="font-semibold">{{ data.trade.permanently.price }} Baht – <span
                                            class="text-[#3d7fa1]">PERMANENTLY</span></span>
                                </div>
                                <div v-if="data.trade.rent.status">
                                    <span class="font-semibold">{{ data.trade.rent.Unitprice }} Baht – <span
                                            class="text-[#3da19c]">RENT PER DAY</span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- <---->

            </div>

        </div>
        <ButtonCart />

    </div>
</template>

<script>
import axios from 'axios';
import { config } from '../../config';
import ButtonCart from './ButtonCart.vue';
export default {
    name: "Store",
    components: {
        ButtonCart
    },
    data() {
        return {
            script: {
                data: []
            }
        };
    },
    methods: {
        async getScript() {
            const api = `${config.EndPoint}/script`;
            await axios.get(api).then((res) => {
                res.data.map((data) => {
                    this.script.data.push(data);
                });
            }).catch((err) => {
                console.log(err);
            });
        },
        NextStoreChildern(id) {
            this.$router.push(`/store/${id}`);
        }
    },
    mounted() {
        this.getScript();
    },
    created() {
        document.title = "Store | CodeKub Shop";
    }

}
</script>

<style></style>