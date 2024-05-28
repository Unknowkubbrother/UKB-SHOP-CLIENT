<template>
    <div id="Topbar">
        <div class="flex justify-between items-center w-full p-3 xl:px-10 my-5">
            <router-link to="/home" class="logo flex justify-center items-center" exact>
                <img src="../assets/logo.png" alt="" class="w-[40px] h-[40px] xl:w-[70px] xl:h-[70px] object-cover m-auto hidden xl:block">
                <h1 class="text-xl xl:text-2xl xl:ml-3 xl:border-l-2 px-2 xl:px-5 font-semibold xl:font-normal">UKB Developer</h1>
            </router-link>
            <nav>
                <ul class="flex justify-between items-center xl:gap-7 text-lg">
                    <li>
                        <router-link to="/store" class-active="active"
                            class="hover:text-sky-500 hover:duration-300 p-[10px]" exact>
                            Store
                        </router-link>
                    </li>

                    <li v-if="!logged_in">
                        <router-link to="/login" class-active="active"
                            class="hover:text-sky-500 hover:duration-300 p-[10px]" exact>
                            Sign in
                        </router-link>
                    </li>
                    <li v-else>
                        <Menu1 as="div" class="relative inline-block text-left z-40" >
                            <div>
                                <MenuButton
                                    class="inline-flex w-full justify-center rounded-md bg-black/20 pl-4 py-2 hover:bg-black/30 hover:text-sky-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                                    {{ Logined }}
                                    <ChevronDownIcon class="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100"
                                        aria-hidden="true" />
                                </MenuButton>
                            </div>

                            <transition enter-active-class="transition duration-100 ease-out"
                                enter-from-class="transform scale-95 opacity-0"
                                enter-to-class="transform scale-100 opacity-100"
                                leave-active-class="transition duration-75 ease-in"
                                leave-from-class="transform scale-100 opacity-100"
                                leave-to-class="transform scale-95 opacity-0">
                                <MenuItems
                                    class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-[#1a2327] shadow-lg ring-1 ring-black/5 focus:outline-none">
                                    <div class="px-1 py-1">
                                        <MenuItem v-slot="{ active }">
                                        <button @click="$router.push('/dashboard')" :class="[
                                            active ? 'bg-[#3d7fa1] text-white' : 'text-white',
                                            'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                        ]">
                                            <EditIcon :active="active" class="mr-2 h-5 w-5 text-violet-400"
                                                aria-hidden="true" />
                                            <i class="fa-solid fa-window-maximize mr-2"></i>Dashboard
                                        </button>
                                        </MenuItem>
                                        <MenuItem v-slot="{ active }">
                                        <button @click="$router.push('/order')" :class="[
                                            active ? 'bg-[#3d7fa1] text-white' : 'text-white',
                                            'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                        ]">
                                            <DuplicateIcon :active="active" class="mr-2 h-5 w-5 text-violet-400"
                                                aria-hidden="true" />
                                            <i class="fa-solid fa-bars-staggered mr-2"></i>Orders
                                        </button>
                                        </MenuItem>
                                        <MenuItem v-slot="{ active }" v-if="$cookies.get('ukb-data').role == 'staff'">
                                        <button @click="$router.push('/admin')" :class="[
                                            active ? 'bg-[#3d7fa1] text-white' : 'text-white',
                                            'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                        ]">
                                            <DuplicateIcon :active="active" class="mr-2 h-5 w-5 text-violet-400"
                                                aria-hidden="true" />
                                                <i class="fa-solid fa-user-tie mr-2"></i>Admin
                                        </button>
                                        </MenuItem>
                                        <MenuItem v-slot="{ active }">
                                        <button @click="logout" :class="[
                                            active ? 'bg-[#3d7fa1] text-white' : 'text-white',
                                            'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                        ]">
                                            <DuplicateIcon :active="active" class="mr-2 h-5 w-5 text-violet-400"
                                                aria-hidden="true" />
                                            <i class="fa-solid fa-right-from-bracket mr-2"></i>Sign out
                                        </button>
                                        </MenuItem>
                                    </div>
                                </MenuItems>
                            </transition>
                        </Menu1>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>
<script>
import { config } from "../config";
// import VueCookies from 'vue-cookies'
import axios from 'axios';
import { toast } from 'vue3-toastify';

export default {
    name: "Topbar",
    data() {
        return {
            logged_in: this.$cookies.get('logged_in'),
            cookie: this.$cookies.get('ukb-auth')
        };
    },
    computed: {
        Logined() {
            return this.logged_in ? this.$cookies.get('ukb-data').username : null
        }
    },
    methods: {
        logout() {
            const api = `${config.EndPoint}/auth/logout`
            axios.post(api, {}, { withCredentials: true }).then(async (res) => {
                if (res.status === 200) {
                    await toast("ออกระบบสำเร็จ!!", {
                        "theme": "dark",
                        "type": "success",
                        "position": "top-center",
                        "pauseOnHover": false,
                        "dangerouslyHTMLString": true
                    })
                    setTimeout(async () => {
                        await location.replace('/home');
                    }, 3000);
                }
            }).catch((err) => {
                console.log(err)
                if (err.response.status === 400) {
                    toast('ออกระบบสำเร็จ!!', {
                        theme: 'dark',
                        type: 'success',
                        pauseOnHover: false,
                        dangerouslyHTMLString: true
                    })
                    setTimeout(async () => {
                        // await location.replace('/login')
                        this.$router.push('/login')
                        // location.reload()
                    }, 3000)
                }
            });

        },
    }

}
// Remove the unnecessary closing script tag
// </script>

<style></style>