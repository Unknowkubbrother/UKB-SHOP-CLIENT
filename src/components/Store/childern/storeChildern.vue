<template>
    <div id="storeChildern" class="relative">
        <div class="lg:w-[50%] min-[430px]:w-[70%] h-full m-auto my-10">
            <div class="flex justify-between items-center mb-20">
                <router-link to="/store"
                    class="back text-center flex justify-center items-center bg-[#262626] px-3 py-2 rounded-lg overflow-hidden duration-300 hover:bg-[#5e5e5e]"><i
                        class="fa-solid fa-arrow-left text-xl mr-2"></i>Back</router-link>
                <div class="text-xl font-semibold">{{ store.nameScript }}</div>
            </div>
            <div
                class="w-[80%] h-[400px] flex justify-center items-center mt-5 bg-[#262626] m-auto rounded-xl overflow-hidden border-[10px] border-[#444444] drop-shadow-xl z-50">
                <div class="w-full h-full rounded-xl overflow-hidden">
                    <YoutubeVue3 ref="youtube" :videoid="store.video" width="100%" height="100%" :controls="1" />
                </div>
            </div>
            <div class="image w-[70%] bg-[#262626] px-5 py-5 rounded-xl m-auto mt-[-5px]">
                <Carousel :items-to-show="2.5" :wrap-around="true">
                    <Slide v-for="(slide, idx) in img" :key="idx" class="h-[200px]">
                        <img :src="slide" :alt="idx"
                            class="w-full h-full object-cover p-2 rounded-xl overflow-hidden z-50">
                    </Slide>

                    <template #addons>
                        <Navigation />
                    </template>
                </Carousel>
            </div>

            <div class="text w-full my-10 bg-[#262626] rounded-2xl text-center p-10">
                <p>
                    {{ store.description }}
                </p>
            </div>

            <div class="flex flex-col justify-center items-start my-10">
                <h1 class="text-lg mb-2">Changelogs</h1>
                <div class="w-full h-[250px] bg-[#262626] rounded-2xl text-center p-3 overflow-auto">
                    <div class="flex justify-center items-center flex-col gap-2">
                        <!--  -->
                        <div class="w-full m-auto bg-[#222] rounded-xl flex" v-for="(data, id) in store.Changelogs"
                            :key="id">
                            <div class="version flex justify-start items-center m-2">VERSION<span
                                    class="ml-2">{{ data.version }}</span>
                            </div>

                            <div class="w-[80%] text m-2 pl-5 border-l-2 border-[#ffffff] text-start">
                                {{ data.description }}
                            </div>
                        </div>
                        <!--  -->

                    </div>
                </div>
            </div>

            <div class="w-full my-10 bg-[#262626] rounded-2xl text-center p-10">
                <div class="flex justify-between items-center w-full m-auto">
                    <div class="flex gap-4">
                        <span>SELECT PLAN</span>
                        <div class="flex gap-2">
                            <div class="flex gap-2" v-if="permanently.status">
                                <input type="radio" value="permanently" v-model="Plan">
                                <span>PERMANENTLY</span>
                            </div>
                            <div class="flex gap-2" v-if="rent.status" >
                                <input type="radio" value="rent" v-model="Plan">
                                <span>RENT</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <span class="font-semibold" v-if="Plan == 'permanently'">{{ permanently.price }} Baht</span>
                        <span class="font-semibold" v-if="Plan == 'rent'">{{ rent.Unitprice }} Baht PER DAY</span>
                    </div>
                </div>
                <div class="flex justify-between items-center mt-5 gap-4">
                    <button @click="AddCart()"
                        class="w-[50%] h-[70px] rounded-xl border-2 text-lg hover:bg-white hover:text-black duration-300">Add
                        to
                        Cart</button>
                    <button @click="Purchase"
                        class="text-white w-[50%] h-[70px] rounded-xl text-lg bg-[#3d7fa1] hover:bg-[#214f66] duration-300">Purchase</button>
                </div>
            </div>
        </div>
        <ButtonCart ref="cart"/>
    </div>
</template>

<script>
import axios from 'axios';
import { config } from '../../../config'
import { getIdFromURL } from "vue-youtube-embed";
import { YoutubeVue3 } from 'youtube-vue3'
import ButtonCart from '../ButtonCart.vue';
export default {
    name: "storeChildern",
    components: {
        YoutubeVue3,
        ButtonCart
    },
    data() {
        return {
            store: [],
            img: [],
            permanently: {
                    status: false,
                    price: 0
                },
            rent: {
                status: false,
                Unitprice: 0
            },
            Plan: 'permanently'
        }
    },
    methods: {
        async getStore() {
            const api = `${config.EndPoint}/script/${this.$route.params.id}`
            await axios.get(api).then((res) => {
                if (res.status === 200) {
                    this.store = res.data;
                    this.store.video = getIdFromURL(this.store.promote.youTube);
                    this.store.promote.image.map((data) => {
                        this.img.push(data);
                    });
                    this.store.Changelogs = res.data.Changelogs.sort((a, b) => {
                        return parseFloat(b.version) - parseFloat(a.version);
                    });
                    this.permanently = res.data.trade.permanently;
                    this.rent = res.data.trade.rent;
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        async AddCart() {
            if(this.Plan == 'permanently'){
                const payload = {
                    scriptId: this.store.id,
                    nameScript: this.store.nameScript,
                    Plan:{
                        permanently:{
                            status: true,
                            price: this.permanently.price
                        },
                        rent:{
                            status: false,
                            Unitprice: 0,
                            day: 0,
                            price: 0
                        }
                    }
                }
                await this.$refs.cart.addToCart(payload);
            }else{
                const payload = {
                    scriptId: this.store.id,
                    nameScript: this.store.nameScript,
                    Plan:{
                        permanently:{
                            status: false,
                            price: 0
                        },
                        rent:{
                            status: true,
                            Unitprice: this.rent.Unitprice,
                            day: 1,
                            price: this.rent.Unitprice
                        }
                    }
                }
                await this.$refs.cart.addToCart(payload);
            }
        },
        async Purchase(){
            if(this.Plan == 'permanently'){
                const payload = {
                    scriptId: this.store.id,
                    nameScript: this.store.nameScript,
                    Plan:{
                        permanently:{
                            status: true,
                            price: this.permanently.price
                        },
                        rent:{
                            status: false,
                            Unitprice: 0,
                            day: 0,
                            price: 0
                        }
                    }
                }
                await this.$refs.cart.addToCart(payload);
                this.$router.push('/cart');
            }else{
                const payload = {
                    scriptId: this.store.id,
                    nameScript: this.store.nameScript,
                    Plan:{
                        permanently:{
                            status: false,
                            price: 0
                        },
                        rent:{
                            status: true,
                            Unitprice: this.rent.Unitprice,
                            day: 1,
                            price: this.rent.Unitprice
                        }
                    }
                }
                await this.$refs.cart.addToCart(payload);
                this.$router.push('/cart');
            }
        }
    },
    async mounted() {
        await this.getStore();
        (this.permanently.status) ? this.Plan = 'permanently' : this.Plan = 'rent';
    }

}
</script>

<style>
.text {
    word-wrap: break-word;
}
</style>