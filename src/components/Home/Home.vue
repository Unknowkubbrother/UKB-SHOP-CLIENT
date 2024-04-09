<template>
    <div id="home">
        <div class="w-full h-full">
            <div class="flex justify-center items-center h-full">
                <div class="text-center">
                    <h1 class="text-[5rem] font-bold">UKB Developer</h1>
                    <h1 class="text-3xl mt-5 ">Selling movie tickets</h1>
                </div>
            </div>
        </div>
        <div class="w-full h-[400px]">
            <div class="w-[60%] h-[350px] bg-[#fff] m-auto rounded-lg overflow-hidden">
                <div class="w-[90%] h-[20%] m-auto flex justify-between items-center">
                    <div>
                        <span class="p-3 Recommended text-lg rounded-[5px]">Recommended</span>
                    </div>
                    <div>
                        <router-link to="/store" exact class="text-[#3d7fa1] text-lg">View all Script</router-link>
                    </div>
                </div>
                <div class="w-[90%] h-[75%] m-auto rounded-lg overflow-auto">
                    <div class="grid grid-cols-4 gap-4">
                        <!-- <--->
                        <div class="w-[90%] h-full rounded-lg overflow-hidden m-auto my-1 duration-300 cursor-pointer bg-[#276381] hover:bg-[#3d7fa1]">
                            <img src="https://media.discordapp.net/attachments/1133807349266653264/1176607928325787649/IMG-100000000.jpg?ex=661ed406&is=660c5f06&hm=6d689fabccd0a20c3498c8f6054b858972ad04cd3b20a12940ad728e5db1e542&=&format=webp&width=1119&height=671" alt="" class="w-[90%] h-[200px] object-cover m-auto rounded-lg my-2">
                            <div class="w-[90%] h-[30px] flex justify-center items-center m-auto rounded-lg bg-[#3d7fa1] duration-300">
                                <div class="text-center text-lg">UKB-AllTicket</div>
                            </div>
                        </div>
                        <!-- <--->
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Home",
    data() {
        return {

        };
    },

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
    background: linear-gradient(90deg, #3d7fa1, #3d7fa1 40%, rgba(61, 127, 161, .6) 80%, rgba(61, 127, 161, 0));
}
</style>