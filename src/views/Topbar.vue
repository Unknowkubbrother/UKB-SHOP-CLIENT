<template>
    <div id="Topbar">
        <div class="flex justify-between items-center w-full p-3 px-10">
            <router-link to="/home" class="logo flex justify-center items-center" exact>
                <img src="../assets/logo.png" alt="logo" class="w-[80px] h-[80px] object-cover m-auto">
                <div class="text-2xl p-5">UKB Developer</div>
            </router-link>
            <nav>
                <ul class="flex justify-between items-center gap-7 text-lg">
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
                        <Menu1 as="div" class="relative inline-block text-left">
                            <div>
                                <MenuButton
                                    class="inline-flex w-full justify-center rounded-md bg-black/20 px-4 py-2 hover:bg-black/30 hover:text-sky-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
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
                                        <button :class="[
                                            active ? 'bg-[#3d7fa1] text-white' : 'text-white',
                                            'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                        ]">
                                            <EditIcon :active="active" class="mr-2 h-5 w-5 text-violet-400"
                                                aria-hidden="true" />
                                            Dashboard
                                        </button>
                                        </MenuItem>
                                        <MenuItem v-slot="{ active }">
                                        <button :class="[
                                            active ? 'bg-[#3d7fa1] text-white' : 'text-white',
                                            'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                        ]">
                                            <DuplicateIcon :active="active" class="mr-2 h-5 w-5 text-violet-400"
                                                aria-hidden="true" />
                                            Orders
                                        </button>
                                        </MenuItem>
                                        <MenuItem v-slot="{ active }">
                                        <button @click="logout" :class="[
                                            active ? 'bg-[#3d7fa1] text-white' : 'text-white',
                                            'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                        ]">
                                            <DuplicateIcon :active="active" class="mr-2 h-5 w-5 text-violet-400"
                                                aria-hidden="true" />
                                            Sign out
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
import {config} from "../config";
import VueCookies from 'vue-cookies'
import axios from 'axios';
import { toast } from 'vue3-toastify';

export default {
    name: "Topbar",
    data() {
        return {
            logged_in: VueCookies.get('logged_in'),
            cookie: VueCookies.get('ukb-auth')
        };
    },
    computed: {
        Logined() {
            return this.logged_in ? VueCookies.get('username') : null
        }
    },
    methods: {
         logout() {
            const api = `${config.EndPoint}/auth/logout`
            axios.post(api, {"sessionToken":this.cookie}).then(async (res) => {
                if (res.status === 200) {
                    VueCookies.remove('logged_in');
                    VueCookies.remove('ukb-auth');
                    VueCookies.remove('username');

                    await toast("ออกระบบสำเร็จ!!", {
                        "theme": "dark",
                        "type": "success",
                        "position": "top-center",
                        "pauseOnHover": false,
                        "dangerouslyHTMLString": true
                    })
                    setTimeout(async() => {
                        await location.replace('/home');
                    }, 3000);
                }
            }).catch((err) => {
                console.log(err);
            });

        }
    }

}
// Remove the unnecessary closing script tag
// </script>

<style></style>