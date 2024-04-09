<template>
  <div id="Topbar">
    <div class="flex justify-between items-center w-full p-3 px-10">
        <router-link to="/home" class="logo flex justify-center items-center" exact>
            <img src="../assets/logo.png" alt="logo" class="w-[80px] h-[80px] object-cover m-auto">
            <div class="text-2xl p-5">UKB Developer</div>
        </router-link>
        <nav>
            <ul class="flex justify-between items-center gap-7 text-lg">
                <router-link to="/store" class-active="active" class="hover:text-sky-500 hover:duration-300 p-[10px]" exact>
                    Store
                </router-link>
                <router-link to="/login" class-active="active" class="hover:text-sky-500 hover:duration-300 p-[10px]" exact>
                    Sign in
                </router-link>
            </ul>
        </nav>
    </div>
  </div>
</template>

<script>
export default {
    name: "Topbar",

}
</script>

<style>

</style>