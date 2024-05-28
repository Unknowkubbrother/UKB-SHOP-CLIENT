<template>
    <div>
    <div id="storeChildern" class="relative" :class="(showImage) ? 'blur bg-black/40 select-none' : ''">
        <div class="w-[95%] md:w-[70%] xl:w-[50%] h-full m-auto my-10">
            <div class="flex justify-between items-center mb-20">
                <router-link to="/store"
                    class="back text-center flex justify-center items-center bg-[#262626] px-3 py-2 rounded-lg overflow-hidden duration-300 hover:bg-[#5e5e5e]"><i
                        class="fa-solid fa-arrow-left text-xl mr-2"></i>Back</router-link>
                <div class="text-xl font-semibold">{{ store.nameScript }}</div>
            </div>
            <div
                class="w-full xl:w-[80%] h-[400px] flex justify-center items-center mt-5 bg-[#262626] m-auto rounded-xl overflow-hidden border-[10px] border-[#444444] drop-shadow-xl z-50">
                <div class="w-full h-full rounded-xl overflow-hidden">
                    <YoutubeVue3 ref="youtube" :videoid="store.video" width="100%" height="100%" :controls="1" v-if="store.video"/>
                    <img :src="store.thumbnail" :alt="store.nameScript" class="w-full h-full object-cover" v-else>
                </div>
            </div>
            <div class="image xl:w-[70%] bg-[#262626] px-5 py-5 rounded-xl m-auto mt-[-5px]">
                <Carousel :items-to-show="2.5" :wrap-around="true" class="cursor-pointer">
                    <Slide v-for="(slide, idx) in (store.image)" :key="idx" class="h-[100px] xl:h-[170px]">
                        <img :src="slide" :alt="idx"
                            class="w-full h-full object-cover p-2 rounded-xl overflow-hidden z-50"
                            @click="zoomImage(slide)">
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
                            <div class="version flex justify-start items-start m-2">VERSION<span class="ml-2">{{
                                data.version
                                    }}</span>
                            </div>

                            <div class="w-[80%] text m-2 pl-5 border-l-2 border-[#ffffff] text-start">
                                <p v-for="(log, idx) in (data.logs)" :key="idx">
                                    {{ log }}
                                </p>
                            </div>
                        </div>
                        <!--  -->

                    </div>
                </div>
            </div>

            <div class="w-full my-10 bg-[#262626] rounded-2xl text-start p-10">
                <div class="flex justify-between items-center w-full m-auto">
                    <div class="flex flex-col xl:flex-row gap-4">
                        <span>SELECT PLAN</span>
                        <div class="flex flex-col xl:flex-row gap-2">
                            <div class="flex gap-2" v-if="store.plan?.permanently">
                                <input type="radio" value="permanently" v-model="plan">
                                <span>PERMANENTLY</span>
                            </div>
                            <div class="flex gap-2" v-if="store.plan?.monthly">
                                <input type="radio" value="monthly" v-model="plan">
                                <span>MONTH</span>
                            </div>
                            <div class="flex gap-2" v-if="store.plan?.day">
                                <input type="radio" value="day" v-model="plan">
                                <span>DAY</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <span class="font-semibold" v-if="plan == 'permanently'">{{ store.plan?.permanently }} Baht</span>
                        <span class="font-semibold" v-if="plan == 'monthly'">{{ store.plan?.monthly }} Baht</span>
                        <span class="font-semibold" v-if="plan == 'day'">{{ store.plan?.day }} Baht</span>
                    </div>
                </div>
                <div class="flex justify-between items-center mt-5 gap-4">
                    <button @click="AddCart()"
                        class="w-[50%] h-[50px] xl:h-[70px] rounded-xl border-2 text-lg hover:bg-white hover:text-black duration-300">Add
                        to
                        Cart</button>
                    <button @click="Purchase"
                        class="text-white w-[50%] h-[50px] xl:h-[70px] rounded-xl text-lg bg-[#3d7fa1] hover:bg-[#214f66] duration-300">Purchase</button>
                </div>
            </div>
        </div>
        <ButtonCart ref="cart" />
    </div>
    <Transition>
        <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer flex justify-between items-center flex-col"
            v-if="showImage" @click="showImage = false">
            <img :src="previewImage" alt="" width="600" height="600"
                class="previewImageStore object-cover rounded-lg m-auto">
        </div>
    </Transition>
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
            plan : 'permanently',
            showImage: false,
            previewImage: ''
        }
    },
    methods: {
        async getStore() {
            const api = `${config.EndPoint}/script/${this.$route.params.id}`
            await axios.get(api).then((res) => {
                if (res.status === 200) {
                    this.store = res.data;
                    res.data.video ? this.store.video = getIdFromURL(res.data.video) : this.store.video = null;
                    this.store.Changelogs = res.data.Changelogs.sort((a, b) => {
                        return parseFloat(b.version) - parseFloat(a.version);
                    });
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        async AddCart() {
            if (this.plan == 'permanently') {
                const payload = {
                    scriptId: this.store.id,
                    nameScript: this.store.nameScript,
                    plan: {
                        permanently: this.store.plan.permanently,
                        monthly: null,
                        day: null
                    }
                }
                await this.$refs.cart.addToCart(payload);
            } else if (this.plan == 'monthly') {
                const payload = {
                    scriptId: this.store.id,
                    nameScript: this.store.nameScript,
                    plan: {
                        permanently: null,
                        monthly: this.store.plan.monthly,
                        day: null
                    }
                }
                await this.$refs.cart.addToCart(payload);
            } else if (this.plan == 'day') {
                const payload = {
                    scriptId: this.store.id,
                    nameScript: this.store.nameScript,
                    plan: {
                        permanently: null,
                        monthly: null,
                        day: this.store.plan.day,
                        UnitPrice: this.store.plan.day,
                        unit: 1
                    }
                }
                await this.$refs.cart.addToCart(payload);
            }
        },
        async Purchase() {
            if (this.plan == 'permanently') {
                const payload = {
                    scriptId: this.store.id,
                    nameScript: this.store.nameScript,
                    plan: {
                        permanently: this.store.plan.permanently,
                        monthly: null,
                        day: null
                    }
                }
                await this.$refs.cart.addToCart(payload);
                this.$router.push('/cart');
            } else if (this.plan == 'monthly') {
                const payload = {
                    scriptId: this.store.id,
                    nameScript: this.store.nameScript,
                    plan: {
                        permanently: null,
                        monthly: this.store.plan.monthly,
                        day: null
                    }
                }
                await this.$refs.cart.addToCart(payload);
                this.$router.push('/cart');
            } else if (this.plan == 'day') {
                const payload = {
                    scriptId: this.store.id,
                    nameScript: this.store.nameScript,
                    plan: {
                        permanently: null,
                        monthly: null,
                        day: this.store.plan.day,
                        UnitPrice: this.store.plan.day,
                        unit: 1
                    }
                }
                await this.$refs.cart.addToCart(payload);
                this.$router.push('/cart');
            }
        },
        zoomImage(image) {
            this.showImage = true
            this.previewImage = image
        }
    },
    async mounted() {
        await this.getStore();
        this.store.plan.permanently ? this.plan = 'permanently' : this.store.plan.monthly ? this.plan = 'monthly' : this.plan = 'day';
    },
    created() {
        document.title = "Store | UKB Developer";
    }

}
</script>

<style>
.previewImageStore {
    transform: scale(140%);
}

.text {
    word-wrap: break-word;
}
</style>