<template>
    <div class="w-full h-full">
        <TabGroup>
            <div class="w-[95%] xl:w-[90%] h-[8rem] m-auto bg-base-100 my-10 rounded-lg px-5">
                <div class="w-full h-[45%] flex justify-between items-center">
                <div class="flex gap-4 justify-center items-center">
                    <i class="fa-solid fa-chevron-left text-lg hover:text-slate-400 duration-300 cursor-pointer" @click="$router.push('/admin/script')"></i>
                    <span class="text-lg">{{ script.data.nameScript }}</span>
                </div>
                <span class="px-2 py-1 text-sm rounded-xl font-semibold" :class="script.data.status == 'active' ? 'bg-green-400' : 'bg-rose-400'">{{script.data.status == 'active' ? 'กำลังเปิดใช้งาน' : 'ไม่ได้เปิดใช้งาน'}}</span>
            </div>
                <TabList class="w-full h-[55%] flex space-x-1 rounded-xl p-1">
                    <Tab as="template" v-slot="{ selected }">
                        <button dir="ltr" :class="[
                            'w-full py-2.5 text-sm font-medium leading-5',
                            'focus:outline-none',
                            selected
                                ? 'border-t-2 border-t-[#3d7fa1] text-white shadow'
                                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                        ]">
                            <span class="text-sm font-semibold">UpdateVersion</span>
                        </button>
                    </Tab>
                    <Tab as="template" v-slot="{ selected }">
                        <button dir="ltr" :class="[
                            'w-full py-2.5 text-sm font-medium leading-5',
                            'focus:outline-none',
                            selected
                                ? 'border-t-2 border-t-[#3d7fa1] text-white shadow'
                                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                        ]">
                            <span class="text-sm font-semibold">User</span>
                        </button>
                    </Tab>
                    <Tab as="template" v-slot="{ selected }">
                        <button dir="ltr" :class="[
                            'w-full py-2.5 text-sm font-medium leading-5',
                            'focus:outline-none',
                            selected
                                ? 'border-t-2 border-t-[#3d7fa1] text-white shadow'
                                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                        ]">
                            <span class="text-sm font-semibold">Custom License</span>
                        </button>
                    </Tab>
                    <Tab as="template" v-slot="{ selected }">
                        <button dir="ltr" :class="[
                            'w-full py-2.5 text-sm font-medium leading-5',
                            'focus:outline-none',
                            selected
                                ? 'border-t-2 border-t-[#3d7fa1] text-white shadow'
                                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                        ]">
                            <span class="text-sm font-semibold">Settings</span>
                        </button>
                    </Tab>
                </TabList>
            </div>
                <TabPanels class="mt-2">
                    <TabPanel class="w-[90%] m-auto rounded-sm p-3 overflow-auto">
                        <Update_Version :script_Version="script?.data?.Changelogs"/>
                    </TabPanel>
                    <TabPanel class="w-full m-auto rounded-sm p-3 overflow-auto">
                       <User_Script/>
                    </TabPanel>
                    <TabPanel class="w-full m-auto rounded-sm p-3 overflow-auto">
                      <Custom_License :script="script?.data"/>
                    </TabPanel>
                    <TabPanel class="w-[90%] m-auto rounded-sm p-3 overflow-auto">
                        <Settings_Scirpt v-model:script="script.data" @deleteScript="DeleteScript" @updateScript="UpdateScript"/>
                    </TabPanel>
                </TabPanels>
            </TabGroup>

    </div>
</template>

<script>
import axios from 'axios';
import { config } from '../../../../../config';
import Settings_Scirpt from './Settings_Scirpt.vue';
import {toast} from 'vue3-toastify';
import Update_Version from './Update_Version.vue';
import User_Script from './User_Script.vue';
import Custom_License from './Custom_License.vue';
export default {
    name: "Script_Admin_Childern",
    components: {
        Settings_Scirpt,
        Update_Version,
        User_Script,
        Custom_License
    },
    data() {
        return {
            seleted: 0,
            script: {
                data: []
            }
        };
    },
    methods: {
        async getScript() {
            const api = `${config.EndPoint}/script_admin/${this.$route.params.id}`
            await axios.get(api,{ withCredentials: true }).then((res) => {
                if (res.status === 200) {
                    this.script.data = res.data;
                }
            }).catch((err) => {
                console.log(err);
            });
        },
          async DeleteScript() {
            const api = `${config.EndPoint}/script/${this.script.data.id}`;
            await axios.delete(api, { withCredentials: true }).then((res) => {
                if (res.status === 200) {
                    toast("Delete Script Success", {
                        "theme": "dark",
                        "type": "success",
                        "position": "top-center",
                        "pauseOnHover": false,
                        "dangerouslyHTMLString": true
                    });
                    setTimeout(() => {
                        this.$router.push('/admin/script');
                    }, 3000);
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        async UpdateScript(){
            const api = `${config.EndPoint}/script/${this.script.data.id}`;
            await axios.put(api, this.script.data, { withCredentials: true }).then((res) => {
                if (res.status === 200) {
                    toast("Update Script Success", {
                        "theme": "dark",
                        "type": "success",
                        "position": "top-center",
                        "pauseOnHover": false,
                        "dangerouslyHTMLString": true
                    });
                    setTimeout(() => {
                        this.$router.push('/admin/script');
                    }, 3000);
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    },
    mounted() {
        this.getScript();
    }

}
</script>

<style></style>