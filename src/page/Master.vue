<template>
    <div class="w-full h-full">
        <Topbar/>
        <router-view />
    </div>
</template>

<script>
import Topbar from '../views/Topbar.vue'
export default {
    name: "Master",
    components: {
        Topbar
    },
    

}
</script>

<style>

</style>