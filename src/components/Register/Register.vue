<template>
    <div id="Register">
        <div class="w-full h-full flex items-center flex-col">
            <router-link to="/home" class="flex justify-center items-center mt-[10rem] mb-[5rem]">
                <img src="../../assets/logo.png" alt="" class="w-[70px] h-[70px] object-cover m-auto">
                <h1 class="text-3xl font-bold">UKB Developer</h1>
            </router-link>
            <form action="" class="w-[400px] flex justify-center flex-col gap-3" @submit.enter.prevent="register()">
                <label for="username" class="font-semibold">Username</label>
                <input type="text" required
                    class="h-[35px] rounded-lg text-black border-2 border-slate-500 indent-3 focus:outline-none focus:border-3 focus:border-sky-500 bg-white"
                    v-model="RegisterData.username">
                <label for="email" class="font-semibold">Email</label>
                <input type="email" required
                    class="h-[35px] rounded-lg text-black border-2 border-slate-500 indent-3 focus:outline-none focus:border-3 focus:border-sky-500 bg-white"
                    v-model="RegisterData.email">
                <label for="password" class="font-semibold">Password</label>
                <input type="password" required
                    class="h-[35px] rounded-lg text-black border-2 border-slate-500 indent-3 focus:outline-none focus:border-3 focus:border-sky-500 bg-white"
                    v-model="RegisterData.password">
                <label for="confirmPassword" class="font-semibold">ConfirmPassword</label>
                <input type="password" required
                    class="h-[35px] rounded-lg text-black border-2 border-slate-500 indent-3 focus:outline-none focus:border-3 focus:border-sky-500 bg-white"
                    v-model="RegisterData.confirmPassword">
                <button type="submit" class="h-[35px] bg-[#3d7fa1] text-white rounded-lg my-5">Sign Up account</button>
            </form>
        </div>
    </div>
</template>
<script>
import { config } from "../../config";
import axios from "axios";
import { toast } from 'vue3-toastify';
export default {
    name: "Register",
    data() {
        return {
            RegisterData: {
                "username": null,
                "email": null,
                "password": null,
                "confirmPassword": null
            }
        };
    },
    methods: {
        register() {
            const api = `${config.EndPoint}/auth/register`
            axios.post(api, this.RegisterData).then(async (res) => {
                if (res.status === 201) {
                    await toast("สมัครสมาชิกสำเร็จ", {
                        "theme": "dark",
                        "type": "success",
                        "position": "top-center",
                        "pauseOnHover": false,
                        "dangerouslyHTMLString": true
                    })
                    setTimeout(() => {
                        this.$router.push("/login");
                    }, 3000);
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
                }else if(err.response.status === 409){
                    toast("มีชื่อผู้ใช้หรืออีเมลนี้อยู่ในระบบแล้ว", {
                        "theme": "dark",
                        "type": "error",
                        "pauseOnHover": false,
                        "dangerouslyHTMLString": true
                    })
                }
            });
        }
    }
};
</script>

<style></style>


<style></style>