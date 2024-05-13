<template>
    <div id="dashboard_admin" class="relative">
        <div class="w-[95%] 2xl:w-full h-full m-auto" :class="ShowUiAddScript ? 'blur select-none' : ''">
            <nav class="w-full m-auto bg-[#24272e] p-3 flex items-center justify-start rounded-lg my-5 ">
                <details class="dropdown 2xl:hidden">
                    <summary class="fa-solid fa-bars cursor-pointer"></summary>
                    <ul class="py-4 shadow menu dropdown-content z-[1] bg-base-200 rounded-box w-52">
                        <li><router-link to="/admin/script" class-active="active" exact>Resources</router-link></li>
                        <li><router-link to="/admin/payment" class-active="active" exact>Payments</router-link></li>
                        <li><router-link to="/home" class-active="active" exact>Home Page</router-link></li>
                    </ul>
                </details>

                <span class="text-lg font-bold pl-5"> <i class="fa-solid fa-window-maximize mr-2"></i> RESOURCES</span>
            </nav>
            <ul class="w-[90%] lg:w-full h-[500px] md:h-[150px] flex flex-col md:flex-row gap-7 m-auto">
                <li class="w-full md:w-[250px] h-full bg-[#1A1B1E] rounded-lg flex justify-center items-center gap-5">
                    <div class="flex flex-col justify-center items-center">
                        <span class="text-2xl">{{ script.length }}</span>
                        <span class="text-lg">Product Views</span>
                    </div>
                    <i class="fa-solid fa-cart-shopping text-[2rem]"></i>
                </li>
                <li class="w-full md:w-[250px] h-full bg-[#1A1B1E] rounded-lg flex justify-center items-center gap-5">
                    <div class="flex flex-col justify-center items-center">
                        <span class="text-2xl">{{ script.filter((data) => data.status === 'active' && data.status !==
                            null).length }}
                        </span>
                        <span class="text-lg">Active view status</span>
                    </div>
                    <i class="fa-regular fa-circle-check text-[2rem]"></i>
                </li>
                <li class="w-full md:w-[250px] h-full bg-[#1A1B1E] rounded-lg flex justify-center items-center gap-5">
                    <div class="flex flex-col justify-center items-center">
                        <span class="text-2xl">{{ script.filter((data) => data.status === 'inactive' && data.status !==
                            null).length }}</span>
                        <span class="text-lg">Inactive view status</span>
                    </div>
                    <i class="fa-regular fa-circle-xmark text-[2rem]"></i>
                </li>
            </ul>
            <div class="w-full bg-[#1A1B1E] rounded-xl my-5">
                <nav class="flex justify-between items-center px-10 py-3 mt-2 mb-5">
                    <span class="text-2xl font-semibold">Resource</span>
                    <button class="btn btn-primary text-white" @click="(ShowUiAddScript = !ShowUiAddScript)">Add
                        Resource</button>
                </nav>
            </div>
            <div class="flex flex-col gap-4" v-if="script.length">
                <div class="w-[95%] h-[70px] bg-[#222222] rounded-xl flex justify-between items-center px-10 m-auto cursor-pointer hover:bg-[#2e2e2e] duration-300"
                    @click="NextScriptChildern(data.id)" v-for="(data, idx) in script" :key="idx">
                    <span>{{ data.nameScript }}</span>
                    <span :class="data.status == 'active' ? 'text-green-400' : 'text-rose-400'">{{ data.status
                        ==
                        'active' ?
                        'Active' : 'Inactive' }}</span>
                </div>
            </div>
            <div v-else class="w-full h-[300px] flex justify-center items-center">
                <div class="text-[#3d7fa1] text-2xl">Resources not found. . .</div>
            </div>
        </div>

        <Transition>
            <div v-if="ShowUiAddScript"
                class="w-[90%] md:w-[70%] md:h-[700px] xl:w-[500px] lg:h-[700px] xl:h-[700px] bg-[#24272e] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 rounded-lg mt-10 md:mt-[12rem] lg:mt-[12rem] xl:mt-[12rem] shadow-lg shadow-black overflow-auto">
                <header class="w-full h-[70px] flex justify-between items-center px-6">
                    <span class="text-md font-semibold">Add Resource</span>
                    <i class="fa-solid fa-xmark text-[#8b8b8b] hover:text-rose-400 text-lg cursor-pointer duration-300"
                        @click="ShowUiAddScript = false"></i>
                </header>
                <form
                    class="w-[90%] h-[600px] m-auto flex justify-start items-start flex-col gap-4 overflow-auto px-2 mb-10"
                    @submit.enter.prevent="AddScript()">
                    <div class="w-full">
                        <label>ResourceName <span class="text-rose-400">*</span></label>
                        <input type="text"
                            class="w-full h-[2.5rem] px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500 bg-base-100 mt-2"
                            v-model="addscript.nameScript" placeholder="Enter script name" required>
                    </div>
                    <div class="w-full flex flex-col">
                        <label>ShortDescription <span class="text-rose-400">*</span></label>
                        <textarea v-model="addscript.shortDescription" placeholder="Enter Description" required
                            class="w-full h-24 max-h-24 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500 bg-base-100 mt-2 overflow-auto"></textarea>
                    </div>
                    <div class="w-full flex flex-col">
                        <label>Description <span class="text-rose-400">*</span></label>
                        <textarea v-model="addscript.description" placeholder="Enter Description" required
                            class="w-full h-24 max-h-24 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500 bg-base-100 mt-2 overflow-auto"></textarea>
                    </div>
                    <div class="w-full flex flex-col">
                        <label>Plan <span class="text-rose-400">*</span>
                            <span class="ml-2 px-2">
                                <i class="fa-solid fa-minus text-sm hover:text-sky-500 cursor-pointer duration-300"
                                    @click="countPlan > 1 ? (countPlan--, plan.pop()) : null"></i>
                                <span class="text-rose-400 mx-2">{{ countPlan }}</span> <i
                                    class="fa-solid fa-plus text-sm hover:text-sky-500 cursor-pointer duration-300 mx-[-0.4rem]"
                                    @click="countPlan = Math.min(countPlan + 1, 3)"></i>
                            </span>
                        </label>
                        <div class="w-full flex gap-2" v-for="(data, idx) in countPlan" :key="idx">
                            <select v-model="plan[idx]" @change="updatePlan"
                                class="w-1/2 h-[2.5rem] px-3 py-2 rounded-lg border border-[#4b4b4b] focus:outline-none focus:border-blue-500 bg-base-100 mt-2"
                                required>
                                <option value="day" :disabled="plan.includes('day')">DAY</option>
                                <option value="monthly" :disabled="plan.includes('monthly')">MONTH</option>
                                <option value="permanently" :disabled="plan.includes('permanently')">PERMANENTLY
                                </option>
                            </select>
                            <input type="number" v-model="addscript.plan[plan[idx]]" required
                                class="w-1/2 h-[2.5rem] px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500 bg-base-100 mt-2"
                                placeholder="Enter Price">
                        </div>
                    </div>
                    <div class="w-full flex flex-col">
                        <label>Thumbnail<span class="text-rose-400 ml-2">*</span></label>
                        <input type="text" required
                            class="w-full h-[2.5rem] px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500 bg-base-100 mt-2"
                            placeholder="Enter Thumbnail" v-model="addscript.thumbnail">
                    </div>
                    <div class="w-full flex flex-col">
                        <label>Video (Youtube) </label>
                        <input type="text"
                            class="w-full h-[2.5rem] px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500 bg-base-100 mt-2"
                            placeholder="Enter Link Youtube" v-model="addscript.video">
                    </div>
                    <div class="w-full">
                        <label>Image <span class="text-rose-400">*</span> <span class="text-orange-200 text-sm">(
                                ถ้าใส่หลายลิงค์รูปภาพให้ Enter ขึ่นบรรทัดใหม่
                                )</span> </label>
                        <textarea type="text" name="Image[]" multiple required
                            class="w-full h-24 max-h-24 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500 bg-base-100 mt-2 overflow-auto"
                            v-model="addscript.image"
                            @change="addscript.image = $event.target.value ? $event.target.value.split('\n') : []"
                            placeholder="Enter image"></textarea>
                    </div>
                    <div class="w-full">
                        <div class="w-full flex flex-col gap-4">
                            <div class="flex flex-col gap-2">
                                <div class="w-full flex flex-col">
                                    <label>Version <span class="text-rose-400">*</span></label>
                                    <input type="text" required
                                        class="w-full h-[2.5rem] px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500 bg-base-100 mt-2"
                                        placeholder="Enter Version" v-model="addscript.Changelogs[0].version">
                                </div>
                                <div class="w-full flex flex-col">
                                    <label>Log <span class="text-rose-400">*</span>
                                        <span class="text-orange-200 text-sm">(
                                            ถ้าใส่หลายข้อความให้ Enter ขึ่นบรรทัดใหม่
                                            )</span>
                                    </label>
                                    <textarea placeholder="Enter logs" required name="logs[]" multiple
                                        class="w-full h-24 max-h-24 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500 bg-base-100 mt-2 overflow-auto"
                                        v-model="addscript.Changelogs[0].logs"
                                        @change="addscript.Changelogs[0].logs = $event.target.value ? $event.target.value.split('\n') : []"></textarea>
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
                    <div class="w-full">
                        <label>Link Download <span class="text-rose-400">*</span></label>
                        <input type="text" required
                            class="w-full h-[2.5rem] px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500 bg-base-100 mt-2"
                            placeholder="Enter Link Webhook" v-model="addscript.download">
                    </div>
                    <div class="flex justify-center items-center gap-2">
                        <input id="helper-checkbox" aria-describedby="helper-checkbox-text" type="checkbox"
                            class="w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-[#3d7fa1]  dark:focus:ring-[#3d7fa1] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            v-model="addscript.recommended">
                        <label>Recommended <span class="text-orange-200 text-sm">( ถ้าต้องการให้ขึ้นหน้าHomeให้ติ๊ก
                                )</span></label>
                    </div>
                    <div class="w-full flex justify-end items-center mt-2 gap-2">
                        <button type="submit" class="btn btn-primary text-white">Add Resource</button>
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
            countPlan: 1,
            plan: ['permanently'],
            addscript: {
                nameScript: '',
                shortDescription: '',
                description: '',
                plan: {
                    day: null,
                    monthly: null,
                    permanently: null
                },
                thumbnail: '',
                video: '',
                image: [],
                Changelogs: [
                    {
                        version: '',
                        logs: []
                    },
                ],
                webhook: '',
                download: '',
                recommended: false
            }
        };
    },
    methods: {
        async getScript() {
            const api = `${config.EndPoint}/script_admin`;
            await axios.get(api, { withCredentials: true }).then((res) => {
                res.data.map((data) => {
                    this.script.push(data);
                });
            }).catch((err) => {
                console.log(err);
            });
        },
        async AddScript() {
            this.addscript.plan = this.plan.reduce((acc, cur) => {
                acc[cur] = this.addscript.plan[cur];
                return acc;
            }, {});
            if (!this.addscript.plan.permanently) {
                toast("plan จำเป็นต้องมี permanently ทุกครั้ง", {
                    "theme": "dark",
                    "type": "error",
                    "position": "top-right",
                    "pauseOnHover": false,
                    "dangerouslyHTMLString": true
                });
                return;
            }
            const api = `${config.EndPoint}/script_admin`;
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
        NextScriptChildern(id) {
            this.$router.push(`/admin/script/${id}`);
        }
    },
    mounted() {
        this.getScript();
    },
    watch: {
        ShowUiAddScript(newVal) {
            if (!newVal) {
                this.addscript = {
                    nameScript: '',
                    shortDescription: '',
                    description: '',
                    plan: {
                        day: null,
                        monthly: null,
                        permanently: null
                    },
                    thumbnail: '',
                    video: '',
                    image: [],
                    Changelogs: [
                        {
                            version: '',
                            logs: []
                        },
                    ],
                    webhook: '',
                    download: '',
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