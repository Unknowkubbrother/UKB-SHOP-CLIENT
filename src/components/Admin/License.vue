<template>
    <div class="w-full flex justify-between items-center mb-5 mt-2">
        <h1 class="font-bold text-2xl">Licenses</h1>
        <button @click="Uiaddlicense = !Uiaddlicense" class="bg-[#3d7fa1] text-white rounded-lg px-3 py-1 hover:bg-[#2d637e] duration-300">Add
            License</button>
    </div>
    <table class="table-auto rounded-lg overflow-hidden w-full bg-[#2b2b2b]">
        <thead></thead>
        <thead>
            <tr class="bg-[#3d7fa1]">
                <th class="px-4 py-2 text-center">Name</th>
                <th class="px-4 py-2 text-center ">License</th>
                <th class="px-4 py-2 text-center">Active</th>
                <th class="px-4 py-2 text-center">IP Address</th>
                <th class="px-4 py-2 text-center">RENT</th>
                <th class="px-4 py-2 text-center">StartDate</th>
                <th class="px-4 py-2 text-center">EndDate</th>
                <th class="px-4 py-2 text-center">Owner</th>
                <th class="px-4 py-2 text-center">Delete</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="data in license.data" :key="data.id">
                <td class="px-4 py-2 text-center"> {{ data.nameScript }} </td>
                <td class="px-4 py-2 text-center flex gap-2 flex-wrap">
                    <span> {{ data.license }}</span>
                </td>
                <td class="px-4 py-2 text-center">
                    {{ data.status }}
                </td>
                <td class="px-4 py-2 text-center">{{ data.ipaddress }}</td>
                <td class="px-4 py-2 text-center">
                    <i class="fa-solid fa-check text-gree-400" v-if="data.rent.status"></i>
                    <i class="fa-solid fa-xmark" v-else></i>
                </td>
                <td class="px-4 py-2 text-center">
                    {{ data.rent.startDate }}
                </td>
                <td class="px-4 py-2 text-center">
                    {{ data.rent.endDate }}
                </td>
                <td class="px-4 py-2 text-center">
                    {{ data.owner }}
                </td>
                <td class="px-4 py-2 text-center">
                    <i class="fa-solid fa-trash cursor-pointer text-rose-400 hover:text-rose-700 duration-300"
                        @click="delete_a_license(data)"></i>
                </td>
            </tr>

        </tbody>
    </table>
    <div v-if="Uiaddlicense == true"
        class="w-[500px] p-5 py-3 bg-[#202020] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg border-y-2 border-sky-500 z-50">
        <div class="flex w-full h-full flex-col">
            <div class="flex">
                <div class="w-full px-4 py-2 pt-4 font-semibold text-center text-xl">Add a license</div>
                <i class="fa-solid fa-xmark cursor-pointer hover:text-rose-400 duration-300" @click="Uiaddlicense = false"></i>
            </div>
            <div class="my-10">
                <form class="w-[90%] m-auto flex justify-center flex-col gap-2" @submit.enter.prevent="Addlicense()">
                    <label for="nameScript" class="font-semibold">ScriptName</label>
                    <input type="text" placeholder="Enter ScriptName" required v-model="addlicense.nameScript"
                        class="w-full px-4 py-2 text-white rounded-lg outline-none bg-transparent border-y-2 border-sky-500">
                    <label for="ipaddress" class="font-semibold">IP Address</label>
                    <input type="text" placeholder="Enter IP address" required v-model="addlicense.ipaddress"
                        class="w-full px-4 py-2 text-white rounded-lg outline-none bg-transparent border-y-2 border-sky-500">
                    <label for="owner" class="font-semibold">Owner</label>
                    <input type="text" placeholder="Enter Owner" required v-model="addlicense.owner"
                        class="w-full px-4 py-2 text-white rounded-lg outline-none bg-transparent border-y-2 border-sky-500">

                    <div class="flex mt-2">
                        <div class="flex items-center h-5">
                            <input id="helper-checkbox" aria-describedby="helper-checkbox-text" type="checkbox"
                                v-model="addlicense.rent.status"
                                class="w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-[#3d7fa1]  dark:focus:ring-[#3d7fa1] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        </div>
                        <div class="ms-2">
                            <label for="helper-checkbox"
                                class="text-gray-900 dark:text-gray-300 font-semibold">Rent</label>
                            <p id="helper-checkbox-text" class="text-sm font-normal dark:text-rose-400">
                                ถ้าใช้ระบบเช็คหมดอายุให้ติ๊กถูกถ้าไม่ใช้ไม่ต้องติ๊กถูก</p>
                        </div>
                    </div>
                    <div class="flex justify-center flex-col gap-2" v-if="addlicense.rent.status">
                        <label for="startDate" class="font-semibold">StartDate</label>
                        <input type="date" v-model="addlicense.rent.startDate" required
                            class="w-full px-4 py-2 text-white rounded-lg outline-none bg-transparent border-y-2 border-sky-500">
                        <label for="endDate" class="font-semibold">EndDate</label>
                        <input type="date" v-model="addlicense.rent.endDate" required
                            class="w-full px-4 py-2 text-white rounded-lg outline-none bg-transparent border-y-2 border-sky-500">
                    </div>
                    <button type="submit"
                        class="w-[400px] h-[35px] bg-[#3d7fa1] text-white rounded-lg mt-2 hover:bg-[#3592c0] duration-300">Submit</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { config } from "../../config";
import { toast } from 'vue3-toastify';
export default {
    name: "License",
    data() {
        return {
            license: {
                data: []
            },
            Uiaddlicense: false,
            addlicense: {
                nameScript: null,
                ipaddress: null,
                owner: null,
                rent: {
                    status: false,
                    startDate: null,
                    endDate: null
                }
            }
        };
    },
    methods: {
        getAllLicenses() {
            const api = `${config.EndPoint}/license`;
            axios.get(api, { withCredentials: true }).then((res) => {
                if (res.status === 200) {
                    this.license.data = res.data
                }
            }).catch((err) => {
                console.log(err);
                this.license.data = []
                if (err.response.status === 400) {
                    toast("กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง", {
                        "theme": "dark",
                        "type": "error",
                        "pauseOnHover": false,
                        "dangerouslyHTMLString": true
                    })
                } else if (err.response.status === 403) {
                    toast("ไม่มีผู้ใช้อยู่ในระบบ", {
                        "theme": "dark",
                        "type": "error",
                        "pauseOnHover": false,
                        "dangerouslyHTMLString": true
                    })
                }
            });

        },
        delete_a_license(data) {
            const api = `${config.EndPoint}/license`;
            axios.delete(api, {
                withCredentials: true,
                data: { license: data.license, owner: data.owner }, // Modify the data payload
            }).then((res) => {
                if (res.status === 200) {
                    toast("ลบ License สำเร็จ!!", {
                        "theme": "dark",
                        "type": "success",
                        "pauseOnHover": false,
                        "dangerouslyHTMLString": true
                    })
                    this.getAllLicenses()
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
                } else if (err.response.status === 404) {
                    toast("ไม่มีผู้ใช้อยู่ในระบบ", {
                        "theme": "dark",
                        "type": "error",
                        "pauseOnHover": false,
                        "dangerouslyHTMLString": true
                    })
                }
            });
        },
        Addlicense(){
            if(this.addlicense.rent.status){
                if(this.addlicense.rent.startDate === null || this.addlicense.rent.endDate === null){
                    toast("กรุณากรอกข้อมูลให้ครบถ้วน", {
                        "theme": "dark",
                        "type": "error",
                        "pauseOnHover": false,
                        "dangerouslyHTMLString": true
                    })
                    return
                }
            }else{
                this.addlicense.rent.startDate = null
                this.addlicense.rent.endDate = null
            }
            const api = `${config.EndPoint}/license`;
            axios.post(api, this.addlicense, { withCredentials: true }).then((res) => {
                if (res.status === 201) {
                    toast("เพิ่ม License สำเร็จ!!", {
                        "theme": "dark",
                        "type": "success",
                        "pauseOnHover": false,
                        "dangerouslyHTMLString": true
                    })
                    this.getAllLicenses()
                    this.Uiaddlicense = false
                    this.addlicense = {
                        nameScript: null,
                        ipaddress: null,
                        owner: null,
                        rent: {
                            status: false,
                            startDate: null,
                            endDate: null
                        }
                    }
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

        }
    },
    mounted() {
        if (this.$cookies.get('logged_in') && this.$cookies.get('ukb-data').role === 'staff') {
            this.getAllLicenses()
        } else {
            this.$router.push('/login')
        }
    }

}  
</script>

<style></style>