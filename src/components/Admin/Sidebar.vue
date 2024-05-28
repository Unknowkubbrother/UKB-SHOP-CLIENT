<template>
    <div class="hidden 2xl:block h-screen fixed side-bar-visible bg-[#24272e] text-center z-50" id="side-bar"
        :class="dataOpenSidebar == true ? 'side-bar-visible' : 'side-bar-close'" @mouseover="textbar = true"
        @mouseleave="textbar = false">
        <div class="w-full relative">
            <div class="logo m-auto mt-10"></div>
            <button @click="toggleShowbar">
                <i :class="{
                    'fa-regular fa-circle-dot': activebar,
                    'fa-regular fa-circle': !activebar,
                }" class="absolute top-[-15%] right-6 text-[#3d7fa1] text-lg cursor-pointer"
                    v-show="textbar || activebar"></i>
            </button>
        </div>

        <div class="menusidebar flex flex-col h-[calc(100vh-3rem)] text-lg mt-10">
            <div class="flex flex-col flex-wrap gap-4">
                    <router-link to="/admin/script"  class-active="active" class="hover:text-[#3d7fa1] hover:duration-300 p-[10px]" exact>
                        <i class="fa-solid fa-window-maximize"></i><span class="text-bar" v-show="textbar || activebar">Resources</span>
                    </router-link>
                    <router-link to="/admin/payment"  class-active="active" class="hover:text-[#3d7fa1] hover:duration-300 p-[10px]" exact>
                        <i class="fa-solid fa-credit-card"></i><span class="text-bar" v-show="textbar || activebar">Payments</span>
                    </router-link>
                    <router-link to="/home"  class-active="active" class="hover:text-[#3d7fa1] hover:duration-300 p-[10px]" exact>
                        <i class="fa-solid fa-house"></i><span class="text-bar" v-show="textbar || activebar">Home Page</span>
                    </router-link>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'Sidebar',
    props: {
        dataOpenSidebar: Boolean
    },
    data() {
        return {
            activebar: false,
            textbar: false,
        }
    },
    methods: {
        toggleShowbar() {
            this.activebar = !this.activebar;
            this.$emit('clickHambuger');
        },
    }
}
</script>

<style>
#side-bar .logo {
    background-image: url("../../assets/logo.png");
    /* background-color: #3d7fa1; */
    border-radius: 5px;
    height: 80px;
    width: 80px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

#side-bar {
    overflow: hidden;
    transition: 300ms;
}

.side-bar-visible {
    width: 250px !important;
}

.side-bar-visible:hover {
    width: 250px !important;
}

.side-bar-close {
    width: 90px !important;
}

.menusidebar .active {
    width: 70%;
    margin: auto;
    margin-top: 0;
    margin-bottom: 0;
    background-color: #3d7fa1;
    border-radius: 5px;
}

.text-bar {
    margin-left: 1rem;
}</style>