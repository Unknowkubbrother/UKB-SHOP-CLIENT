<template>
    <div id="home">
        <div class="w-full h-full select-none">
            <div class="flex justify-center items-center h-full">
                <div class="text-center">
                    <h1 class="text-[2.5rem] xl:text-[5rem] font-bold">UKB Developer</h1>
                    <h1 class="text-lg xl:text-3xl mt-5 ">We will give you the greatest experience.</h1>
                </div>
            </div>
        </div>
        <div class="w-full h-[400px]">
            <div class="w-[90%] xl:w-[60%] h-[350px] bg-[#fff] m-auto rounded-lg overflow-hidden">
                <div class="w-[90%] h-[20%] m-auto flex justify-between items-center">
                    <div>
                        <span class="p-3 Recommended text-lg rounded-[5px]">Recommended</span>
                    </div>
                    <div>
                        <router-link to="/store" exact class="text-[#3d7fa1] text-lg">View all Script</router-link>
                    </div>
                </div>
                <div class="w-[90%] h-[75%] m-auto rounded-lg overflow-auto">
                    <div class="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" v-if="script.data.length">
                        <!-- <--->
                        <div v-for="(data,idx) in script.data" :key="idx">
                        <div @click="NextStoreChildern(data.id)" class="w-[65%] xl:w-[90%] h-full rounded-lg overflow-hidden m-auto my-1 duration-300 cursor-pointer bg-[#276381] hover:bg-[#3d7fa1]">
                            <img :src="data.thumbnail" class="w-[90%] h-[200px] object-cover m-auto rounded-lg my-2">
                            <div class="w-[90%] h-[30px] flex justify-center items-center m-auto rounded-lg bg-[#3d7fa1] duration-300">
                                <div class="text-center text-lg">{{ data.nameScript }}</div>
                            </div>
                        </div>
                    </div>
                        <!-- <--->
                                
                    </div>
                    <div v-else class="w-full h-full flex justify-center items-center">
                        <span class="text-[#3d7fa1] text-2xl text-center">Recommended resource not found. . .</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import {config} from '../../config';
export default {
    name: "Home",
    data() {
        return {
        script:{
            data:[]
            }
        };
    },
    methods: {
        async getScript(){
           const api = `${config.EndPoint}/script`;
              await axios.get(api).then((res)=>{
                res.data.map((data)=>{
                    this.script.data.push(data);
                });
              }).catch((err)=>{
                console.log(err);
              });
        },
        NextStoreChildern(id){
            this.$router.push(`/store/${id}`);
        }
    },
    mounted(){
        this.getScript();
    },
    created() {
        document.title = "UKB Developer";
    }

}
</script>

<style>
#home{
    height: calc(90vh - 100px);
}
.Recommended{
    padding: 6px 30px 6px 10px;
    margin-left: 10px;
    border-radius: 5px 0 0 5px;
    background: linear-gradient(90deg, #3d7fa1, #3d7fa1 40%, rgba(61, 127, 161, .6) 75%, rgba(61, 127, 161, 0));
}
</style>