<template>
    <div id="Dashboard" class="relative">
        <div class="w-[95%] xl:w-[90%] h-full m-auto" :class="AddLicenseData.show || ResetLicenseData.show ? 'blur select-none' : ''">
            <div class="flex justify-start items-center my-10">
                <h1 class="font-bold text-2xl">DASHBOARD</h1>
            </div>
            <div class="profile flex flex-col md:flex-row xl:flex-row justify-center xl:justify-between items-center">
                <div class="w-full flex flex-col md:flex-row xl:flex-row justify-start items-center">
                    <div class="profile-img w-[100px] h-[100px] xl:w-[150px] xl:h-[150px] bg-[#262626] rounded-full overflow-hidden">
                        <img src="../../assets/noprofile.jpg" alt="profile" class="w-full h-full object-cover">
                    </div>
                    <div class="mt-10 xl:ml-10 xl:mt-0 flex flex-col gap-3 xl:gap-2 text-center justify-center items-center xl:items-start">
                        <!-- <div class="text-xl font-semibold text-[#3690bd]"><span id="username">Natchkung</span></div> -->
                        <div class="h-[40px] bg-[#262626] rounded-[5px] flex overflow-hidden">
                            <div
                                class="h-full bg-[#3d7fa1] flex justify-center items-center text-lg font-semibold px-5">
                                <span>Username</span>
                            </div>
                            <div class="h-full flex justify-center items-center text-lg"><span id="username"
                                    class="px-5 text-center">{{ profile.username }}</span></div>
                        </div>
                        <div class="mt-2 xl:mt-0 text-[17px]"><span id="email">{{ profile.email }}</span></div>
                        <div class="text-[17px] text-[#a3a3a3]">ID: <span ref="id">{{ profile.id }}</span><button
                                @click="copy" class="ml-2 text-center text-[#3d7fa1] hover:text-sky-500"><i
                                    class="fa-solid fa-copy"></i></button></div>
                    </div>
                </div>
                <div class="md:w-[300px] 2xl:w-[250px]">
                    <button @click="ipaddress"
                        class="bg-[#3d7fa1] mt-5 xl:mt-0 text-white px-5 py-2 rounded-lg hover:bg-[#265e7a] duration-300"> Copy your IP address</button>
                </div>
            </div>
            <div class="w-[90%] xl:w-[75%] m-auto rounded-lg border border-[#555555] bg-[#262626] my-10 p-5 xl:p-10 flex flex-col">
                <div class="flex justify-start items-start gap-3">
                    <i class="fa-solid fa-circle-exclamation text-rose-600 text-2xl"></i>
                    <div>
                        <span class="text-lg font-semibold">โปรดอ่าน!!</span>
                        <p>หากคุณได้เปลี่ยน IP สคริปต์นั้นไปแล้ว จะต้องรออีก <span class="text-rose-600">1
                                วัน</span> ถึงจะสามารถปรับเปลี่ยน
                            IP ของสคริปต์นั้นๆได้อีกครั้ง</p>
                        <p class="text-orange-300">ถ้าหากสคริปที่คุณเช่าหมดอายุแล้วจะไม่หายจากหน้า Dashboard
                            จะหายตอนที่คุณใช้งานสคริปล่าสุดระบบจะทำการลบสคริปของคุณอัตโนมัติและไม่สามารถใช้งานได้</p>
                    </div>

                </div>
            </div>
            <div class="license w-[95%] xl:w-full flex justify-center items-center overflow-auto m-auto">
                <div v-if="license.Enabled">
                    <table class="table-auto bg-[#262626] rounded-lg overflow-hidden mb-10">
                        <thead>
                            <tr class="bg-[#3d7fa1]">
                                <th class="px-4 py-2 text-center">Name</th>
                                <th class="px-4 py-2 text-center ">License</th>
                                <th class="px-4 py-2 text-center">Active</th>
                                <th class="px-4 py-2 text-center">Rent</th>
                                <th class="px-4 py-2 text-center">StartDate</th>
                                <th class="px-4 py-2 text-center">EndDate</th>
                                <th class="px-4 py-2 text-center">IP Address</th>
                                <th class="px-4 py-2 text-center">ตั้ง IP</th>
                                <th class="px-4 py-2 text-center">Download</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="data in license.data" :key="data.id">
                                <td class="px-4 py-2 text-center">{{ data.nameScript }}</td>
                                <td class="px-4 py-2 text-center flex gap-2 flex-wrap">
                                    <div v-if="data.license != 'ยังไม่ได้เชื่อมต่อ License'">
                                        <span v-if="data.show" class="select-all">{{ data.license }}</span>
                                        <span v-else class="blur select-none">{{ data.license }}</span>
                                    </div>
                                    <div v-else>
                                        <span class="select-none">{{ data.license }}</span>
                                    </div>
                                    <button v-if="data.license != 'ยังไม่ได้เชื่อมต่อ License'"
                                        @click="data.show = !data.show" class="text-[#3d7fa1] hover:text-sky-500"><i
                                            class="fa-solid fa-eye"></i></button>
                                    <button v-if="data.show" @click="copyLicense(data)"
                                        class="ml-1 text-center text-[#3d7fa1] hover:text-sky-500"><i
                                            class="fa-solid fa-copy"></i></button>

                                </td>
                                <td class="px-4 py-2 text-center">
                                    <Switch1 v-model="data.status" @click="LicenseActiveControl(data)"
                                        v-if="data.ipaddress != 'ยังไม่ได้เชื่อมต่อ IP'"
                                        :class="(data.status === 'active') ? 'bg-green-400' : 'bg-gray-200'"
                                        class="relative inline-flex h-6 w-11 items-center rounded-full">
                                        <span class="sr-only">Enable notifications</span>
                                        <span :class="(data.status === 'inactive') ? 'translate-x-6' : 'translate-x-1'"
                                            class="inline-block h-4 w-4 transform rounded-full bg-white transition" />
                                    </Switch1>
                                    <Switch1 v-model="data.status" @click="LicenseActiveControl(data)" v-else
                                        :class="(data.status === 'active') ? 'bg-green-400' : 'bg-gray-200'"
                                        class="relative inline-flex h-6 w-11 items-center rounded-full">
                                        <span class="sr-only">Enable notifications</span>
                                        <span :class="(data.status === 'inactive') ? 'translate-x-6' : 'translate-x-6'"
                                            class="inline-block h-4 w-4 transform rounded-full bg-white transition" />
                                    </Switch1>

                                </td>
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
                                <td class="px-4 py-2 text-center">{{ data.ipaddress }}</td>
                                <td class="px-4 py-2 text-center">
                                    <button @click="UiResetLicense(data)"
                                        v-if="data.ipaddress != 'ยังไม่ได้เชื่อมต่อ IP'">
                                        <i
                                            class="fa-solid fa-pen-to-square text-[#3d7fa1] text-lg hover:text-sky-500"></i>
                                    </button>
                                    <button @click="UiAddLicense(data)" v-else>
                                        <i
                                            class="fa-solid fa-pen-to-square text-[#3d7fa1] text-lg hover:text-sky-500"></i>
                                    </button>
                                </td>
                                <td class="px-4 py-2 text-center"><a :href="data.download"><i class="fa fa-download text-lg text-orange-300 hover:text-orange-400 cursor-pointer" aria-hidden="true"></i></a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else class="w-full h-[300px] flex justify-center items-center">
                    <div class="text-[#3d7fa1] text-2xl">You didn't own any resource. . .</div>
                </div>
            </div>
        </div>
        <Transition>
        <div v-if="ResetLicenseData.show"
            class="w-[95%] xl:w-[500px] h-[110px] bg-[#202020] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg z-50 shadow-lg shadow-black">
            <div class="flex justify-start items-start w-full h-full flex-col">
                <div class="px-4 py-2 pt-4 font-semibold">IP Address</div>
                <div class="w-[95%] flex items-center justify-start m-auto">
                    <input type="text" v-model="ResetLicenseData.data.newipaddress" placeholder="Enter new IP address"
                        required
                        class="w-[80%] xl:w-[400px] px-4 py-2 ml-2 text-white rounded-lg outline-none bg-transparent border-b-2 border-sky-500 m-auto">
                    <i class="fa-solid fa-floppy-disk hover:text-[#3d7fa1] duration-300 cursor-pointer ml-5"
                        @click="ResetLicense()"></i>
                    <i class="fa-solid fa-xmark hover:text-rose-700 duration-300 cursor-pointer ml-5"
                        @click="ResetLicenseData.show = false"></i>
                </div>
            </div>
        </div>
        </Transition>

        <Transition>
            <div v-if="AddLicenseData.show"
            class="w-[95%] xl:w-[500px] h-[110px] bg-[#202020] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg z-50 shadow-lg shadow-black">
            <div class="flex justify-start items-start w-full h-full flex-col">
                <div class="px-4 py-2 pt-4 font-semibold">IP Address</div>
                <div class="w-[95%] flex items-center justify-start m-auto">
                        <input type="text" v-model="AddLicenseData.data.ipaddress" placeholder="Enter new IP address"
                            required
                            class="w-[80%] xl:w-[400px] px-4 py-2 ml-2 text-white rounded-lg outline-none bg-transparent border-b-2 border-sky-500 m-auto">
                        <i class="fa-solid fa-floppy-disk hover:text-[#3d7fa1] duration-300 cursor-pointer ml-5"
                            @click="AddLicense()"></i>
                        <i class="fa-solid fa-xmark hover:text-rose-700 duration-300 cursor-pointer ml-5"
                            @click="AddLicenseData.show = false"></i>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script>
import { config } from "../../config";
import { toast } from 'vue3-toastify';
import axios from 'axios';
export default {
    name: "Dashboard",
    data() {
        return {
            license: {
                Enabled: false,
                data: []
            },
            profile: {
                username: this.$cookies.get('ukb-data').username,
                email: this.$cookies.get('ukb-data').email,
                id: this.$cookies.get('ukb-data')['_id']
            },
            ResetLicenseData: {
                show: false,
                data: []
            },
            AddLicenseData: {
                show: false,
                data: []
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
        copyLicense(data) {
            navigator.clipboard.writeText(data.license);
            toast(`คัดลอก License สำเร็จ!!`, {
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
            axios.post(api, {}, { withCredentials: true }).then(async (res) => {
                if (res.status === 200) {
                    this.license.data = res.data
                    if (this.license.data == 0) {
                        this.license.Enabled = false
                    } else {
                        this.license.Enabled = true
                    }
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
        LicenseActiveControl(data) {
            if (data.ipaddress == 'ยังไม่ได้เชื่อมต่อ IP') {
                toast("กรุณาตรวจสอบ IP ของคุณอีกครั้ง", {
                    "theme": "dark",
                    "type": "error",
                    "pauseOnHover": false,
                    "dangerouslyHTMLString": true
                })
            } else {
                const api = `${config.EndPoint}/license/activeControl`
                axios.post(api, {
                    license: data.license
                }, { withCredentials: true }).then(async (res) => {
                    if (res.status === 200) {
                        if (res.data === 'active') {
                            data.status = 'active'
                            toast("เปิดใช้งานสำเร็จ!!", {
                                "theme": "dark",
                                "type": "success",
                                "position": "top-center",
                                "pauseOnHover": false,
                                "dangerouslyHTMLString": true
                            })
                        } else if (res.data === 'inactive') {
                            data.status = 'inactive'
                            toast("ปิดใช้งานสำเร็จ!!", {
                                "theme": "dark",
                                "type": "success",
                                "position": "top-center",
                                "pauseOnHover": false,
                                "dangerouslyHTMLString": true
                            })
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
                    } else if (err.response.status === 404) {
                        toast("ไม่มีผู้ใช้อยู่ในระบบ", {
                            "theme": "dark",
                            "type": "error",
                            "pauseOnHover": false,
                            "dangerouslyHTMLString": true
                        })
                    }
                });
            }
        },
        UiResetLicense(data) {
            this.ResetLicenseData.show = true
            this.ResetLicenseData.data = []
            this.ResetLicenseData.data.newipaddress = data.ipaddress
            this.ResetLicenseData.data.license = data.license
            this.ResetLicenseData.data.scriptId = data.scriptId
        },
        UiAddLicense(data) {
            this.AddLicenseData.show = true
            this.AddLicenseData.data = []
            this.AddLicenseData.data.nameScript = data.nameScript
            this.AddLicenseData.data.id = data.id
            this.AddLicenseData.data.scriptId = data.scriptId
        },
        AddLicense() {
            const api = `${config.EndPoint}/license/`
            axios.post(api, {
                id: this.AddLicenseData.data.id,
                nameScript: this.AddLicenseData.data.nameScript,
                ipaddress: this.AddLicenseData.data.ipaddress,
                scriptId: this.AddLicenseData.data.scriptId
            }, { withCredentials: true }).then(async (res) => {
                if (res.status === 201) {
                    await toast("เพิ่ม IP สำเร็จ!!", {
                        "theme": "dark",
                        "type": "success",
                        "position": "top-center",
                        "pauseOnHover": false,
                        "dangerouslyHTMLString": true
                    })
                    setTimeout(() => {
                        location.reload()
                    }, 3000);
                }
            }).catch((err) => {
                console.log(err);
                if (err.response.status == 400) {
                    toast(err.response.data, {
                        "theme": "dark",
                        "type": "error",
                        "pauseOnHover": false,
                        "dangerouslyHTMLString": true
                    })
                    setTimeout(() => {
                        location.reload()
                    }, 3000);
                } else if (err.response.status == 404) {
                    toast("ID NOT FOUND!!", {
                        "theme": "dark",
                        "type": "error",
                        "pauseOnHover": false,
                        "dangerouslyHTMLString": true
                    })
                    setTimeout(() => {
                        location.reload()
                    }, 3000);
                } else if (err.response.status == 409) {
                    toast("มี IP นี้อยู่ในระบบแล้ว!!", {
                        "theme": "dark",
                        "type": "error",
                        "pauseOnHover": false,
                        "dangerouslyHTMLString": true
                    })
                    setTimeout(() => {
                        location.reload()
                    }, 3000);
                }
            });

        },
        ResetLicense() {
            const api = `${config.EndPoint}/license`
            axios.put(api, {
                license: this.ResetLicenseData.data.license,
                Newipaddress: this.ResetLicenseData.data.newipaddress,
                scriptId: this.ResetLicenseData.data.scriptId
            }, { withCredentials: true }).then(async (res) => {
                if (res.status === 200) {
                    await toast("Reset License สำเร็จ!!", {
                        "theme": "dark",
                        "type": "success",
                        "position": "top-center",
                        "pauseOnHover": false,
                        "dangerouslyHTMLString": true
                    })
                    setTimeout(() => {
                        location.reload()
                    }, 3000);
                }
            }).catch((err) => {
                console.log(err);
                if (err.response.status == 400) {
                    toast(err.response.data, {
                        "theme": "dark",
                        "type": "error",
                        "pauseOnHover": false,
                        "dangerouslyHTMLString": true
                    })
                    setTimeout(() => {
                        location.reload()
                    }, 3000);
                } else if (err.response.status == 409) {
                    toast("มี IP นี้อยู่ในระบบแล้ว!!", {
                        "theme": "dark",
                        "type": "error",
                        "pauseOnHover": false,
                        "dangerouslyHTMLString": true
                    })
                    setTimeout(() => {
                        location.reload()
                    }, 3000);
                } else if (err.response.status == 404) {
                    toast("License NOT FOUND!!", {
                        "theme": "dark",
                        "type": "error",
                        "pauseOnHover": false,
                        "dangerouslyHTMLString": true
                    })
                    setTimeout(() => {
                        location.reload()
                    }, 3000);
                }
            });
        },
        ipaddress() {
            axios.get('https://api.ipify.org?format=json').then((res) => {
                navigator.clipboard.writeText(res.data.ip);
                toast(`คัดลอกไอพีของคุณสำเร็จ : ${res.data.ip}`, {
                    "theme": "dark",
                    "type": "success",
                    "position": "top-center",
                    "pauseOnHover": false,
                    "autoClose": 1500,
                    "dangerouslyHTMLString": true
                })
            }).catch((err) => {
                console.log(err);
            });
        }
    },
    mounted() {
        if (this.$cookies.get('logged_in')) {
            this.getLicense()
        } else {
            this.$router.push('/login')
        }
    },
    created() {
        document.title = "Dashboard | UKB Developer";
    }

}
</script>

<style></style>