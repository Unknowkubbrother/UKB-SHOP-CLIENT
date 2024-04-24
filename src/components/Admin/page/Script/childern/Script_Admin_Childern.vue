<template>
    <div class="w-full h-full">
        <TabGroup>
            <div class="w-[90%] h-[8rem] m-auto bg-base-100 my-10 rounded-lg px-5">
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
                                ? 'border-t-2 border-t-green-400 text-white shadow'
                                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                        ]">
                            <span class="text-sm font-semibold">Settings</span>
                        </button>
                    </Tab>
                    <Tab as="template" v-slot="{ selected }">
                        <button dir="ltr" :class="[
                            'w-full py-2.5 text-sm font-medium leading-5',
                            'focus:outline-none',
                            selected
                                ? 'border-t-2 border-t-green-400 text-white shadow'
                                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                        ]">
                            <span class="text-sm font-semibold">Dashboard1</span>
                        </button>
                    </Tab>
                </TabList>
            </div>
                <TabPanels class="mt-2">
                    <TabPanel class="w-[90%] m-auto rounded-sm p-3 overflow-auto">
                        <Dashboard_Scirpt v-model:script="script.data"/>
                    </TabPanel>
                    <TabPanel class="w-[90%] m-auto rounded-sm bg-[#262626] p-3 overflow-auto">
                        <div class="w-full h-full">
                             test2
                        </div>
                    </TabPanel>
                </TabPanels>
            </TabGroup>

    </div>
</template>

<script>
import axios from 'axios';
import { config } from '../../../../../config';
import Dashboard_Scirpt from './Dashboard_Scirpt.vue';
export default {
    name: "Script_Admin_Childern",
    components: {
        Dashboard_Scirpt
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
            const api = `${config.EndPoint}/script/${this.$route.params.id}`
            await axios.get(api).then((res) => {
                if (res.status === 200) {
                    this.script.data = res.data;
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