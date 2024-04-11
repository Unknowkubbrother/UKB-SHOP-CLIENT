<template>
    <div id="Dashboard">
        <div class="w-[80%] h-full m-auto">
            <div class="flex justify-start items-center my-10">
                <h1 class="font-bold text-2xl">DASHBOARD</h1>
            </div>
            <div class="profile flex justify-start items-center">
                <div class="profile-img w-[150px] h-[150px] bg-[#262626] rounded-full overflow-hidden">
                    <img src="https://media.discordapp.net/attachments/1133807349266653264/1176607928325787649/IMG-100000000.jpg?ex=661ed406&is=660c5f06&hm=6d689fabccd0a20c3498c8f6054b858972ad04cd3b20a12940ad728e5db1e542&=&format=webp&width=1119&height=671"
                        alt="" class="w-full h-full object-cover">
                </div>
                <div class="ml-10 flex flex-col gap-2 text-center justify-center items-start">
                    <!-- <div class="text-xl font-semibold text-[#3690bd]"><span id="username">Natchkung</span></div> -->
                    <div class="h-[40px] bg-[#262626] rounded-[5px] flex overflow-hidden">
                        <div class="h-full bg-[#3d7fa1] flex justify-center items-center text-lg font-semibold px-5">
                            <span>Username</span>
                        </div>
                        <div class="h-full flex justify-center items-center text-lg"><span id="username"
                                class="px-5 text-center">{{ profile.username }}</span></div>
                    </div>
                    <div class="text-[17px]"><span id="email">{{ profile.email }}</span></div>
                    <div class="text-[17px] text-[#a3a3a3]">ID: <span ref="id">{{ profile.id }}</span><button
                            @click="copy" class="ml-2 text-center text-[#3d7fa1] hover:text-sky-500"><i
                                class="fa-solid fa-copy"></i></button></div>
                </div>
            </div>
            <div class="w-[75%] m-auto rounded-lg border border-[#555555] bg-[#262626] my-10 p-10 flex flex-col">
                <div class="flex justify-start items-start gap-3">
                    <i class="fa-solid fa-circle-exclamation text-rose-600 text-2xl"></i>
                    <div>
                        <span class="text-lg font-semibold">เปลี่ยน IP โปรดอ่าน!!</span>
                        <p>หากคุณได้นำสคริปต์ไปใช้งาน (ทำการ Verify กับระบบสำเร็จ) จะต้องรออีก 5
                            ชั่วโมงถึงจะสามารถปรับเปลี่ยน
                            IP ของสคริปต์นั้นๆได้อีกครั้ง<br>
                            ** ไม่เกี่ยวกับว่าคุณเปลี่ยน IP ครั้งล่าสุดเมื่อไหร่ อยู่ที่ว่าคุณใช้งานล่าสุดเมื่อไหร่</p>
                    </div>

                </div>
            </div>
            <div class="license w-full flex justify-center items-center">
                <table class="table-auto bg-[#262626] rounded-lg overflow-hidden">
                    <thead>
                        <tr class="bg-[#3d7fa1]">
                            <th class="px-4 py-2 text-center w-[200px]">Name</th>
                            <th class="px-4 py-2 text-center ">License</th>
                            <th class="px-4 py-2 text-center w-[50px]"><i class="fa-solid fa-shield-halved"></i></th>
                            <th class="px-4 py-2 text-center w-[150px]">IP Address</th>
                            <th class="px-4 py-2 text-center w-[100px]">ตั้ง IP</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!--  -->
                        <tr v-for="data in license.data" :key="data.id">
                            <td class="px-4 py-2 text-center">{{ data.nameScript}}</td>
                            <td class="px-4 py-2 text-center flex gap-2 flex-wrap">
                                <span
                                    v-if="data.show">{{data.license}}</span>
                                <span v-else
                                    class="blur">{{data.license}}</span>
                                <button @click="data.show = !data.show"
                                    class="text-[#3d7fa1] hover:text-sky-500"><i class="fa-solid fa-eye"></i></button>
                            </td>
                            <td class="px-4 py-2 text-center">
                                <Switch1 v-model="data.status"
                                    :class="data.status ? 'bg-green-400' : 'bg-gray-200'"
                                    class="relative inline-flex h-6 w-11 items-center rounded-full">
                                    <span class="sr-only">Enable notifications</span>
                                    <span :class="data.status ? 'translate-x-6' : 'translate-x-1'"
                                        class="inline-block h-4 w-4 transform rounded-full bg-white transition" />
                                </Switch1>
                            </td>
                            <td class="px-4 py-2 text-center">{{data.ipaddress}}</td>
                            <td class="px-4 py-2 text-center"><button>
                                    <i class="fa-solid fa-pen-to-square text-[#3d7fa1] text-lg hover:text-sky-500"></i>
                                </button>
                            </td>
                        </tr>
                        <!--  -->

                    </tbody>
                </table>

            </div>
        </div>
    </div>
</template>

<script>
import {config} from "../../config";
import { toast } from 'vue3-toastify';
import axios from 'axios';
export default {
    name: "Dashboard",
    data() {
        return {
            license: {
                Enabled: true,
                show: false,
                data: []
            },
            profile: {
                username: this.$cookies.get('ukb-data').username,
                email: this.$cookies.get('ukb-data').email,
                id: this.$cookies.get('ukb-data')['_id']
            },
        }
    },
    methods: {
        copy() {
            this.$refs.id.focus();
            navigator.clipboard.writeText(this.$refs.id.innerText);
            toast(`คัดลอกข้อมูลสำเร็จ : "${this.$refs.id.innerText}"`, {
                "theme": "dark",
                "type": "success",
                "position": "top-center",
                "pauseOnHover": false,
                "autoClose": 1500,
                "dangerouslyHTMLString": true
            })
        },
        getLicense() {
           const api = `${config.EndPoint}/license/user`
           axios.post(api ,{},{ withCredentials: true }).then(async (res) => {
               if (res.status === 200) {
                    this.license.data = res.data
               }
           }).catch((err) => {
            console.log(err);
                if(err.response.status === 400){
                    toast("กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง", {
                        "theme": "dark",
                        "type": "error",
                        "pauseOnHover": false,
                        "dangerouslyHTMLString": true
                    })
                }else if(err.response.status === 404){
                    toast("ไม่มีผู้ใช้อยู่ในระบบ", {
                        "theme": "dark",
                        "type": "error",
                        "pauseOnHover": false,
                        "dangerouslyHTMLString": true
                    })
                }
           });
        },
        LicenseinActive(){

        }
    },
    mounted() {
        if(this.$cookies.get('logged_in')){
            this.getLicense()
        }else{
            this.$router.push('/login')
        }
    }

}
</script>

<style></style>