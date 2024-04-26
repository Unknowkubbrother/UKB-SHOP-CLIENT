<template>
    <div class="w-full h-full my-5">
        <div class="w-[90%] bg-base-100 m-auto rounded-lg p-5">
            <template v-for="(data, idx) in order" :key="idx">
                <div class="collapse collapse-arrow bg-base-200 my-2 cursor-pointer"
                    :class="checked === idx ? 'collapse-open' : 'collapse-close'"
                    @click="(checked != idx) ? (checked = idx) : (checked = null)">
                    <input type="radio" name="my-accordion-2">
                    <div class="collapse-title text-lg font-medium ">
                        <div class="w-full flex justify-start items-center">
                            <span>Customer : {{ data.username }}</span>
                        </div>
                    </div>
                    <div class="collapse-content text-sm">
                        <template v-for="(detail, index) in (data.order)" :key="index">
                            <div class="collapse collapse-arrow bg-base-200 my-2 cursor-pointer"
                            :class="checked_childern === index ? 'collapse-open' : 'collapse-close'"
                                @click.stop="(checked_childern != index) ? (checked_childern = index) : (checked_childern = null)">
                                <input type="radio" name="my-accordion-2">
                                <div class="collapse-title text-lg font-medium ">
                                    <div class="w-full flex justify-start items-center">
                                        <span>Order #{{ index + 1 }}</span>
                                    </div>
                                </div>
                                <div class="collapse-content text-sm cursor-default">

                                    <div class="w-full bg-[#353535] rounded-lg flex justify-around gap-2 p-5 text-sm">
                                        <div class="flex flex-col justify-center items-center">
                                            <span>Order Number </span>
                                            <span>{{ detail.transRefId }}</span>
                                        </div>
                                        <div class="flex flex-col justify-center items-center">
                                            <span>Date</span>
                                            <span>{{ detail.dateSlip }}</span>
                                        </div>
                                        <div class="flex flex-col justify-center items-center">
                                            <span>Total</span>
                                            <span>{{ detail.total }} Baht</span>
                                        </div>
                                        <div class="flex flex-col justify-center items-center">
                                            <span>Payment</span>
                                            <span class="text-green-400 flex gap-2 justify-center items-center"><i
                                                    class="fa-solid fa-circle-check text-green-400"></i>success</span>
                                        </div>
                                    </div>

                                    <div class="w-full rounded-lg p-5">
                                        <div class="text-lg my-5 font-semibold ">Order details</div>
                                        <div class="w-full">
                                            <div class="flex justify-between font-semibold mb-5">
                                                <span>PRODUCT</span>
                                                <span>Total</span>
                                            </div>
                                            <hr>
                                            <div class="flex flex-col gap-5 my-5">

                                                <!--  -->
                                                <div class="flex justify-between items-center"
                                                    v-for="(data_detail, index) in (detail.data)" :key="index">
                                                    <div class="flex flex-col">
                                                        <span>{{ data_detail.nameScript }}</span>
                                                        <span v-if="data_detail.Plan.permanently.status">permanently</span>
                                                        <span v-else>rent : {{ data_detail.Plan.rent.day }} day</span>
                                                    </div>
                                                    <span>{{ data_detail.Plan.permanently.status ?
                                                        data_detail.Plan.permanently.price : data_detail.Plan.rent.price }}
                                                        Baht</span>
                                                </div>
                                                <!--  -->

                                            </div>
                                            <hr>
                                            <div class="flex justify-between font-semibold mt-5">
                                                <span>Total</span>
                                                <span>{{ detail.total }} Baht</span>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { config } from '../../../../config';
export default {
    name: "Order_Payment_Admin",
    data() {
        return {
            checked: null,
            checked_childern: null,
            order: []
        }
    },
    methods: {
        async getPayment() {
            const api = `${config.EndPoint}/payment`;
            await axios.get(api, { withCredentials: true }).then((res) => {
                if (res.status === 200) {
                    const filteredOrder = [];
                    res.data.forEach((item) => {
                        const existingOrder = filteredOrder.find((order) => order.username === item.username);
                        if (existingOrder) {
                            existingOrder.order.push(item);
                        } else {
                            filteredOrder.push({
                                username: item.username,
                                order: [item],
                            });
                        }
                    });
                    this.order = filteredOrder;
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    },
    mounted() {
        this.getPayment();
    }

}
</script>

<style></style>