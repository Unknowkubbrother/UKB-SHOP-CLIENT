<template>
    <div id="admin" v-if="Admin == 'staff'">
        <div class="h-full w-[90%] m-auto relative">
            <div class="flex justify-start items-center my-10 gap-3 py-2 border-b-2 border-[#3d7fa1]">
                <i class="fa-solid fa-user-tie text-xl"></i>
                <h1 class="font-bold text-2xl">MenuAdmin</h1>
            </div>
            <TabGroup>
                <TabList class="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                    <Tab as="template" v-slot="{ selected }">
                        <button :class="[
                            'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                            'focus:outline-none',
                            selected
                                ? 'bg-[#3d7fa1] text-white shadow'
                                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                        ]">
                            License
                        </button>
                    </Tab>
                    <Tab as="template" v-slot="{ selected }">
                        <button :class="[
                            'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                            'focus:outline-none',
                            selected
                                ? 'bg-[#3d7fa1] text-white shadow'
                                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                        ]">
                            AddUser
                        </button>
                    </Tab>
                </TabList>

                <TabPanels class="mt-2">
                    <TabPanel class="rounded-xl bg-[#262626] p-3 overflow-auto">
                        <License/>
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
import License from "./License.vue";
export default {
    name: "Admin",
    components:{
        License
    },
    data() {
        return {
            logged_in: this.$cookies.get('logged_in'),
        };
    },
    methods: {
    },
    computed: {
        Admin() {
            return this.logged_in ? this.$cookies.get('ukb-data').role : null
        }
    }

}   
</script>

<style></style>