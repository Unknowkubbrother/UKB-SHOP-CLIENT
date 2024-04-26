<template>
    <div class="w-full h-full">
        <div class="w-[95%] m-auto bg-base-100 rounded-md p-5">
            <div class="border-b-2 border-b-[#505050] pb-3 ">ผู้ใช้ที่ถือของ Script อยู่</div>
            <div class="w-full mt-5">
                <table class="w-full table-auto rounded-lg overflow-hidden">
                    <thead>
                        <tr class="">
                            <th class="px-5 py-2 text-center">ผู้ใช้</th>
                            <th class="px-5 py-2 text-center">ไอพี</th>
                            <th class="px-5 py-2 text-center">ใบอนุญาต</th>
                            <th class="px-5 py-2 text-center">เช่า</th>
                            <th class="px-5 py-2 text-center">วันเริ่มต้น</th>
                            <th class="px-5 py-2 text-center">วันสิ้นสุด</th>
                            <th class="px-5 py-2 text-center">สถานะ</th>
                            <th class="px-5 py-2 text-center">ลบ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, idx) in data" :key="idx">
                            <td class="px-5 py-2 text-center">{{ item.owner }}</td>
                            <td class="px-5 py-2 text-center">{{ item.ipaddress }}</td>
                            <td class="px-5 py-2 text-center">{{ item.license }}</td>
                            <td class="px-4 py-2 text-center">
                                <i class="fa-solid fa-check text-gree-400" v-if="item.rent.status"></i>
                                <i class="fa-solid fa-xmark" v-else></i>
                            </td>
                            <td class="px-4 py-2 text-center">
                                {{ item.rent.startDate }}
                            </td>
                            <td class="px-4 py-2 text-center">
                                {{ item.rent.endDate }}
                            </td>
                            <td class="px-5 py-2 text-center"
                                :class="(item.status) == 'active' ? 'text-green-400' : 'text-rose-400'">{{ item.status }}
                            </td>
                            <td class="px-5 py-2 text-center"><i
                                    class="fa-solid fa-trash cursor-pointer text-rose-400 hover:text-rose-700 duration-300"
                                    @click="delete_a_license(item)"></i></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { config } from '../../../../../config';
import { toast } from 'vue3-toastify';
export default {
    name: 'User_Script',
    data() {
        return {
            data: []
        }
    },
    methods: {
        async getScriptFromUser() {
            const api = `${config.EndPoint}/license/${this.$route.params.id}`
            await axios.get(api, { withCredentials: true }).then((res) => {
                this.data = res.data
            }).catch((err) => {
                console.log(err);
            });
        },
        async delete_a_license(data) {
            const api = `${config.EndPoint}/license`;
            await axios.delete(api, {
                withCredentials: true,
                data: { license: data.license, owner: data.owner }, // Modify the data payload
            }).then((res) => {
                if (res.status === 200) {
                    toast("ลบ License สำเร็จ!!", {
                        "theme": "dark",
                        "type": "success",
                        "position": "top-center",
                        "pauseOnHover": false,
                        "dangerouslyHTMLString": true
                    })
                    setTimeout(() => {
                        this.getScriptFromUser()
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
    },
    mounted() {
        this.getScriptFromUser()
    }

}
</script>

<style></style>