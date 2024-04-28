<template>
    <div class="w-full h-full flex">
      <Sidebar :dataOpenSidebar="openSidebar" @clickHambuger="toggleSidebar" />
      <div class="main h-full xl:mr-5" :class="openSidebar == true ? 'sidebar-space-visible 2xl:ml-[280px]' : 'sidebar-space-close 2xl:ml-[110px]'">
        <!-- <headerTop /> -->
        <div class="w-full h-[clac(100vh-50px)]">
          <router-view/>
        </div>
      </div>  
    </div>
    
  </template>
  
  <script>
  // import axios from "axios";
//   import headerTop from './headerTop.vue'
  import Sidebar from './Sidebar.vue'
  export default {
    name: 'Admin',
    components: {
      Sidebar,
    //   headerTop
    },
    data() {
      return {
        openSidebar: false,
      }
    },
    methods: {
      toggleSidebar() {
        this.openSidebar = !this.openSidebar
      },
    },
    created() {
        document.title = "Admin | CodeKub Shop";
    }
  }
  </script>
  
  <style>
  
  .main {
    transition: 300ms;
    width: 100% !important;
  }
  </style>