<template>
    <div class="w-full h-full">
        <div class="md:w-[75%] m-auto bg-base-100 rounded-md p-5 mb-10">
            <div class="border-b-2 border-b-[#505050] pb-3 ">เพิ่ม License ใหม่ แบบ Custom</div>
            <form class="flex flex-col gap-4 mt-5" @submit.enter.prevent="Addlicense()">
                <div>
                    <label>Resource ID</label>
                    <input type="text"
                        class="w-full h-[2.5rem] px-3 py-2 rounded-lg border border-[#4b4b4b] focus:outline-none focus:border-blue-500 bg-base-100 mt-2"
                        required v-model="addlicense.scriptId" readonly>
                </div>
                <div>
                    <label>Resource Name</label>
                    <input type="text"
                        class="w-full h-[2.5rem] px-3 py-2 rounded-lg border border-[#4b4b4b] focus:outline-none focus:border-blue-500 bg-base-100 mt-2"
                        required v-model="addlicense.nameScript" readonly>
                </div>
                <div>
                    <label>IP Address</label>
                    <input type="text"
                        class="w-full h-[2.5rem] px-3 py-2 rounded-lg border border-[#4b4b4b] focus:outline-none focus:border-blue-500 bg-base-100 mt-2"
                        required v-model="addlicense.ipaddress">
                </div>
                <div>
                    <label>Owner</label>
                    <div class="w-full">
                        <select v-model="addlicense.owner" @change="updateOwner" class="w-full h-[2.5rem] px-3 py-2 rounded-lg border border-[#4b4b4b] focus:outline-none focus:border-blue-500 bg-base-100 mt-2" required>
                        <option v-for="(item,idx) in user" :key="idx" :value="item.username">
                            {{ item.username }}
                        </option>
                    </select>
                    </div>
                </div>
                <div class="flex mt-2">
                    <div class="flex items-center h-5">
                        <input id="helper-checkbox" aria-describedby="helper-checkbox-text" type="checkbox"
                            v-model="addlicense.rent.status"
                            class="w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-[#3d7fa1]  dark:focus:ring-[#3d7fa1] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    </div>
                    <div class="ms-2">
                        <label for="helper-checkbox" class="text-gray-900 dark:text-gray-300 font-semibold">Rent</label>
                        <span id="helper-checkbox-text" class="text-sm font-normal dark:text-rose-400">
                            ( ถ้าใช้ระบบเช็คหมดอายุให้ติ๊กถูกถ้าไม่ใช้ไม่ต้องติ๊กถูก )</span>
                    </div>
                </div>
                <div class="flex justify-center flex-col gap-2" v-if="addlicense.rent.status">
                    <label for="startDate" class="font-semibold">StartDate</label>
                    <input type="date" v-model="addlicense.rent.startDate" required
                        class="ww-full h-[2.5rem] px-3 py-2 rounded-lg border border-[#4b4b4b] focus:outline-none focus:border-blue-500 bg-base-100 mt-2">
                    <label for="endDate" class="font-semibold">EndDate</label>
                    <input type="date" v-model="addlicense.rent.endDate" required
                        class="w-full h-[2.5rem] px-3 py-2 rounded-lg border border-[#4b4b4b] focus:outline-none focus:border-blue-500 bg-base-100 mt-2">
                </div>
                <button type="submit"
                    class="py-2 bg-[#3d7fa1] text-white rounded-lg mt-2 hover:bg-[#3592c0] duration-300">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { config } from '../../../../../config';
import { toast } from 'vue3-toastify';
export default {
    name: 'Custom_License',
    props: {
        script: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            user: [],
            addlicense: {
                nameScript: this.script.nameScript,
                scriptId: this.script.id,
                ipaddress: null,
                owner: null,
                rent: {
                    status: false,
                    startDate: null,
                    endDate: null
                },
                status: 'active'
            }
        }
    },
    methods: {
        async Addlicense() {
            if (this.addlicense.rent.status) {
                if (this.addlicense.rent.startDate === null || this.addlicense.rent.endDate === null) {
                    toast("กรุณากรอกข้อมูลให้ครบถ้วน", {
                        "theme": "dark",
                        "type": "error",
                        "pauseOnHover": false,
                        "dangerouslyHTMLString": true
                    })
                    return
                }
            } else {
                this.addlicense.rent.startDate = null
                this.addlicense.rent.endDate = null
            }
            const api = `${config.EndPoint}/license/staff`;
            await axios.post(api, this.addlicense, { withCredentials: true }).then((res) => {
                if (res.status === 201) {
                    toast("เพิ่ม License สำเร็จ!!", {
                        "theme": "dark",
                        "type": "success",
                        "pauseOnHover": false,
                        "dangerouslyHTMLString": true
                    })
                    setTimeout(() => {
                        location.reload();
                    }, 3000);
                }
            }).catch((err) => {
                console.log(err);
                if (err.response.status === 400) {
                    toast("กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง", {
                        "theme": "dark",
                        "type": "error",
                        "pauseOnHover": false,
                        "dangerouslyHTMLString": true
                    })
                } else if (err.response.status === 409) {
                    toast("มี License นี้อยู่ในระบบแล้ว", {
                        "theme": "dark",
                        "type": "error",
                        "pauseOnHover": false,
                        "dangerouslyHTMLString": true
                    })
                }
            });
        },
        async getAllUser() {
            const api = `${config.EndPoint}/auth/user`;
            await axios.get(api, { withCredentials: true }).then((res) => {
                if (res.status === 200) {
                    this.user = res.data;
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    },
    mounted() {
        this.getAllUser()
    }

}
</script>

<style></style>