<template>
  <div id="Login">
    <div class="w-[95%] xl:w-full h-full flex items-center flex-col m-auto">
      <router-link to="/home" class="flex justify-center items-center mt-[5rem] 2xl:mt-[10rem] mb-[5rem]">
        <img src="../../assets/logo.png" alt="" class="w-[70px] h-[70px] object-cover m-auto">
        <h1 class="text-3xl font-bold ml-2 border-l-2 px-5">UKB Developer</h1>
      </router-link>
      <form action="" class="w-[90%] md:w-[70%] xl:w-[400px] flex justify-center flex-col gap-3 m-auto" @submit.enter.prevent="login()">
        <label for="username" class="font-semibold">Username</label>
        <input type="text" required
          class="h-[35px] rounded-lg text-black border-2 border-slate-500 focus:outline-none focus:border-3 focus:border-sky-500 bg-white"
          v-model="LoginData.username">
        <label for="username" class="font-semibold">Password</label>
        <input type="password" required
          class="h-[35px] rounded-lg text-black border-2 border-slate-500 focus:outline-none focus:border-3 focus:border-sky-500 bg-white"
          v-model="LoginData.password">
        <button type="submit" class="h-[35px] bg-[#3d7fa1] text-white rounded-lg my-5">Sign in account</button>
      </form>
      <router-link to="/forgot-password" class="text-[15px]">Forgot Password ?</router-link>
      <button @click="register" class="w-[90%] md:w-[70%] xl:w-[400px] h-[35px] bg-[#3d7fa1] text-white rounded-lg mt-[7rem] m-auto">Sign up
        account</button>
      <p class="mt-5 text-[15px] w-[90%] xl:w-[500px] text-center">ถ้าผู้ใช้งานเคยมี Account บนเว็บไซต์อยู่แล้ว
        ให้เข้าสู่ระบบด้วยชื่อผู้ใช้และรหัสผ่านเพื่อเชื่อม Account ถ้ายังไม่มี Account ทำการ Sign up account
        เพื่อเป็นการสร้าง Account ใหม่</p>
    </div>
  </div>
</template>
<script>
import { config } from "../../config";
import axios from "axios";
import { toast } from 'vue3-toastify';
export default {
  name: "Login",
  data() {
    return {
      LoginData: {
        "username": null,
        "password": null
      }
    };
  },
  methods: {
    login() {
      const api = `${config.EndPoint}/auth/login`
      axios.post(api, this.LoginData ,{ withCredentials: true }).then(async (res) => {
        if (res.status === 200) {
          await toast("เข้าสู่ระบบสำเร็จ!!", {
            "theme": "dark",
            "type": "success",
            "position": "top-center",
            "pauseOnHover": false,
            "dangerouslyHTMLString": true
          })
          setTimeout(() => {
            this.$router.push("/home");
          }, 3000);
        }
      }).catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          toast("กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง", {
            "theme": "dark",
            "type": "error",
            "pauseOnHover": false,
            "dangerouslyHTMLString": true
          })
        }
      });
    },
    register() {
      this.$router.push("/register");
    }
  },
    created() {
        document.title = "Sign in | UKB Developer";
    }
};
</script>

<style></style>


<style></style>