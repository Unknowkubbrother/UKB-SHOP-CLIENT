<template>
    <div class="w-full h-full">
        <div class="xl:w-[75%] m-auto bg-base-100 rounded-md p-5">
            <div class="border-b-2 border-b-[#505050] pb-3 ">Update version <span>เวอร์ชั่นล่าสุดคือ {{ getMaxVersion
                    }}</span></div>
            <div class="flex flex-col gap-4 mt-5">
                <div>
                    <div class="flex flex-col">
                        <label>Version <span class="text-rose-400">*</span></label>
                        <div>
                            <span class="text-[#777777] text-sm">เวอร์ชั่นของ Script</span>
                            <span class="text-orange-200 text-sm ml-2">(ใส่เป็นตัวเลขเท่านั้น int or float)</span>
                        </div>
                    </div>
                    <input type="text"
                        class="w-full h-[2.5rem] px-3 py-2 rounded-lg border border-[#4b4b4b] focus:outline-none focus:border-blue-500 bg-base-100 mt-2"
                        placeholder="Enter Version" v-model="Changelogs[0].version">
                    <div class="flex flex-col mt-5">
                        <label>Log <span class="text-rose-400">*</span>
                            <span class="text-orange-200 text-sm ml-2">(ถ้าใส่หลายข้อความให้ Enter
                                ขึ่นบรรทัดใหม่)</span></label>
                    </div>
                    <textarea placeholder="Enter logs" required name="logs[]" multiple
                        class="w-full h-24 max-h-24 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500 bg-base-100 mt-2 overflow-auto"
                        v-model="Changelogs[0].logs"
                        @change="Changelogs[0].logs = $event.target.value ? $event.target.value.split('\n') : []"></textarea>
                    <div class="mt-3">
                        <label>Download <span class="text-rose-400">*</span></label>
                        <span class="text-[#777777] text-sm ml-2">ลิ้งดาวน์โหลดของ Script</span>
                        <input type="text"
                            class="w-full h-[2.5rem] px-3 py-2 rounded-lg border border-[#4b4b4b] focus:outline-none focus:border-blue-500 bg-base-100 mt-2"
                            placeholder="Enter Link Download" v-model="download">
                    </div>
                    <div class="w-full flex justify-end items-center mt-2 gap-4">
                        <button type="submit"
                            class="w-[100px] h-[35px] bg-rose-400 text-white rounded-lg my-5 hover:bg-rose-700 duration-300"
                            @click="(
                                Changelogs[0].version = null, Changelogs[0].logs = [], download = null)">ยกเลิก</button>
                        <button type="submit"
                            class="w-[100px] h-[35px] bg-[#3d7fa1] text-white rounded-lg my-5 hover:bg-secondary duration-300"
                            @click="updateVersion">ยันยืน</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { config } from '../../../../../config';
import { toast } from 'vue3-toastify';
export default {
    name: 'Update_Version',
    props: {
        script_Version: {
            type: Object,
            required: true

        }
    },
    data() {
        return {
            Changelogs: [
                {
                    version: '',
                    logs: []
                },
            ],
            download: null
        }
    },
    methods: {
        async updateVersion() {
            if (!this.Changelogs[0].version || !this.download || !this.Changelogs[0].logs) {
                toast("กรุณากรอกข้อมูลให้ครบ", {
                    "theme": "dark",
                    "type": "error",
                    "position": "top-center",
                    "pauseOnHover": false,
                    "dangerouslyHTMLString": true
                });
                return;
            }
            const api = `${config.EndPoint}/script_admin_version/${this.$route.params.id}`;
            await axios.put(api, { Changelogs: this.Changelogs, download: this.download }, { withCredentials: true }).then((res) => {
                if (res.status === 200) {
                    toast("Update Script Success", {
                        "theme": "dark",
                        "type": "success",
                        "position": "top-center",
                        "pauseOnHover": false,
                        "dangerouslyHTMLString": true
                    });
                    setTimeout(() => {
                        location.reload();
                    }, 3000);
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    },
    computed: {
        getMaxVersion() {
            if (this.script_Version) {
                return this.script_Version.filter((item) => item.version).sort((a, b) => b.version - a.version)[0].version;
            }
            return null;
        }
    }

}
</script>

<style></style>