<template>
    <div class="w-full h-full">
        <nav class="w-[95%] 2xl:w-full m-auto bg-[#24272e] p-3 flex items-center justify-start rounded-lg my-5 ">
            <details class="dropdown 2xl:hidden">
                    <summary class="fa-solid fa-bars cursor-pointer"></summary>
                    <ul class="py-4 shadow menu dropdown-content z-[1] bg-base-200 rounded-box w-52">
                        <li><router-link to="/admin/script" class-active="active" exact>Resources</router-link></li>
                        <li><router-link to="/admin/payment" class-active="active" exact>Payments</router-link></li>
                        <li><router-link to="/home" class-active="active" exact>Home Page</router-link></li>
                    </ul>
                </details>
            <span class="text-lg font-bold pl-5"> <i class="fa-solid fa-window-maximize mr-2"></i> PAYMENTS</span>
        </nav>
        <TabGroup>
            <TabList class="w-[95%] s2xl:w-[90%] h-[50px] flex space-x-1 rounded-lg bg-base-100 overflow-hidden m-auto">
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
                        <span class="text-sm font-semibold">Orders</span>
                    </button>
                </Tab>
            </TabList>
            <TabPanels class="mt-2">
                <TabPanel class="2xl:w-[90%] m-auto rounded-sm p-3 overflow-auto">
                    <Dashboard_Payment_Admin/>
                </TabPanel>
                <TabPanel class="w-full m-auto rounded-sm p-3 overflow-auto">
                    <Order_Payment_Admin/>
                </TabPanel>
            </TabPanels>
        </TabGroup>
    </div>
</template>

<script>
import Dashboard_Payment_Admin from './Dashboard_Payment_Admin.vue';
import Order_Payment_Admin from './Order_Payment_Admin.vue';
export default {
    name: 'Payment_Admin',
    components: {
        Dashboard_Payment_Admin,
        Order_Payment_Admin
    },
    data() {
        return {
        }
    },
}
</script>

<style></style>