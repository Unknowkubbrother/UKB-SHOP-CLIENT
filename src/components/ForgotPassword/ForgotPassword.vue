<template>
    <div id="ForgotPassword">
        <div class="w-[95%] md:w-full h-full flex items-center flex-col m-auto">
            <router-link to="/home" class="flex justify-center items-center mt-[5rem] md:mt-[10rem] md:mb-[5rem] mb-5">
                <img src="../../assets/logo_codekub.png" alt="" class="w-[70px] h-[70px] object-cover m-auto ">
        <h1 class="text-3xl font-bold ml-2 border-l-2 px-5">CodeKub Shop</h1>
            </router-link>
            <div class="w-full md:w-[70%] flex flex-col md:flex-row justify-between md:items-start items-center">
                <div class="w-full md:w-[50%] flex justify-start items-center flex-col">
                    <div class="w-[80%] md:w-[70%] justify-start items-center mb-5 m-auto"><span class="text-xl font-semibold">Request Secret code</span></div>
                    <form class="w-[80%] md:w-[70%] flex flex-col gap-2 md:justify-start items-start m-auto justify-center"
                        @submit.enter.prevent="sendSecretCode">
                        <label for="email">Email address</label>
                        <input type="email" required
                            class="w-full h-[35px] rounded-lg text-black border-2 border-slate-500 focus:outline-none focus:border-3 focus:border-sky-500 bg-white"
                            v-model="email">
                        <button type="submit" class="w-full h-[35px] bg-[#3d7fa1] text-white rounded-lg my-5">Send me
                            the secret code</button>
                    </form>
                </div>
                <div class="w-full md:w-[50%] flex justify-center items-center md:border-l-2 md:border-[#dadada] flex-col m-auto mb-10 mt-10 md:mt-0">
                    <div class="w-[80%] md:w-[70%] justify-start items-center mb-5 m-auto"><span class="text-xl font-semibold">Reset Password</span></div>
                    <form action="" class="w-[80%] md:w-[70%] flex justify-center flex-col gap-3 m-auto"
                        @submit.enter.prevent="resetpassword()">
                        <label for="username">Username</label>
                        <input type="text" required v-model="username"
                            class="h-[35px] rounded-lg text-black border-2 border-slate-500 focus:outline-none focus:border-3 focus:border-sky-500 bg-white">
                        <label for="secretcode">Secret Code</label>
                        <input type="text" required v-model="secretcode"
                            class="h-[35px] rounded-lg text-black border-2 border-slate-500 focus:outline-none focus:border-3 focus:border-sky-500 bg-white">
                        <label for="username">New Password</label>
                        <input type="password" required v-model="newpassword"
                            class="h-[35px] rounded-lg text-black border-2 border-slate-500 focus:outline-none focus:border-3 focus:border-sky-500 bg-white">
                        <button type="submit" class="h-[35px] bg-[#3d7fa1] text-white rounded-lg my-5">Reset
                            Password</button>
                    </form>
                    <router-link to="/login" class="text-[15px] mt-5">Do you want to go back to login?</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { config } from '../../config';
import { toast } from 'vue3-toastify';
export default {
    name: 'ForgotPassword',
    data() {
        return {
            email: '',
            username: '',
            secretcode: '',
            newpassword: ''
        }
    },
    methods: {
        async sendSecretCode() {
            const api = `${config.EndPoint}/auth/forgot-pass`
            await axios.post(api, { email: this.email }).then((res) => {
                if(res.status === 200) {
                    toast('ส่ง Secret Code ไปยังอีเมลของคุณแล้ว', {
                        "theme": "dark",
                        "type": "success",
                        "position": "top-center",
                        "pauseOnHover": false,
                        "dangerouslyHTMLString": true
                    })
                    this.email = ''
                }
            }).catch((err) => {
                console.log(err);
                if(err.response.status === 404) {
                    toast('ไม่พบอีเมลของคุณในระบบ', {
                        "theme": "dark",
                        "type": "error",
                        "position": "top-right",
                        "pauseOnHover": false,
                        "dangerouslyHTMLString": true
                    })
                }else if(err.response.status === 400) {
                    toast('เกิดข้อผิดพลาดบางอย่าง', {
                        "theme": "dark",
                        "type": "error",
                        "position": "top-right",
                        "pauseOnHover": false,
                        "dangerouslyHTMLString": true
                    })
                }
            })
        },
        async resetpassword(){
            const api = `${config.EndPoint}/auth/reset-pass`
            await axios.post(api, { username: this.username, token: this.secretcode, newPassword: this.newpassword }).then((res) => {
                if(res.status === 200) {
                    toast('เปลี่ยนรหัสผ่านสำเร็จ', {
                        "theme": "dark",
                        "type": "success",
                        "position": "top-center",
                        "pauseOnHover": false,
                        "dangerouslyHTMLString": true
                    })
                    this.username = ''
                    this.secretcode = ''
                    this.newpassword = ''
                    setTimeout(() => {
                        this.$router.push('/login')
                    }, 3000);
                }
            }).catch((err) => {
                console.log(err);
                if(err.response.status === 404) {
                    toast('ไม่พบ Username หรือ Secret Code ของคุณในระบบ', {
                        "theme": "dark",
                        "type": "error",
                        "position": "top-right",
                        "pauseOnHover": false,
                        "dangerouslyHTMLString": true
                    })
                }else if(err.response.status === 400) {
                    toast('เกิดข้อผิดพลาดบางอย่าง', {
                        "theme": "dark",
                        "type": "error",
                        "position": "top-right",
                        "pauseOnHover": false,
                        "dangerouslyHTMLString": true
                    })
                }
            })
        }
        
    },
    created() {
        document.title = "Forgot Password | CodeKub Shop";
    }
}
</script>

<style></style>