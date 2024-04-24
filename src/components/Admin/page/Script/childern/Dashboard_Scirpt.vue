<template>
    <div class="w-full h-full">
        <div class="w-[75%] m-auto bg-base-100 rounded-md p-5">
            <div class="border-b-2 border-b-[#505050] pb-3 ">ข้อมูล</div>
            <div class="flex flex-col gap-4 mt-5">
                <div>
                    <div class="flex flex-col">
                        <label>ScriptName</label>
                        <span class="text-[#777777] text-sm">ใช้ได้เฉพาะภาษาอังกฤษ, ตัวเลข, เว้นวรรค และ _</span>
                    </div>
                    <input type="text"
                        class="w-full h-[2.5rem] px-3 py-2 rounded-lg border border-[#4b4b4b] focus:outline-none focus:border-blue-500 bg-base-100 mt-2"
                        :placeholder="script.nameScript" :value="script.nameScript" @input="$emit('update:script', { ...script, nameScript: $event.target.value })">
                </div>
                <div>
                    <label>Description</label>
                        <textarea placeholder="Enter Description" :value="script.description" @input="$emit('update:script', { ...script, description: $event.target.value })"
                            class="w-full h-24 max-h-24 rounded-lg border border-[#4b4b4b] focus:outline-none focus:border-blue-500 bg-base-100 mt-2 overflow-auto"></textarea>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Dashboard_Scirpt',
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