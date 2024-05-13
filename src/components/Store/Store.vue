<template>
    <div id="store" class="relative">
        <div class="w-[90%] xl:w-[80%] h-full m-auto">
            <div class="flex justify-start items-center my-10">
                <h1 class="font-bold text-2xl">RESOURCE STORE</h1>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-4 my-10" v-if="script.data.length">
                <!-- <---->
                <div v-for="(data, idx) in script.data" :key="idx">
                    <div @click="NextStoreChildern(data.id)"
                        class="w-[90%] xl:w-[90%] md:w-[80%] xl:h-[300px] rounded-lg overflow-hidden bg-[#262626] flex flex-col xl:flex-row hover:bg-[#363636] hover:scale-105 duration-300 cursor-pointer m-auto">
                        <img :src="data.thumbnail" class="w-full xl:w-[40%] h-[300px] xl:h-full object-cover rounded-lg drop-shadow-lg">
                        <div class="w-full xl:w-[60%] xl:h-full flex flex-col p-5 justify-between">
                            <div>
                                <h1 class="text-xl font-semibold">{{ data.nameScript }}</h1>
                                <p class="text-md xl:text-[13px] text-[#d8d8d8] my-2">{{ data.shortDescription }}</p>
                            </div>
                            <div>
                                <div v-if="data.plan.day">
                                    <span class="font-semibold">{{ data.plan.day }} Baht – <span
                                            class="text-[#3d7fa1]">DAY</span></span>
                                </div>
                                <div v-if="data.plan.monthly">
                                    <span class="font-semibold">{{ data.plan.monthly }} Baht – <span
                                            class="text-[#3d7fa1]">MONTH</span></span>
                                </div>
                                <div v-if="data.plan.permanently">
                                    <span class="font-semibold">{{ data.plan.permanently }} Baht – <span
                                            class="text-[#3d7fa1]">PERMANENTLY</span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- <---->
                
                

            </div>

            <div v-else class="w-full h-[300px] flex justify-center items-center">
                    <div class="text-[#3d7fa1] text-2xl">Resource not found . . .</div>
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
            const api = `${config.EndPoint}/store`;
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