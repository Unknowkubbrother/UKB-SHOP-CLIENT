<template>
    <div id="dashboard_admin" class="relative">
        <div class="w-full h-full" :class="ShowUiAddScript ? 'blur select-none' : ''">
            <nav class="w-full m-auto bg-[#24272e] p-3 flex items-center justify-start rounded-lg my-5 ">
                <span class="text-lg font-bold pl-5"> <i class="fa-solid fa-window-maximize mr-2"></i> SCRIPT</span>
            </nav>
            <ul class="w-full h-[150px] flex gap-7">
                <li class="w-[250px] h-full bg-[#1A1B1E] rounded-lg flex justify-center items-center gap-5">
                    <div class="flex flex-col justify-center items-center">
                        <span class="text-2xl">{{ script.length }}</span>
                        <span class="text-lg">Product Views</span>
                    </div>
                    <i class="fa-solid fa-cart-shopping text-[2rem]"></i>
                </li>
                <li class="w-[250px] h-full bg-[#1A1B1E] rounded-lg flex justify-center items-center gap-5">
                    <div class="flex flex-col justify-center items-center">
                        <span class="text-2xl">{{ script.filter((data) => data.status === 'active' && data.status !==
                            null).length }}
                        </span>
                        <span class="text-lg">Active view status</span>
                    </div>
                    <i class="fa-regular fa-circle-check text-[2rem]"></i>
                </li>
                <li class="w-[250px] h-full bg-[#1A1B1E] rounded-lg flex justify-center items-center gap-5">
                    <div class="flex flex-col justify-center items-center">
                        <span class="text-2xl">{{ script.filter((data) => data.status === 'inactive' && data.status !==
                            null).length }}</span>
                        <span class="text-lg">Inactive view status</span>
                    </div>
                    <i class="fa-regular fa-circle-xmark text-[2rem]"></i>
                </li>
            </ul>
            <div class="w-full mt-5 py-5 bg-[#1A1B1E] rounded-xl p-5 my-10">
                <nav class="flex justify-between items-center px-10 mt-2 mb-5">
                    <span class="text-2xl font-semibold">Script</span>
                    <button class="btn btn-primary text-white" @click="(ShowUiAddScript = !ShowUiAddScript)">Add
                        Script</button>
                </nav>
                <div class="flex flex-col gap-4">
                    <div class="w-[95%] h-[70px] bg-[#222222] rounded-xl flex justify-between items-center px-10 m-auto cursor-pointer hover:bg-[#2e2e2e] duration-300" @click="NextScriptChildern(data.id)"
                        v-for="(data, idx) in script" :key="idx">
                        <span>{{ data.nameScript }}</span>
                        <span :class="data.status == 'active' ? 'text-green-400' : 'text-rose-400'">{{ data.status
                            ==
                            'active' ?
                            'Active' : 'Inactive' }}</span>
                    </div>
                </div>
            </div>
        </div>

        <Transition>
            <div v-if="ShowUiAddScript"
                class="w-[500px] h-[700px] bg-[#24272e] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 rounded-lg mt-[10rem]">
                <header class="w-full h-[70px] flex justify-between items-center px-6">
                    <span class="text-md font-semibold">Add Script</span>
                    <i class="fa-solid fa-xmark text-[#8b8b8b] hover:text-rose-400 text-lg cursor-pointer duration-300"
                        @click="ShowUiAddScript = false"></i>
                </header>
                <form class="w-[90%] h-[600px] m-auto flex justify-start items-start flex-col gap-4 overflow-auto px-2"
                    @submit.enter.prevent="AddScript()">
                    <div class="w-full">
                        <label>ScriptName <span class="text-rose-400">*</span></label>
                        <input type="text"
                            class="w-full h-[2.5rem] px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500 bg-base-100 mt-2"
                            v-model="addscript.nameScript" placeholder="Enter script name" required>
                    </div>
                    <div class="w-full flex flex-col">
                        <label>Description <span class="text-rose-400">*</span></label>
                        <textarea v-model="addscript.description" placeholder="Enter Description" required
                            class="w-full h-24 max-h-24 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500 bg-base-100 mt-2 overflow-auto"></textarea>
                    </div>
                    <div class="w-full flex gap-2 justify-start items-center">
                        <input id="helper-checkbox" aria-describedby="helper-checkbox-text" type="checkbox"
                            class="w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-[#3d7fa1]  dark:focus:ring-[#3d7fa1] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            v-model="addscript.trade.permanently.status">
                        <label>Permanently</label>
                        <input id="helper-checkbox" aria-describedby="helper-checkbox-text" type="checkbox"
                            class="w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-[#3d7fa1]  dark:focus:ring-[#3d7fa1] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            v-model="addscript.trade.rent.status">
                        <label>Rent</label>
                    </div>
                    <div class="w-full flex gap-4">
                        <div class="w-1/2" v-if="addscript.trade.permanently.status">
                            <label>Permanently Price <span class="text-rose-400">*</span></label>
                            <input type="Number" required
                                class="w-full h-[2.5rem] px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500 bg-base-100 mt-2"
                                min="1" v-model="addscript.trade.permanently.price">
                        </div>
                        <div class="w-1/2" v-if="addscript.trade.rent.status">
                            <label>Rent UnitPrice <span class="text-rose-400">*</span></label>
                            <input type="Number" required
                                class="w-full h-[2.5rem] px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500 bg-base-100 mt-2"
                                min="1" v-model="addscript.trade.rent.Unitprice">
                        </div>
                    </div>
                    <div class="w-full flex flex-col">
                        <label>Video (Youtube) <span class="text-rose-400">*</span></label>
                        <input type="text" required
                            class="w-full h-[2.5rem] px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500 bg-base-100 mt-2"
                            placeholder="Enter Link Youtube" v-model="addscript.promote.youTube">
                    </div>
                    <div class="w-full">
                        <label>Image <span class="text-rose-400">*</span> <span class="text-orange-200 text-sm">(
                                ถ้าใส่หลายลิงค์รูปภาพต้องขั้นด้วย comma
                                )</span> </label>
                        <input type="text" name="Image[]" multiple required
                            class="w-full h-[2.5rem] px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500 bg-base-100 mt-2"
                            v-model="addscript.promote.image"
                            @change="addscript.promote.image = $event.target.value ? $event.target.value.split(',') : []"
                            placeholder="Enter image1,image2,other ...">
                    </div>
                    <div class="w-full">
                        <span>Changelogs</span>
                        <span class="ml-2 px-2">
                            <i class="fa-solid fa-minus text-sm hover:text-sky-500 cursor-pointer duration-300"
                                @click="countChangelogs = Math.max(countChangelogs - 1, 1)"></i>
                            <span class="text-rose-400 mx-2">{{ countChangelogs }}</span> <i
                                class="fa-solid fa-plus text-sm hover:text-sky-500 cursor-pointer duration-300 mx-[-0.4rem]"
                                @click="countChangelogs++"></i>
                        </span>
                        <div class="w-full mt-5 flex flex-col gap-4">
                            <div v-for="(index, idx) in countChangelogs" :key="idx" class="flex flex-col gap-2">
                                <div class="w-full flex flex-col">
                                    <label>Version <span class="text-rose-400">*</span></label>
                                    <input type="text" required
                                        class="w-full h-[2.5rem] px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500 bg-base-100 mt-2"
                                        placeholder="Enter Version" v-model="addscript.Changelogs[idx].version">
                                </div>
                                <div class="w-full flex flex-col">
                                    <label>Description <span class="text-rose-400">*</span></label>
                                    <textarea placeholder="Enter Description" required
                                        class="w-full h-24 max-h-24 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500 bg-base-100 mt-2 overflow-auto"
                                        v-model="addscript.Changelogs[idx].description"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-full">
                        <label>Webhook <span class="text-rose-400">*</span></label>
                        <input type="text" required
                            class="w-full h-[2.5rem] px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500 bg-base-100 mt-2"
                            placeholder="Enter Link Webhook" v-model="addscript.webhook">
                    </div>
                    <div class="flex justify-center items-center gap-2">
                        <input id="helper-checkbox" aria-describedby="helper-checkbox-text" type="checkbox"
                            class="w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-[#3d7fa1]  dark:focus:ring-[#3d7fa1] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            v-model="addscript.recommended">
                        <label>Recommended <span class="text-orange-200 text-sm">( ถ้าต้องการให้ขึ้นหน้าHomeให้ติ๊ก
                                )</span></label>
                    </div>
                    <div class="w-full flex justify-end items-center mt-2 gap-2">
                        <button type="submit" class="btn btn-primary text-white">Add Script</button>
                    </div>
                </form>

            </div>
        </Transition>
    </div>
</template>

<script>
import axios from "axios";
import { config } from "../../../../config";
import { toast } from 'vue3-toastify';
export default {
    name: "Script_Admin",
    data() {
        return {
            script: [],
            ShowUiAddScript: false,
            countChangelogs: 1,
            addscript: {
                nameScript: '',
                description: '',
                trade: {
                    permanently: {
                        status: false,
                        price: 0
                    },
                    rent: {
                        status: false,
                        Unitprice: 0
                    },
                },
                promote: {
                    youTube: '',
                    image: []
                },
                Changelogs: [
                    {
                        version: '',
                        description: ''
                    },
                ],
                webhook: '',
                recommended: false
            }
        };
    },
    methods: {
        async getScript() {
            const api = `${config.EndPoint}/script`;
            await axios.get(api).then((res) => {
                res.data.map((data) => {
                    this.script.push(data);
                });
            }).catch((err) => {
                console.log(err);
            });
        },
        async AddScript() {
            if (!this.addscript.trade.permanently.status && !this.addscript.trade.rent.status) {
                toast("กรุณาเลือกประเภทการซื้อ", {
                    "theme": "dark",
                    "type": "error",
                    "position": "top-right",
                    "pauseOnHover": false,
                    "dangerouslyHTMLString": true
                });
                return;
            }
            if (!this.addscript.trade.permanently.status) {
                this.addscript.trade.permanently.price = 0;
            }
            if (!this.addscript.trade.rent.status) {
                this.addscript.trade.rent.Unitprice = 0;
            }
            const api = `${config.EndPoint}/script`;
            await axios.post(api, this.addscript, { withCredentials: true }).then((res) => {
                if (res.status === 201) {
                    toast("Add Script Success", {
                        "theme": "dark",
                        "type": "success",
                        "position": "top-center",
                        "pauseOnHover": false,
                        "dangerouslyHTMLString": true
                    });
                    setTimeout(() => {
                        location.reload();
                    }, 3000);
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        // async DeleteScript(data) {
        //     const api = `${config.EndPoint}/script/${data.id}`;
        //     await axios.delete(api, { withCredentials: true }).then((res) => {
        //         if (res.status === 200) {
        //             toast("Delete Script Success", {
        //                 "theme": "dark",
        //                 "type": "success",
        //                 "position": "top-center",
        //                 "pauseOnHover": false,
        //                 "dangerouslyHTMLString": true
        //             });
        //             setTimeout(() => {
        //                 location.reload();
        //             }, 3000);
        //         }
        //     }).catch((err) => {
        //         console.log(err);
        //     });
        // },
        NextScriptChildern(id) {
            this.$router.push(`/admin/script/${id}`);
        }
    },
    mounted() {
        this.getScript();
    },
    watch: {
        countChangelogs(newCount) {
            if (newCount > this.addscript.Changelogs.length) {
                const diff = newCount - this.addscript.Changelogs.length;
                for (let i = 0; i < diff; i++) {
                    this.addscript.Changelogs.push({
                        version: '',
                        description: ''
                    });
                }
            } else if (newCount < this.addscript.Changelogs.length) {
                const diff = this.addscript.Changelogs.length - newCount;
                this.addscript.Changelogs.splice(newCount, diff);
            }
        },
        ShowUiAddScript(newVal) {
            if (!newVal) {
                this.addscript = {
                    nameScript: '',
                    description: '',
                    trade: {
                        permanently: {
                            status: false,
                            price: 0
                        },
                        rent: {
                            status: false,
                            Unitprice: 0
                        },
                    },
                    promote: {
                        youTube: '',
                        image: []
                    },
                    Changelogs: [
                        {
                            version: '',
                            description: ''
                        },
                    ],
                    webhook: '',
                    recommended: false
                }
            }

        }
    }

}
</script>

<style>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>