<template>
    <div class="w-full h-full">
        <nav class="w-full m-auto bg-[#24272e] p-3 flex items-center justify-start rounded-lg my-5 ">
            <span class="text-lg font-bold pl-5"> <i class="fa-solid fa-window-maximize mr-2"></i> PAYMENTS</span>
        </nav>
        <TabGroup>
            <TabList class="w-[90%] h-[50px] flex space-x-1 rounded-lg bg-base-100 overflow-hidden m-auto">
                <Tab as="template" v-slot="{ selected }">
                    <button dir="ltr" :class="[
                        'w-full py-2.5 text-sm font-medium leading-5',
                        'focus:outline-none',
                        selected
                            ? 'border-b-2 border-b-[#3d7fa1] text-white shadow'
                            : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                    ]">
                        <span class="text-sm font-semibold">Dashboard</span>
                    </button>
                </Tab>
                <Tab as="template" v-slot="{ selected }">
                    <button dir="ltr" :class="[
                        'w-full py-2.5 text-sm font-medium leading-5',
                        'focus:outline-none',
                        selected
                            ? 'border-b-2 border-b-[#3d7fa1] text-white shadow'
                            : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                    ]">
                        <span class="text-sm font-semibold">test2</span>
                    </button>
                </Tab>
            </TabList>
            <TabPanels class="mt-2">
                <TabPanel class="w-[90%] m-auto rounded-sm p-3 overflow-auto">
                    <Dashboard_Payment_Admin/>
                </TabPanel>
                <TabPanel class="w-full m-auto rounded-sm p-3 overflow-auto">
                    test2
                </TabPanel>
            </TabPanels>
        </TabGroup>
    </div>
</template>

<script>
import Dashboard_Payment_Admin from './Dashboard_Payment_Admin.vue';
export default {
    name: 'Payment_Admin',
    components: {
        Dashboard_Payment_Admin
    },
    data() {
        return {
        }
    },
}
</script>

<style></style>