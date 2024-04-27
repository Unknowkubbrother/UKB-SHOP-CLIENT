<template>
    <div class="app">
        <router-view />
    </div>
</template>

<script>
export default {
    name: "App",
    components: {},
    data() {
        return {};
    },
    methods: {},
    created() {
        if (!localStorage.getItem('cart')) {
            const encryptedData = this.$CryptoJS.AES.encrypt(JSON.stringify([]), 'ukb-developer').toString();
            localStorage.setItem('cart', encryptedData);
        }
    }
};
</script>

<style></style>