<template>
    <div class="w-full h-full">
        <div class="2xl:w-[75%] m-auto bg-base-100 rounded-md p-5">
            <div class="border-b-2 border-b-[#505050] pb-3 ">ข้อมูลทั่วไป</div>
            <div class="flex flex-col gap-4 mt-5">
                <div>
                    <label>ResourceID</label>
                    <input type="text"
                        class="w-full h-[2.5rem] px-3 py-2 rounded-lg border border-[#4b4b4b] focus:outline-none focus:border-blue-500 bg-base-100 mt-2"
                        :value="script?.id" readonly>
                </div>
                <div>
                    <div class="flex flex-col">
                        <label>ResourceName</label>
                        <span class="text-[#777777] text-sm">ใช้ได้เฉพาะภาษาอังกฤษ, ตัวเลข, เว้นวรรค และ _</span>
                    </div>
                    <input type="text"
                        class="w-full h-[2.5rem] px-3 py-2 rounded-lg border border-[#4b4b4b] focus:outline-none focus:border-blue-500 bg-base-100 mt-2"
                        :placeholder="script?.nameScript" :value="script?.nameScript"
                        @input="$emit('update:script', { ...script, nameScript: $event.target.value })">
                </div>
                <div>
                    <label>ShortDescription</label>
                    <textarea placeholder="Enter Description" :value="script?.shortDescription"
                        @input="$emit('update:script', { ...script, shortDescription: $event.target.value })"
                        class="w-full h-24 max-h-24 rounded-lg border border-[#4b4b4b] focus:outline-none focus:border-blue-500 bg-base-100 mt-2 overflow-auto"></textarea>
                </div>
                <div>
                    <label>Description</label>
                    <textarea placeholder="Enter Description" :value="script?.description"
                        @input="$emit('update:script', { ...script, description: $event.target.value })"
                        class="w-full h-24 max-h-24 rounded-lg border border-[#4b4b4b] focus:outline-none focus:border-blue-500 bg-base-100 mt-2 overflow-auto"></textarea>
                </div>
                <div>
                    <label>Webhook</label>
                    <input type="text"
                        class="w-full h-[2.5rem] px-3 py-2 rounded-lg border border-[#4b4b4b] focus:outline-none focus:border-blue-500 bg-base-100 mt-2"
                        :placeholder="script?.webhook" :value="script?.webhook"
                        @input="$emit('update:script', { ...script, webhook: $event.target.value })">
                </div>
                <div>
                    <label>Link Download</label>
                    <input type="text"
                        class="w-full h-[2.5rem] px-3 py-2 rounded-lg border border-[#4b4b4b] focus:outline-none focus:border-blue-500 bg-base-100 mt-2"
                        :placeholder="script?.download" :value="script?.download"
                        @input="$emit('update:script', { ...script, download: $event.target.value })">
                </div>
            </div>
        </div>

        <div class="2xl:w-[75%] m-auto bg-base-100 rounded-md p-5 my-10">
            <div class="border-b-2 border-b-[#505050] pb-3 ">โปรโมทอื่นๆ</div>
            <div class="flex flex-col gap-4 mt-5">
                <div>
                    <div class="flex flex-col">
                        <label>วิดีโอ (Youtube)</label>
                        <span class="text-[#777777] text-sm">ใช้ได้เฉพาะ link youtube</span>
                    </div>
                    <input type="text"
                        class="w-full h-[2.5rem] px-3 py-2 rounded-lg border border-[#4b4b4b] focus:outline-none focus:border-blue-500 bg-base-100 mt-2"
                        :placeholder="script.video" :value="script.video"
                        @input="$emit('update:script', { ...script, video: $event.target.value })">
                </div>
                <div>
                    <label>รูปภาพ</label>
                    <div class="flex justify-between items-center" v-for="(data, idx) in (script.image)"
                        :key="idx">
                        <span>Image #{{ idx + 1 }}</span>
                        <input type="text"
                            class="w-[90%] h-[2.5rem] px-3 py-2 rounded-lg border border-[#4b4b4b] focus:outline-none focus:border-blue-500 bg-base-100 m-auto mt-2"
                            :placeholder="data" :value="data"
                            @input="$emit('update:script', { ...script, image: script.image.map((item, index) => index === idx ? $event.target.value : item) })">
                    </div>
                </div>
            </div>
        </div>

        <div class="2xl:w-[75%] m-auto bg-base-100 rounded-md p-5 my-10">
            <div class="border-b-2 border-b-[#505050] pb-3 ">Changelogs</div>
            <div class="flex flex-col gap-4 mt-5">
                <div v-for="(changelog, index) in script?.Changelogs" :key="index">
                    <div class="flex flex-col">
                        <label>Version</label>
                        <span class="text-[#777777] text-sm">เวอร์ชั่นของ Script</span>
                    </div>
                    <input type="text"
                        class="w-full h-[2.5rem] px-3 py-2 rounded-lg border border-[#4b4b4b] focus:outline-none focus:border-blue-500 bg-base-100 mt-2"
                        :placeholder="changelog.version" :value="changelog.version"
                        @input="$emit('update:script', { ...script, Changelogs: script.Changelogs.map((item, idx) => idx === index ? { ...item, version: $event.target.value } : item) })">
                    <div class="flex flex-col mt-2">
                        <label>Logs</label>
                        <span class="text-[#777777] text-sm">รายละเอียด logs</span>
                    </div>
                    <textarea placeholder="Enter logs" required name="logs[]" multiple
                        class="w-full h-24 max-h-24 rounded-lg border border-[#4b4b4b] focus:outline-none focus:border-blue-500 bg-base-100 mt-2 overflow-auto"
                        :value="changelog.logs.join('\n')"
                        @input="$emit('update:script', { ...script, Changelogs: script.Changelogs.map((item, idx) => idx === index ? { ...item, logs: $event.target.value.split('\n') } : item) })"></textarea>
                </div>
            </div>
        </div>

        <div class="2xl:w-[75%] m-auto bg-base-100 rounded-md p-5 my-10">
            <div class="border-b-2 border-b-[#505050] pb-3 ">Plan</div>
            <div class="flex flex-col gap-4 mt-5">
                <div v-if="script.plan?.permanently || script.plan?.monthly || script.plan?.day">
                    <div v-if="script.plan?.permanently">
                        <div class="flex flex-col">
                            <label>Permanently</label>
                            <span class="text-[#777777] text-sm">ราคาของ Permanently</span>
                        </div>
                        <input type="Number" min="0"
                            class="w-full h-[2.5rem] px-3 py-2 rounded-lg border border-[#4b4b4b] focus:outline-none focus:border-blue-500 bg-base-100 mt-2"
                            :placeholder="script.plan?.permanently" :value="script.plan?.permanently"
                            @input="$emit('update:script', { ...script, plan: { ...script.plan, permanently: $event.target.value } })">
                    </div>
                    <div v-if="script.plan?.monthly">
                        <div class="flex flex-col mt-2">
                            <label>Month</label>
                            <span class="text-[#777777] text-sm">ราคาของ Month</span>
                        </div>
                        <input type="Number" min="0"
                            class="w-full h-[2.5rem] px-3 py-2 rounded-lg border border-[#4b4b4b] focus:outline-none focus:border-blue-500 bg-base-100 mt-2"
                            :placeholder="script.plan?.monthly" :value="script.plan?.monthly"
                            @input="$emit('update:script', { ...script, plan: { ...script.plan, monthly: $event.target.value } })">
                    </div>
                    <div v-if="script.plan?.day">
                        <div class="flex flex-col mt-2">
                            <label>Day</label>
                            <span class="text-[#777777] text-sm">ราคาของ Day</span>
                        </div>
                        <input type="Number" min="0"
                            class="w-full h-[2.5rem] px-3 py-2 rounded-lg border border-[#4b4b4b] focus:outline-none focus:border-blue-500 bg-base-100 mt-2"
                            :placeholder="script.plan?.day" :value="script.plan?.day"
                            @input="$emit('update:script', { ...script, plan: { ...script.plan, day: $event.target.value } })">
                    </div>
                </div>
            </div>
        </div>

        <div class="2xl:w-[75%] m-auto bg-base-100 rounded-md p-5 my-10">
            <div class="border-b-2 border-b-[#505050] pb-3 ">การตั้งค่าใช้งานและแสดง</div>
            <div class="flex flex-col gap-4 mt-5">
                <div>
                    <div class="flex flex-col">
                        <label>สถานะ</label>
                        <span class="text-[#777777] text-sm">สถานะของ Script</span>
                    </div>
                    <select
                        class="w-full h-[2.5rem] px-3 py-2 rounded-lg border border-[#4b4b4b] focus:outline-none focus:border-blue-500 bg-base-100 mt-2"
                        :value="script.status"
                        @input="$emit('update:script', { ...script, status: $event.target.value })">
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
                <div>
                    <div class="flex flex-col">
                        <label>Recommended</label>
                        <span class="text-[#777777] text-sm">แสดงในหน้าแรก</span>
                    </div>
                    <input type="checkbox" :checked="script.recommended"
                        @change="$emit('update:script', { ...script, recommended: $event.target.checked })">
                </div>
            </div>
        </div>

        <div class="2xl:w-[75%] flex justify-end items-center my-10 gap-4 m-auto">
            <button class="px-7 py-2 bg-rose-400 text-white rounded-lg hover:bg-rose-700 duration-300"
                @click="$emit('deleteScript')">ลบ Script</button>
            <button class="px-7 py-2 bg-primary text-white rounded-lg hover:bg-secondary duration-300"
                @click="$emit('updateScript')">บันทึก</button>
        </div>


    </div>
</template>

<script>
export default {
    name: 'Settings_Scirpt',
    props: {
        script: {
            type: Object,
            required: true

        }
    },
    data() {
        return {

        }
    }


}
</script>

<style></style>